import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // le-rl.com/vienvo serves the archived Vienvo site: a static export (built from
  // C:\Local_Projects\Vienvo_Archive) copied into public/vienvo. Real files there (JS, CSS,
  // images) are served directly; these map page URLs to their exported index.html.
  async rewrites() {
    return [
      { source: "/vienvo", destination: "/vienvo/index.html" },
      { source: "/vienvo/:path*", destination: "/vienvo/:path*/index.html" },
    ];
  },
};

export default nextConfig;
