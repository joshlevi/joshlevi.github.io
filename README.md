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

Booking
------------

The booking section embeds the ILS Network Google Calendar (`joshua@theilsnetwork.com`,
America/New_York).

Two things to know:

1. **The embed only renders for visitors if that calendar is shared publicly**
   (Calendar settings → *Access permissions* → *Make available to public*).
2. Making a full calendar public exposes **event titles** to anyone. The better option
   is a Google Calendar **appointment schedule**, which exposes only open slots:
   Create → *Appointment schedule* → Share → Embed, then swap that URL into the
   `<iframe>` in `index.html` (there is a comment marking the spot).

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
