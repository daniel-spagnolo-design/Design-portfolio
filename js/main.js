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
