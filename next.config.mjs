/** @type {import('next').NextConfig} */
const nextConfig = {
  /* config options here */
  reactCompiler: true,
  
  async redirects() {
    return [
      {
        source: '/services/mobile-app-development',
        destination: '/services/mobile-apps',
        permanent: true,
      },
    ];
  },
};

export default nextConfig;