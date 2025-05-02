/**
 * Performance Optimization
 * Implements various techniques to improve site performance
 */

// Initialize performance optimizations when DOM is ready
document.addEventListener('DOMContentLoaded', initPerformanceOptimizations);

/**
 * Initialize all performance optimizations
 */
function initPerformanceOptimizations() {
  lazyLoadImages();
  deferNonCriticalCSS();
  preloadCriticalAssets();
  optimizeFontLoading();
  initIntersectionObserver();
}

/**
 * Lazy load images that are not in the viewport
 */
function lazyLoadImages() {
  // Get all images with data-src attribute
  const lazyImages = document.querySelectorAll('img[data-src]');
  
  if (lazyImages.length === 0) return;
  
  // Check if IntersectionObserver is available
  if ('IntersectionObserver' in window) {
    const imageObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const img = entry.target;
          img.src = img.dataset.src;
          
          // If there's a srcset attribute
          if (img.dataset.srcset) {
            img.srcset = img.dataset.srcset;
          }
          
          img.classList.add('loaded');
          observer.unobserve(img);
        }
      });
    });
    
    lazyImages.forEach(img => {
      imageObserver.observe(img);
    });
  } else {
    // Fallback for browsers without IntersectionObserver
    // Load all images after a short delay
    setTimeout(() => {
      lazyImages.forEach(img => {
        img.src = img.dataset.src;
        if (img.dataset.srcset) {
          img.srcset = img.dataset.srcset;
        }
        img.classList.add('loaded');
      });
    }, 1000);
  }
}

/**
 * Defer loading of non-critical CSS
 */
function deferNonCriticalCSS() {
  const nonCriticalCSS = document.querySelectorAll('link[data-defer]');
  
  nonCriticalCSS.forEach(link => {
    // Store href and rel attributes
    const href = link.getAttribute('href');
    const rel = link.getAttribute('rel');
    
    // Set rel to preload to start downloading but not block rendering
    link.setAttribute('rel', 'preload');
    link.setAttribute('as', 'style');
    
    // Once the page has loaded, apply the CSS
    window.addEventListener('load', () => {
      setTimeout(() => {
        link.setAttribute('rel', rel);
        link.removeAttribute('as');
      }, 100);
    });
  });
}

/**
 * Preload critical assets
 */
function preloadCriticalAssets() {
  // Preload hero image or critical fonts
  const criticalAssets = [
    // Add critical image URLs here
    // Example: '/img/hero-image.jpg',
    // Add critical font URLs here
    // Example: '/fonts/example-font.woff2'
  ];
  
  criticalAssets.forEach(asset => {
    const preload = document.createElement('link');
    preload.rel = 'preload';
    preload.href = asset;
    
    // Set appropriate 'as' value based on asset type
    if (asset.endsWith('.woff2')) {
      preload.as = 'font';
      preload.setAttribute('crossorigin', 'anonymous');
    } else if (asset.match(/\.(jpe?g|png|webp|avif|gif)$/)) {
      preload.as = 'image';
    } else if (asset.match(/\.(js)$/)) {
      preload.as = 'script';
    } else if (asset.match(/\.(css)$/)) {
      preload.as = 'style';
    }
    
    document.head.appendChild(preload);
  });
}

/**
 * Optimize font loading
 */
function optimizeFontLoading() {
  // Add font-display: swap to all font-face definitions
  const style = document.createElement('style');
  style.textContent = `
    @font-face {
      font-display: swap;
    }
  `;
  document.head.appendChild(style);
  
  // Use Font Loading API if available
  if ('fonts' in document) {
    // List of critical fonts to load
    const fontFamilies = [
      { family: 'Space Grotesk', weight: '400' },
      { family: 'Space Grotesk', weight: '700' },
      { family: 'Cormorant', weight: '300' }
    ];
    
    Promise.all(
      fontFamilies.map(font => 
        document.fonts.load(`${font.weight} 1em ${font.family}`)
      )
    ).then(() => {
      document.documentElement.classList.add('fonts-loaded');
    });
  }
}

/**
 * Initialize Intersection Observer for content reveal animations
 * This improves performance by only animating when elements are visible
 */
