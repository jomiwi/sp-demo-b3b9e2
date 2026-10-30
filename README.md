# Saranay Pickleball Court and Cafe: one-page demo site (v1)

**Status:** DEMO. Unlisted and `noindex, nofollow`. Not the official site; not for promotion.
**Built by:** Jared (UX/UI) for Jon Miller · brief from Ling · CHOAM asset `aeafee96-740a-4803-a7ce-9050ec2fd0d7` · 30 Oct 2026
**Copy:** Martha, final draft 30 Oct 2026 (Dropbox `/002/CHOAM/saranay/saranay-site-copy-2026-10-30.md`)

## Files
| File | What it is |
| --- | --- |
| `index.html` | The whole page. Each section is wrapped in `COPY: n name` / `/COPY: n name` comments. |
| `styles.css` | Design tokens in `:root` (colour, type, spacing, radius, motion), then components. No colours or spacing outside tokens. |
| `main.js` | Mobile menu toggle and sticky mobile CTA bar. No tracking, no dependencies. |
| `robots.txt` | Allows crawling, so crawlers can see the noindex tag. |
| `_headers` | `X-Robots-Tag: noindex, nofollow` (applied on Cloudflare Pages / Netlify; GitHub Pages ignores it). |
| `favicon.svg`, `.nojekyll` | Icon; tells GitHub Pages to serve files as-is. |

## Editing copy
- Unconfirmed facts are `<span class="tbc">…</span>` and render as a yellow **TBC** badge. When Raf and Rhema lock a fact, replace the whole span with plain text.
- Photo slots are `<figure class="photo-ph" data-alt="…">`. Swap each for `<img src="…" alt="(the data-alt text)" width height loading="lazy">` using real venue photos (with rights).

## Links (all in index.html)
| Purpose | URL |
| --- | --- |
| Join open play (primary CTA) | https://reclub.co/clubs/@saranay-pickleball-club |
| Rent a court / café / Messenger | https://m.me/61589930970148 (TBC: confirm it opens the page chat) |
| Instagram DM | https://ig.me/m/saranaypickleballcourt (TBC) |
| Phone | tel:+639065458384 |
| Google Maps | https://maps.app.goo.gl/ZfC7mDdgYcpLxBRT7 |
| Map embed (no API key) | https://www.google.com/maps?q=Saranay Pickleball Court, Saranay Road, Bagumbong, Caloocan&output=embed |
| Facebook | https://www.facebook.com/people/Saranay-Pickleball-Court-and-Cafe/61589930970148/ |
| Instagram | https://www.instagram.com/saranaypickleballcourt/ |
| TikTok | https://www.tiktok.com/@saranay.picklebal |

## Placeholders still on the page (Martha's "Facts to confirm")
Official hours (court and café) · open play schedule · open play rate · coffee + free open play terms · players per session · court rental rate · what a rental includes · Messenger link · Instagram DM link · paddle and ball loan · full café menu and café hours · parking and directions · kids age/supervision rule · real venue photos. Pets are not mentioned on the page until a rule is confirmed. "Rent a court" goes to Messenger until a rental calendar exists.

## Standards
Mobile-first; WCAG 2.1 AA colour contrast (all text pairs ≥ 5.9:1); visible focus rings; 44px+ targets; semantic landmarks; skip link; `prefers-reduced-motion` respected; no Open Graph / Twitter tags; no booking or payment on the site.
