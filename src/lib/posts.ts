import fs from "fs";
import path from "path";
import { remark } from "remark";
import remarkGfm from "remark-gfm";
import remarkHtml from "remark-html";

const postsDirectory = path.join(process.cwd(), "posts");

export interface FileEntry {
  name: string;
  path: string;
  isDirectory: boolean;
  modifiedAt: Date;
  children?: FileEntry[];
}

export interface Post {
  slug: string[];
  fileName: string;
  content: string;
  createdAt: Date;
  modifiedAt: Date;
}

export function getDirectoryTree(dirPath: string[] = []): FileEntry[] {
  const fullPath = path.join(postsDirectory, ...dirPath);
  const entries = fs.readdirSync(fullPath, { withFileTypes: true });

  return entries
    .filter((entry) => entry.isDirectory() || entry.name.endsWith(".md"))
    .map((entry) => {
      const entryPath = path.join(fullPath, entry.name);
      const stat = fs.statSync(entryPath);
      const segments = [...dirPath, entry.name];
      const slugPath = segments.join("/");

      const result: FileEntry = {
        name: entry.name,
        path: slugPath,
        isDirectory: entry.isDirectory(),
        modifiedAt: stat.mtime,
      };

      if (entry.isDirectory()) {
        result.children = getDirectoryTree(segments);
      }

      return result;
    })
    .sort((a, b) => a.name.localeCompare(b.name));
}

export function getAllPostSlugs(): string[][] {
  const slugs: string[][] = [];

  function walk(dir: string, segments: string[]) {
    const entries = fs.readdirSync(dir, { withFileTypes: true });
    for (const entry of entries) {
      const entrySegments = [...segments, entry.name];
      if (entry.isDirectory()) {
        walk(path.join(dir, entry.name), entrySegments);
      } else if (entry.name.endsWith(".md")) {
        slugs.push(entrySegments);
      }
    }
  }

  walk(postsDirectory, []);
  return slugs;
}

export async function getPost(slug: string[]): Promise<Post> {
  const filePath = path.join(postsDirectory, ...slug);
  const fileContent = fs.readFileSync(filePath, "utf-8");
  const stat = fs.statSync(filePath);

  const result = await remark().use(remarkGfm).use(remarkHtml).process(fileContent);

  return {
    slug,
    fileName: slug[slug.length - 1],
    content: result.toString(),
    createdAt: stat.birthtime,
    modifiedAt: stat.mtime,
  };
}
