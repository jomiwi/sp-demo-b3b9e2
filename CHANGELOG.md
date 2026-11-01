# Saranay demo site · v3 changelog (visual identity)

Brief (Jon, Oct 31 2026, via Ling): "it's not a modern look. And the color scheme looks like AI Slop." v3 rebuilds the look; every v2 feature stays (hero chooser, price-by-time day bar, Split the court, the section-aware mobile bar, the two booking cards).
Every version is frozen at `/v3.x/` (noindex). The root always shows the latest.

## v3.7 · 2026-11-01

**Jon picked option B ("Go with Option B").** v3.7 promotes the `/v3.7b/` preview to the root. `/v3.7a/` and `/v3.7b/` stay in place as previews.
- **Desktop hero (60rem and up):** a full-bleed banner of the 16:9 toast photo (`img/hero-toast-wide-1280.webp` / `-1920.webp`, sizes 82vw), the same CSS as v3.7b (see below), now at the end of `styles.css`. Phones are unchanged.
- **Hero image alt text, phone and desktop:** "Five friends raise iced coffees on the Saranay court at golden hour." It replaces the old court description.
- **Footer:** "Demo preview v3.7". The rest of the footer text is unchanged.
- **Share image:** the same file (`img/og-hero-1200x630.jpg`). Only the query changes, to `?v=3.7`, in og:image, og:image:secure_url and twitter:image.
- No other copy changes.

## v3.7a / v3.7b · desktop hero previews · 2026-11-01

**Not live at the root.** The root stays v3.6.2 until Jon picks an option. Both options are frozen and noindex, at `/v3.7a/` and `/v3.7b/`.

**Why:** Jon wants the toast photo, which shows people having fun, as the desktop hero, and asked to see two layouts. The source is the 1920x1080 16:9 hero, the highest-resolution wide version (placeholder, Studio-generated, as the footer says).

- **v3.7a, split layout:** the toast photo is in the right half-panel. The panel takes the photo's own 25:18 crop (source x 420 to 1920), so all five people stay whole. Its left and bottom edges fade into ink. The desktop headline is `clamp(5rem, 8.4vw, 9.5rem)`, so PICKLEBALL ends left of the panel. Images: `img/hero-toast-split-800.webp` (45.5 KB) and `-1500.webp` (119 KB), sizes 50vw.
- **v3.7b, full-bleed banner:** the 16:9 photo is anchored right at `--banner-h: clamp(25rem, 62vw - 13rem, 41.5rem)`. The lockup (North Caloocan / SARANAY / PICKLEBALL / Court & Café) sits on an ink to `--c-scrim-hero` to `--c-scrim-0` gradient. The headline is `clamp(4.5rem, 7.6vw, 8.5rem)`. Images: `img/hero-toast-wide-1280.webp` (63 KB) and `-1920.webp` (126 KB), sizes 82vw.
- **Both options:**
  - Desktop CSS (60rem and up) only, with tokens only. Phones are byte-for-byte the v3.6.2 hero.
  - Both booking buttons are above the fold, with the consent banner showing, at 1024x768, 1280x800 and 1440x900.
  - The worst headline pixel passes AA at every size (checks in `checks-v3.7-preview.md`).
  - Footer reads "Demo preview v3.7a" or "v3.7b". All other copy is unchanged.

## v3.6.2 · 2026-10-31

