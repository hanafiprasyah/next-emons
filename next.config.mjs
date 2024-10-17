/** @type {import('next').NextConfig} */
const nextConfig = {
  // Ensure cookies are sent properly between domains
  crossOrigin: "use-credentials",
  // Enable gzip compression
  compress: true,
  // Helps detect potential issues in React components
  reactStrictMode: true,
  // Optional: Avoid trailing slashes in URLs if not needed
  trailingSlash: true,
  // Hide "x-powered-by" header for security
  poweredByHeader: false,
  // Optimize fonts for performance
  optimizeFonts: true,
  images: {
    // Use modern formats for images
    formats: ["image/webp", "image/avif"],
    remotePatterns: [
      {
        protocol: "https",
        // Allow images from your domain
        hostname: "*.emons.id",
        // Keep open if no specific port is required
        port: "",
      },
    ],
    // Cache images for at least 1 minute
    minimumCacheTTL: 60,
  },
  async headers() {
    return [
      {
        source: "/(.*)", // Apply these headers globally
        headers: [
          {
            key: "X-Frame-Options",
            value: "SAMEORIGIN", // Protect against clickjacking
          },
          {
            key: "X-Content-Type-Options",
            value: "nosniff", // Prevent MIME type sniffing
          },
          {
            key: "Strict-Transport-Security",
            value: "max-age=31536000; includeSubDomains; preload", // Force HTTPS
          },
          // {
          //   key: "Content-Security-Policy",
          //   value:
          //     "default-src 'self'; img-src 'self' *.emons.id https:; script-src 'self' 'unsafe-eval'; style-src 'self' 'unsafe-inline';", // Secure content loading
          // },
        ],
      },
    ];
  },
  async redirects() {
    return [
      {
        source: "/home",
        destination: "/",
        permanent: true, // 301 redirect for SEO benefits
      },
    ];
  },
  // experimental: {
  //   swcMinify: true,
  //   optimizeCss: true,
  // },
};

export default nextConfig;
