// A local preview of the exported files, with GitHub Pages-style subpath and 404
// handling. This server is only for local verification; GitHub hosts out/ directly.
import { createServer } from "node:http";
import { readFile, stat } from "node:fs/promises";
import { readFileSync } from "node:fs";
import { extname, resolve, sep } from "node:path";
import { parseArgs } from "node:util";

const { values } = parseArgs({
  options: {
    port: { type: "string", default: "3000" },
    hostname: { type: "string", default: "127.0.0.1" },
  },
});
const port = Number(values.port);
if (!Number.isInteger(port) || port < 1 || port > 65535) {
  throw new Error("Port must be an integer from 1 to 65535.");
}

const root = resolve("out");
let basePath;
try {
  await stat(resolve(root, "index.html"));
  ({ basePath = "" } = JSON.parse(
    readFileSync(".next/routes-manifest.json", "utf8"),
  ));
} catch {
  throw new Error(
    "Static export not found. Run npm run build before npm start.",
  );
}

const contentTypes = {
  ".html": "text/html; charset=utf-8",
  ".css": "text/css; charset=utf-8",
  ".js": "text/javascript; charset=utf-8",
  ".json": "application/json",
  ".txt": "text/plain; charset=utf-8",
  ".xml": "application/xml; charset=utf-8",
  ".svg": "image/svg+xml",
  ".png": "image/png",
  ".jpg": "image/jpeg",
  ".webp": "image/webp",
  ".ico": "image/x-icon",
  ".woff2": "font/woff2",
  ".pdf": "application/pdf",
};

const server = createServer(async (request, response) => {
  if (!["GET", "HEAD"].includes(request.method ?? "")) {
    response.writeHead(405, { Allow: "GET, HEAD" });
    response.end();
    return;
  }

  async function sendFile(file, status) {
    const bytes = await readFile(file);
    response.writeHead(status, {
      "Content-Type": contentTypes[extname(file)] ?? "application/octet-stream",
      "Content-Length": bytes.length,
    });
    response.end(request.method === "HEAD" ? undefined : bytes);
  }

  try {
    const url = new URL(request.url ?? "/", "http://localhost");
    const pathname = decodeURIComponent(url.pathname);
    if (basePath && pathname === basePath) {
      response.writeHead(308, { Location: `${basePath}/${url.search}` });
      response.end();
      return;
    }
    if (!pathname.startsWith(`${basePath}/`)) {
      await sendFile(resolve(root, "404.html"), 404);
      return;
    }
    let file = resolve(root, `.${pathname.slice(basePath.length)}`);
    if (file !== root && !file.startsWith(`${root}${sep}`)) {
      response.writeHead(403);
      response.end();
      return;
    }
    const info = await stat(file);
    if (info.isDirectory()) file = resolve(file, "index.html");
    await sendFile(file, 200);
  } catch (error) {
    if (response.headersSent) {
      response.destroy();
      return;
    }
    if (error instanceof URIError) {
      response.writeHead(400);
      response.end();
      return;
    }
    if (error.code === "ENOENT" || error.code === "ENOTDIR") {
      await sendFile(resolve(root, "404.html"), 404);
      return;
    }
    console.error(error);
    response.writeHead(500);
    response.end("Unable to read the static export.");
  }
});

server.listen(port, values.hostname, () => {
  console.log(
    `Static portfolio: http://${values.hostname}:${port}${basePath}/`,
  );
});
