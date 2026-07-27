# Bootstrap mock-up

A mock-up of [joshlevi.github.io](../index.html) rebuilt with
[Bootstrap 5](https://getbootstrap.com). Same portfolio content, reconstructed
entirely from Bootstrap's grid, components, and utilities so the two designs can
be compared side by side.

Open [`index.html`](index.html) in a browser, or view it live at
`/bootstrap-mockup/` once the site is deployed.

## Bootstrap tools used

| Area | Bootstrap feature |
| --- | --- |
| Header | Responsive **navbar** with collapse toggler + sticky-top |
| Hero | **Grid** (`row`/`col`), **display headings**, **card**, **list-group**, **badges** |
| Section dividers | **Progress bars** (standing in for the site's signature "meter") |
| What I do | **Card grid** with hover lift |
| Demo | Grid + **spinner**, custom chat bubbles, **toast** |
| Proof | Responsive **columns** with utility spacing |
| Projects | **Carousel** of project cards with prev/next controls |
| Booking | **Accordion**, **floating-label form** with validation, **modal** |
| Footer | Grid, **button group**, **Bootstrap Icons** |
| Extras | **Back-to-top** button, `data-bs-theme="dark"` dark mode |

## Files

- `index.html` — the page (loads Bootstrap + Bootstrap Icons from jsDelivr CDN)
- `theme.css` — a thin skin remapping Bootstrap's dark-theme tokens to the
  ILS Network amber/teal palette
- `mockup.js` — the missed-call simulation, form validation + toast, and
  back-to-top visibility

Bootstrap's own JS bundle handles the navbar, accordion, carousel, modal, and
toast dismissal; `mockup.js` only adds the page-specific behavior.
