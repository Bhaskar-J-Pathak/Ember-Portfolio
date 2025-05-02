/**
 * Preloader System
 * Creates a sophisticated loading animation before revealing the website
 */

// DOM Elements
const preloader = document.querySelector('.preloader');
const preloaderProgressFill = document.querySelector('.preloader-progress-fill');
const preloaderCounter = document.querySelector('.preloader-counter');

// State variables
let loadProgress = 0;
let imagesLoaded = 0;
let imagesTotal = 0;

// Initialize preloader when DOM is ready
document.addEventListener('DOMContentLoaded', initPreloader);

/**
 * Initialize preloader system
 */
function initPreloader() {
  if (!preloader || !preloaderProgressFill || !preloaderCounter) return;
  
  // Disable scroll while preloader is active
  document.body.classList.add('preloader-active');
  
  // Count all images to be loaded
  const images = document.querySelectorAll('img');
  imagesTotal = images.length;
  
  if (imagesTotal === 0) {
    // If no images, simulate loading progress
    simulateLoading();
  } else {
    // Track image loading progress
    images.forEach(img => {
      // Check if image is already loaded
      if (img.complete) {
        imageLoaded();
      } else {
        img.addEventListener('load', imageLoaded);
        img.addEventListener('error', imageLoaded); // Count error as loaded to avoid hanging
      }
    });
    
    // Safety timeout - ensure preloader completes even if some images fail
    setTimeout(() => {
      if (loadProgress < 100) {
        completePreloader();
      }
    },
    5000); // 5 second maximum preload time
  }
}

/**
 * Handle each image load
 */
function imageLoaded() {
  imagesLoaded++;
  const progress = Math.min(Math.round((imagesLoaded / imagesTotal) * 100), 100);
  updateProgress(progress);
  
  // Complete when all images are loaded
  if (imagesLoaded >= imagesTotal) {
    completePreloader();
  }
}

/**
 * Update visual progress indicators
 * @param {number} progress - Loading progress percentage
 */
function updateProgress(progress) {
  // Create a smoother animation by gradually approaching target
  const updateFn = () => {
    if (loadProgress < progress) {
      loadProgress++;
      preloaderProgressFill.style.width = `${loadProgress}%`;
      preloaderCounter.textContent = `${loadProgress}%`;
      
      if (loadProgress < progress) {
        requestAnimationFrame(updateFn);
      }
    }
  };
  
  updateFn();
}

/**
 * Simulate loading progress (when no images to track)
 */
function simulateLoading() {
  const totalDuration = 2000; // 2 second simulated loading
  const interval = 20;
  const steps = totalDuration / interval;
  const increment = 100 / steps;
  
  let currentProgress = 0;
  
  const loadingInterval = setInterval(() => {
    currentProgress += increment;
    
    if (currentProgress >= 100) {
      clearInterval(loadingInterval);
      currentProgress = 100;
      completePreloader();
    }
    
    updateProgress(Math.round(currentProgress));
  }, interval);
}

/**
 * Complete preloader animation and reveal site content
 */
function completePreloader() {
  // Ensure progress reaches 100%
  updateProgress(100);
  
  // Wait a moment at 100% before hiding
  setTimeout(() => {
    // Animate out preloader
    gsap.to(preloader, {
      opacity: 0,
      duration: 0.8,
      ease: 'power2.inOut',
      onComplete: () => {
        // Enable scroll and animations after preloader
        document.body.classList.remove('preloader-active');
        preloader.style.display = 'none';
        
        // Trigger page reveal animations
        document.dispatchEvent(new Event('preloaderComplete'));
      }
    });
  }, 400);
}

/**
 * Reset preloader (useful for page transitions)
 */
function resetPreloader() {
  if (!preloader) return;
  
  // Reset state
  loadProgress = 0;
  imagesLoaded = 0;
  imagesTotal = 0;
  
  // Reset visuals
  preloaderProgressFill.style.width = '0%';
  preloaderCounter.textContent = '0%';
  
  // Show preloader
  preloader.style.display = 'flex';
  preloader.style.opacity = '1';
  
  // Disable scroll
  document.body.classList.add('preloader-active');
  
  // Initialize preloader again
  initPreloader();
}