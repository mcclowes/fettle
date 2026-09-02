/** @type {import('next').NextConfig} */
const nextConfig = {
  images: { unoptimized: true },
  async rewrites() {
    return {
      beforeFiles: [],
      afterFiles: [
        { source: "/docs", destination: "/docs/index.html" },
        { source: "/docs/:path*", destination: "/docs/:path*/index.html" },
      ],
      fallback: [],
    };
  },
};

export default nextConfig;
