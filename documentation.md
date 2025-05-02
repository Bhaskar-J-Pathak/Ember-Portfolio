# PRISM: Creative Portfolio Theme
## Documentation

Thank you for using the PRISM creative portfolio theme! This document will guide you through the setup, customization, and usage of this theme.

## Table of Contents
1. [File Structure](#file-structure)
2. [Setup](#setup)
3. [Customization](#customization)
   - [Colors and Theme](#colors-and-theme)
   - [Typography](#typography)
   - [Images and Content](#images-and-content)
   - [Animations](#animations)
4. [Features](#features)
   - [Dark/Light Mode](#darklight-mode)
   - [Locomotive Scroll](#locomotive-scroll)
   - [Custom Cursor](#custom-cursor)
   - [Responsive Design](#responsive-design)
5. [Page Templates](#page-templates)
6. [Performance Optimization](#performance-optimization)
7. [Browser Compatibility](#browser-compatibility)
8. [Support](#support)

## File Structure

```
prism-theme/
├── index.html               # Homepage
├── portfolio.html           # Portfolio/work page
├── about.html               # About page
├── blog.html                # Blog page
├── contact.html             # Contact page
├── css/
│   ├── variables.css        # CSS variables and reset
│   ├── main.css             # Main styles
│   └── responsive.css       # Responsive styles
├── js/
│   ├── cursor.js            # Custom cursor functionality
│   ├── animations.js        # GSAP and Locomotive Scroll animations
│   └── main.js              # Navigation, theme switching, etc.
└── assets/
    └── images/              # Your images
```

## Setup

1. **Download the theme** and extract the files to your web server or local development environment.

2. **Open index.html** in a browser to view the homepage.

3. **Replace the placeholder content** with your own content (text, images, projects, etc.).

4. **Update navigation links** in all HTML files to ensure proper navigation between your pages.

## Customization

### Colors and Theme

All theme colors are defined as CSS variables in `css/variables.css`. The theme includes both light and dark mode color schemes.

To change the color palette:

1. Open `css/variables.css`
2. Modify the color variables under `:root` for light mode:
   ```css
   --accent-primary: #FF5C5C; /* Main accent color */
   --accent-secondary: #5C7AFF; /* Secondary accent */
   ```
3. Modify the dark mode colors under `[data-theme="dark"]`:
   ```css
   --accent-primary: #FF7A7A; /* Dark mode accent */
   --accent-secondary: #7A97FF; /* Dark mode secondary */
   ```

### Typography

The theme uses Google Fonts (Montserrat and Inter). To change the fonts:

1. Update the Google Fonts link in the `<head>` section of each HTML file.
2. Modify the font variables in `css/variables.css`:
   ```css
   --font-heading: 'Montserrat', sans-serif;
   --font-body: 'Inter', sans-serif;
   ```

### Images and Content

1. **Hero Video**: Replace the video in the hero section with your own video or use a static image.
2. **Portfolio Items**: Update the work items in the `.works-grid` with your project images and details.
3. **About Section**: Replace the about image and update your bio and skills.
4. **Testimonials**: Update testimonial text and images with your client feedback.
5. **Contact Information**: Update your contact details in the contact section.

### Animations

The theme uses GSAP for animations. You can customize these in `js/animations.js`:

1. **Hero Animation**: Modify the animation for hero title, description, and CTA.
2. **Scroll Effects**: Adjust the parallax and fade-in effects.
3. **Work Item Animations**: Change how work items animate when scrolled into view.

## Features

### Dark/Light Mode

The theme includes a toggle for switching between dark and light modes:

- The user's preference is saved in localStorage
- The theme will be remembered when they return to your site
- The toggle is located in the navigation bar

### Locomotive Scroll

Locomotive Scroll provides smooth scrolling effects:

- Configured in `js/animations.js`
- Uses data-scroll-section attributes for scroll containers
- For more options, refer to [Locomotive Scroll documentation](https://github.com/locomotivemtl/locomotive-scroll)

### Custom Cursor

The theme features a custom cursor that enhances the interactive experience:

- Follows mouse movement with a smooth animation
- Changes appearance when hovering over interactive elements
- Can be disabled by removing the related HTML and JS if desired

### Responsive Design

The theme is fully responsive and works well on all devices:

- Desktop-first approach with media queries for smaller screens
- Mobile navigation menu with toggle button
- Flexible grid layouts that adapt to different screen sizes
- Optimized images and typography for mobile devices

## Page Templates

The theme includes multiple page templates:

1. **Homepage** (index.html): Features hero section, work showcase, about, testimonials, and contact.
2. **Portfolio** (portfolio.html): Grid layout for projects with filtering options.
3. **About** (about.html): Detailed information about you or your brand.
4. **Blog** (blog.html): Clean layout for blog posts.
5. **Contact** (contact.html): Contact form and information.

## Performance Optimization

For optimal performance:

1. **Optimize images**: Compress all images before adding them to your site.
2. **Lazy loading**: The theme implements lazy loading for images to improve loading times.
3. **Minify CSS/JS**: For production, consider minifying the CSS and JS files.
4. **CDN usage**: The theme uses CDNs for external libraries (GSAP, Locomotive Scroll).

## Browser Compatibility

This theme is compatible with:
- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)
- Opera (latest)

## Support

For questions or support, please contact us at support@example.com or visit our website at https://example.com/support.

---

© 2025 PRISM Theme. All rights reserved.