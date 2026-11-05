#!/usr/bin/env python3
"""Build the go-live site from the RC root.

    python3 _build/build-golive.py                # writes ../golive-build (noindex kept)
    python3 _build/build-golive.py --launch       # also drops noindex (not on /book), adds canonical and CNAME, uses saranaypickleball.com
    python3 _build/build-golive.py --approve ig06,ai_images   # override owner-ok.json for one build

Only the live pages and the files they reference are copied. No /vX/ copies, no README/CHANGELOG,
no HTML/CSS/JS comments (inline <script> too), no demo ribbon. /book keeps noindex in every build;
CNAME is written only in --launch builds, so a preview build can't claim the domain. Photos without a logged owner OK are left out unless
_build/owner-ok.json says otherwise. The build fails if a forbidden string survives.
"""
import argparse, json, os, re, shutil, subprocess, sys
from urllib.parse import urlsplit, unquote

REPO = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
BUILD = os.path.join(REPO, '_build')
PAGES = ['index.html', 'cafe/index.html', 'pickleball-for-beginners/index.html']
BOOK = 'book/index.html'
OPTIONAL = ['privacy/index.html']
DEMO_URL = 'https://jomiwi.github.io/sp-demo-b3b9e2/'
LIVE_URL = 'https://saranaypickleball.com/'
# RC4.8: '₱150' was narrowed to the open-play phrasings it was added to catch, because French Fries and Streetfoods are ₱150 on the café menu.
FORBIDDEN = ['TBC', '₱150/player', '₱150 per player', '₱150 a player', 'm.me', 'Demo preview', 'placeholder']
TEXT_EXT = ('.html', '.css', '.js', '.txt', '.xml', '.json', '.svg')
MARKER = '.golive-build'

ap = argparse.ArgumentParser()
ap.add_argument('--out', default=os.path.join(os.path.dirname(REPO), 'golive-build'))
ap.add_argument('--launch', action='store_true')
ap.add_argument('--approve', default='')
ap.add_argument('--book-scans', choices=['on', 'off'], default=None, help='/book no-consent count beacon; default on for preview, OFF for --launch (DID-38)')
a = ap.parse_args()

cfg = json.load(open(os.path.join(BUILD, 'owner-ok.json')))
ok = {k for k, v in cfg.items() if v is True and k != 'approve_all'}
ok |= {k.strip() for k in a.approve.split(',') if k.strip()}
ALL = {k for k in cfg if not k.startswith('_') and k != 'approve_all'}
if cfg.get('approve_all'): ok |= ALL
bad = ok - ALL
if bad: sys.exit(f'unknown owner-ok keys: {bad}')

def approved(keys): return any(k in ok for k in keys.split('|'))

def rights(html):
    n = 0
    def r_if(m):
        nonlocal n; n += 1
        return m.group(2) if approved(m.group(1)) else ''
    def r_else(m):
        nonlocal n; n += 1
        return '' if approved(m.group(1)) else m.group(2)
    html = re.sub(r'<!--rights-if:([\w|]+)\n(.*?)\s*rights-if-end-->', r_if, html, flags=re.S)
    html = re.sub(r'<!--rights-else:([\w|]+)-->(.*?)<!--/rights-else-->', r_else, html, flags=re.S)
    def r_el(m):
        tag, key = m.group(1), m.group(2)
        return re.sub(r'\s*data-rights="\w+"', '', m.group(0)) if key in ok else ''
    html = re.sub(r'[ \t]*<(li|figure)\b[^>]*\bdata-rights="(\w+)"[^>]*>.*?</\1>\n?', r_el, html, flags=re.S)
    assert not re.search(r'rights-(?:if|else|if-end)\b|/rights-else|data-rights=', html), 'unprocessed rights marker'
    return html, n

