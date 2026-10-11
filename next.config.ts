import { existsSync } from "node:fs";
import type { NextConfig } from "next";

if (existsSync(".env.dev")) process.loadEnvFile(".env.dev");

const nextConfig: NextConfig = {
  cacheComponents: true,
  partialPrefetching: true,
  turbopack: {
    rules: {
      "*.css": {
        loaders: ["@tailwindcss/turbopack"],
        as: "*.css",
      },
    },
  },
};

export default nextConfig;
