/** @type {import('next').NextConfig} */
const nextConfig = {
  /* config options here */
  typescript: {
    ignoreBuildErrors: true,
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'placehold.co',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https'
        ,
        hostname: 'picsum.photos',
        port: '',
        pathname: '/**',
      },
    ],
  },
   env: {
    NEXT_PUBLIC_GOOGLE_MAPS_API_KEY: "AIzaSyCg3Kplz0Ne1x8RQK2-9wzZFm1F1bRf5T4",
  },
  devIndicators: {
    allowedDevOrigins: [
      "*.cloudworkstations.dev"
    ],
  },
};

module.exports = nextConfig;
