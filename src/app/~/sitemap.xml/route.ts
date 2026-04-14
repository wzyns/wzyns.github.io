import path from "path";
import fs from "fs";
import { getAllPaths } from "@/lib/posts";

export const dynamic = "force-static";

const BASE_URL = "https://wzyns.github.io";
const postsDirectory = path.join(process.cwd(), "posts");

export function GET() {
  const allPaths = getAllPaths();

  const urls: { loc: string; lastmod: string }[] = [];

  // Home
  const homeLastmod = allPaths.reduce((latest, { slug }) => {
    const fullPath = path.join(postsDirectory, ...slug);
    const stat = fs.statSync(fullPath);
    return stat.mtime > latest ? stat.mtime : latest;
  }, new Date(0));

  urls.push({
    loc: BASE_URL + "/",
    lastmod: homeLastmod.toISOString(),
  });

  // All entries (directories + files)
  for (const { slug } of allPaths) {
    const fullPath = path.join(postsDirectory, ...slug);
    const stat = fs.statSync(fullPath);
    urls.push({
      loc: `${BASE_URL}/${slug.join("/")}`,
      lastmod: stat.mtime.toISOString(),
    });
  }

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls.map(({ loc, lastmod }) => `  <url>
    <loc>${loc}</loc>
    <lastmod>${lastmod}</lastmod>
  </url>`).join("\n")}
</urlset>`;

  return new Response(xml, {
    headers: { "Content-Type": "application/xml" },
  });
}
