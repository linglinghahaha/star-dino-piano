import http from "node:http";
import fs from "node:fs";
import path from "node:path";

const rootDir = process.cwd();

const mimeTypes = {
  ".html": "text/html; charset=utf-8",
  ".js": "text/javascript; charset=utf-8",
  ".mjs": "text/javascript; charset=utf-8",
  ".css": "text/css; charset=utf-8",
  ".json": "application/json; charset=utf-8",
  ".png": "image/png",
  ".jpg": "image/jpeg",
  ".webp": "image/webp",
  ".svg": "image/svg+xml",
  ".mp3": "audio/mpeg",
  ".wav": "audio/wav",
  ".ogg": "audio/ogg",
  ".webmanifest": "application/manifest+json"
};

const server = http.createServer((req, res) => {
  const urlPath = req.url.split("?")[0];
  const relativePath = urlPath === "/" ? "index.html" : decodeURIComponent(urlPath.replace(/^\//, ""));
  const filePath = path.join(rootDir, relativePath);

  if (fs.existsSync(filePath) && fs.statSync(filePath).isFile()) {
    const ext = path.extname(filePath).toLowerCase();
    res.writeHead(200, {
      "Content-Type": mimeTypes[ext] || "application/octet-stream",
      "Cache-Control": "no-cache"
    });
    fs.createReadStream(filePath).pipe(res);
  } else {
    res.writeHead(404, { "Content-Type": "text/plain; charset=utf-8" });
    res.end("404 Not Found");
  }
});

function tryListen(port) {
  server.once("error", (err) => {
    if (err.code === "EADDRINUSE") {
      tryListen(port + 1);
    } else {
      console.error(err);
    }
  });
  server.listen(port, () => {
    console.log(`本地预览服务已启动: http://127.0.0.1:${port}/`);
  });
}

tryListen(8088);