def strip_html(html):
    html = re.sub(r'^[ \t]*<!--.*?-->[ \t]*\n', '', html, flags=re.S | re.M)  # comment-only lines go entirely
    html = re.sub(r'<!--.*?-->', '', html, flags=re.S)
    html = re.sub(r'[ \t]*<p class="demo-ribbon".*?</p>\n?', '', html, flags=re.S)
    html = re.sub(r'\n[ \t]*\n(?:[ \t]*\n)+', '\n\n', html)
    html = re.sub(r'[ \t]+\n', '\n', html)
    return html

def strip_css(css):
    css = re.sub(r'/\*.*?\*/', '', css, flags=re.S)
    css = re.sub(r'\.demo-ribbon[^{]*\{[^}]*\}', '', css)
    return re.sub(r'\n\s*\n+', '\n', css).strip() + '\n'

def strip_js(js):
    js = re.sub(r'/\*.*?\*/', '', js, flags=re.S)
    js = re.sub(r'^[ \t]*//[^\n]*\n', '', js, flags=re.M)
    js = re.sub(r'(?<=[;{},)])[ \t]+//[^\n]*', '', js)
    return re.sub(r'\n\s*\n+', '\n', js).strip() + '\n'

def strip_js_safe(js):
    """Remove // and /* */ comments with a small tokenizer that skips strings, template literals and regex
    literals, so 'https://' or /[/]/ survive. Used for inline <script> bodies."""
    out, i, n, prev = [], 0, len(js), ''
    while i < n:
        c = js[i]
        if c in '\'"`':
            j = i + 1
            while j < n and js[j] != c:
                j += 2 if js[j] == '\\' else 1
            out.append(js[i:j + 1]); prev = c; i = j + 1; continue
        if c == '/' and js.startswith('/*', i):
            j = js.find('*/', i + 2); i = n if j < 0 else j + 2; continue
        if c == '/' and js.startswith('//', i):
            j = js.find('\n', i); i = n if j < 0 else j; continue
        if c == '/' and (prev == '' or prev in '(,=:[!&|?{};+-*%<>~^'):
            j, cls = i + 1, False
            while j < n and (cls or js[j] != '/') and js[j] != '\n':
                if js[j] == '\\': j += 1
                elif js[j] == '[': cls = True
                elif js[j] == ']': cls = False
                j += 1
            j += 1
            while j < n and js[j].isalpha(): j += 1
            out.append(js[i:j]); prev = '/'; i = j; continue
        out.append(c)
        if not c.isspace(): prev = c
        i += 1
    s = ''.join(out)
    s = re.sub(r'[ \t]+\n', '\n', s)
    return re.sub(r'\n[ \t]*\n+', '\n', s)

inline_checked = []
def strip_inline_scripts(html, page):
    def r(m):
        attrs, body = m.group(1), m.group(2)
        if 'src=' in attrs or 'ld+json' in attrs or not body.strip(): return m.group(0)
        new = strip_js_safe(body)
        # same code, just without comments: node --check runs on every stripped body below
        inline_checked.append((page, body, new))
        return f'<script{attrs}>{new}</script>'
    return re.sub(r'<script\b([^>]*)>(.*?)</script>', r, html, flags=re.S)

def launch(html, page):
    if page != BOOK:  # /book is a redirect page: it stays noindex at go-live
        html = re.sub(r'[ \t]*<meta name="(?:robots|googlebot)"[^>]*>\n', '', html)
        url = LIVE_URL + (page[:-len('index.html')])
        html = html.replace('<meta name="viewport"', f'<link rel="canonical" href="{url}">\n  <meta name="viewport"', 1)
    return html.replace(DEMO_URL, LIVE_URL)

# ---- out dir
out = os.path.abspath(a.out)
if os.path.exists(out):
    if not os.path.exists(os.path.join(out, MARKER)): sys.exit(f'{out} exists and is not a previous build; refusing to delete')
    shutil.rmtree(out)
os.makedirs(out)
open(os.path.join(out, MARKER), 'w').write('')

def write(rel, data):
    p = os.path.join(out, rel); os.makedirs(os.path.dirname(p), exist_ok=True)
    open(p, 'w', encoding='utf-8').write(data)

