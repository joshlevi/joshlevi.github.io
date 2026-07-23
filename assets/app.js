/*
 * Live GitHub project feed.
 *
 * Carried over from the original jQuery/JSONP version of this site — same
 * recency-weighted ranking, rebuilt on fetch() because the GitHub API dropped
 * JSONP callback support.
 *
 * The feed is deliberately lean: current work only. Anything stale, forked, or
 * archived stays off the page. Tune the three constants below.
 */
(function () {
    'use strict';

    var USER = 'joshlevi';

    var FRESH_DAYS = 730;   // only show repos pushed within this window (24 months)
    var MAX_REPOS = 6;      // hard cap, so the section never sprawls
    var SHOW_FORKS = false; // forks are other people's work — off by default

    var API = 'https://api.github.com/users/' + USER + '/repos?per_page=100&sort=pushed';
    var PROFILE = 'https://github.com/' + USER + '?tab=repositories';

    var grid = document.getElementById('repos');
    if (!grid) { return; }

    // Relative times, e.g. "3 days ago"
    function prettyDate(rawdate) {
        var date = new Date(rawdate);
        var seconds = (new Date() - date) / 1000;
        var formats = [
            [60, 'seconds', 1],
            [120, '1 minute ago'],
            [3600, 'minutes', 60],
            [7200, '1 hour ago'],
            [86400, 'hours', 3600],
            [172800, 'Yesterday'],
            [604800, 'days', 86400],
            [1209600, '1 week ago'],
            [2678400, 'weeks', 604800],
            [5356800, '1 month ago'],
            [31536000, 'months', 2678400],
            [63072000, '1 year ago'],
            [Infinity, 'years', 31536000]
        ];

        for (var i = 0; i < formats.length; i++) {
            var f = formats[i];
            if (seconds < f[0]) {
                return f[2] ? Math.floor(seconds / f[2]) + ' ' + f[1] + ' ago' : f[1];
            }
        }
        return 'A while ago';
    }

    function isCurrent(repo) {
        if (repo.archived) { return false; }
        if (repo.fork && !SHOW_FORKS) { return false; }
        var age = (Date.now() - Date.parse(repo.pushed_at)) / 86400000;
        return age <= FRESH_DAYS;
    }

    // Recency-weighted ranking: recent pushes win, watchers break ties.
    function hotness(repo) {
        var weekHalfLife = 1.146e-9;
        var weightForPush = 1;
        var weightForWatchers = 1.314e7;

        var pushDelta = Date.now() - Date.parse(repo.pushed_at);
        var createdDelta = Date.now() - Date.parse(repo.created_at);

        var score = weightForPush * Math.pow(Math.E, -1 * weekHalfLife * pushDelta);
        score += weightForWatchers * repo.watchers_count / createdDelta;
        return score;
    }

    function el(tag, className, text) {
        var node = document.createElement(tag);
        if (className) { node.className = className; }
        if (text != null) { node.textContent = text; }
        return node;
    }

    function note(message, linkText) {
        var p = el('p', 'repo-note', message + ' ');
        var a = el('a', null, linkText || 'Browse everything on GitHub');
        a.href = PROFILE;
        a.rel = 'noopener';
        a.target = '_blank';
        p.appendChild(a);
        p.appendChild(document.createTextNode('.'));
        return p;
    }

    function renderRepo(repo) {
        var card = el('a', 'repo');
        card.href = repo.homepage || repo.html_url;
        if (card.href.indexOf('github.com/' + USER) === -1) {
            card.rel = 'noopener';
        }

        card.appendChild(el('h3', 'repo__name', repo.name));
        card.appendChild(el('p', 'repo__desc', repo.description || 'No description yet.'));

        var meta = el('div', 'repo__meta');
        if (repo.language) {
            meta.appendChild(el('span', 'repo__lang', repo.language));
        }
        if (repo.stargazers_count) {
            meta.appendChild(el('span', null, '★ ' + repo.stargazers_count));
        }
        meta.appendChild(el('span', null, prettyDate(repo.pushed_at)));
        if (repo.fork) {
            meta.appendChild(el('span', 'repo__fork', 'fork'));
        }
        card.appendChild(meta);

        grid.appendChild(card);
    }

    fetch(API, { headers: { Accept: 'application/vnd.github+json' } })
        .then(function (response) {
            if (!response.ok) { throw new Error('GitHub API responded ' + response.status); }
            return response.json();
        })
        .then(function (repos) {
            grid.innerHTML = '';

            var current = repos
                .filter(isCurrent)
                .sort(function (a, b) { return hotness(b) - hotness(a); })
                .slice(0, MAX_REPOS);

            if (!current.length) {
                grid.appendChild(note('Nothing current enough to list here yet — new work lands soon.', 'The full archive is on GitHub'));
                return;
            }

            current.forEach(renderRepo);
        })
        .catch(function (error) {
            grid.innerHTML = '';
            grid.appendChild(note('The live feed is unavailable right now (' + error.message + ').'));
        });
}());
