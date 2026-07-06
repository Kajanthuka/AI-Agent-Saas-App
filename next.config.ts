import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  allowedDevOrigins: ["192.168.40.118"],
  reactCompiler: true,
  output: "standalone",
};

export default nextConfig;
