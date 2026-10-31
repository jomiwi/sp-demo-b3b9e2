# Saranay Pickleball Court and Cafe: one-page demo site (v1.5)

**Status:** DEMO. Unlisted and `noindex, nofollow`. Not the official site; not for promotion.
**Built by:** Jared (UX/UI) for Jon Miller · brief from Ling · CHOAM asset `aeafee96-740a-4803-a7ce-9050ec2fd0d7` · 30 Oct 2026
**Copy:** Martha, final draft 30 Oct 2026 (Dropbox `/002/CHOAM/saranay/saranay-site-copy-2026-10-30.md`)

## Files
| File | What it is |
| --- | --- |
| `index.html` | The whole page. Each section is wrapped in `COPY: n name` / `/COPY: n name` comments. |
| `styles.css` | Design tokens in `:root` (colour, type, spacing, radius, motion), then components. No colours or spacing outside tokens. |
| `main.js` | Mobile menu, "Copy location pin", hero chooser, context dock, open-now and next-open-play chips, and (v3.4) the cookie banner and dataLayer events (see CHANGELOG v3.4). No dependencies. Google Tag Manager stays off until the placeholder `GTM-XXXXXXX` in index.html is replaced with the real container ID, and then it only measures after the visitor accepts cookies. |
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
| Book a court (Sports360) | https://app.sports360.ph/sportshub/saranay-pickleball-court (verified 31 Oct 2026) |
| Groups / booking help / café / Messenger | https://m.me/61589930970148 (TBC: confirm it opens the page chat) |
| Instagram DM | https://ig.me/m/saranaypickleballcourt (TBC) |
| Phone | tel:+639065458384 |
| Google Maps | https://maps.app.goo.gl/ZfC7mDdgYcpLxBRT7 |
| Map embed (no API key) | https://www.google.com/maps?q=Saranay Pickleball Court, Saranay Road, Bagumbong, Caloocan&output=embed |
| Facebook | https://www.facebook.com/people/Saranay-Pickleball-Court-and-Cafe/61589930970148/ |
| Instagram | https://www.instagram.com/saranaypickleballcourt/ |
| TikTok | https://www.tiktok.com/@saranay.picklebal |

## Placeholders still on the page (Martha's "Facts to confirm")
Official hours (court and café) · open play schedule · open play rate · coffee + free open play terms · players per session · court rental rate · what a rental includes · Messenger link · Instagram DM link · paddle and ball loan · full café menu and café hours · parking and directions · kids age/supervision rule · real venue photos. Pets are not mentioned on the page until a rule is confirmed. Court rentals go to Sports360 (since 9 Oct 2026); Messenger is the second option for groups or booking help.

## Standards
Mobile-first; WCAG 2.1 AA colour contrast (all text pairs ≥ 5.9:1); visible focus rings; 44px+ targets; semantic landmarks; skip link; `prefers-reduced-motion` respected; no Open Graph / Twitter tags; no booking or payment on the site.

## Page order (v1.1, persona-led)
Hero (Join open play + Book a court on Sports360, "Next open play" chip) → Coming up (dated strip) → Open play → Rates and hours → Private rental → First time? (welcome block) → Café → Find us (Maps, Copy location pin, Call) → About → How to book → FAQ (+ Messenger / IG / Call) → Footer. Pinned mobile bar: Join open play (Reclub) + Message us (Messenger).

| Persona | Where they land |
| --- | --- |
| Paolo, weekend open-play regular | Hero CTA, Next open play chip, Coming up, Open play, Rates |
| Friend groups, families, event hosts | Book a court on Sports360 (hero), Private rental, FAQ, Messenger, Call |
| Bea, first-timer | First time? welcome block and "Your first visit" steps |
| Tita Rose, café-goer | Café section (Directions button) and Find us (Maps, Copy location pin) |

## Borrowed from the reference sites (site-examples brief, 30 Oct 2026)
- Pickle Up (SG): pinned two-button mobile bar (book + chat); dated event strip.
- Vanda (Manila): "Copy location pin" button for ride-hailing.
- PickleBOS (Boston): rates-and-hours cards near the top.
- Astra (Cainta): FAQ that answers the usual Messenger questions (hours, cap, payment, what to bring, parking, café, outside food).
- The Fort (Fort Lauderdale): first-timer hook ("No partner / no experience / no paddle?").
- The Jar (Melbourne): quality bar for type, spacing and photo framing; "What's on" list; real photos still needed.

Reclub member count: 586 (updated 31 Oct 2026).

## v1.2 (30 Oct 2026)

Applied Martha's copy review (`/002/CHOAM/saranay/saranay-demo-copy-review-2026-10-30.md`): call line, café lede and seating row, rental ticks, no-partner list, first-visit steps, FAQ intro and 3 FAQ answers, event cards (days, "Request a spot on Reclub"), "584 members", rates lede, plus code now TBC, full official name in the copy-pin text and map embed.

v1.2.1 (30 Oct 2026): added Martha's optional "Good for:" label above the rental list (approved by Ling).

v1.3 (31 Oct 2026): court rentals moved to Sports360 on 9 Oct, so "Book a court on Sports360" is now the main rental button (hero, rental section, rates card, How to book, FAQ, footer), with Messenger second ("Message us for groups or booking help"). Reclub is open play only. Sports360 URL https://app.sports360.ph/sportshub/saranay-pickleball-court verified 31 Oct 2026 in headless Chromium: the page shows SARANAY PICKLEBALL COURT and our phone, 0906-545-8384. Member count 584 to 585.

v1.4 (31 Oct 2026): court rates, court hours (6am to 2am daily), player caps per booking and paddle/ball prices copied exactly from the Sports360 page https://app.sports360.ph/sportshub/saranay-pickleball-court (read 31 Oct 2026, headless Chrome), with a "Rates as listed on Sports360, Oct 31 2026" source note by the rates. Rates: 6:00 AM – 10:00 AM ₱300/hour; 10:00 AM – 4:00 PM ₱200/hour; 4:00 PM – 2:00 AM ₱300/hour. Caps: 1 hr up to 4, 2 hrs up to 8, 3+ hrs up to 12, additional player ₱100/person. Paddle ₱100 rent per session; ball ₱100 for sale. TBC kept on café hours, seating, open-play fees/schedule/cap, plus code and everything else Sports360 does not list. Meta description unchanged (Martha to supply).

v1.5 (31 Oct 2026): Martha's Sports360 copy fixes (`/002/CHOAM/saranay/saranay-sports360-copy-fixes-2026-10-31.md`). New meta description (146 chars). Second button now "Message us for groups or help booking" (rental section, How to book) and added back to the footer Book list. Rental paragraph: "Pick a time and book the court on Sports360. Coming as a big group or planning an event? Message us and we'll sort it out." FAQ rewrites in Martha's wording: rent, paddle, hours, pay (full payment, non-refundable, 24h reschedule), bring/wear, and outside food (Sports360: no outside food or drinks). Members 585 to 586 (Reclub, 31 Oct 2026). TBC kept on café hours, seating, open-play rate/schedule/cap, coffee sessions, inclusions, parking, directions, plus code, kids rule, café payment, Messenger/IG links.
