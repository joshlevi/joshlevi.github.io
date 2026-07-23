/*
 * Missed-call recovery demo.
 *
 * Plays the sequence a customer actually experiences: the call goes unanswered,
 * the auto-text fires, and the appointment lands — all client side. Nothing is
 * sent anywhere; there is no phone number behind this.
 */
(function () {
    'use strict';

    var play = document.getElementById('demo-play');
    var reset = document.getElementById('demo-reset');
    var call = document.getElementById('demo-call');
    var thread = document.getElementById('demo-thread');
    var stat = document.getElementById('demo-stat');

    if (!play || !call || !thread) { return; }

    var reduced = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    // [delay before this step, what it does]
    var SCRIPT = [
        [2600, function () {
            call.classList.add('is-missed');
            call.querySelector('.call__label').textContent = 'Missed call';
        }],
        [900, function () {
            call.classList.remove('is-visible');
            thread.classList.add('is-visible');
            typing();
        }],
        [1100, function () {
            untype();
            bubble('in', "Hey — this is Calderon Barbershop. Sorry we missed you, we're with a client. What do you need? Text back here.");
        }],
        [1500, function () {
            bubble('out', 'Need a fade tomorrow afternoon if you have anything');
        }],
        [1200, function () {
            bubble('in', "We've got 2:15 or 4:00. Which works?");
        }],
        [1100, function () {
            bubble('out', '2:15');
        }],
        [1000, function () {
            bubble('booked', '✓ BOOKED — TOMORROW 2:15 PM');
            done();
        }]
    ];

    var timers = [];

    function clearTimers() {
        timers.forEach(clearTimeout);
        timers = [];
    }

    function bubble(kind, text) {
        var node = document.createElement('div');
        node.className = 'bubble bubble--' + kind;
        node.textContent = text;
        thread.appendChild(node);

        // Keep the newest message in view without scrolling the page.
        thread.scrollTop = thread.scrollHeight;
    }

    function typing() {
        var node = document.createElement('div');
        node.className = 'bubble bubble--in bubble--typing';
        node.id = 'demo-typing';
        node.appendChild(document.createElement('span'));
        node.appendChild(document.createElement('span'));
        node.appendChild(document.createElement('span'));
        thread.appendChild(node);
    }

    function untype() {
        var node = document.getElementById('demo-typing');
        if (node) { node.remove(); }
    }

    function done() {
        stat.textContent = 'Lead recovered in 9 seconds — no one picked up the phone';
        reset.hidden = false;
        play.hidden = true;
    }

    function start() {
        clearTimers();
        thread.innerHTML = '';
        thread.classList.remove('is-visible');
        stat.textContent = '';
        reset.hidden = true;

        call.classList.remove('is-missed');
        call.classList.add('is-visible');
        call.querySelector('.call__label').textContent = 'Calling…';

        if (reduced) {
            // No animation: land on the finished conversation.
            call.classList.remove('is-visible');
            thread.classList.add('is-visible');
            SCRIPT.forEach(function (step) { step[1](); });
            untype();
            return;
        }

        var elapsed = 0;
        SCRIPT.forEach(function (step) {
            elapsed += step[0];
            timers.push(setTimeout(step[1], elapsed));
        });
    }

    play.addEventListener('click', start);
    reset.addEventListener('click', function () {
        play.hidden = false;
        start();
    });
}());
