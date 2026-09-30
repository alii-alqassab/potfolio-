import type { NextConfig } from "next";

const basePath = (process.env.NEXT_PUBLIC_BASE_PATH ?? "").replace(/\/+$/, "");

if (basePath && !/^\/[A-Za-z0-9._/-]+$/.test(basePath)) {
  throw new Error(
    "NEXT_PUBLIC_BASE_PATH must be a URL path such as /potfolio-.",
  );
}

const nextConfig: NextConfig = {
  output: "export",
  basePath,
  trailingSlash: true,
  images: { unoptimized: true },
  poweredByHeader: false,
};

export default nextConfig;
