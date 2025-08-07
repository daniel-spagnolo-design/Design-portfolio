// JS for: 1. Smooth scrolling to links, 2. animation of nav bar on scrolling, 3. wavy line animation on scroll  

  // Smooth scroll to nav link modules (for index page only) //  
  $(document).ready(function(){
    // Add smooth scrolling to all links
    $("a").on('click', function(event) {

      // Make sure this.hash has a value before overriding default behavior
      if (this.hash !== "") {
        // Prevent default anchor click behavior
        event.preventDefault();

        // Store hash
        var hash = this.hash;

        // Using jQuery's animate() method to add smooth page scroll
        // The optional number (800) specifies the number of milliseconds it takes to scroll to the specified area
        $('html, body').animate({
          scrollTop: $(hash).offset().top
        }, 800, function(){
     
          // Add hash (#) to URL when done scrolling (default click behavior)
          window.location.hash = hash;
        });
      } // End if
    });




  // Animated nav bar on scroll //  
  $(function(){
   var shrinkHeader = 150;
    $(window).scroll(function() {
      var scroll = getCurrentScroll();
        if ( scroll >= shrinkHeader ) {
             $('header').addClass('shrink'),
             $('header.logo-default').addClass('shrink'),
             $('header nav ul').addClass('shrink'),
             $('header nav ul li').addClass('shrink'),
             $('header nav li a').addClass('shrink'),
             $('header p').addClass('shrink'),
             $('header svg').addClass('shrink'),
             $('header a.logo').addClass('shrink'),
             $('header nav .alternative a:hover').addClass('shrink'),
             $('header nav').addClass('shrink'),
             $('header .logo-job-title').addClass('shrink');
          }
          else {
              $('header').removeClass('shrink'),
              $('header.logo-default').removeClass('shrink'),
              $('header nav ul').removeClass('shrink'),
              $('header nav ul li').removeClass('shrink'),
              $('header nav li a').removeClass('shrink'),
              $('header p').removeClass('shrink'),
              $('header svg').removeClass('shrink'),
              $('header a.logo').removeClass('shrink'),
              $('header nav .alternative a:hover').removeClass('shrink'),
              $('header nav').removeClass('shrink'),
              $('header .logo-job-title').removeClass('shrink');
          }
    });
  function getCurrentScroll() {
      return window.pageYOffset || document.documentElement.scrollTop;
      }
  });

});



// Wavy line animation on down-scroll
document.addEventListener('DOMContentLoaded', function() {
    const statusIndicator = document.getElementById('status');
    const wavySections = document.querySelectorAll('.wavy-line-section');
    let animationsTriggered = 0;
    
    // Create intersection observer
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
              // Find the wavy line within this section
                const wavyLine = entry.target.querySelector('.wavy-line-animation');
                
                if (wavyLine) {
                  // Add animate class to start the animation
                    wavyLine.classList.add('animate');
                    animationsTriggered++;
                    
                    // Get section name from data attribute
                    const sectionName = entry.target.dataset.section || `Section ${animationsTriggered}`;
                    
                    // Update status indicator
                    statusIndicator.textContent = `${sectionName} animation triggered! (${animationsTriggered}/${wavySections.length})`;
                    statusIndicator.classList.add('triggered');
                    
                    // Stop observing this section after animation triggers
                    observer.unobserve(entry.target);
                    
                    // Hide status after all animations or after delay
                    if (animationsTriggered >= wavySections.length) {
                        setTimeout(() => {
                            statusIndicator.textContent = 'All animations complete!';
                            setTimeout(() => statusIndicator.style.opacity = '0', 2000);
                        }, 1000);
                    }
                }
            }
        });
    }, {
        threshold: 0.9, // Trigger when 90% of the section is visible
        rootMargin: '0px 0px -50px 0px' // Slight offset to fine-tune trigger point
    });
    
    // Observe all wavy sections
    wavySections.forEach(section => observer.observe(section));
});














 