/**
 * Main JavaScript file for PILOTING Website
 * Author: Bolt
 * Version: 1.0
 */

// Wait for the DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
  // Navbar scroll behavior
  $(window).scroll(function() {
    if ($(this).scrollTop() > 50) {
      $('#mainNav').addClass('navbar-scrolled');
    } else {
      $('#mainNav').removeClass('navbar-scrolled');
    }
    
    // Show/hide "Go to Top" button
    if ($(this).scrollTop() > 300) {
      $('#goToTop').fadeIn();
    } else {
      $('#goToTop').fadeOut();
    }
  });

  // Go to Top button click handler
  const goToTopButton = document.getElementById('goToTop');
  if (goToTopButton) {
    goToTopButton.addEventListener('click', function() {
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
      return false;
    });
  }

  // Smooth scrolling for anchor links
  document.querySelectorAll('a.nav-link, a.btn, a.footer-link').forEach(link => {
    link.addEventListener('click', function(event) {
      if (this.hash !== "") {
        event.preventDefault();
        const hash = this.hash;
        const target = document.querySelector(hash);
        
        if (target) {
          window.scrollTo({
            top: target.offsetTop - 70,
            behavior: 'smooth'
          });
        }
      }
    });
  });

  // Mobile menu collapse when clicking on a link
  const navLinks = document.querySelectorAll('.navbar-nav>li>a');
  const navbarCollapse = document.querySelector('.navbar-collapse');
  
  if (navLinks && navbarCollapse) {
    navLinks.forEach(link => {
      link.addEventListener('click', function() {
        navbarCollapse.classList.remove('show');
      });
    });
  }

  // Initialize Bootstrap tooltips
  const tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'));
  if (tooltipTriggerList.length > 0) {
    tooltipTriggerList.map(function (tooltipTriggerEl) {
      return new bootstrap.Tooltip(tooltipTriggerEl);
    });
  }

  // Lazy load icons and images
  const lazyElements = document.querySelectorAll('.lazy-load');
  
  if (lazyElements.length > 0) {
    const lazyLoadObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const element = entry.target;
          if (element.tagName === 'I') {
            const iconClass = element.dataset.icon;
            if (iconClass) {
              element.className = iconClass;
            }
          } else if (element.tagName === 'IMG') {
            element.src = element.dataset.src;
            element.classList.remove('lazy-load');
          }
          observer.unobserve(element);
        }
      });
    });

    lazyElements.forEach(element => {
      lazyLoadObserver.observe(element);
    });
  }

  // Scroll reveal animations with performance optimization
  const revealElements = document.querySelectorAll('.reveal');
  const staggerElements = document.querySelectorAll('.stagger-reveal');

  if (revealElements.length > 0 || staggerElements.length > 0) {
    const revealObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('active');
          revealObserver.unobserve(entry.target);
        }
      });
    }, {
      threshold: 0.1,
      rootMargin: '50px'
    });

    revealElements.forEach(element => {
      revealObserver.observe(element);
    });

    staggerElements.forEach(element => {
      revealObserver.observe(element);
    });
  }

  // Add animation classes to elements
  const heroContent = document.querySelector('.hero-content');
  if (heroContent) {
    heroContent.classList.add('fade-in');
  }

  document.querySelectorAll('.benefit-item').forEach(item => {
    item.classList.add('reveal');
  });

  document.querySelectorAll('.feature-item').forEach(item => {
    item.classList.add('reveal');
  });

  document.querySelectorAll('.journey-step').forEach(item => {
    item.classList.add('stagger-reveal');
  });

  document.querySelectorAll('.usa-benefit-card').forEach(item => {
    item.classList.add('reveal');
  });

  // Testimonial carousel
  const carousel = document.querySelector('.carousel');
  if (carousel) {
    new bootstrap.Carousel(carousel, {
      interval: 5000,
      pause: "hover"
    });
  }

  // Add custom active class to first collapsible element
  const firstAccordionButton = document.querySelector('.accordion-button:first-child');
  const firstAccordionCollapse = document.querySelector('.accordion-collapse:first-child');
  
  if (firstAccordionButton) {
    firstAccordionButton.classList.remove('collapsed');
  }
  if (firstAccordionCollapse) {
    firstAccordionCollapse.classList.add('show');
  }

  // Initialize logo
  createLogo();
});

// Function to create a dynamic logo
function createLogo() {
  const logoSrc = 'img/logo.svg';
  const logoWhiteSrc = 'img/logo-white.svg';
  
  const navBrand = document.querySelector('.navbar-brand');
  if (navBrand && !navBrand.querySelector('.logo')) {
    const logoImg = document.createElement('img');
    logoImg.src = logoSrc;
    logoImg.alt = 'PILOTING Logo';
    logoImg.className = 'logo';
    navBrand.appendChild(logoImg);
  }
  
  const footerLogo = document.querySelector('.footer-logo');
  if (footerLogo) {
    footerLogo.src = logoWhiteSrc;
  }
}

// Handle page visibility changes
document.addEventListener('visibilitychange', function() {
  if (document.hidden) {
    document.title = "Come Back to Your Aviation Dreams! 🛫";
  } else {
    document.title = "PILOTING - Transform Your Aviation Dreams into Reality";
  }
});

// Optimized image preloading
const preloadImages = () => {
  const images = [
    'https://images.pexels.com/photos/1684167/pexels-photo-1684167.jpeg'
  ];
  
  const imagePromises = images.map(src => {
    return new Promise((resolve, reject) => {
      const img = new Image();
      img.onload = resolve;
      img.onerror = reject;
      img.src = src;
    });
  });

  return Promise.all(imagePromises);
};

// Initialize performance monitoring
const performanceMetrics = {
  firstContentfulPaint: 0,
  iconLoadTime: 0,
  totalAnimationDuration: 0
};

// Record performance metrics
const recordPerformanceMetrics = () => {
  const paintEntries = performance.getEntriesByType('paint');
  const fcp = paintEntries.find(entry => entry.name === 'first-contentful-paint');
  if (fcp) {
    performanceMetrics.firstContentfulPaint = fcp.startTime;
  }
};

// Call preload and performance monitoring on window load
window.addEventListener('load', async function() {
  await preloadImages();
  recordPerformanceMetrics();
});