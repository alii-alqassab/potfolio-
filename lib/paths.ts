// Next.js automatically prefixes its own bundles and Link components.
// Plain public-file URLs (icons and the CV) need the same prefix explicitly.
export const basePath = (process.env.NEXT_PUBLIC_BASE_PATH ?? "").replace(
  /\/+$/,
  "",
);

export function publicAssetPath(file: string): string {
  return `${basePath}/${file.replace(/^\/+/, "")}`;
}
