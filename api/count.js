// /api/count (Vercel preview only): first-party sink for the /book/ no-consent beacon.
// Reads only the JSON body, plus the User-Agent IN MEMORY to drop bots/link previewers (never stored, forwarded or logged).
// Never reads or forwards IP or cookies; never logs the request. Non-POST -> 204, no insert.
// Note: the beacon only fires from a JS-executing browser, so HTML-only preview fetches can't count anyway.
// 'Messenger' alone is NOT matched: Messenger's in-app browser (FBAN/MessengerForiOS) is a real person.
// Testing: headless Chrome's default UA contains "HeadlessChrome" and is dropped; automated tests must set a normal browser UA.
const SINK = 'https://qyvitzzqhwtqectsmzhs.supabase.co/functions/v1/saranay-book-count';
const BOT = /facebookexternalhit|facebot|messengerlinkpreview|viber|slackbot|slack-imgproxy|twitterbot|whatsapp|telegrambot|discordbot|linkedinbot|googlebot|bingbot|bot|crawler|spider|preview|headless/i;
const KEYS = ['event', 'utm_source', 'utm_medium', 'utm_campaign', 'utm_content', 'utm_term', 'cta', 'rate_band', 'page'];
module.exports = async (req, res) => {
  res.setHeader('Cache-Control', 'no-store');
  if (req.method !== 'POST') { res.statusCode = 204; return res.end(); }
  const ua = String(req.headers['user-agent'] || '');
  if (!ua || BOT.test(ua)) { res.statusCode = 204; return res.end(); }
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
