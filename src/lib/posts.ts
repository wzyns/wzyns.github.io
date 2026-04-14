import fs from "fs";
import path from "path";
import { unified } from "unified";
import remarkParse from "remark-parse";
import remarkGfm from "remark-gfm";
import remarkRehype from "remark-rehype";
import rehypeSlug from "rehype-slug";
import rehypeAutolinkHeadings from "rehype-autolink-headings";
import rehypeStringify from "rehype-stringify";
import { remarkRewriteImages } from "./remark-rewrite-images";

const postsDirectory = path.join(process.cwd(), "posts");

export interface FileEntry {
  name: string;
  path: string;
  isDirectory: boolean;
  modifiedAt: Date;
}

export interface Post {
  slug: string[];
  fileName: string;
  content: string;
  createdAt: Date;
  modifiedAt: Date;
}

export function getDirectoryEntries(dirPath: string[] = []): FileEntry[] {
  const fullPath = path.join(postsDirectory, ...dirPath);
  const entries = fs.readdirSync(fullPath, { withFileTypes: true });

  return entries
    .filter((entry) => entry.isDirectory() || entry.name.endsWith(".md"))
    .map((entry) => {
      const entryPath = path.join(fullPath, entry.name);
      const stat = fs.statSync(entryPath);
      const segments = [...dirPath, entry.name];

      return {
        name: entry.name,
        path: segments.join("/"),
        isDirectory: entry.isDirectory(),
        modifiedAt: stat.mtime,
      };
    })
    .sort((a, b) => a.name.localeCompare(b.name));
}

export function getAllPaths(): { slug: string[]; isDirectory: boolean }[] {
  const paths: { slug: string[]; isDirectory: boolean }[] = [];

  function walk(dir: string, segments: string[]) {
    const entries = fs.readdirSync(dir, { withFileTypes: true });
    for (const entry of entries) {
      const entrySegments = [...segments, entry.name];
      if (entry.isDirectory()) {
        paths.push({ slug: entrySegments, isDirectory: true });
        walk(path.join(dir, entry.name), entrySegments);
      } else if (entry.name.endsWith(".md")) {
        paths.push({ slug: entrySegments, isDirectory: false });
      }
    }
  }

  walk(postsDirectory, []);
  return paths;
}

export function isDirectory(slug: string[]): boolean {
  const fullPath = path.join(postsDirectory, ...slug);
  return fs.statSync(fullPath).isDirectory();
}

export async function getPost(slug: string[]): Promise<Post> {
  const filePath = path.join(postsDirectory, ...slug);
  const fileContent = fs.readFileSync(filePath, "utf-8");
  const stat = fs.statSync(filePath);

  const result = await unified()
    .use(remarkParse)
    .use(remarkGfm)
    .use(remarkRewriteImages(slug))
    .use(remarkRehype)
    .use(rehypeSlug)
    .use(rehypeAutolinkHeadings, {
      behavior: "append",
      properties: { className: ["heading-anchor"], ariaHidden: true, tabIndex: -1 },
      content: {
        type: "element",
        tagName: "span",
        properties: { className: ["heading-anchor-icon"] },
        children: [{ type: "text", value: "#" }],
      },
    })
    .use(rehypeStringify)
    .process(fileContent);

  return {
    slug,
    fileName: slug[slug.length - 1],
    content: result.toString(),
    createdAt: stat.birthtime,
    modifiedAt: stat.mtime,
  };
}
