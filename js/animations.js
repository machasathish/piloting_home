/**
 * Animations for PILOTING Website
 * Author: Bolt
 * Version: 1.0
 */

$(document).ready(function() {
  // Initialize animation for elements
  initializeAnimations();
  
  // Add scroll event listener for scroll-triggered animations
  window.addEventListener('scroll', function() {
    animateOnScroll();
  });
  
  // Initial check for animations
  animateOnScroll();
  
  // Add animation classes to hero elements with delay
  animateHeroElements();
  
  // Initialize counters
  initializeCounters();
});

// Initialize animations for static elements
function initializeAnimations() {
  // Add fade-in animation to navbar
  $('#mainNav').addClass('fade-in');
  
  // Add slide-up animation to hero content elements
  $('.hero h1').addClass('slide-up delay-1');
  $('.hero p').addClass('slide-up delay-2');
  $('.hero-buttons').addClass('slide-up delay-3');
  
  // Add pulse animation to main CTA button
  $('.hero .btn-primary').addClass('pulse');
  
  // Add staggered animations to benefit items
  $('.benefit-item').each(function(index) {
    $(this).addClass('slide-up');
    $(this).css('animation-delay', `${0.2 * (index + 1)}s`);
  });
}

// Animate hero elements with delays
function animateHeroElements() {
  setTimeout(function() {
    $('.hero .badge').addClass('slide-in-left');
  }, 300);
  
  setTimeout(function() {
    $('.hero h1').addClass('active');
  }, 500);
  
  setTimeout(function() {
    $('.hero p').addClass('active');
  }, 700);
  
  setTimeout(function() {
    $('.hero-buttons').addClass('active');
  }, 900);
}

// Handle scroll-triggered animations
function animateOnScroll() {
  const windowHeight = window.innerHeight;
  const scrollY = window.scrollY;
  const triggerPoint = 150; // How far from the bottom of the viewport to trigger
  
  // Feature items
  $('.feature-item').each(function() {
    const elementTop = $(this).offset().top;
    if (elementTop < (scrollY + windowHeight - triggerPoint)) {
      $(this).addClass('slide-up');
    }
  });
  
  // Journey steps with alternating directions
  $('.journey-step').each(function(index) {
    const elementTop = $(this).offset().top;
    if (elementTop < (scrollY + windowHeight - triggerPoint)) {
      if (index % 2 === 0) {
        $(this).addClass('slide-in-left');
      } else {
        $(this).addClass('slide-in-right');
      }
    }
  });
  
  // USA benefit cards
  $('.usa-benefit-card').each(function(index) {
    const elementTop = $(this).offset().top;
    if (elementTop < (scrollY + windowHeight - triggerPoint)) {
      $(this).addClass('fade-in');
      $(this).css('animation-delay', `${0.2 * (index % 4)}s`);
    }
  });
  
  // CTA box and form
  $('.cta-box, .apply-form').each(function() {
    const elementTop = $(this).offset().top;
    if (elementTop < (scrollY + windowHeight - triggerPoint)) {
      $(this).addClass('slide-up');
    }
  });
}

// Initialize counters for statistics
function initializeCounters() {
  $('.counter').each(function() {
    const $this = $(this);
    const countTo = parseInt($this.attr('data-count'));
    
    // Only initialize if in viewport
    if (isElementInViewport($this)) {
      $({ countNum: 0 }).animate({
        countNum: countTo
      }, {
        duration: 2000,
        easing: 'swing',
        step: function() {
          $this.text(Math.floor(this.countNum));
        },
        complete: function() {
          $this.text(this.countNum);
        }
      });
    }
  });
  
  // Re-check counters on scroll
  $(window).scroll(function() {
    $('.counter').each(function() {
      const $this = $(this);
      
      if (isElementInViewport($this) && !$this.hasClass('counted')) {
        $this.addClass('counted');
        const countTo = parseInt($this.attr('data-count'));
        
        $({ countNum: 0 }).animate({
          countNum: countTo
        }, {
          duration: 2000,
          easing: 'swing',
          step: function() {
            $this.text(Math.floor(this.countNum));
          },
          complete: function() {
            $this.text(this.countNum);
          }
        });
      }
    });
  });
}

// Check if element is in viewport
function isElementInViewport(el) {
  const rect = el[0].getBoundingClientRect();
  return (
    rect.top >= 0 &&
    rect.left >= 0 &&
    rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
    rect.right <= (window.innerWidth || document.documentElement.clientWidth)
  );
}

// Parallax effect for sections with background images
function initParallax() {
  $(window).scroll(function() {
    const scrolled = $(window).scrollTop();
    $('.parallax').each(function() {
      const $this = $(this);
      const yPos = -(scrolled * 0.15);
      $this.css('background-position', '50% ' + yPos + 'px');
    });
  });
}

// Typed.js-style text animation
function initTypeAnimation() {
  const elements = document.querySelectorAll('.type-animation');
  
  elements.forEach(element => {
    const text = element.textContent;
    element.textContent = '';
    
    let i = 0;
    const interval = setInterval(() => {
      if (i < text.length) {
        element.textContent += text.charAt(i);
        i++;
      } else {
        clearInterval(interval);
      }
    }, 100);
  });
}

// Add hover animations to interactive elements
function addHoverAnimations() {
  // Button hover effect
  $('.btn').hover(
    function() {
      $(this).addClass('hover-active');
    },
    function() {
      $(this).removeClass('hover-active');
    }
  );
  
  // Card hover effect
  $('.usa-benefit-card, .feature-item').hover(
    function() {
      $(this).addClass('hover-lift');
    },
    function() {
      $(this).removeClass('hover-lift');
    }
  );
}

// Initialize all dynamic animations
$(window).on('load', function() {
  initParallax();
  initTypeAnimation();
  addHoverAnimations();
  
  // Add fadeIn to page after load
  $('body').addClass('loaded');
});