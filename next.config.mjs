/** @type {import('next').NextConfig} */

const isDevelopment = process.env.NODE_ENV === "development";

// const cspHeader = `
//   default-src 'self';
//   script-src 'self' https://maps.googleapis.com https://maps.gstatic.com 'unsafe-inline' 'unsafe-eval';
//   style-src 'self' 'unsafe-inline' https://fonts.googleapis.com;
//   img-src 'self' blob: data: https://maps.gstatic.com https://*.googleapis.com;
//   font-src 'self' https://fonts.gstatic.com;
//   object-src 'none';
//   base-uri 'self';
//   form-action 'self';
//   frame-ancestors 'none';
//   connect-src 'self' https://maps.googleapis.com https://*.googleapis.com;
//   upgrade-insecure-requests;
// `;

const nextConfig = {
  // Ensure cookies are sent properly between domains
  crossOrigin: "use-credentials",
  // Enable gzip compression
  compress: true,
  // Helps detect potential issues in React components
  reactStrictMode: isDevelopment ? true : false,
  // Optional: Avoid trailing slashes in URLs if not needed
  trailingSlash: true,
  // Hide "x-powered-by" header for security
  poweredByHeader: false,
  // Optimize fonts for performance
  optimizeFonts: true,
  // Image opt on production, disable it on development mode
  // output: "standalone",
  // Images
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
  async redirects() {
    return [
      {
        source: "/home",
        destination: "/",
        permanent: true, // 301 redirect for SEO benefits
      },
    ];
  },
};

export default nextConfig;
