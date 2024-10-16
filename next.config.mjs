/** @type {import('next').NextConfig} */
const nextConfig = {
  crossOrigin: "use-credentials",
  compress: true,
  reactStrictMode: true,
  trailingSlash: true,
  // poweredByHeader: false,
  optimizeFonts: true,
  images: {
    formats: ["image/webp", "image/avif"],
    remotePatterns: [
      {
        protocol: "https",
        hostname: "*.emons.id",
        port: "",
      },
    ],
  },
};

export default nextConfig;
