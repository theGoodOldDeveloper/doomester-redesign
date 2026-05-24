/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  devIndicators: false,
  images: {
    remotePatterns: [
      {
        protocol: 'http',
        hostname: 'localhost',
      },
    ],
    unoptimized: true,
    dangerouslyAllowSVG: false,
  },
  allowedDevOrigins: ['192.168.0.25'],
}

module.exports = nextConfig
