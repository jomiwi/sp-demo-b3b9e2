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
