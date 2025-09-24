import path from "path";
import { fileURLToPath } from "url";
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const nextConfig = {
  transpilePackages: ["@repo/ui"],
  output: "standalone", // Enable standalone output for Docker
  webpack: (config) => {
    config.resolve.alias = {
      ...config.resolve.alias,
      "@": path.resolve(__dirname, "./"), // Adjust if your base alias root is different
    };
    return config;
  },
};

export default nextConfig;
