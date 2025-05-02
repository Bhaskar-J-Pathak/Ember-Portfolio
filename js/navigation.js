/**
 * Navigation System
 * Handles the full-screen navigation with animations and interaction effects
 */

// DOM Elements
const navToggle = document.querySelector('.nav-toggle');
const navClose = document.querySelector('.nav-close');
const navWrapper = document.querySelector('.nav-wrapper');
const navLinks = document.querySelectorAll('.nav-link-item');
const body = document.body;

// Initialize navigation when DOM is ready
document.addEventListener('DOMContentLoaded', initNavigation);

/**
 * Initialize navigation functionality
 */
function initNavigation() {
  if (!navToggle || !navWrapper) return;
  
  // Add event listener for opening navigation
  navToggle.addEventListener('click', () => {
    if (body.classList.contains('nav-active')) {
      closeNavigation();
    } else {
      openNavigation();
    }
  });
  
  // Close navigation when clicking outside of content
  navWrapper.addEventListener('click', (e) => {
    // Check if click was directly on the wrapper (background) and not on content
    if (e.target === navWrapper) {
      closeNavigation();
    }
  });
  
  // Close navigation when pressing Escape key
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && body.classList.contains('nav-active')) {
      closeNavigation();
    }
  });
  
  // Add click event to nav links (for mobile)
  navLinks.forEach(link => {
    const anchor = link.querySelector('a');
    if (anchor) {
      anchor.addEventListener('click', (e) => {
        // Only close navigation if it's an internal link
        if (anchor.getAttribute('href').startsWith('#')) {
          e.preventDefault();
          const targetId = anchor.getAttribute('href').substring(1);
          const targetElement = document.getElementById(targetId);
          
          closeNavigation();
          
          // Scroll to target after navigation closes
          setTimeout(() => {
            if (targetElement) {
              scrollToElement(targetElement);
            }
          }, 800);
        } else {
          // External link or page change, just close nav
          closeNavigation();
        }
      });
    }
  });
  
  // Add hover effects for nav links
  setupNavLinkHoverEffects();
}

/**
 * Open the navigation menu with animation
 */
function openNavigation() {
  // Prevent scrolling when nav is open
  body.classList.add('nav-active');
  
  // Add additional class for blur effect if needed
  body.classList.add('nav-blur');
  
  // Animate staggered entrance of links
  gsap.fromTo(
    navLinks,
    { y: 40, opacity: 0 },
    { 
      y: 0, 
      opacity: 1, 
      duration: 0.6, 
      stagger: 0.1,
      delay: 0.4,
      ease: 'power3.out'
    }
  );
  
  // Announce for accessibility
  const navLiveRegion = document.querySelector('.nav-live-region');
  if (navLiveRegion) {
    navLiveRegion.textContent = 'Navigation menu opened';
  }
}

/**
 * Close the navigation menu with animation
 */
function closeNavigation() {
  // Don't run if already closed
  if (!body.classList.contains('nav-active')) return;
  
  // Animate closing
  gsap.to(navLinks, {
    y: -20,
    opacity: 0,
    duration: 0.4,
    stagger: 0.05,
    ease: 'power3.in'
  });
  
  // Allow time for animations before removing class
  setTimeout(() => {
    body.classList.remove('nav-active');
    body.classList.remove('nav-blur');
    
    // Reset link positions for next opening
    gsap.set(navLinks, { clearProps: 'all' });
    
    // Announce for accessibility
    const navLiveRegion = document.querySelector('.nav-live-region');
    if (navLiveRegion) {
      navLiveRegion.textContent = 'Navigation menu closed';
    }
  }, 600);
}

/**
 * Setup hover effects for navigation links
 */
function setupNavLinkHoverEffects() {
  navLinks.forEach(link => {
    const linkText = link.querySelector('.nav-link-text');
    const linkNumber = link.querySelector('.nav-link-number');
    
    if (!linkText || !linkNumber) return;
    
    // Create hover effect timeline
    const linkHoverTl = gsap.timeline({ paused: true });
    
    linkHoverTl
      .to(linkText, {
        color: 'var(--color-accent)',
        duration: 0.3,
        ease: 'power2.out'
      })
      .to(linkNumber, {
        color: 'var(--color-accent)',
        opacity: 0.8,
        duration: 0.3,
        ease: 'power2.out'
      }, 0);
    
    // Add mouse events
    link.addEventListener('mouseenter', () => {
      linkHoverTl.play();
    });
    
    link.addEventListener('mouseleave', () => {
      linkHoverTl.reverse();
    });
  });
}

/**
 * Scroll to element with smooth animation
 * @param {HTMLElement} element - The element to scroll to
 */
function scrollToElement(element) {
  // Check if Locomotive Scroll is available
  const locoScroll = window.locoScroll;
  
  if (locoScroll) {
    // Use Locomotive Scroll
    locoScroll.scrollTo(element, {
      offset: -100,
      duration: 1000,
      easing: [0.25, 0.1, 0.25, 1]
    });
  } else {
    // Fallback to native scroll
    const headerOffset = 100;
    const elementPosition = element.getBoundingClientRect().top;
    const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
    
    window.scrollTo({
      top: offsetPosition,
      behavior: 'smooth'
    });
  }
}
