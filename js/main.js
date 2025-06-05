/**
 * Main JavaScript file for PILOTING Website
 * Author: Bolt
 * Version: 1.0
 */

// Wait for the DOM to be fully loaded
$(document).ready(function () {
  // Navbar scroll behavior
  $(window).scroll(function () {
    if ($(this).scrollTop() > 50) {
      $("#mainNav").addClass("navbar-scrolled");
    } else {
      $("#mainNav").removeClass("navbar-scrolled");
    }

    // Show/hide "Go to Top" button
    if ($(this).scrollTop() > 300) {
      $("#goToTop").fadeIn();
    } else {
      $("#goToTop").fadeOut();
    }
  });

  // Go to Top button click handler
  $("#goToTop").on("click", function () {
    $("html, body").animate(
      {
        scrollTop: 0,
      },
      800,
      "easeInOutQuart"
    );
    return false;
  });

  // Smooth scrolling for anchor links
  $("a.nav-link, a.btn, a.footer-link").on("click", function (event) {
    if (this.hash !== "") {
      event.preventDefault();
      const hash = this.hash;

      $("html, body").animate(
        {
          scrollTop: $(hash).offset().top - 70,
        },
        800
      );
    }
  });

  // Mobile menu collapse when clicking on a link
  $(".navbar-nav>li>a").on("click", function () {
    $(".navbar-collapse").collapse("hide");
  });

  // Initialize Bootstrap tooltips
  const tooltipTriggerList = [].slice.call(
    document.querySelectorAll('[data-bs-toggle="tooltip"]')
  );
  tooltipTriggerList.map(function (tooltipTriggerEl) {
    return new bootstrap.Tooltip(tooltipTriggerEl);
  });

  // Lazy load icons and images
  const lazyElements = document.querySelectorAll(".lazy-load");

  const lazyLoadObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const element = entry.target;
        if (element.tagName === "I") {
          const iconClass = element.dataset.icon;
          if (iconClass) {
            element.className = iconClass;
          }
        } else if (element.tagName === "IMG") {
          element.src = element.dataset.src;
          element.classList.remove("lazy-load");
        }
        observer.unobserve(element);
      }
    });
  });

  lazyElements.forEach((element) => {
    lazyLoadObserver.observe(element);
  });

  // Scroll reveal animations with performance optimization
  const revealElements = document.querySelectorAll(".reveal");
  const staggerElements = document.querySelectorAll(".stagger-reveal");

  const revealObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("active");
          revealObserver.unobserve(entry.target);
        }
      });
    },
    {
      threshold: 0.1,
      rootMargin: "50px",
    }
  );

  revealElements.forEach((element) => {
    revealObserver.observe(element);
  });

  staggerElements.forEach((element) => {
    revealObserver.observe(element);
  });

  // Add animation classes to elements
  $(".hero-content").addClass("fade-in");
  $(".benefit-item").addClass("reveal");
  $(".feature-item").addClass("reveal");
  $(".journey-step").addClass("stagger-reveal");
  $(".usa-benefit-card").addClass("reveal1");

  // Testimonial carousel with optimized transitions
  $(".carousel").carousel({
    interval: 5000,
    pause: "hover",
  });

  // Add custom active class to first collapsible element
  $(".accordion-button:first").removeClass("collapsed");
  $(".accordion-collapse:first").addClass("show");

  // Optimized logo creation
  createLogo();
});

const title = "PILOTING FOR PILOTS";
const container = document.getElementById("animated-title");
container.innerHTML = ""; // Clear existing text

const words = title.split(" ");
words.forEach((word, i) => {
  const span = document.createElement("span");
  span.textContent = word;
  span.className = "word";
  span.style.opacity = 0;
  span.style.transition = "opacity 0.5s, transform 0.5s";
  span.style.display = "inline-block";
  span.style.transform = "translateY(20px)";
  span.style.marginRight = "8px";
  container.appendChild(span);

  // Add a line break after each word except the last
  if (i < words.length - 1) {
    container.appendChild(document.createElement("br"));
  }

  setTimeout(() => {
    span.style.opacity = 1;
    span.style.transform = "translateY(0)";
  }, 400 * i);
});

// Function to create a dynamic SVG logo
function createLogo() {
  const logoSrc = "img/logo.svg";
  const logoWhiteSrc = "img/logo-white.svg";

  if (!document.querySelector(".logo")) {
    const logoImg = document.createElement("img");
    logoImg.src = logoSrc;
    logoImg.alt = "PILOTING Logo";
    logoImg.className = "logo";

    const navBrand = document.querySelector(".navbar-brand");
    if (navBrand) {
      navBrand.appendChild(logoImg);
    }
  }

  if (!document.querySelector(".footer-logo")) {
    const footerLogo = document.querySelector(".footer-logo");
    if (footerLogo) {
      footerLogo.src = logoWhiteSrc;
    }
  }
}

