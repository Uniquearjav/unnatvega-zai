---
Task ID: 1-6
Agent: main
Task: Improve SEO, caching, hero background, and responsive design across all pages

Work Log:
- Updated next.config.ts with caching headers (HSTS, X-Content-Type-Options, X-Frame-Options, etc.), image optimization (avif/webp formats, 1-year cache TTL, quality settings)
- Created src/app/sitemap.ts for XML sitemap generation with all 4 pages
- Created src/app/robots.ts for search engine robots configuration
- Updated src/app/layout.tsx with comprehensive SEO metadata (Open Graph, Twitter cards, canonical URLs, structured data via JSON-LD for Organization, WebSite, LocalBusiness schemas)
- Added per-page metadata via server component page.tsx files for /about, /contact, /work
- Renamed client components to page-client.tsx pattern for SEO metadata support
- Updated API contact route with proper Cache-Control headers and email validation
- Generated hero background image (hero-bg.png) using AI image generation
- Added hero background with parallax scroll effect using framer-motion useScroll/useTransform
- Fixed work page to remove duplicate navigation/footer (now uses shared layout)
- Fixed about/contact 404 errors by converting layout.tsx to page.tsx pattern
- Improved responsive design across all pages: mobile-first spacing, min-h-[44px] touch targets, proper text scaling, scrollbar-hide utility
- Removed conflicting public/robots.txt file
- All pages verified returning 200, lint passes clean

Stage Summary:
- SEO: Full metadata, Open Graph, Twitter cards, JSON-LD structured data, sitemap.xml, robots.txt
- Caching: Security headers, static asset caching, image optimization, API no-store headers
- Hero: AI-generated background image with parallax scroll effect and dark overlay
- Responsive: Mobile-first breakpoints, 44px touch targets, proper text scaling, hidden scrollbars
- Work page: Cleaned up (removed ~200 lines of duplicate nav/footer code)
- All 4 pages + sitemap + robots returning 200
