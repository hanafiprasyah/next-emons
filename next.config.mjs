/** @type {import('next').NextConfig} */
const nextConfig = {
  crossOrigin: "anonymous",
  reactStrictMode: false,
  optimizeFonts: true,
  images: {
    formats: ["image/webp", "image/avif"],
    remotePatterns: [
      {
        protocol: "https",
        hostname: "*.emons.id",
        port: "",
      },
      {
        protocol: "https",
        hostname: "*.unsplash.com",
        port: "",
      },
      {
        protocol: "https",
        hostname: "*.freepik.com",
        port: "",
      },
    ],
  },
  async headers() {
    return [
      {
        source: "/api/(.*)",
        headers: [
          {
            key: "X-API-Version",
            value: "1.0.0",
          },
          {
            key: "Content-Security-Policy",
            value: "default-src 'self'; script-src 'self'; object-src 'none';",
          },
          {
            key: "X-Content-Type-Options",
            value: "nosniff",
          },
          {
            key: "X-Frame-Options",
            value: "DENY",
          },
          {
            key: "X-XSS-Protection",
            value: "1; mode=block",
          },
          {
            key: "Cache-Control",
            value: "s-maxage=10",
          },
        ],
      },
    ];
  },
};

export default nextConfig;
