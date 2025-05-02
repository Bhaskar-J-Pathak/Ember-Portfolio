/**
 * Main Script
 * Handles theme switching, testimonials, back to top, and other UI interactions
 */

// DOM Elements
const themeToggle = document.querySelector('.theme-toggle');
const themeToggleTrack = document.querySelector('.theme-toggle-track');
const backToTopButton = document.querySelector('.back-to-top-button');
const testimonialDots = document.querySelectorAll('.testimonial-dot');
const testimonialSlides = document.querySelectorAll('.testimonial-slide');
const testimonialArrows = document.querySelectorAll('.testimonial-arrow');

// State variables
let currentTestimonial = 0;
let testimonialInterval;

// Initialize when DOM is ready
document.addEventListener('DOMContentLoaded', initMain);

/**
 * Initialize main functionality
 */
function initMain() {
  initThemeToggle();
  initTestimonialSlider();
  initBackToTop();
  initImageReveal();
  initMicroInteractions();
  addAccessibility();
}

/**
 * Initialize theme toggle functionality
 */
function initThemeToggle() {
  if (!themeToggle) return;
  
  // Check for saved theme
  const savedTheme = localStorage.getItem('theme');
  const prefersDarkScheme = window.matchMedia('(prefers-color-scheme: dark)').matches;
  
  // Set initial theme based on saved preference or system preference
  if (savedTheme) {
    document.documentElement.setAttribute('data-theme', savedTheme);
  } else if (prefersDarkScheme) {
    document.documentElement.setAttribute('data-theme', 'dark');
  }
  
  // Add event listener to theme toggle
  themeToggleTrack?.addEventListener('click', toggleTheme);
}

/**
 * Toggle between light and dark themes
 */
function toggleTheme() {
  const currentTheme = document.documentElement.getAttribute('data-theme') || 'light';
  const newTheme = currentTheme === 'light' ? 'dark' : 'light';
  
  // Create a flash of the new theme color as a transition effect
  const flashOverlay = document.createElement('div');
  flashOverlay.style.position = 'fixed';
  flashOverlay.style.top = '0';
  flashOverlay.style.left = '0';
  flashOverlay.style.width = '100%';
  flashOverlay.style.height = '100%';
  flashOverlay.style.backgroundColor = newTheme === 'dark' ? '#121110' : '#f4f2ee';
  flashOverlay.style.zIndex = '9999';
  flashOverlay.style.opacity = '0';
  flashOverlay.style.pointerEvents = 'none';
  document.body.appendChild(flashOverlay);
  
  // Animate the flash effect
  gsap.to(flashOverlay, {
    opacity: 0.2,
    duration: 0.3,
    ease: 'power2.in',
    onComplete: () => {
      // Change theme
      document.documentElement.setAttribute('data-theme', newTheme);
      
      // Save theme preference
      localStorage.setItem('theme', newTheme);
      
      // Fade out the overlay
      gsap.to(flashOverlay, {
        opacity: 0,
        duration: 0.5,
        ease: 'power2.out',
        onComplete: () => {
          document.body.removeChild(flashOverlay);
        }
      });
    }
  });
}

/**
 * Initialize testimonial slider
 */
function initTestimonialSlider() {
  if (testimonialSlides.length === 0) return;
  
  // Set up initial state
  testimonialSlides.forEach((slide, index) => {
    slide.setAttribute('aria-hidden', index === 0 ? 'false' : 'true');
  });
  
  // Click event for dots
  testimonialDots.forEach((dot, index) => {
    dot.addEventListener('click', () => {
      goToTestimonial(index);
      resetTestimonialInterval();
    });
  });
  
  // Click event for arrows
  testimonialArrows.forEach(arrow => {
    arrow.addEventListener('click', () => {
      if (arrow.classList.contains('prev')) {
        goToTestimonial(currentTestimonial - 1);
      } else {
        goToTestimonial(currentTestimonial + 1);
      }
      resetTestimonialInterval();
    });
  });
  
  // Start auto-rotation
  startTestimonialInterval();
  
  // Pause rotation on hover
  const testimonialSlider = document.querySelector('.testimonial-slider');
  if (testimonialSlider) {
    testimonialSlider.addEventListener('mouseenter', () => {
      clearInterval(testimonialInterval);
    });
    
    testimonialSlider.addEventListener('mouseleave', () => {
      startTestimonialInterval();
    });
  }
}

/**
 * Go to a specific testimonial
 * @param {number} index - Index of the testimonial to show
 */