**Change (Ling's answers, relayed): share image only**
- `img/og-hero-1200x630.jpg` regenerated as a 1200x630 JPEG, 112.1 KB:
  - The bottom location line is removed (it was "North Caloocan" in v3.6.1).
  - The hours line is back to "Court open 6 AM to 2 AM" (it was "Open till 2 AM" in v3.6.1).
  - The eyebrow "North Caloocan" and the headline are unchanged.
- `og:image`, `og:image:secure_url` and `twitter:image` now end in `?v=3.6.2`.
- Footer: "Demo preview v3.6.2". No other page copy changed. Court hours are unchanged everywhere.

## v3.6.1 · 2026-10-31

**Change (Martha's copy-read, plus Ling's share-image fixes, both relayed)**
- **Hero eyebrow** is now "North Caloocan" (was "Saranay · North Caloocan"). The headline already says Saranay.
- **Footer** now reads exactly: "Demo preview v3.6.1 · Court and café photos are Saranay's own, from their Sports360 page and Instagram accounts. The hero image is a placeholder." It used to say "Photos are Saranay's own…", but the phone hero is Studio-generated (CHOAM 1db9830a).
- **Share image regenerated:** `img/og-hero-1200x630.jpg` (1200x630 JPEG, 112.9 KB, SHA-256 5c450763…5001d29e7).
  - Eyebrow: "North Caloocan".
  - Location line: "North Caloocan" (was "Bagumbong North, Caloocan").
  - Hours line: "Open till 2 AM" (was "Court open 6 AM to 2 AM"). This matches the site's open-now chip.
  - `og:image`, `og:image:secure_url` and `twitter:image` now end in `?v=3.6.1`.
- No other copy changed. The meta, og and twitter descriptions still say "Court open 6 AM to 2 AM" (left for Ling).

## v3.6 · 2026-10-31

**Change (brand headline, approved by Jon in the Saranay room at 11:20 PM, relayed by Sage):** "Saranay is the place. Saranay Pickleball is the thing of importance." The brand is **Saranay Pickleball**.
- **Hero headline** (was "PICKLEBALL / AND COFFEE / *in Saranay*"):
  - Line 1, big: **SARANAY**
  - Line 2, big: **PICKLEBALL**
  - Line 3, script (Instrument Serif italic, `--c-sky`): *Court & Café*
  - The supporting line is unchanged: "Come for the coffee. Stay for the game. One cozy court, D' Rafael's Cafe and open play for every level, right here in North Caloocan."
  - Both big lines use `.hero__big` (Archivo wght 900, wdth 62 on phones). The size is the v3.3 rule that fits PICKLEBALL, the longer line, to the content width: 88.6% of the screen at 390, 88.1% at 360. No overflow. SARANAY is the same size. `.hero__and` is no longer used in the markup.
- **Same name everywhere: "Saranay Pickleball Court & Café"** in the `<title>`, `og:site_name`, `og:title`, `twitter:title`, JSON-LD `name`, the header brand (Saranay / Pickleball Court & Café), the footer brand, the map figcaption and the map iframe title. The meta description, `og:description` and `twitter:description` now open "Saranay Pickleball: a pickleball court in North Caloocan with its own café." (was "Pickleball court in Caloocan with its own café, in Saranay."). "in Saranay" is no longer used as a brand. "The first pickleball court in Saranay" stays as a place fact. Addresses (Saranay Road, Saranay Homes) are unchanged.
  - Kept as is, on purpose: the copy-pin text and the Google Maps embed query still say "Saranay Pickleball Court and Cafe". That is how the place is listed on Maps and Facebook, so search and pasting keep working. The Facebook URL is unchanged.
- **Share image regenerated:** `img/og-hero-1200x630.jpg`, same file name. It's a 1200x630 JPEG (116 KB) with eyebrow "Saranay · North Caloocan" and the headline SARANAY / PICKLEBALL / *Court & Café*. Big lines are 98px, so PICKLEBALL clears the faces. `og:image`, `og:image:secure_url` and `twitter:image` now have `?v=3.6` so link previews refresh. The image alt is updated. The JSON-LD `image` is still the real-court `og-share-1200x630.jpg`.
- Footer: "Demo preview v3.6".

**Unchanged:** design, palette and tokens, golden-hour phone hero (Studio-generated, CHOAM 1db9830a, demo only), real court photo on desktop, both booking buttons on the first phone screen with the consent banner showing, noindex, tracking and consent, TBC badges.

## v3.5 · 2026-10-31

**Change (new phone hero, picked by Jon, via Ling)**
- **Phone hero (under 60rem) is now Option 1, "court at golden hour".** Source: `hero-gen/saranay-hero-opt1-court-golden-1080x1600.jpg`. It's cropped tighter on the group: a square cut (x 20–1000, y 100–1080 of the 1080x1600 source). In the ~390x388 hero box the five friends fill the width, their faces sit in the upper half clear of the open-now and next-play chips, and the teal building and the blue court read behind them. The headline sits over the darker lower part on the existing `--c-scrim-hero` token, so the v3.3 AA floor (on-dark 10.15:1, sky 6.09:1 even over pure white) still holds. `object-position: 50% 45%` keeps faces in frame on wider phones and tablets.
  - Files: `img/hero-golden-480.webp` (29.6 KB) and `img/hero-golden-800.webp` (56.0 KB), real WebP with `srcset`/`sizes="100vw"`, `fetchpriority="high"`, no EXIF. Committed via the same base64 + one-shot decode workflow as the v3.4.1 share image. They replace the 126 KB SVG-wrapped court crop on phones, so the first load gets lighter.
- **Desktop (60rem+) keeps Saranay's real court photo** (court-sky, Sports360 gallery). Why: the desktop hero photo is a half-width portrait panel (640x917 at 1280x800, 720x1017 at 1440). A 16:9 frame covering that panel shows only about 39% of its width, which cuts two or three of the five people. The 800px-wide headline also runs into the panel's left edge (to x≈857 at 1280), right where the faces would be. The 16:9 doesn't hold up beside the headline in this layout.
- **The real venue still shows:** the desktop hero, the full-width court band at the top of Open play (court-shade, every width), and the logo and Instagram photos further down.
- **Share image** is now `img/og-hero-1200x630.jpg` (1200x630, 113 KB): a crop of the new hero (16:9 source) with the headline in Archivo/Instrument Serif on `--c-ink`, with `--c-on-dark`, `--c-sky`, `--c-ball` and `--c-on-dark-muted`. `og:image`, `og:image:secure_url` and `twitter:image` point at it; its alt text is updated. The v3.4.1 court share image `img/og-share-1200x630.jpg` stays in the repo and is still used as the JSON-LD `image`, because structured data for the business should show the real venue, not a generated scene.
- The hero `<img>` alt is now "The blue Saranay court beside the teal café building.", which is true for both the phone image and the desktop photo (one `<picture>`, one alt).
- Footer: "Demo preview v3.5".

**Image status: STUDIO-GENERATED, DEMO ONLY.** The phone hero and the share image are a Studio-generated lifestyle image (CHOAM 1db9830a, "Saranay demo: mobile hero lifestyle image", owner studio). They aren't photos of real Saranay customers. Use them only in this noindex demo until the owners sign off. Before any public launch: owners' sign-off, or swap in a real photo.

**Why**: Jon picked Option 1 for the hero. The phone first screen gets people and warmth; desktop keeps the real court because the 16:9 doesn't fit the split layout.

## v3.4.1 · 2026-10-31

**Change**
- **Real share image.** `img/og-share-1200x630.jpg`: 1200x630 JPEG, 161 KB (161,329 bytes). It uses Saranay's court photo (court-sky, their Sports360 gallery) with the hero headline "PICKLEBALL / AND COFFEE / in Saranay" set in Archivo (wght 900) and Instrument Serif italic. Palette tokens: `--c-ink` field and scrim, `--c-on-dark` and `--c-sky` type, `--c-ball` dot, `--c-on-dark-muted` footer line. `og:image`, `og:image:secure_url`, `twitter:image` and the JSON-LD `image` now point at it with an absolute URL. Added `og:image:type`, `og:image:width` (1200), `og:image:height` (630), `og:image:alt` and `twitter:image:alt`. This replaces the v3.4 limitation (SVG og:image).
  - How the binary was published: the publishing connector is text-only, so the JPEG was committed as base64 (`img/og-share-1200x630.jpg.b64`) together with a one-shot GitHub Actions workflow. The workflow decoded it to the real file, then deleted both the .b64 and itself (commits b3292ba, 928a903). The SHA-256 of the committed JPEG matches the local file: c5d6720f…43aac0.
- **Consent: Accept grants `analytics_storage` only.** `ad_storage`, `ad_user_data` and `ad_personalization` stay `denied` always, both in the `<head>` replay of a stored "yes" and on the Accept button. The `consent_update` dataLayer push now carries the four states explicitly. Banner text is now "We'd like to count visits and booking clicks to improve this site. We only do this if you say yes." (was "… Only if you say yes."). The Privacy notice now says "no analytics cookies are set" (was "no analytics or advertising cookies are set").
- **Copy (Martha's copy-read, exact wording):** the About photo wall heading is now "On court with our open play crowd" (was "Open play nights"), and the line under it is unchanged. The logo caption "Our logo." is unchanged. The footer reads "Demo preview v3.4.1 · Photos are Saranay's own, from their Sports360 page and Instagram accounts."
- **Café menu: "Nachos"** added with a TBC price badge, like the other items. Evidence: the café's own nachos photo (cafe-nachos-03, @drafaelscafe).
- **Photo credits corrected.** v3.4 listed the café photos (01, 02, 03) as Saranay's court account with "MISSING" URLs. They are from the café's account, **@drafaelscafe**. Post URLs below come from Ling via Jon (31 Oct).

**Photo credits (Instagram)**

| # | file | used | handle | post |
|---|---|---|---|---|
| 01 | cafe-patio-night-guests | café (consent flag) | @drafaelscafe | https://www.instagram.com/drafaelscafe/p/DdMbk9uSF7P/ |
| 02 | cafe-logo-wall-patio | café | @drafaelscafe | https://www.instagram.com/drafaelscafe/p/DcXS5fCEgc5/ |
| 03 | cafe-nachos | café | @drafaelscafe | https://www.instagram.com/drafaelscafe/p/DcVoxuJS5W3/ |
| 04 | cafe-interior-event-group | not used | @drafaelscafe | https://www.instagram.com/drafaelscafe/p/DcU2nP6El7w/ |
| 05 | cafe-interior-table-paddle-wall | not used (not in the repo) | @drafaelscafe | https://www.instagram.com/drafaelscafe/p/DcQWZYeyOTT/ |
| 06 | court-night-group | photo wall | @saranaypickleballcourt | https://www.instagram.com/saranaypickleballcourt/p/Dd2nuxLEnnu/ |
| 07 | court-night-group-portrait | photo wall (consent flag) | @saranaypickleballcourt | https://www.instagram.com/saranaypickleballcourt/p/DcSjHdOkuGB/ |
| 08 | court-dusk-group | photo wall | @saranaypickleballcourt | https://www.instagram.com/saranaypickleballcourt/p/Dc2rVvHkui5/ |
| 09 | court-group-open-play | photo wall (consent flag) | @saranaypickleballcourt | https://www.instagram.com/saranaypickleballcourt/p/DdTXV86yf2f/ |
| 11 | court-paddles-on-bench | photo wall | @saranaypickleballcourt | https://www.instagram.com/saranaypickleballcourt/p/DdTXM7sEg5n/ |
| 12 | entrance-player-dRafaels-mural | photo wall (consent flag) | @saranaypickleballcourt | https://www.instagram.com/saranaypickleballcourt/p/DdTXM7sEg5n/ (same post as 11) |

10 (court-kids-group) is never used and isn't in the repo. It shows children, so no credit is needed. Consent flags are unchanged from v3.4: 01, 07, 09 and 12 still need the owners' OK before any public use. The share image uses court-sky (Saranay's Sports360 gallery), not an Instagram photo.

**Owners to confirm (added in v3.4.1)**
- Nachos: price, and that it's a regular menu item.
- Still open from v3.4: the GTM container ID, privacy controller name, privacy contact, the final notice wording, and photo consent for 01, 07, 09 and 12.

**Why**: Ling approved the UTM pattern as built and asked for a real share image, post-level photo credits and Martha's copy-read. Accept covering analytics only, the consent wording and the Nachos item are from Martha's copy-read.

## v3.4 · 2026-10-31

**Change (Ling's conversion tracking brief, built from the Saranay conversion tracking plan, 31 Oct 2026)**
- **Every exit is labelled.** All 37 Reclub, Sports360 and Messenger exits from v3.3 now carry `data-cta` (a unique snake_case link location, e.g. `hero_join_open_play`) and `data-dest`. Was 13 of 37. Call, Instagram, IG DM and Maps links are labelled the same way.
- **dataLayer events.** `click_reclub`, `click_sports360` and `click_messenger` fire on every exit with `cta_location`, `link_url` and `play_context` (the chooser path or `none`). Sports360 clicks also carry `split_estimate` once the Split calculator is used. Other events: `chooser_select` (`path`, `selection_method`: `deep_link` or `chip`), `split_calc_use` (once), `cafe_menu_view` (café section at least 50% on screen for 2s, once), `scroll_depth` (25/50/75/90, once each), `faq_open`, `sticky_bar_click`, `click_call`, `click_ig_dm`, `click_directions` (Maps links and Copy location pin), `click_instagram` (new: the plan has no name for Instagram profile links, Ling named it), `consent_update`.
- **GTM snippet with the placeholder `GTM-XXXXXXX`.** It's guarded: the loader returns early (it pushes `gtm_skipped` instead) unless the ID is a real container ID, so no Google script is requested. The `<noscript>` iframe stays commented out until launch.
- **UTMs on every Reclub and Sports360 link**: `utm_source=saranay_site&utm_medium=referral&utm_campaign=site_booking&utm_content=<cta_location>`. The plan's convention (lowercase, underscores) with our own source value, because the plan's source list covers inbound traffic only. Messenger links get `?ref=<cta_location>`. The JS dock adds the same tags. All Reclub and Sports360 links now open in a new tab (`target="_blank" rel="noopener"`, with "(opens in a new tab)" in the accessible name). Messenger stays in the same tab.
- **`?play=` deep links still work with UTMs.** For example, `?play=rent&utm_source=facebook&utm_medium=paid_social&utm_campaign=…` preselects the path, keeps every UTM in the address bar and records `chooser_select` with `selection_method: deep_link`.
- **Open Graph, Twitter card and JSON-LD.** `LocalBusiness` + `SportsActivityLocation`, verified facts only: name, phone, street (Saranay Road, Saranay Homes, Bagumbong North, Caloocan), hours 06:00 to 02:00 daily, and the official profiles. No plus code, no geo, no café hours (all still TBC).
- **Cookie banner (Consent Mode v2, RA 10173).** Everything is denied by default. Decline and Accept have equal weight; the choice is kept on the device; "Change cookie choice" in the new Privacy and cookies notice reopens the banner. On phones the banner pins to the top (over the ribbon and header), so it never covers the hero booking buttons. On desktop it's a bottom bar. Controller name, privacy contact and the final notice wording are TBC placeholders for the owners.
- **Next open play chip** on the hero photo under the open-now chip, from the Manila clock: Fri to Sun, ~6 PM, ₱150/player ("Today", "Tomorrow" or e.g. "Fri Nov 6"). It never says anything about free spots.
- **Saranay's Instagram photos** (Ling, 31 Oct): 3 café photos replace the 2 café placeholders. There's a new "Open play nights" wall under About. Both Instagram handles (@saranaypickleballcourt, @drafaelscafe) are in Find us and the footer. "The café also takes private events" comes from the café's Instagram bio. Café hours stay TBC because the sources conflict.

**Copy touched outside new elements**: the About logo caption ("Photos of open play nights are still to come") is now "Our logo.", and the footer line "Café photos to come" is now "Photos are Saranay's own, from their Sports360 page and Instagram". Both were made untrue by the new photos.

**Why**: Ling's tracking brief. Tracking has to be ready before the owners' Meta ads go live. The photos and handles were added on Ling's steer.

**Photos (noindex demo only; any public use waits for the owners' permission)**
All are re-encoded to WebP at q52 in 480w and 800w with `srcset`, and all EXIF, XMP, GPS and IPTC metadata is stripped. Like the earlier photos, each one is wrapped in an SVG because the publishing connector is text-only. All are `loading="lazy"` and below the fold, so the first screen loads nothing new.

| file | used in | owner consent | source account | post URL |
|---|---|---|---|---|
| cafe-logo-wall-patio-02 | café | not needed (no people) | Saranay's Instagram per Ling (@saranaypickleballcourt; possibly @drafaelscafe) | MISSING |
| cafe-nachos-03 | café | not needed | same | MISSING |
| court-night-group-06 | Open play nights | cleared by Ling | @saranaypickleballcourt per Ling | MISSING |
| court-dusk-group-08 | Open play nights | cleared by Ling | same | MISSING |
| court-paddles-on-bench-11 | Open play nights | cleared by Ling | same | MISSING |
| **cafe-patio-night-guests-01** | café (large) | **NEEDS OWNER CONSENT (identifiable guests)** | Saranay's Instagram per Ling | MISSING |
| **court-group-open-play-09** | Open play nights | **NEEDS OWNER CONSENT** | same | MISSING |
| **court-night-group-portrait-07** | Open play nights | **NEEDS OWNER CONSENT** | same | MISSING |
| **entrance-player-dRafaels-mural-12** | Open play nights | **NEEDS OWNER CONSENT** | same | MISSING |

Not used: cafe-interior-event-group-04 (OK'd with consent, but it appears to include a small child, so it's left out to be safe) and cafe-interior-table-paddle-wall-05 (OK'd with consent; not needed). **court-kids-group-10 is never used and isn't in the repo.**
No post URLs were in the file names or metadata. The IPTC block holds only a Facebook/Instagram upload ID (`FBMD…`), not a link. Nothing was invented.

**Known limitation**: `og:image` points to the court photo at an absolute URL (`img/court-sky-780.svg`), but Facebook and Messenger don't render SVG previews. Before launch, upload a 1200x630 JPG of the court and change the two `og:image`/`twitter:image` lines.

## v3.3 · 2026-10-31

**Change (phone hero only, 360 to 959px; desktop at 60rem+ unchanged)**
- "PICKLEBALL" now fills the content width: fluid `clamp(3.4rem, 21.9vw - 0.38rem, 11.5rem)`, Archivo wght 900 at wdth 62 (was 850 at 68), leading 0.82 (was 0.84). Measured 346px of 347px content at 390 (88.6% of the viewport).
- "AND COFFEE" is a size step up (12.6vw, was 9.4vw: 49px vs 37px at 390), same 900/62 cut, on its own line; "in Saranay" up to 11.6vw.
- Taller photo with the type set over it: photo 46svh (was 40svh), type overlaps it by 9.5rem (was 3.25rem), so the dark gap under the court is gone. New token `--c-scrim-hero` (ink at 82%) sits under every glyph on the photo: on-dark text 10.15:1 and sky 6.09:1 even over pure white.
- Both booking buttons stay fully on the first screen: bottoms 761/844 at 390x844 and 701/740 at 360x740.

**Why**: Jon (via Ling): v3 is "MUCH better", the desktop looks handsome, but the phone first screen had too much empty space; type larger, taller and at least as bold. Palette unchanged (Saranay chose it). No copy changes.

## v3.2.1 · 2026-10-31

**Change**: About section: "Bring the barkada, the family or the kids." is now "Bring your friends and family, from the kids to the grandparents." (Martha's exact wording). "North Caloocan" unchanged.

**Why**: Martha's copy request.

**Photos**: no new photos.

## v3.2 · 2026-10-31

**Change (Martha's copy read, her exact wording)**
- Hero subline: "Come for the coffee. Stay for the game. One cozy court, D' Rafael's Cafe and open play for every level, right here in North Caloocan."
- "enoki fries" is now "enoki crispy fries" in the hero café tile (the menu list already said it).
- Beginners paragraph now ends at "nobody expects you to be good on day one." ("Promise, walang judgment." removed.)
- Rental "Good for": "Games with the barkada" is now "Games with friends".
- Hero strip: "Court open 6 AM to 2 AM daily". All times now use "6 AM to 2 AM" (hours table, Find us, footer). No lowercase am/pm left on the page.
- Hero live chip: the Manila hour is normalised to 0-23 so it reads Asia/Manila time on any device. Tested from New York, London, UTC and Manila device clocks at 5:59, 6:00, 9:59, 10:00, 3:59 PM, 4:00 PM, 12:30 AM, 1:59 and 2:00 AM Manila: the chip and the day bar agree at every edge.

**Why**: Martha's copy read. Café prices, menu, seating and hours stay TBC.

**Verified (Oct 31 2026)**
- Location: Reclub's Saranay sessions list the venue as "Saranay Road, Barangay 171, Caloocan, Metro Manila" (reclub.co/m/VZ24AJ). Sources say "Caloocan"; Barangay 171 (Bagumbong) is in North Caloocan.
- Rate bands, from the Sports360 page (app.sports360.ph/sportshub/saranay-pickleball-court): 6:00 AM to 10:00 AM ₱300/hour, 10:00 AM to 4:00 PM ₱200/hour, 4:00 PM to 2:00 AM ₱300/hour; open 6am to 2am every day.

**Photos**: no new photos. Court photos are Saranay's own, from their Sports360 page.

## v3.1 · 2026-10-31

**Change**
- Night café band: the café section is now ink, with "D' Rafael's Cafe" set huge in Instrument Serif italic and the menu laid out as type rows (no card). Photo slots are staggered on desktop and compact (4:3) on mobile, still honestly marked as coming.
- Open-now chip on the hero photo: reads the Manila clock against the posted hours (6 AM to 2 AM) and the Sports360 rate for that hour, e.g. "Open now · court ₱300/hour · till 2 AM". It never claims a slot is free. The dot pulses only when motion is allowed.
- Fixed the door checkmarks and menu icons, which rendered as filled blobs in v3.0 (stroke rules restored; amber on the open play door).

**Why**: v3.0 still had a long run of light sections after the rates; the café was the flattest block. A dark serif band breaks the run and gives the café its own voice. The clock chip adds a live, true signal above the fold (pattern from Monte's "Open today til…" hero on Mobbin).

**Photos**: no new photos. Court photos are Saranay's own, from their Sports360 page.

## v3.0 · New identity: real court photos, big editorial type, a palette taken from the venue
- **Change:** Full rebuild of the stylesheet and the hero.
  - First screen: Saranay's own court photo, edge to edge, then a giant condensed headline ("PICKLEBALL and coffee *in Saranay*"), one line of story, and both booking buttons (Join open play on Reclub, Book a court on Sports360) fully visible at 390x844 and 360x740. The chooser is now a row of chips under the buttons. A dotted amber ball arc draws in over the photo.
  - Desktop: giant type on the left, the full court photo filling the right half.
  - Palette from the venue, not a template: night ink #0B0F1A, warm paper #F4F2EC, one accent (court blue #1F4FD1, taken from the court surface), kitchen sky blue #6CC8F8 for accents on dark only, and the logo ball amber #FFB502 for the open play button, the Now marker and TBC. Forest green and lime are gone.
  - Type: Archivo (variable, condensed 850) for display, Instrument Serif italic for accents, Archivo for body. Google Fonts, no cost.
  - Photo-led sections: a full-bleed shaded-court band opens Open play; the two booking cards ("How to book") sit on court photos; Coming up is an editorial hairline list, not cards; Split the court is a night scoreboard with a big amber figure; the at-a-glance facts run as a slow blue ticker under the hero.
  - Motion: CSS scroll-driven reveals and a gentle photo drift, only when the browser supports them and the visitor has not asked for reduced motion. With reduced motion everything is static (the ticker becomes a wrapped list).
  - The mobile booking bar tucks away (and is inert, so focus skips it) while the hero buttons are on screen, then slides in. The `--cta-bar-h` clearance and scroll padding from v2.5.1 are kept; no button sits under the bar in any section at 390 or 360.
- **Reason:** Jon's feedback (not modern, generic colors, not enough visual stimulus above the fold). Real photos of the actual court do more than illustrations, and a palette sampled from the court and logo can't be mistaken for a template.
- **Patterns borrowed (Mobbin):** Performance Lab and Rains (giant tight headline over a full-bleed photo), Escape Cafe (headline split around a photo), adidas (two CTAs on a photo, condensed caps labels), VanMoof (short confident line, minimal CTA), Fresha and ClassPass (chip rows), Airbnb Experiences and Sweatpals (photo-topped cards, event list), Monte (utility info in the hero).
- **Open play facts (Martha, checked on Reclub Oct 31 2026: club page reclub.co/clubs/@saranay-pickleball-club and its session pages reclub.co/m/VZ24AJ, /m/KVSOKA, /m/ZIMNYS):**
  - ₱150 per player, up to 12 players, 4 hours, Friday to Sunday from 6 PM (shown as "usually 6 PM"). These replace the open play price, cap and schedule TBCs.
  - How to join, as Reclub states it: request to join; wait until you're on the waitlist and don't pay before; pay by GCash, first to pay gets the slot; post proof of payment in the session's Game Chat; come a little early.
  - Cancelling: at least 24 hours before; no cash refund; slot can be transferred or kept as credit.
  - Mobile bar now reads "Open play · All levels · Join on Reclub".
  - Still TBC: coffee open play days and times (sources conflict). Street kept as Saranay Road until the owners confirm (one Reclub session lists Malapitan Road). One-off sessions (e.g. a single 6-hour night) are not listed, so dates don't go stale. Member count: 586, as Reclub shows on Oct 31 2026.
- **Photo credits:** Photos: Saranay Pickleball Court, from their Sports360 Sports Hub gallery (app.sports360.ph/sportshub/saranay-pickleball-court): the sunny court with the teal building, the shaded court, and the Saranay logo. Resized and converted to WebP; served inside SVG wrappers in /img/ because the publishing tool only writes text files. No café or people photos yet, so the café keeps honest empty photo slots.

# Saranay demo site · v2 changelog

Brief (Jon, Oct 31 2026, via Ling): one bold UX or visual change per version, shipped live, up to 10 versions.
Goal: more taps on **Book a court on Sports360** and **Join open play on Reclub**. Secondary: a court-plus-café look no Manila competitor has.
Every version is frozen at `/v2.x/` on the live site (noindex). The root always shows the latest.
Facts used are only those already on the site (Sports360 rates and caps, hours, paddle and ball prices, 586 Reclub members). TBC items stay TBC.

## v2.0 · "How are you playing?" chooser in the hero
- **Change:** Four intent cards under the headline (Open play / Rent the court / Just the café / First time). Picking one swaps the hero buttons for that path's main button plus three verified facts, and moves that path's sections to just under the hero in real DOM order (focus order matches). Pick again to undo. `?play=open|rent|cafe|first` preselects a path, so ads can deep-link (e.g. a rental ad to `?play=rent`). Without JS the cards are plain links to each section, and the original two buttons stay.
- **Persona:** all four. Paolo and Bea get Reclub first; the barkada gets the ₱200 off-peak rate and Sports360 in one tap; Tita Rose gets a café path that doesn't push her to play.
- **Expected effect on bookings:** shorter path from landing to the right booking button (one tap, no scrolling past sections for other audiences); ad deep links land on a page already sorted for the ad's audience.
- **Pattern borrowed:** Mobbin intent pickers: Phantom "What brings you to Phantom?" icon option cards, Lemonade Insurance "main reason" choice, Cal AI single-select list.

## v2.1 · Day strip: court price by time of day
- **Change:** A visual 6 AM to 2 AM price bar at the top of Rates and hours, sized by hours: ₱300 (6–10 AM), ₱200 (10 AM–4 PM, raised and marked "Lowest"), ₱300 (4 PM–2 AM). A "Now" pointer above the bar shows the current Manila time and its rate (clock only, never availability). One button under it: "Book a ₱200 daytime hour on Sports360". Bands are the verified Sports360 rates already on the site. Without JS the bar shows, minus the pointer.
- **Persona:** the barkada of court renters (price-sensitive organiser), and Bea or families who can play daytime.
- **Expected effect on bookings:** makes the cheaper band visible at a glance instead of in a text list, so more rentals land in the 10 AM–4 PM band that is otherwise hardest to fill, and price-checkers get a direct Sports360 button.
- **Pattern borrowed:** Mobbin: WHOOP Sleep Planner span bar (time range as a proportional bar) and Structured timeline "now" line.

## v2.2 · Split the court: a per-person cost tool for groups
- **Change:** The decorative court drawing next to "Rent the court for your group" is replaced by a working "Split the court" card. Steppers for players, hours and paddles, plus a 10 AM–4 PM (₱200/hour) or other hours (₱300/hour) choice, give a big "₱X each" figure. The breakdown line covers court, extra players at ₱100 each above the posted cap (1 hour up to 4, 2 hours up to 8, 3+ hours up to 12) and paddles at ₱100. It is labelled "Estimate only. Sports360 shows the final price." and ends in a full-width "Book a court on Sports360" button. Uses only the posted rates. Without JS the drawing stays.
- **Persona:** the barkada of renters (the organiser who has to tell the group chat what each person owes), Paolo when he books private games.
- **Expected effect on bookings:** turns "how much is it?" into a number that can be pasted into the group chat (₱100 each for 4 players for 2 daytime hours), removing the main stall before booking. The Sports360 button sits right under the answer.
- **Pattern borrowed:** Mobbin: Monzo "Split bill" (per-person amounts), BitePal servings stepper (− value + control).

## v2.3 · Context dock: the mobile booking bar follows what you are reading
- **Change:** The fixed mobile bar used to show the same two buttons everywhere. It is now a dock with a summary on the left and one main button on the right, and it changes with the section in view. Open play, first-timer and FAQ sections show "Open play · All levels · 586 members on Reclub" with "Join open play" (Reclub). Rates and rental sections show "From ₱200/hour · Whole court" with "Book a court" (Sports360). Once someone uses Split the court, the dock shows their own figure, e.g. "₱80 each · 5 players · 2 hours · estimate". The café and Find us sections show "D' Rafael's Cafe · At the court · hours TBC" with "Message us". The hero chooser path (and `?play=`) sets the default. Without JS the original two-button bar stays. Desktop is unchanged; the header button already covers it.
- **Persona:** all four. Mainly the barkada (the estimate follows them to the button) and Paolo (Reclub always one tap away in the open play sections).
- **Expected effect on bookings:** the button under the thumb always matches the intent of the section being read, so Sports360 is one tap away while comparing prices, where before only Reclub and Messenger were in the bar.
- **Pattern borrowed:** Mobbin: Insight Timer and Tripadvisor listing footers ("From $950 · Reserve now"), Trainline price + Continue bar, Swiggy pay bar.

## v2.4 · Courtside menu board
- **Change:** The café's plain tick list is replaced by a chalkboard-style menu card in deep coffee. It has a court-green net-line strip across the top (the court-plus-café motif), line icons in ball lime, and the three items we have verified: coffee and other drinks, Tusok-Tusok Treat (fishball, kwek-kwek, kikiam and more) and enoki crispy fries. Prices and the full menu stay as visible TBC tags. No new claims. Also in this release: the mobile dock's open play line is shortened to "All levels · on Reclub" so it no longer truncates at 390px.
- **Persona:** Tita Rose (café-first, may not play), and players' families.
- **Expected effect on bookings:** gives the café a real presence on the page instead of a bullet list, so the "pickleball and coffee" promise in the hero is visible further down. That supports visits and Messenger questions, and makes the page feel like a place rather than a booking form. Prices drop straight into the board once confirmed.
- **Pattern borrowed:** Mobbin: talabat "Cup & Go Coffee" menu rows (item + short description + price) and the Swiggy dark menu sheet, restyled as a physical café chalkboard. The court net-line strip is our own motif.

## v2.5 · How to book becomes two doors
- **Change:** The "How to book" section was a numbered list with five buttons of near-equal weight (Reclub, Sports360, Messenger, Instagram, call) under a repeated heading. It is now two side-by-side choice cards. **Open play** (dark court green): "Play with others", All levels · 586 members on Reclub, with what to expect (come solo, request a spot, pay by GCash on Reclub, waitlist when full) and one button, "Join open play on Reclub". **Court rental** (white): "The court to yourselves", ₱200 to ₱300 per hour, player caps, pay in full on Sports360, non-refundable and move it 24 hours ahead, paddle ₱100, and one button, "Book a court on Sports360". Messenger, Instagram and the phone number move to a smaller "Groups, café orders or help booking" row below, with the TBC note kept. Every fact is already on the site (rates, FAQ, open play section).
- **Persona:** Bea (first-timer: sees open play is solo-friendly before tapping), the barkada (sees the payment and reschedule rules before going to Sports360), Paolo.
- **Expected effect on bookings:** a clear either/or at the decision point instead of six competing buttons. The two booking buttons get the visual weight, and the policies people usually ask about in Messenger are answered beside the button.
- **Pattern borrowed:** Mobbin: Neo Financial "Choose your membership" plan cards (title, price line, check list, one button per card), Brilliant Free vs Premium comparison.

## v2.5.1 · Fix: no button sits under the mobile booking bar, plus final copy (Ling and Martha follow-ups)
- **Bug fixed:** at 390px, a reader scrolling down (or a keyboard user tabbing) could stop with a button such as "Book a court on Sports360" in Split the court hidden under the pinned bottom bar. Now:
  - `--cta-bar-h` tracks the bar's real height (ResizeObserver; the 4.75rem token stays as the no-JS fallback).
  - Under 60rem, body bottom padding is the bar height plus `--s-3`, `html` has `scroll-padding-bottom: var(--cta-bar-h)`, and every focusable (links, buttons, inputs, summaries, the map embed) has `scroll-margin-bottom: var(--s-3)`.
  - When keyboard focus enters the map embed, the map scrolls clear of the bar.
  - The bar summary now always reserves two lines, so the bar keeps one height in every section and the clearance doesn't shift mid-scroll. "Whole court · Book on Sports360" now wraps instead of being cut off.
  - Checked with Playwright at 390px and 360px: 0 of 36 section buttons and 0 keyboard tab stops overlap the bar. Before the fix: 34 of 36 and 12 tab stops.
- **Copy (Martha's final wording):**
  - Day strip: "Per hour, whole court · Open daily, 6 AM to 2 AM"
  - Split tool: "Rough cost per person, based on our posted rates."
  - Bar: "Open play · Join on Reclub", "From ₱200/hour · Whole court · Book on Sports360" and "D' Rafael's Cafe · At the court · Hours TBC"
  - Menu board: "D' Rafael's Cafe · Courtside"
  - Booking cards: "Have the court to yourselves" and "Groups or help booking"
- **Sources checked:**
  - "D' Rafael's Cafe" is confirmed on Saranay's own Reclub page (https://reclub.co/clubs/@saranay-pickleball-club), in the coffee open play event: "This amount is 100% consumable at D’ Rafael’s Cafe".
  - "All levels" is confirmed by the same page's session titles, e.g. "SATURDAY OPEN PLAY | ALL LEVELS | 4HRS".
  - Both are kept.
- **Split tool math:** checked against the Sports360 caps (4 players for 1 hour, 8 for 2 hours, 12 for 3 hours or more, ₱100 per extra player). All 12 test cases match, so there was no change.
