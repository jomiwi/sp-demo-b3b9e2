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