refs = set()
def collect(rel, text):
    base = os.path.dirname(rel)
    vals = re.findall(r'\b(?:src|href)="([^"]+)"', text)
    vals += [v for v in re.findall(r'\bcontent="([^"]+)"', text) if v.startswith((DEMO_URL, LIVE_URL))]
    for ss in re.findall(r'\bsrcset="([^"]+)"', text):
        vals += [part.strip().split()[0] for part in ss.split(',') if part.strip()]
    vals += re.findall(r'url\(["\']?([^"\')]+)', text)
    for v in vals:
        if v.startswith(DEMO_URL): v = '/' + v[len(DEMO_URL):]
        elif v.startswith(LIVE_URL): v = '/' + v[len(LIVE_URL):]
        u = urlsplit(v)
        if u.scheme or u.netloc or not u.path or v.startswith('#'): continue
        path = unquote(u.path)
        p = os.path.normpath(path.lstrip('/') if path.startswith('/') else os.path.join(base, path))
        if os.path.isfile(os.path.join(REPO, p)): refs.add(p)
        elif os.path.isfile(os.path.join(REPO, p, 'index.html')): pass
        else: missing.append((rel, v))

missing, report = [], []
for page in PAGES + [p for p in OPTIONAL if os.path.exists(os.path.join(REPO, p))]:
    src = open(os.path.join(REPO, page), encoding='utf-8').read()
    html, n = rights(src)
    html = strip_inline_scripts(strip_html(html), page)
    if a.launch: html = launch(html, page)
    write(page, html); collect(page, html); report.append(f'{page}: {n} rights blocks processed')
# /book is copied as is apart from comments (source untouched)
book = strip_inline_scripts(strip_html(open(os.path.join(REPO, BOOK), encoding='utf-8').read()), BOOK)
if a.launch: book = launch(book, BOOK)
BOOK_SCANS = a.book_scans or os.environ.get('BOOK_SCANS') or ('off' if a.launch else 'on')
if BOOK_SCANS != 'on':
    n = book.count("var COUNT_ON = true, COUNT_URL = '/api/count';")
    book = book.replace("var COUNT_ON = true, COUNT_URL = '/api/count';", "var COUNT_ON = false, COUNT_URL = '';")
    if n != 1: print('FAILED: book-scans switch marker not found'); sys.exit(1)
write(BOOK, book); collect(BOOK, book)

refs.discard('index.html'); 
for p in sorted(refs):
    if p.endswith('.css'):
        css = strip_css(open(os.path.join(REPO, p), encoding='utf-8').read()); write(p, css); collect(p, css)
for p in sorted(refs):
    if p.endswith('.css'): continue
    if p.endswith('.js'):
        write(p, strip_js(open(os.path.join(REPO, p), encoding='utf-8').read()))
        subprocess.run(['node', '--check', os.path.join(out, p)], check=True)
    elif not os.path.exists(os.path.join(out, p)):
        os.makedirs(os.path.dirname(os.path.join(out, p)) or out, exist_ok=True)
        shutil.copy2(os.path.join(REPO, p), os.path.join(out, p))
# font licences travel with the fonts
for f in os.listdir(os.path.join(REPO, 'fonts')):
    if f.lower().endswith('.txt'): shutil.copy2(os.path.join(REPO, 'fonts', f), os.path.join(out, 'fonts', f))
for f in ['robots.txt', 'sitemap.xml'] + (['CNAME'] if a.launch else []):
    shutil.copy2(os.path.join(BUILD, f), os.path.join(out, f))
# every stripped inline script must still parse
import tempfile
for page, body, new in inline_checked:
    with tempfile.NamedTemporaryFile('w', suffix='.js', delete=False) as tf: tf.write(new)
    rc = subprocess.run(['node', '--check', tf.name], capture_output=True); os.unlink(tf.name)
    if rc.returncode: sys.exit(f'inline script in {page} no longer parses after comment strip:\n{rc.stderr.decode()}')