function goToTestimonial(index) {
  // Handle index bounds
  if (index < 0) {
    index = testimonialSlides.length - 1;
  } else if (index >= testimonialSlides.length) {
    index = 0;
  }
  
  // Skip if already on this testimonial
  if (index === currentTestimonial) return;
  
  // Hide all testimonials
  testimonialSlides.forEach(slide => {
    slide.classList.remove('active');
    slide.setAttribute('aria-hidden', 'true');
  });
  
  // Update dots
  testimonialDots.forEach(dot => {
    dot.classList.remove('active');
    dot.setAttribute('aria-selected', 'false');
  });
  
  // Show selected testimonial
  testimonialSlides[index].classList.add('active');
  testimonialSlides[index].setAttribute('aria-hidden', 'false');
  testimonialDots[index].classList.add('active');
  testimonialDots[index].setAttribute('aria-selected', 'true');
  
  // Create slide animation
  const direction = index > currentTestimonial ? 1 : -1;
  gsap.fromTo(
    testimonialSlides[index],
    {
      x: 20 * direction,
      opacity: 0
    },
    {
      x: 0,
      opacity: 1,
      duration: 0.6,
      ease: 'power2.out'
    }
  );
  
  // Update current index
  currentTestimonial = index;
}

/**
 * Start the testimonial auto-rotation interval
 */
function startTestimonialInterval() {
  // Clear any existing interval
  clearInterval(testimonialInterval);
  
  // Start new interval
  testimonialInterval = setInterval(() => {
    goToTestimonial(currentTestimonial + 1);
  }, 5000);
}

/**
 * Reset the testimonial interval (for use after user interaction)
 */
function resetTestimonialInterval() {
  clearInterval(testimonialInterval);
  startTestimonialInterval();
}

/**
 * Initialize back to top button
 */
function initBackToTop() {
  if (!backToTopButton) return;
  
  // Hide button initially
  gsap.set(backToTopButton, { opacity: 0, display: 'none' });
  
  // Show/hide button based on scroll position
  if (locoScroll) {
    locoScroll.on('scroll', (instance) => {
      const scrollPosition = instance.scroll.y;
      
      if (scrollPosition > 500 && backToTopButton.style.display === 'none') {
        gsap.set(backToTopButton, { display: 'flex' });
        gsap.to(backToTopButton, { opacity: 1, duration: 0.3 });
      } else if (scrollPosition <= 500 && backToTopButton.style.display !== 'none') {
        gsap.to(backToTopButton, { 
          opacity: 0, 
          duration: 0.3,
          onComplete: () => { gsap.set(backToTopButton, { display: 'none' }); }
        });
      }
    });
  } else {
    // Fallback for when locomotive scroll isn't available
    window.addEventListener('scroll', () => {
      const scrollPosition = window.pageYOffset;
      
      if (scrollPosition > 500 && backToTopButton.style.display === 'none') {
        gsap.set(backToTopButton, { display: 'flex' });
        gsap.to(backToTopButton, { opacity: 1, duration: 0.3 });
      } else if (scrollPosition <= 500 && backToTopButton.style.display !== 'none') {
        gsap.to(backToTopButton, { 
          opacity: 0, 
          duration: 0.3,
          onComplete: () => { gsap.set(backToTopButton, { display: 'none' }); }
        });
      }
    });
  }
  
  // Add click event to scroll to top
  backToTopButton.addEventListener('click', scrollToTop);
}

/**
 * Scroll to top of page
 */
function scrollToTop() {
  if (locoScroll) {
    locoScroll.scrollTo(0, {
      duration: 1000,
      easing: [0.25, 0.1, 0.25, 1]
    });
  } else {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  }
}

/**
 * Initialize image reveal effect on hover
 */
function initImageReveal() {
  const workItems = document.querySelectorAll('.work-item');
  
  workItems.forEach(item => {
    const image = item.querySelector('img');
    if (!image) return;
    
    // Create hover animation
    const hoverTl = gsap.timeline({ paused: true });
    
    hoverTl
      .to(image, {
        scale: 1.05,
        duration: 0.8,
        ease: 'power2.out'
      });
    
    // Add mouse events
    item.addEventListener('mouseenter', () => {
      hoverTl.play();
    });
    
    item.addEventListener('mouseleave', () => {
      hoverTl.reverse();
    });
  });
}

/**
 * Initialize micro-interactions
 */
function initMicroInteractions() {
  // Add click ripple effect to buttons
  const buttons = document.querySelectorAll('.button-primary, .header-cta');
  
  buttons.forEach(button => {
    button.addEventListener('click', createRippleEffect);
  });
  
  // Add subtle tilt effect to work images
  if (window.matchMedia('(min-width: 768px)').matches) {
    const workImages = document.querySelectorAll('.work-item-image');
    
    workImages.forEach(image => {
      const parent = image.closest('.work-item');
      
      parent.addEventListener('mousemove', (e) => {
        const rect = parent.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        
        const xPercent = (x / rect.width - 0.5) * 2; // -1 to 1
        const yPercent = (y / rect.height - 0.5) * 2; // -1 to 1
        
        gsap.to(image, {
          rotationY: xPercent * 5,
          rotationX: -yPercent * 5,
          transformPerspective: 1000,
          duration: 0.5,
          ease: 'power1.out'
        });
      });
      
      parent.addEventListener('mouseleave', () => {
        gsap.to(image, {
          rotationY: 0,
          rotationX: 0,
          duration: 0.5,
          ease: 'power1.out'
        });
      });
    });
  }
}

