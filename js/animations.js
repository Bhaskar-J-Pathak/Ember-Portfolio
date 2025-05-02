/**
 * Animations System
 * Manages all GSAP animations and Locomotive Scroll effects
 */

// Global variables
let locoScroll;
let scrollInitialized = false;

// Initialize animations when DOM is ready and preloader is complete
document.addEventListener('DOMContentLoaded', () => {
  // Wait for preloader to complete before starting animations
  document.addEventListener('preloaderComplete', initAnimations);
});

/**
 * Initialize all animations and scroll effects
 */
function initAnimations() {
  // Register ScrollTrigger with GSAP
  gsap.registerPlugin(ScrollTrigger);
  
  // Initialize Locomotive Scroll
  initLocomotiveScroll();
  
  // Initialize page animations
  initIntroAnimation();
  initSectionAnimations();
  initParallaxEffects();
  initHoverEffects();
  
  // Update scroll on resize
  window.addEventListener('resize', debounce(() => {
    if (locoScroll) {
      locoScroll.update();
    }
  }, 200));
}

/**
 * Initialize Locomotive Scroll with ScrollTrigger integration
 */
function initLocomotiveScroll() {
  const scrollContainer = document.querySelector('[data-scroll-container]');
  if (!scrollContainer) return;
  
  // Initialize Locomotive Scroll
  locoScroll = new LocomotiveScroll({
    el: scrollContainer,
    smooth: true,
    multiplier: 1,
    lerp: 0.1, // Linear interpolation, lower is smoother
    smartphone: {
      smooth: true,
      lerp: 0.15
    },
    tablet: {
      smooth: true,
      lerp: 0.12
    }
  });
  
  // Make locoScroll globally accessible
  window.locoScroll = locoScroll;
  
  // Update ScrollTrigger when scroll updates
  locoScroll.on('scroll', ScrollTrigger.update);
  
  // Set up ScrollTrigger to work with Locomotive Scroll
  ScrollTrigger.scrollerProxy(scrollContainer, {
    scrollTop(value) {
      return arguments.length ? locoScroll.scrollTo(value, 0, 0) : locoScroll.scroll.instance.scroll.y;
    },
    getBoundingClientRect() {
      return {top: 0, left: 0, width: window.innerWidth, height: window.innerHeight};
    },
    pinType: scrollContainer.style.transform ? "transform" : "fixed"
  });
  
  // Handle ScrollTrigger refresh on page refresh
  ScrollTrigger.addEventListener('refresh', () => locoScroll.update());
  
  // Refresh ScrollTrigger and update locomotive scroll
  ScrollTrigger.refresh();
  scrollInitialized = true;
}

/**
 * Animate intro section elements
 */
function initIntroAnimation() {
  const introHeadingLines = document.querySelectorAll('.intro-heading-line');
  const introSubheading = document.querySelector('.intro-subheading-text');
  const introMeta = document.querySelector('.intro-meta');
  const introImage = document.querySelector('.intro-image img');
  const introScrollHint = document.querySelector('.intro-scroll-hint');
  
  if (introHeadingLines.length === 0) return;
  
  // Create intro animation timeline
  const introTl = gsap.timeline({
    defaults: {
      ease: 'power3.out'
    }
  });
  
  // Animate heading lines one by one
  introTl.to(introHeadingLines, {
    y: 0,
    opacity: 1,
    duration: 1.2,
    stagger: 0.15
  });
  
  // Animate subheading
  if (introSubheading) {
    introTl.to(introSubheading, {
      y: 0,
      opacity: 1,
      duration: 1
    }, '-=0.6');
  }
  
  // Animate intro image zoom
  if (introImage) {
    introTl.to(introImage, {
      scale: 1,
      duration: 1.5,
      ease: 'power2.out'
    }, '-=1');
  }
  
  // Animate meta information
  if (introMeta) {
    introTl.to(introMeta, {
      opacity: 1,
      y: 0,
      duration: 1
    }, '-=0.8');
  }
  
  // Animate scroll hint
  if (introScrollHint) {
    introTl.to(introScrollHint, {
      opacity: 1,
      duration: 1
    }, '-=0.5');
  }
}

/**
 * Initialize animations for each section
 */
