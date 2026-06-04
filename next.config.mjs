/** @type {import('next').NextConfig} */
const nextConfig = {


  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '4.imimg.com',
      },
    ],
  },
};

export default nextConfig;
