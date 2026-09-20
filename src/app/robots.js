export default function robots() {
  const baseUrl = 'https://syncwardtech.vercel.app';

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