/**
 * Create ripple effect on button click
 * @param {MouseEvent} e - Click event
 */
function createRippleEffect(e) {
  const button = e.currentTarget;
  
  // Create ripple element
  const ripple = document.createElement('span');
  ripple.classList.add('ripple-effect');
  button.appendChild(ripple);
  
  // Get position
  const rect = button.getBoundingClientRect();
  const x = e.clientX - rect.left;
  const y = e.clientY - rect.top;
  
  // Set ripple position
  ripple.style.top = `${y}px`;
  ripple.style.left = `${x}px`;
  
  // Animate and remove ripple
  gsap.to(ripple, {
    width: rect.width * 2.5,
    height: rect.width * 2.5,
    opacity: 0,
    duration: 0.6,
    ease: 'power1.out',
    onComplete: () => {
      button.removeChild(ripple);
    }
  });
}

/**
 * Add accessibility features
 */
function addAccessibility() {
  // Add live region for announcements
  const liveRegion = document.createElement('div');
  liveRegion.setAttribute('aria-live', 'polite');
  liveRegion.setAttribute('aria-atomic', 'true');
  liveRegion.classList.add('visually-hidden', 'nav-live-region');
  document.body.appendChild(liveRegion);
  
  // Add role and aria attributes to testimonial slider
  const testimonialSlider = document.querySelector('.testimonial-slider');
  if (testimonialSlider) {
    testimonialSlider.setAttribute('role', 'region');
    testimonialSlider.setAttribute('aria-roledescription', 'carousel');
    testimonialSlider.setAttribute('aria-label', 'Client Testimonials');
    
    // Add role to track
    const track = testimonialSlider.querySelector('.testimonial-track');
    if (track) {
      track.setAttribute('role', 'presentation');
    }
    
    // Add attributes to slides
    testimonialSlides.forEach((slide, index) => {
      slide.setAttribute('role', 'tabpanel');
      slide.setAttribute('id', `testimonial-slide-${index}`);
      slide.setAttribute('aria-roledescription', 'slide');
      slide.setAttribute('aria-hidden', index === 0 ? 'false' : 'true');
    });
    
    // Add attributes to dots
    const dotsContainer = testimonialSlider.querySelector('.testimonial-dots');
    if (dotsContainer) {
      dotsContainer.setAttribute('role', 'tablist');
      dotsContainer.setAttribute('aria-label', 'Select a testimonial');
      
      testimonialDots.forEach((dot, index) => {
        dot.setAttribute('role', 'tab');
        dot.setAttribute('id', `testimonial-tab-${index}`);
        dot.setAttribute('aria-selected', index === 0 ? 'true' : 'false');
        dot.setAttribute('aria-controls', `testimonial-slide-${index}`);
        dot.setAttribute('tabindex', '0');
        
        // Add keyboard support
        dot.addEventListener('keydown', (e) => {
          if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            goToTestimonial(index);
            resetTestimonialInterval();
          }
        });
      });
    }
    
    // Add attributes to arrows
    testimonialArrows.forEach(arrow => {
      arrow.setAttribute('role', 'button');
      arrow.setAttribute('tabindex', '0');
      
      if (arrow.classList.contains('prev')) {
        arrow.setAttribute('aria-label', 'Previous testimonial');
      } else {
        arrow.setAttribute('aria-label', 'Next testimonial');
      }
      
      // Add keyboard support
      arrow.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          arrow.click();
        }
      });
    });
  }
  
  // Make theme toggle accessible
  if (themeToggleTrack) {
    themeToggleTrack.setAttribute('role', 'switch');
    themeToggleTrack.setAttribute('aria-checked', document.documentElement.getAttribute('data-theme') === 'dark' ? 'true' : 'false');
    themeToggleTrack.setAttribute('tabindex', '0');
    themeToggleTrack.setAttribute('aria-label', 'Toggle dark mode');
    
    // Update aria-checked when theme changes
    const observer = new MutationObserver(() => {
      themeToggleTrack.setAttribute('aria-checked', document.documentElement.getAttribute('data-theme') === 'dark' ? 'true' : 'false');
    });
    
    observer.observe(document.documentElement, { 
      attributes: true, 
      attributeFilter: ['data-theme'] 
    });
    
    // Add keyboard support
    themeToggleTrack.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        toggleTheme();
      }
    });
  }
}