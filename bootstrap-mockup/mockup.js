/*
 * mockup.js — the small amount of behavior the Bootstrap mock-up needs.
 *
 * Bootstrap's bundle handles navbar collapse, accordion, carousel, modal and
 * toast dismissal on its own. This file only drives the three interactive
 * touches that are specific to this page:
 *   1. the "missed call, recovered" text-back simulation,
 *   2. Bootstrap-style form validation + a success toast,
 *   3. the back-to-top button visibility.
 */
(function () {
    'use strict';

    /* ---- 1. Missed-call text-back simulation ---------------------------- */
    var demoBtn = document.getElementById('demoBtn');
    var thread = document.getElementById('thread');
    var callState = document.getElementById('callState');
    var demoStat = document.getElementById('demoStat');

    var script = [
        { side: 'in', delay: 1400, text: 'Missed call — you were with a customer.' },
        { side: 'out', delay: 2600, text: 'Hey! This is Calderon Barbershop. Sorry we missed you — how can we help?' },
        { side: 'in', delay: 4200, text: 'Do you have anything open Saturday morning?' },
        { side: 'out', delay: 5600, text: 'We do — 9:30 or 10:15. Want me to lock one in?' },
        { side: 'in', delay: 7000, text: '10:15 works. Thanks!' }
    ];
    var timers = [];

    function bubble(side, text) {
        var b = document.createElement('div');
        b.className = 'bubble ' + (side === 'out' ? 'bubble-out' : 'bubble-in');
        b.textContent = text;
        thread.appendChild(b);
        thread.scrollTop = thread.scrollHeight;
    }

    function runDemo() {
        timers.forEach(clearTimeout);
        timers = [];
        thread.innerHTML = '';
        callState.style.display = '';
        demoStat.textContent = '';
        demoBtn.disabled = true;

        // Ring, then "answer" fails over to the text-back thread.
        timers.push(setTimeout(function () {
            callState.style.display = 'none';
        }, 1200));

        script.forEach(function (step) {
            timers.push(setTimeout(function () {
                bubble(step.side, step.text);
            }, step.delay));
        });

        timers.push(setTimeout(function () {
            demoStat.textContent = '> Lead recovered in ~7s. Booked without a callback.';
            demoBtn.disabled = false;
            demoBtn.innerHTML = '<i class="bi bi-arrow-repeat me-1"></i>Run it again';
        }, script[script.length - 1].delay + 900));
    }

    if (demoBtn) {
        demoBtn.addEventListener('click', runDemo);
    }

    /* ---- 2. Form validation + success toast ----------------------------- */
    var form = document.getElementById('bookForm');
    if (form) {
        form.addEventListener('submit', function (event) {
            event.preventDefault();
            event.stopPropagation();
            if (form.checkValidity()) {
                var toastEl = document.getElementById('bookToast');
                if (toastEl && window.bootstrap) {
                    window.bootstrap.Toast.getOrCreateInstance(toastEl).show();
                }
                form.reset();
                form.classList.remove('was-validated');
            } else {
                form.classList.add('was-validated');
            }
        });
    }

    /* ---- 3. Back-to-top visibility -------------------------------------- */
    var backTop = document.querySelector('.back-top');
    if (backTop) {
        window.addEventListener('scroll', function () {
            backTop.classList.toggle('show', window.scrollY > 500);
        }, { passive: true });
    }
}());
