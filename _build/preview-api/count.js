// /api/count (Vercel preview only): first-party sink for the /book/ no-consent beacon.
// Reads only the JSON body; never reads or forwards headers, IP, cookies or user agent; never logs the request.
const SINK = 'https://qyvitzzqhwtqectsmzhs.supabase.co/functions/v1/saranay-book-count';
const KEYS = ['event', 'utm_source', 'utm_medium', 'utm_campaign', 'utm_content', 'utm_term', 'cta', 'rate_band', 'page'];
module.exports = async (req, res) => {
  res.setHeader('Cache-Control', 'no-store');
  if (req.method !== 'POST') { res.statusCode = 405; return res.end(); }
  let raw = '';
  try { for await (const c of req) { raw += c; if (raw.length > 2000) break; } } catch (e) {}
  let b = {}; try { b = JSON.parse(raw.slice(0, 2000)); } catch (e) { res.statusCode = 400; return res.end(); }
  if (!b || b.event !== 'book_court_click') { res.statusCode = 400; return res.end(); }
  const out = {}; KEYS.forEach(k => { if (typeof b[k] === 'string') out[k] = b[k].slice(0, 100); });
  try {
    const r = await fetch(SINK, { method: 'POST', headers: { 'content-type': 'application/json' }, body: JSON.stringify(out) });
    res.statusCode = r.ok ? 204 : 502;
  } catch (e) { res.statusCode = 502; }
  res.end();
};