function initIntersectionObserver() {
  // Get all elements that should animate on scroll
  const animatedElements = document.querySelectorAll('[data-animate]');
  
  if (animatedElements.length === 0) return;
  
  // Create observer
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const el = entry.target;
        const animation = el.dataset.animate;
        
        // Add animation class
        el.classList.add(animation);
        el.classList.add('animated');
        
        // Stop observing after animation
        observer.unobserve(el);
      }
    });
  }, {
    threshold: 0.1, // Trigger when at least 10% of the element is visible
    rootMargin: '0px 0px -50px 0px' // Adjust offset for earlier/later triggering
  });
  
  // Observe all elements
  animatedElements.forEach(el => {
    observer.observe(el);
  });
}

/**
 * Optimize JavaScript execution
 * This function implements techniques to reduce JavaScript execution time
 */
function optimizeJavaScriptExecution() {
  // Throttle scroll events
  function throttle(func, limit) {
    let inThrottle;
    return function() {
      const args = arguments;
      const context = this;
      if (!inThrottle) {
        func.apply(context, args);
        inThrottle = true;
        setTimeout(() => inThrottle = false, limit);
      }
    };
  }
  
  // Debounce resize events
  function debounce(func, wait) {
    let timeout;
    return function() {
      const context = this;
      const args = arguments;
      clearTimeout(timeout);
      timeout = setTimeout(() => func.apply(context, args), wait);
    };
  }
  
  // Apply throttle to scroll handlers
  const scrollHandlers = [];
  scrollHandlers.forEach(handler => {
    window.addEventListener('scroll', throttle(handler, 100));
  });
  
  // Apply debounce to resize handlers
  const resizeHandlers = [];
  resizeHandlers.forEach(handler => {
    window.addEventListener('resize', debounce(handler, 250));
  });
}

/**
 * Remove unused CSS
 * This is a placeholder function for development purposes
 * In production, use tools like PurgeCSS to remove unused CSS
 */
function removeUnusedCSS() {
  // This is a development helper - to be replaced with build tools like PurgeCSS
  console.log('Development note: Use PurgeCSS in your build process to remove unused CSS');
  // In a real implementation, this would integrate with your build process
}

/**
 * Cache API implementation for assets
 * This code would be part of a service worker
 */
/*
// This code should be added to your service worker file
const CACHE_NAME = 'portfolio-cache-v1';
const urlsToCache = [
  '/',
  '/css/variables.css',
  '/css/main.css',
  '/css/responsive.css',
  '/js/main.js',
  // Add more assets to cache
];

self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => {
        return cache.addAll(urlsToCache);
      })
  );
});

self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request)
      .then(response => {
        // Cache hit - return response
        if (response) {
          return response;
        }
        return fetch(event.request);
      }
    )
  );
});
*/

/**
 * Performance measurements
 * This function helps track and report performance metrics
 */
function measurePerformance() {
  // Check if Performance API is available
  if (window.performance && 'PerformanceObserver' in window) {
    // Create performance observer for Largest Contentful Paint
    const lcpObserver = new PerformanceObserver((entryList) => {
      const entries = entryList.getEntries();
      const lastEntry = entries[entries.length - 1];
      console.log('LCP:', lastEntry.startTime / 1000, 'seconds');
    });
    
    // Create performance observer for First Input Delay
    const fidObserver = new PerformanceObserver((entryList) => {
      const entries = entryList.getEntries();
      const firstInput = entries[0];
      console.log('FID:', firstInput.processingStart - firstInput.startTime, 'ms');
    });
    
    // Create performance observer for Cumulative Layout Shift
    const clsObserver = new PerformanceObserver((entryList) => {
      const entries = entryList.getEntries();
      let clsValue = 0;
      entries.forEach(entry => {
        if (!entry.hadRecentInput) {
          clsValue += entry.value;
        }
      });
      console.log('CLS:', clsValue);
    });
    
    // Start observing
    lcpObserver.observe({ type: 'largest-contentful-paint', buffered: true });
    fidObserver.observe({ type: 'first-input', buffered: true });
    clsObserver.observe({ type: 'layout-shift', buffered: true });
  }
}

// Call measure performance
// Comment out in production or use conditionally
// measurePerformance();