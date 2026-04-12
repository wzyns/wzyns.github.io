import { visit } from "unist-util-visit";
import type { Root, Image } from "mdast";
import path from "path";

export function remarkRewriteImages(slug: string[]) {
  const dir = slug.slice(0, -1).join("/");

  return () => (tree: Root) => {
    visit(tree, "image", (node: Image) => {
      if (node.url.startsWith("http") || node.url.startsWith("/")) return;

      const resolved = path.posix.normalize(
        dir ? `${dir}/${node.url}` : node.url
      );
      node.url = `/posts/${resolved}`;
    });
  };
}
