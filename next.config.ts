import { existsSync } from "node:fs";
import type { NextConfig } from "next";

if (existsSync(".env.dev")) process.loadEnvFile(".env.dev");

const isPages = process.env.GITHUB_PAGES === "true";
const basePath = isPages ? `/${process.env.REPO_NAME}` : "";

const nextConfig: NextConfig = {
  ...(isPages
    ? {
        output: "export",
        basePath,
        assetPrefix: basePath,
        trailingSlash: true,
        images: { unoptimized: true },
      }
    : {
        cacheComponents: true,
        partialPrefetching: true,
      }),
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