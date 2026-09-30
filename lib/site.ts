import "server-only";
import { existsSync } from "node:fs";
import path from "node:path";
import { personal } from "@/data/portfolio";
import { basePath, publicAssetPath } from "@/lib/paths";

export function getSiteUrl(): URL | undefined {
  const value = process.env.SITE_URL;
  if (!value) return undefined;

  const url = new URL(value);
  if (
    !["https:", "http:"].includes(url.protocol) ||
    url.username ||
    url.password ||
    url.search ||
    url.hash
  ) {
    throw new Error(
      "SITE_URL must be an HTTP(S) URL without credentials, a query, or a fragment.",
    );
  }
  const sitePath = url.pathname.replace(/\/+$/, "");
  if (sitePath !== basePath) {
    throw new Error(
      "SITE_URL's path must match NEXT_PUBLIC_BASE_PATH (for example, /potfolio-).",
    );
  }
  return new URL(`${url.origin}${sitePath}/`);
}

export function getResumeUrl(): string | undefined {
  const publicDirectory = path.join(process.cwd(), "public");
  const filePath = path.resolve(
    publicDirectory,
    personal.resumePath.replace(/^\/+/, ""),
  );

  if (!filePath.startsWith(`${publicDirectory}${path.sep}`)) return undefined;
  return existsSync(filePath)
    ? publicAssetPath(personal.resumePath)
    : undefined;
}
