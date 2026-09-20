export default function sitemap() {
  // Update this to your custom domain (e.g., 'https://syncward.com') once purchased
  const baseUrl = 'https://syncwardtech.vercel.app';

  // Public endpoints extracted directly from your build logs
  const routes = [
    '',
    '/about',
    '/services',
    '/services/ai-automation',
    '/services/cloud-api',
    '/services/custom-software',
    '/services/e-commerce',
    '/services/maintenance-support',
    '/services/mobile-app-development',
    '/services/ui-ux-design',
    '/services/web-development',
    '/industries',
    '/technologies',
    '/work',
    '/contact',
    '/privacy-policy',
    '/terms'
  ];

  return routes.map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: route === '' ? 'weekly' : 'monthly',
    // Homepage gets highest priority, services are secondary, legal/info pages are lowest
    priority: route === '' ? 1 : route.startsWith('/services') ? 0.8 : 0.6,
  }));
}