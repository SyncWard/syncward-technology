export default function robots() {
  const baseUrl = 'https://www.syncwardtech.co.in';

  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: [
        '/admin/', 
        '/api/'
      ],
    },
    sitemap: `${baseUrl}/sitemap.xml`,
  };
}