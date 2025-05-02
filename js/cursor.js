/**
 * Magnetic Cursor
 * An advanced custom cursor with magnetic effect on interactive elements
 */

// DOM Elements
const cursor = document.querySelector('.magnetic-cursor');
const cursorDot = document.querySelector('.cursor-dot');
const cursorCircle = document.querySelector('.cursor-circle');
const cursorText = document.querySelector('.cursor-text');

// State variables
let mouseX = 0;
let mouseY = 0;
let cursorX = 0;
let cursorY = 0;
let magneticElements = [];
let isHovering = false;
let hoveringElement = null;
let textElements = [];

// Initialize cursor
document.addEventListener('DOMContentLoaded', initCursor);

/**
 * Initialize the magnetic cursor functionality
 */
function initCursor() {
  if (!cursor || !cursorDot || !cursorCircle) return;
  
  // Hide default cursor
  document.body.style.cursor = 'none';
  
  // Initial setup
  cursor.style.opacity = '0';
  
  // Show cursor when mouse enters the document
  document.addEventListener('mouseenter', () => {
    gsap.to(cursor, {
      opacity: 1,
      duration: 0.3,
      ease: 'power2.out'
    });
  });
  
  // Hide cursor when mouse leaves the document
  document.addEventListener('mouseleave', () => {
    gsap.to(cursor, {
      opacity: 0,
      duration: 0.3,
      ease: 'power2.out'
    });
  });
  
  // Track mouse position
  document.addEventListener('mousemove', trackMouse);
  
  // Add magnetic effect to interactive elements
  setupMagneticElements();
  
  // Start animation loop
  animateCursor();
}

/**
 * Track mouse position
 * @param {MouseEvent} e - Mouse event
 */
function trackMouse(e) {
  mouseX = e.clientX;
  mouseY = e.clientY;
  
  // If not hovering over a magnetic element, update cursor position directly
  if (!isHovering) {
    cursorX = mouseX;
    cursorY = mouseY;
  }
}

/**
 * Setup magnetic effect for interactive elements
 */
function setupMagneticElements() {
  // Get all interactive elements
  const links = document.querySelectorAll('a, button, .work-item, .testimonial-dot, .nav-toggle, .theme-toggle-track');
  
  // Process each element
  links.forEach(link => {
    magneticElements.push(link);
    
    // Add mouse events for magnetic effect
    link.addEventListener('mouseenter', () => handleElementEnter(link));
    link.addEventListener('mouseleave', handleElementLeave);
    link.addEventListener('mousemove', handleElementMove);
    
    // Prevent cursor flicker on click
    link.addEventListener('mousedown', () => {
      gsap.to(cursorDot, {
        scale: 0.7,
        duration: 0.2,
        ease: 'power2.out'
      });
    });
    
    link.addEventListener('mouseup', () => {
      gsap.to(cursorDot, {
        scale: 1,
        duration: 0.2,
        ease: 'power2.out'
      });
    });
    
    // Add special styling for text links
    if (link.classList.contains('text-link') || 
        link.classList.contains('work-item') || 
        link.classList.contains('journal-preview-item')) {
      textElements.push(link);
    }
  });
}

/**
 * Handle when mouse enters an interactive element
 * @param {HTMLElement} element - The element being hovered
 */
function handleElementEnter(element) {
  isHovering = true;
  hoveringElement = element;
  
  // Get element information
  const rect = element.getBoundingClientRect();
  const elementCenterX = rect.left + rect.width / 2;
  const elementCenterY = rect.top + rect.height / 2;
  
  // Store original element position
  element.originalX = elementCenterX;
  element.originalY = elementCenterY;
  
  // Style cursor based on element type
  if (textElements.includes(element)) {
    gsap.to(cursorCircle, {
      width: 80,
      height: 80,
      borderColor: 'rgba(201, 123, 90, 0.2)',
      backgroundColor: 'rgba(201, 123, 90, 0.1)',
      duration: 0.3,
      ease: 'power2.out'
    });
    
    if (element.classList.contains('work-item')) {
      cursorText.textContent = 'View';
      gsap.to(cursorText, {
        opacity: 1,
        duration: 0.3,
        ease: 'power2.out'
      });
    }
    
    // Add custom hover class
    element.classList.add('text-link-hover');
  } else {
    gsap.to(cursorCircle, {
      width: 60,
      height: 60,
      borderColor: 'rgba(201, 123, 90, 0.5)',
      backgroundColor: 'rgba(201, 123, 90, 0)',
      duration: 0.3,
      ease: 'power2.out'
    });
  }
  
  gsap.to(cursorDot, {
    backgroundColor: 'var(--color-accent)',
    scale: 1.2,
    duration: 0.3,
    ease: 'power2.out'
  });
}

