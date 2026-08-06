import { createServer } from "node:http";
import { readFile, stat } from "node:fs/promises";
import { extname, join } from "node:path";
import { fileURLToPath } from "node:url";

const entry = await import("./dist/server/server.js");
const handler = entry.default?.fetch ?? entry.fetch;

const clientDir = fileURLToPath(new URL("./dist/client/", import.meta.url));
const port = Number(process.env.PORT || 3000);

const MIME = {
  ".html": "text/html; charset=utf-8",
  ".js": "text/javascript",
  ".mjs": "text/javascript",
  ".css": "text/css",
  ".json": "application/json",
  ".png": "image/png",
  ".jpg": "image/jpeg",
  ".jpeg": "image/jpeg",
  ".gif": "image/gif",
  ".svg": "image/svg+xml",
  ".webp": "image/webp",
  ".avif": "image/avif",
  ".ico": "image/x-icon",
  ".txt": "text/plain; charset=utf-8",
  ".xml": "application/xml",
  ".pdf": "application/pdf",
  ".woff": "font/woff",
  ".woff2": "font/woff2",
  ".ttf": "font/ttf",
  ".otf": "font/otf",
  ".mp4": "video/mp4",
  ".webm": "video/webm",
  ".map": "application/json",
};

function readBody(req) {
  return new Promise((resolve, reject) => {
    const chunks = [];
    req.on("data", (chunk) => chunks.push(chunk));
    req.on("end", () => resolve(Buffer.concat(chunks)));
    req.on("error", reject);
  });
}

async function serveStatic(url) {
  const pathname = decodeURIComponent(new URL(url).pathname);
  let filePath = join(clientDir, pathname);
  if (!filePath.startsWith(clientDir)) return null;

  try {
    const info = await stat(filePath);
    if (info.isDirectory()) filePath = join(filePath, "index.html");
    const body = await readFile(filePath);
    const ext = extname(filePath).toLowerCase();
    return new Response(body, {
      headers: {
        "Content-Type": MIME[ext] || "application/octet-stream",
        "Cache-Control":
          ext === ".html" ? "no-cache" : "public, max-age=31536000, immutable",
      },
    });
  } catch {
    return null;
  }
}

async function writeResponse(res, response) {
  const headers = Object.fromEntries(response.headers.entries());
  if (response.headers.has("set-cookie")) {
    headers["set-cookie"] = response.headers.getSetCookie();
  }
  res.writeHead(response.status, headers);
  if (response.body) {
    const reader = response.body.getReader();
    try {
      while (true) {
        const { done, value } = await reader.read();
        if (done) break;
        res.write(Buffer.from(value));
      }
    } finally {
      reader.releaseLock();
    }
  }
  res.end();
}

const server = createServer(async (req, res) => {
  try {
    const url = `http://${req.headers.host || `localhost:${port}`}${req.url}`;

    const staticResponse = await serveStatic(url);
    if (staticResponse) {
      await writeResponse(res, staticResponse);
      return;
    }

    const body =
      req.method === "GET" || req.method === "HEAD"
        ? undefined
        : await readBody(req);

    const request = new Request(url, {
      method: req.method,
      headers: req.headers,
      body,
      duplex: "half",
    });

    const response = await handler(request, {}, {});
    await writeResponse(res, response);
  } catch (err) {
    console.error(err);
    res.writeHead(500, { "Content-Type": "text/plain; charset=utf-8" });
    res.end("Internal Server Error");
  }
});

server.listen(port, () => {
  console.log(`Malanga 1 frontend listening on port ${port}`);
});
