import fs from "fs";
import path from "path";

const postsDir = path.join(process.cwd(), "posts");
const destDir = path.join(process.cwd(), "public", "posts");

const imageExtensions = new Set([".png", ".jpg", ".jpeg", ".gif", ".svg", ".webp", ".avif", ".ico"]);

function copyAssets(srcDir: string, destBase: string) {
  const entries = fs.readdirSync(srcDir, { withFileTypes: true });
  for (const entry of entries) {
    const srcPath = path.join(srcDir, entry.name);
    const destPath = path.join(destBase, entry.name);
    if (entry.isDirectory()) {
      copyAssets(srcPath, destPath);
    } else if (imageExtensions.has(path.extname(entry.name).toLowerCase())) {
      fs.mkdirSync(path.dirname(destPath), { recursive: true });
      fs.copyFileSync(srcPath, destPath);
    }
  }
}

// Clean previous copy
if (fs.existsSync(destDir)) {
  fs.rmSync(destDir, { recursive: true });
}

copyAssets(postsDir, destDir);
