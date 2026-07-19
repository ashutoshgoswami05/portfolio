import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Produce a self-contained build for lean Docker images.
  output: "standalone",
  reactStrictMode: true,
};

export default nextConfig;
