/** @type {import('next').NextConfig} */
const nextConfig = {
  crossOrigin: "anonymous",
  reactStrictMode: false,
  optimizeFonts: true,
  images: {
    remotePatterns: [
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
};

export default nextConfig;
