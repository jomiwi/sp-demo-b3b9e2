// saranay-book-count: insert-only, no IP / headers / identifiers read or logged. Called server-to-server by the
// first-party /api/count function (never by browsers directly). Only allow-listed, length-capped fields are stored.
import postgres from "npm:postgres@3.4.4";
const sql = postgres(Deno.env.get("SUPABASE_DB_URL")!, { max: 1, prepare: false });
const S = (v: unknown, n: number) => (typeof v === "string" && v.length ? v.slice(0, n) : null);
Deno.serve(async (req: Request) => {
  if (req.method !== "POST") return new Response(null, { status: 204 }); // POST-only, no insert
  let b: Record<string, unknown> = {};
  try { b = JSON.parse((await req.text()).slice(0, 2000)); } catch { return new Response(null, { status: 400 }); }
  if (b.event !== "book_court_click") return new Response(null, { status: 400 });
  const cta = S(b.cta, 80); const band = S(b.rate_band, 10);
  try {
    await sql`select saranay_metrics.record_scan(${"book_court_click"}, ${S(b.utm_source, 100)}, ${S(b.utm_medium, 100)},
      ${S(b.utm_campaign, 100)}, ${S(b.utm_content, 100)}, ${S(b.utm_term, 100)},
      ${cta && /^[a-z0-9_]{1,80}$/.test(cta) ? cta : "book_redirect"},
      ${band && /^(early|midday|evening)$/.test(band) ? band : "none"}, ${S(b.page, 100)})`;
  } catch { return new Response(null, { status: 500 }); }
  return new Response(null, { status: 204 });
});