# ---- checks
fails = []
if missing: fails += [f'missing ref {r} in {p}' for p, r in missing]
files = []
for d, _, fs in os.walk(out):
    for f in fs:
        if f != MARKER: files.append(os.path.relpath(os.path.join(d, f), out))
for f in files:
    if not f.endswith(TEXT_EXT) and not f.endswith('CNAME'): continue
    t = open(os.path.join(out, f), encoding='utf-8', errors='ignore').read()
    t = re.sub(r'data:[\w/+.-]+;base64,[A-Za-z0-9+/=\s]+', 'data:', t)  # embedded image bytes are not text
    for s in FORBIDDEN:
        if s.lower() in t.lower(): fails.append(f'{f}: contains {s!r}')
    if f.endswith('.html') and '<!--' in t: fails.append(f'{f}: HTML comment left')
    if f.endswith('.html') and 'demo-ribbon' in t: fails.append(f'{f}: ribbon left')
    if f.endswith('.html'):
        robots = re.findall(r'<meta name="(?:robots|googlebot)" content="([^"]*)"', t)
        has_noindex = bool(robots) and all('noindex' in v for v in robots) and len(robots) == 2
        if f == BOOK and not has_noindex: fails.append(f'{f}: /book must keep robots + googlebot noindex in every build')
        if f != BOOK and not a.launch and not has_noindex: fails.append(f'{f}: noindex missing (preview build)')
        if f != BOOK and a.launch and robots: fails.append(f'{f}: robots/googlebot meta left in launch build')
        if f != BOOK and a.launch and '<link rel="canonical"' not in t: fails.append(f'{f}: canonical missing (launch build)')
        for sc in re.findall(r'<script\b(?![^>]*\bsrc=)(?![^>]*ld\+json)[^>]*>(.*?)</script>', t, flags=re.S):
            if re.sub(r'\s', '', strip_js_safe(sc)) != re.sub(r'\s', '', sc): fails.append(f'{f}: JS comment left in inline <script>')
for f in files:
    top = f.split('/')[0]
    if re.match(r'v\d', top) or top in ('README.md', 'CHANGELOG.md', 'booktest', '_build'): fails.append(f'{f}: should not ship')
    if f.startswith('img/') and f not in refs: fails.append(f'{f}: unused image')
_bk = open(os.path.join(out, BOOK), encoding='utf-8').read()
if BOOK_SCANS == 'on' and 'COUNT_ON = true' not in _bk: fails.append('/book: book-scans on but COUNT_ON not true')
if BOOK_SCANS != 'on' and ('/api/count' in _bk or 'COUNT_ON = false' not in _bk): fails.append('/book: book-scans off but /api/count still present')
report.append(f'/book no-consent count beacon (book-scans): {BOOK_SCANS.upper()}' + (' (launch default OFF; pass --book-scans on or BOOK_SCANS=on)' if a.launch else ''))
if a.launch and 'CNAME' not in files: fails.append('CNAME missing (launch build)')
if not a.launch and 'CNAME' in files: fails.append('CNAME in a preview build (it would claim the domain)')
if a.launch and open(os.path.join(out, 'CNAME')).read().strip() != urlsplit(LIVE_URL).netloc: fails.append('CNAME does not match LIVE_URL')
mode = 'launch' if a.launch else 'preview (noindex kept)'
print(f'golive build -> {out} [{mode}] owner OK: {sorted(ok) or "none"}')
print('\n'.join(report))
for f in sorted(files): print(f'  {os.path.getsize(os.path.join(out, f)):>8}  {f}')
if fails:
    print('\nFAILED:\n  ' + '\n  '.join(fails)); sys.exit(1)
print(f'{len(files)} files, all checks passed: no {", ".join(FORBIDDEN)}; no comments (incl. inline JS), ribbon, /vX/, README, CHANGELOG or unused images; '
      + ('/book noindex, other pages indexable with canonical, CNAME present.' if a.launch else 'noindex on every page, no CNAME.'))