// Handle page visibility changes
document.addEventListener("visibilitychange", function () {
  if (document.hidden) {
    document.title = "Come Back to Your Aviation Dreams! 🛫";
  } else {
    document.title = "PILOTING - Transform Your Aviation Dreams into Reality";
  }
});

// Optimized image preloading
const preloadImages = () => {
  const images = [
    "https://images.pexels.com/photos/1684167/pexels-photo-1684167.jpeg",
  ];

  const imagePromises = images.map((src) => {
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
  totalAnimationDuration: 0,
};

// Record performance metrics
const recordPerformanceMetrics = () => {
  const paintEntries = performance.getEntriesByType("paint");
  const fcp = paintEntries.find(
    (entry) => entry.name === "first-contentful-paint"
  );
  if (fcp) {
    performanceMetrics.firstContentfulPaint = fcp.startTime;
  }
};

// Call preload and performance monitoring on window load
window.onload = async function () {
  await preloadImages();
  recordPerformanceMetrics();
};

// Add event listener when DOM is loaded
document.addEventListener("DOMContentLoaded", function () {
  // Timeline consultation button
  const consultationBtn = document.querySelector(".btn-consultation");
  consultationBtn.addEventListener("click", function () {
    console.log("Consultation button clicked");
    // Add your consultation button functionality here
  });

  // FAQ functionality
  const faqQuestions = document.querySelectorAll(".faq-question");
  faqQuestions.forEach((question) => {
    question.addEventListener("click", function () {
      // Toggle aria-expanded attribute
      const isExpanded = this.getAttribute("aria-expanded") === "true";
      this.setAttribute("aria-expanded", !isExpanded);

      // Get the answer container
      const answer = this.nextElementSibling;

      // Toggle active class on answer
      answer.classList.toggle("active");

      // Close other open answers
      faqQuestions.forEach((otherQuestion) => {
        if (otherQuestion !== question) {
          otherQuestion.setAttribute("aria-expanded", "false");
          otherQuestion.nextElementSibling.classList.remove("active");
        }
      });
    });
  });

  // Testimonials Slider functionality
  const testimonialItems = document.querySelectorAll(".testimonial-item");
  const dots = document.querySelectorAll(".dot");
  const prevBtn = document.querySelector(".testimonial-nav.prev");
  const nextBtn = document.querySelector(".testimonial-nav.next");
  let currentSlide = 0;

  function showSlide(index) {
    // Remove active class from all slides and dots
    testimonialItems.forEach((item) => item.classList.remove("active"));
    dots.forEach((dot) => dot.classList.remove("active"));

    // Add active class to current slide and dot
    testimonialItems[index].classList.add("active");
    dots[index].classList.add("active");
  }

  function nextSlide() {
    currentSlide = (currentSlide + 1) % testimonialItems.length;
    showSlide(currentSlide);
  }

  function prevSlide() {
    currentSlide =
      (currentSlide - 1 + testimonialItems.length) % testimonialItems.length;
    showSlide(currentSlide);
  }

  // Event listeners for navigation
  nextBtn.addEventListener("click", nextSlide);
  prevBtn.addEventListener("click", prevSlide);

  // Event listeners for dots
  dots.forEach((dot, index) => {
    dot.addEventListener("click", () => {
      currentSlide = index;
      showSlide(currentSlide);
    });
  });

  // Auto-advance slides every 5 seconds
  setInterval(nextSlide, 5000);

  // FAQ contact button
  const contactBtn = document.querySelector(".contact-btn");
  contactBtn.addEventListener("click", function () {
    console.log("Contact button clicked");
    // Add your contact button functionality here
  });

  // Form handling
  const pilotForm = document.getElementById("pilotApplicationForm");
  if (pilotForm) {
    pilotForm.addEventListener("submit", function (e) {
      e.preventDefault();

      // Get form data
      const formData = new FormData(this);
      const formDataObj = {};
      formData.forEach((value, key) => (formDataObj[key] = value));

      // Log form submission (replace with your actual form submission logic)
      console.log("Form submitted:", formDataObj);

      // Show success message (customize as needed)
      alert("Thank you for your application! We will contact you soon.");

      // Reset form
      this.reset();
    });
  }

  // Feature card hover effect
  const featureCards = document.querySelectorAll(".feature-card");
  featureCards.forEach((card) => {
    card.addEventListener("mouseenter", function () {
      this.style.transform = "translateY(-5px)";
    });

    card.addEventListener("mouseleave", function () {
      this.style.transform = "translateY(0)";
    });
  });
});
