[![Gitpod Ready-to-Code](https://img.shields.io/badge/Gitpod-Ready--to--Code-blue?logo=gitpod)](https://gitpod.io/#https://github.com/joshlevi/joshlevi.github.io)

joshlevi.github.io
======

Source for https://joshlevi.github.io/ — the personal site of Joshua Levi Sizemore
(web development, AI consulting, live events, and open source).

Structure
------------

| File | Purpose |
| --- | --- |
| `index.html` | The whole page: hero, services, proof strip, live project feed, booking, about, contact. |
| `assets/style.css` | Design system — dark surface, amber/teal accents, Space Grotesk / Source Serif 4 / JetBrains Mono. Shares its visual language with [The ILS Network](https://theilsnetwork.com/). |
| `assets/app.js` | Pulls public repos from the GitHub API and renders the Projects section. |
| `assets/demo.js` | Drives the missed-call demo in `#demo`. |

No build step, no dependencies — plain `fetch()` and CSS.

Project feed
------------

The Projects section shows **current work only**. Three constants at the top of
`assets/app.js` control it:

| Constant | Default | Effect |
| --- | --- | --- |
| `FRESH_DAYS` | `730` | Hide anything not pushed within 24 months. |
| `MAX_REPOS` | `6` | Hard cap, so the section never sprawls. |
| `SHOW_FORKS` | `false` | Forks are someone else's work — off. |

Surviving repos are ranked by a recency-weighted "hotness" score (recent pushes win,
watchers break ties). If nothing qualifies — or the API is rate-limited — the section
degrades to a single line linking to the GitHub profile rather than showing stale work.

Missed-call demo
------------

`#demo` plays the missed-call recovery sequence from the customer's side: the call
goes unanswered, the auto-text fires, the appointment lands. It is **a simulation** —
entirely client side, no telephony behind it, nothing sent anywhere. The page says so.

That's deliberate. A real number means Twilio plus A2P 10DLC brand and campaign
registration before application-initiated SMS is allowed in the US, ongoing cost, and a
public number that spam will find. Worth it for a client. Not worth it to power a
homepage demo that has to work on the first try, every time.

The script lives in one array at the top of `assets/demo.js` — each entry is a delay and
a step, so retiming or rewording it means editing that array and nothing else.

Booking
------------

Booking is two stages, and the page says so:

1. **A free 15-minute Google Meet call** — the qualifier. Self-serve, booked from the page.
2. **An on-site visit with a working demo** — scheduled by hand at the end of that call,
   so travel time can be blocked around it. Deliberately *not* self-serve.

The embed is the **Free Consultation** appointment schedule
(short link `https://calendar.app.google/Kmq8tJ1SVgHAmZTy9`, stored in `index.html` as
its canonical `…/appointments/schedules/…?gv=true` form, which is what embed mode needs).
Only open slots are exposed, so no calendar has to be shared publicly.

If the schedule is ever recreated — moving it to another account, for instance — the URL
changes and the `<iframe>` src has to be updated with it. There is a comment marking the
spot; nothing else changes.

When on-site visits get frequent enough to automate, make them a *second* appointment
schedule — longer duration, generous buffers, capped at one or two a day — rather than
widening the 15-minute one.

Local preview
------------

```
python3 -m http.server 8000
```

Then open http://localhost:8000/.

LICENSE
------------

Based off https://twitter.github.com/

Licensed under the Apache License, Version 2.0: http://www.apache.org/licenses/LICENSE-2.0