/**
 * Handle when mouse leaves an interactive element
 */
function handleElementLeave() {
  isHovering = false;
  
  if (hoveringElement) {
    // Reset element class
    if (textElements.includes(hoveringElement)) {
      hoveringElement.classList.remove('text-link-hover');
    }
    
    // Reset magnetic element position
    if (hoveringElement._gsap) {
      gsap.to(hoveringElement, {
        x: 0,
        y: 0,
        duration: 0.3,
        ease: 'power2.out'
      });
    }
    
    hoveringElement = null;
  }
  
  // Reset cursor styles
  gsap.to(cursorCircle, {
    width: 40,
    height: 40,
    borderColor: 'var(--color-accent)',
    backgroundColor: 'transparent',
    duration: 0.3,
    ease: 'power2.out'
  });
  
  gsap.to(cursorDot, {
    backgroundColor: 'var(--color-accent)',
    scale: 1,
    duration: 0.3,
    ease: 'power2.out'
  });
  
  gsap.to(cursorText, {
    opacity: 0,
    duration: 0.3,
    ease: 'power2.out'
  });
}

/**
 * Handle mouse movement over an interactive element
 * @param {MouseEvent} e - Mouse event
 */
function handleElementMove(e) {
  if (!isHovering || !hoveringElement) return;
  
  // Calculate magnetic pull strength based on element size
  const rect = hoveringElement.getBoundingClientRect();
  const magneticStrength = Math.min(rect.width, rect.height) * 0.3;
  
  // Get mouse position relative to element center
  const elementCenterX = hoveringElement.originalX;
  const elementCenterY = hoveringElement.originalY;
  const distanceX = mouseX - elementCenterX;
  const distanceY = mouseY - elementCenterY;
  
  // Update cursor position with element attraction
  cursorX = mouseX - (distanceX * 0.2);
  cursorY = mouseY - (distanceY * 0.2);
  
  // Only apply magnetic effect to certain elements
  if (hoveringElement.tagName === 'A' || 
      hoveringElement.tagName === 'BUTTON' || 
      hoveringElement.classList.contains('work-item') ||
      hoveringElement.classList.contains('testimonial-dot')) {
    
    // Apply magnetic pull to element
    gsap.to(hoveringElement, {
      x: distanceX * 0.1,
      y: distanceY * 0.1,
      duration: 0.3,
      ease: 'power2.out'
    });
  }
}

/**
 * Animate cursor position with smooth easing
 */
function animateCursor() {
  // Smooth cursor movement
  const easing = 0.15;
  const dx = cursorX - cursorDot.getBoundingClientRect().left;
  const dy = cursorY - cursorDot.getBoundingClientRect().top;
  
  // Update cursor position with easing
  gsap.set(cursorDot, {
    x: cursorX,
    y: cursorY
  });
  
  gsap.to(cursorCircle, {
    x: cursorX,
    y: cursorY,
    duration: 0.15,
    ease: 'power2.out'
  });
  
  gsap.to(cursorText, {
    x: cursorX,
    y: cursorY,
    duration: 0.15,
    ease: 'power2.out'
  });
  
  // Continue animation loop
  requestAnimationFrame(animateCursor);
}

/**
 * Add magnetic effect to a new element dynamically
 * @param {HTMLElement} element - Element to add magnetic effect to
 * @param {boolean} isText - Whether this is a text element (for special styling)
 */
function addMagneticElement(element, isText = false) {
  if (!element) return;
  
  // Add to tracked elements
  magneticElements.push(element);
  
  // Add to text elements if specified
  if (isText) {
    textElements.push(element);
  }
  
  // Add event listeners
  element.addEventListener('mouseenter', () => handleElementEnter(element));
  element.addEventListener('mouseleave', handleElementLeave);
  element.addEventListener('mousemove', handleElementMove);
}