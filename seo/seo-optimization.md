# SEO Optimization Guide

This document provides guidelines for optimizing your portfolio website for search engines.

## Table of Contents
1. [Meta Tags and Headers](#meta-tags-and-headers)
2. [Content Optimization](#content-optimization)
3. [Image Optimization](#image-optimization)
4. [Technical SEO](#technical-seo)
5. [Schema.org Structured Data](#schema-org-structured-data)
6. [Sample Implementation](#sample-implementation)

## Meta Tags and Headers

### Essential Meta Tags
- **Title Tag**: Keep it under 60 characters. Include your name and profession.
  - Example: "Alex Morgan | Professional Photographer & Visual Storyteller"
- **Meta Description**: Write a compelling description under 160 characters.
  - Example: "Alex Morgan is a NYC-based photographer specializing in portrait, landscape, and commercial photography. View portfolio and schedule a session."
- **Canonical URL**: Prevent duplicate content issues.
- **Viewport Meta Tag**: Ensure mobile-friendly rendering.

### Header Structure
- Use a single `<h1>` tag per page for the main title
- Maintain a logical hierarchy of headings (h1 → h2 → h3, etc.)
- Include relevant keywords in headings
- Keep headings descriptive and natural-sounding

## Content Optimization

### Keywords
- Research relevant keywords for photographers/your specialty
- Include keywords naturally in:
  - Headings
  - First paragraph
  - Image alt text
  - URL structures
  - Meta tags

### Quality Content Guidelines
- Create unique descriptions for each project/portfolio item
- Include technical details about your work (equipment, techniques)
- Tell the story behind your photographs
- Update your content regularly (blog posts, new projects)
- Aim for at least 300 words of unique content per page

## Image Optimization

### File Optimization
- Use descriptive, keyword-rich filenames (e.g., "nyc-street-portrait-photography.jpg")
- Compress images without losing quality
- Consider using WebP format with fallbacks
- Implement responsive images with srcset
- Add width and height attributes to prevent layout shifts

### Alt Text
- Write descriptive alt text for all images
- Include relevant keywords naturally
- Keep alt text concise (under 125 characters)
- Be specific about what's in the image

## Technical SEO

### Performance
- Aim for fast loading times (under 3 seconds)
- Minimize render-blocking resources
- Implement lazy loading for images
- Use browser caching
- Optimize CSS delivery

### Mobile Friendliness
- Ensure responsive design works on all devices
- Test using Google's Mobile-Friendly Test tool
- Use appropriately sized tap targets
- Avoid intrusive interstitials

### URL Structure
- Use clean, descriptive URLs
- Include keywords when relevant
- Keep URLs short and readable
- Use hyphens to separate words
- Create a logical site structure

### Additional Technical Aspects
- Implement an XML sitemap
- Create a robots.txt file
- Set up proper redirects (301) for changed URLs
- Fix broken links and 404 errors
- Enable HTTPS for your entire site

## Schema.org Structured Data

### Person Schema
Implement schema.org markup for yourself as a photographer:
```json
{
  "@context": "https://schema.org",
  "@type": "Person",
  "name": "Alex Morgan",
  "jobTitle": "Professional Photographer",
  "url": "https://www.alexmorgan.com",
  "sameAs": [
    "https://www.instagram.com/alexmorgan",
    "https://www.linkedin.com/in/alexmorgan"
  ],
  "image": "https://www.alexmorgan.com/img/alex-morgan-profile.jpg",
  "address": {
    "@type": "PostalAddress",
    "addressLocality": "New York",
    "addressRegion": "NY"
  },
  "email": "contact@alexmorgan.com",
  "telephone": "+12125550123"
}
```

### Creative Work Schema
For your photography portfolio items:
```json
{
  "@context": "https://schema.org",
  "@type": "Photograph",
  "name": "Urban Expressions Series",
  "author": {
    "@type": "Person",
    "name": "Alex Morgan"
  },
  "description": "A series of candid street portraits in NYC capturing authentic moments.",
  "image": "https://www.alexmorgan.com/img/urban-expressions.jpg",
  "datePublished": "2024-02-15"
}
```

## Sample Implementation

Here's a commented-out example of how to implement these SEO optimizations in your HTML:

```html
<!-- Meta tags -->
<!--
<head>
  <meta charset="UTF-8">
  <title>Alex Morgan | Professional Photographer & Visual Storyteller</title>
  <meta name="description" content="Alex Morgan is a NYC-based photographer specializing in portrait, landscape, and commercial photography. View portfolio and schedule a session.">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <link rel="canonical" href="https://www.alexmorgan.com">
  
  <!-- Open Graph tags -->
  <meta property="og:title" content="Alex Morgan | Professional Photographer">
  <meta property="og:description" content="NYC-based photographer specializing in portrait, landscape, and commercial photography.">
  <meta property="og:image" content="https://www.alexmorgan.com/img/og-image.jpg">
  <meta property="og:url" content="https://www.alexmorgan.com">
  <meta property="og:type" content="website">
  
  <!-- Twitter Card tags -->
  <meta name="twitter:card" content="summary_large_image">
  <meta name="twitter:title" content="Alex Morgan | Professional Photographer">
  <meta name="twitter:description" content="NYC-based photographer specializing in portrait, landscape, and commercial photography.">
  <meta name="twitter:image" content="https://www.alexmorgan.com/img/twitter-card.jpg">
  
  <!-- Structured data -->
  <script type="application/ld+json">
    {
      "@context": "https://schema.org",
      "@type": "Person",
      "name": "Alex Morgan",
      "jobTitle": "Professional Photographer",
      "url": "https://www.alexmorgan.com",
      "sameAs": [
        "https://www.instagram.com/alexmorgan",
        "https://www.linkedin.com/in/alexmorgan"
      ],
      "image": "https://www.alexmorgan.com/img/alex-morgan-profile.jpg",
      "address": {
        "@type": "PostalAddress",
        "addressLocality": "New York",
        "addressRegion": "NY"
      },
      "email": "contact@alexmorgan.com",
      "telephone": "+12125550123"
    }
  </script>
</head>
-->

<!-- Example of optimized image implementation -->
<!--
<img 
  src="img/urban-portraits-small.jpg"
  srcset="img/urban-portraits-small.jpg 400w,
          img/urban-portraits-medium.jpg 800w,
          img/urban-portraits-large.jpg 1200w"
  sizes="(max-width: 600px) 400px,
         (max-width: 1200px) 800px,
         1200px"
  alt="Street portrait of woman in SoHo with dramatic lighting and urban backdrop"
  width="800"
  height="600"
  loading="lazy"
>
-->
```

### Implementation Steps

1. Add the meta tags to the `<head>` section of each page
2. Implement the structured data appropriate for your content
3. Optimize image delivery using responsive techniques
4. Create unique title and meta description for each page
5. Ensure content is properly structured with semantic HTML
6. Test implementation using tools like Google's Rich Results Test