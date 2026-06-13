/** @type {import('next').NextConfig} */
const nextConfig = {
  // Static export so the site can be hosted anywhere (Vercel, GitHub Pages, etc.)
  output: "export",
  images: {
    // next/image optimization is unavailable in a static export.
    unoptimized: true,
  },
  // Emit trailing-slash directories so static hosts resolve routes cleanly.
  trailingSlash: true,
};

export default nextConfig;
