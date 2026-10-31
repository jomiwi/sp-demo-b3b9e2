# Saranay demo site · v3 changelog (visual identity)

Brief (Jon, Oct 31 2026, via Ling): "it's not a modern look. And the color scheme looks like AI Slop." v3 rebuilds the look; every v2 feature stays (hero chooser, price-by-time day bar, Split the court, the section-aware mobile bar, the two booking cards).
Every version is frozen at `/v3.x/` (noindex). The root always shows the latest.

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
