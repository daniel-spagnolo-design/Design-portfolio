// JS for: 1. Smooth scroll (CSS handles this now), 2. animation of nav bar on scrolling, 3. wavy line animation on scroll


// Animated nav bar on scroll //
window.addEventListener('scroll', function () {
    const shouldShrink = window.scrollY >= 150;
    const shrinkTargets = [
        'header',
        'header p',
        'header svg',
        'header a.logo',
        'header nav',
        'header nav ul',
        'header nav ul li',
        'header nav li a',
        'header .logo-default',
        'header .logo-job-title'
    ];
    shrinkTargets.forEach(function (selector) {
        document.querySelectorAll(selector).forEach(function (el) {
            el.classList.toggle('shrink', shouldShrink);
        });
    });
});


// Wavy line animation on down-scroll
document.addEventListener('DOMContentLoaded', function() {
    const statusIndicator = document.getElementById('status');
    const wavySections = document.querySelectorAll('.wavy-line-section');
    let animationsTriggered = 0;

    // Create intersection observer
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(function(entry) {
            if (entry.isIntersecting) {
                const wavyLine = entry.target.querySelector('.wavy-line-animation');

                if (wavyLine) {
                    wavyLine.classList.add('animate');
                    animationsTriggered++;

                    // Stop observing this section after animation triggers
                    observer.unobserve(entry.target);

                    if (statusIndicator) {
                        const sectionName = entry.target.dataset.section || 'Section ' + animationsTriggered;
                        statusIndicator.textContent = sectionName + ' animation triggered! (' + animationsTriggered + '/' + wavySections.length + ')';
                        statusIndicator.classList.add('triggered');

                        if (animationsTriggered >= wavySections.length) {
                            setTimeout(function() {
                                statusIndicator.textContent = 'All animations complete!';
                                setTimeout(function() { statusIndicator.style.opacity = '0'; }, 2000);
                            }, 1000);
                        }
                    }
                }
            }
        });
    }, {
        threshold: 0.9,
        rootMargin: '0px 0px -50px 0px'
    });

    // Observe all wavy sections
    wavySections.forEach(function(section) { observer.observe(section); });
});


// Homepage hero entrance — letter-by-letter fade reveal //
// "Simple." fades in one glyph at a time over ~3s, then the support line
// follows over ~3s. Runs only when the inline <head> guard added .hero-anim
// (JS on + motion allowed); otherwise the text is left untouched.
(function () {
    if (!document.documentElement.classList.contains('hero-anim')) return;

    function charSpan(text, delay, dur, ease) {
        var span = document.createElement('span');
        span.className = 'hero-char';
        // Plain space (not nbsp) so the support line can still wrap on small screens.
        span.textContent = text;
        span.style.setProperty('--d', delay.toFixed(3) + 's');
        span.style.setProperty('--dur', dur + 's');
        if (ease) span.style.animationTimingFunction = ease;
        return span;
    }

    // Rebuild el's contents as per-glyph .hero-char spans, fading in left to right.
    // base = delay before the first glyph; stagger = gap between glyphs (seconds);
    // ease (optional) overrides the .hero-char timing function for this line;
    // blur (optional, px) sets the focus-in distance via the inherited --blur prop.
    // skip (optional CSS selector) leaves matching child elements untouched so they
    // can run their own animation — used to hand the pink full-stop to its pop.
    function revealByLetter(el, base, stagger, dur, ease, blur, skip) {
        if (!el) return;
        if (blur != null) el.style.setProperty('--blur', blur + 'px');
        var nodes = Array.prototype.slice.call(el.childNodes);
        var i = 0;
        el.textContent = '';

        nodes.forEach(function (node) {
            if (node.nodeType === 3) { // text node — split into characters
                node.textContent.split('').forEach(function (ch) {
                    el.appendChild(charSpan(ch, base + i++ * stagger, dur, ease));
                });
            } else if (node.nodeType === 1) { // element
                if (skip && node.matches(skip)) {
                    el.appendChild(node); // e.g. the pink dot — pops in via WAAPI
                    return;
                }
                node.classList.add('hero-char');
                node.style.setProperty('--d', (base + i++ * stagger).toFixed(3) + 's');
                node.style.setProperty('--dur', dur + 's');
                if (ease) node.style.animationTimingFunction = ease;
                el.appendChild(node);
            }
        });

        el.style.visibility = 'visible'; // reveal now that glyphs start hidden
    }

    // Read a --dot-* CSS var as a number (e.g. "1.05s" -> 1.05), or fall back.
    function dotVar(cs, name, fallback) {
        var s = cs.getPropertyValue(name).trim();
        return s === '' ? fallback : parseFloat(s);
    }

    var EASE = 'cubic-bezier(0.16, 1, 0.3, 1)';
    var heroEl = document.querySelector('#top-module .display-hero');
    var supportEl = document.querySelector('#top-module .body-regular');
    // Snapshot the original markup so the entrance can be replayed (see __heroEntrance).
    var heroHTML = heroEl ? heroEl.innerHTML : '';
    var supportHTML = supportEl ? supportEl.innerHTML : '';

    function run() {
        if (heroEl) heroEl.innerHTML = heroHTML;
        if (supportEl) supportEl.innerHTML = supportHTML;
        // The pink full-stop is skipped here so it can pop in on its own clock
        // (below) once the "Simple" letters and the support line have settled.
        revealByLetter(heroEl, 0.3, 0.06, 0.3, EASE, 6, '.pink-accent');
        revealByLetter(supportEl, 0.6, 0, 0.35, EASE, 3);

        // Pop the dot in with the Web Animations API rather than a CSS animation —
        // .animate() always plays from the start, so re-triggers replay reliably
        // (CSS-animation restart tricks proved flaky). Timings read from optional
        // --dot-* CSS vars with the production values baked in as fallbacks.
        var dotEl = heroEl && heroEl.querySelector('.pink-accent');
        if (dotEl && dotEl.animate) {
            var cs = getComputedStyle(document.documentElement);
            var startScale = dotVar(cs, '--dot-start', 0.2);
            var durMs = dotVar(cs, '--dot-dur', 0.25) * 1000;
            var delayMs = dotVar(cs, '--dot-delay', 0.7) * 1000;
            var ease = cs.getPropertyValue('--dot-ease').trim() ||
                       'cubic-bezier(0.34, 2, 0.64, 1)';

            // Scale + opacity run as two animations so each keeps its own curve:
            // the scale bounces (back-ease overshoot across a single 0->1 segment,
            // so the overshoot reads), while opacity fades in cleanly and a touch
            // quicker. Both share the same start delay.
            dotEl.animate(
                [{ transform: 'scale(' + startScale + ')' }, { transform: 'scale(1)' }],
                { duration: durMs, delay: delayMs, easing: ease, fill: 'both' }
            );
            dotEl.animate(
                [{ opacity: 0 }, { opacity: 1 }],
                { duration: durMs * 0.6, delay: delayMs, easing: 'cubic-bezier(0.16, 1, 0.3, 1)', fill: 'both' }
            );
        }
    }

    run();
    window.__heroEntrance = run; // exposed for ad-hoc replay from DevTools
})();