function initSectionAnimations() {
  if (!scrollInitialized) return;
  
  // Work items animation
  const workItems = document.querySelectorAll('.work-item');
  workItems.forEach((item, index) => {
    gsap.set(item, {
      opacity: 0,
      y: 40
    });
    
    ScrollTrigger.create({
      trigger: item,
      scroller: '[data-scroll-container]',
      start: 'top 85%',
      toggleActions: 'play none none none',
      onEnter: () => {
        gsap.to(item, {
          opacity: 1,
          y: 0,
          duration: 1,
          delay: index * 0.2,
          ease: 'power3.out'
        });
      }
    });
  });
  
  // About preview section
  const aboutImage = document.querySelector('.about-preview-image');
  const aboutText = document.querySelector('.about-preview-text');
  
  if (aboutImage && aboutText) {
    gsap.set([aboutImage, aboutText], {
      opacity: 0
    });
    
    ScrollTrigger.create({
      trigger: '.about-preview-section',
      scroller: '[data-scroll-container]',
      start: 'top 70%',
      toggleActions: 'play none none none',
      onEnter: () => {
        gsap.to(aboutImage, {
          opacity: 1,
          x: 0,
          duration: 1.2,
          ease: 'power3.out'
        });
        
        gsap.to(aboutText, {
          opacity: 1,
          y: 0,
          duration: 1.2,
          delay: 0.3,
          ease: 'power3.out'
        });
      }
    });
  }
  
  // Quote section animation
  const quoteWrapper = document.querySelector('.quote-wrapper');
  if (quoteWrapper) {
    gsap.set(quoteWrapper, {
      opacity: 0,
      y: 30
    });
    
    ScrollTrigger.create({
      trigger: '.quote-section',
      scroller: '[data-scroll-container]',
      start: 'top 80%',
      toggleActions: 'play none none none',
      onEnter: () => {
        gsap.to(quoteWrapper, {
          opacity: 1,
          y: 0,
          duration: 1.2,
          ease: 'power3.out'
        });
      }
    });
  }
  
  // Journal preview items animation
  const journalItems = document.querySelectorAll('.journal-preview-item');
  journalItems.forEach((item, index) => {
    gsap.set(item, {
      opacity: 0,
      y: 40
    });
    
    ScrollTrigger.create({
      trigger: item,
      scroller: '[data-scroll-container]',
      start: 'top 85%',
      toggleActions: 'play none none none',
      onEnter: () => {
        gsap.to(item, {
          opacity: 1,
          y: 0,
          duration: 1,
          delay: index * 0.2,
          ease: 'power3.out'
        });
      }
    });
  });
  
  // Journal more link animation
  const journalMore = document.querySelector('.journal-preview-more');
  if (journalMore) {
    gsap.set(journalMore, {
      opacity: 0,
      y: 20
    });
    
    ScrollTrigger.create({
      trigger: journalMore,
      scroller: '[data-scroll-container]',
      start: 'top 90%',
      toggleActions: 'play none none none',
      onEnter: () => {
        gsap.to(journalMore, {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: 'power3.out'
        });
      }
    });
  }
  
  // Work view more animation
  const workMore = document.querySelector('.work-view-more');
  if (workMore) {
    gsap.set(workMore, {
      opacity: 0,
      y: 20
    });
    
    ScrollTrigger.create({
      trigger: workMore,
      scroller: '[data-scroll-container]',
      start: 'top 90%',
      toggleActions: 'play none none none',
      onEnter: () => {
        gsap.to(workMore, {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: 'power3.out'
        });
      }
    });
  }
  
  // Contact preview section animation
  const contactPreview = document.querySelector('.contact-preview-wrapper');
  if (contactPreview) {
    gsap.set(contactPreview, {
      opacity: 0,
      y: 40
    });
    
    ScrollTrigger.create({
      trigger: '.contact-preview-section',
      scroller: '[data-scroll-container]',
      start: 'top 80%',
      toggleActions: 'play none none none',
      onEnter: () => {
        gsap.to(contactPreview, {
          opacity: 1,
          y: 0,
          duration: 1,
          ease: 'power3.out'
        });
      }
    });
  }
}

/**
 * Initialize parallax scroll effects
 */
function initParallaxEffects() {
  if (!scrollInitialized) return;
  
  // Header parallax - subtle opacity and blur based on scroll
  const header = document.querySelector('.site-header');
  if (header) {
    ScrollTrigger.create({
      trigger: 'body',
      scroller: '[data-scroll-container]',
      start: 'top top',
      end: '10% top',
      onUpdate: (self) => {
        const progress = self.progress;
        const opacity = 0.9 + (progress * 0.1);
        const backdropBlur = Math.min(progress * 10, 5);
        
        gsap.set(header, {
          backgroundColor: `rgba(var(--color-background-rgb), ${opacity})`,
          backdropFilter: `blur(${backdropBlur}px)`
        });
      }
    });
  }
  
  // Image parallax when scrolling
  document.querySelectorAll('[data-parallax]').forEach(element => {
    const speed = element.getAttribute('data-parallax') || 0.1;
    
    ScrollTrigger.create({
      trigger: element,
      scroller: '[data-scroll-container]',
      start: 'top bottom',
      end: 'bottom top',
      onUpdate: (self) => {
        const yPos = -self.progress * 100 * speed;
        gsap.set(element, {
          y: yPos
        });
      }
    });
  });
}

/**
 * Initialize hover effects for interactive elements
 */
function initHoverEffects() {
  // Text links hover effect
  const textLinks = document.querySelectorAll('.text-link');
  textLinks.forEach(link => {
    const arrow = link.querySelector('.text-link-arrow');
    if (!arrow) return;
    
    const hoverTl = gsap.timeline({ paused: true });
    
    hoverTl
      .to(arrow, {
        x: 5,
        duration: 0.3,
        ease: 'power2.out'
      })
      .to(link, {
        color: 'var(--color-accent)',
        duration: 0.3,
        ease: 'power2.out'
      }, 0);
    
    link.addEventListener('mouseenter', () => hoverTl.play());
    link.addEventListener('mouseleave', () => hoverTl.reverse());
  });
  
  // Button hover effects
  const buttons = document.querySelectorAll('.button-primary');
  buttons.forEach(button => {
    const arrow = button.querySelector('.button-arrow');
    if (!arrow) return;
    
    const hoverTl = gsap.timeline({ paused: true });
    
    hoverTl
      .to(arrow, {
        x: 5,
        duration: 0.3,
        ease: 'power2.out'
      })
      .to(button, {
        scale: 1.03,
        boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
        duration: 0.3,
        ease: 'power2.out'
      }, 0);
    
    button.addEventListener('mouseenter', () => hoverTl.play());
    button.addEventListener('mouseleave', () => hoverTl.reverse());
  });
}

/**
 * Utility function to debounce function calls
 * @param {Function} func - Function to debounce
 * @param {number} wait - Debounce wait time in ms
 * @returns {Function} - Debounced function
 */
function debounce(func, wait) {
  let timeout;
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
}