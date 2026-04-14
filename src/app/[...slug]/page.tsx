import type { Metadata } from "next";
import { getAllPaths, isDirectory, isMarkdown, getDirectoryEntries, getPost, getFileContent, highlightCode } from "@/lib/posts";
import { formatDate } from "@/lib/date";
import { PageShell } from "@/components/page-shell";
import { FileExplorer } from "@/components/file-explorer";

export async function generateStaticParams() {
  const paths = getAllPaths();
  return paths.map(({ slug }) => ({ slug }));
}

export const dynamicParams = false;

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string[] }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const fileName = slug[slug.length - 1];
  if (!isDirectory(slug)) {
    return { title: `${fileName} — wzyns` };
  }
  return {};
}

export default async function SlugPage({
  params,
}: {
  params: Promise<{ slug: string[] }>;
}) {
  const { slug } = await params;

  if (isDirectory(slug)) {
    const entries = getDirectoryEntries(slug);
    const parentHref = slug.length > 1 ? `/${slug.slice(0, -1).join("/")}` : "/";

    return (
      <PageShell segments={slug}>
        <FileExplorer entries={entries} parentHref={parentHref} />
      </PageShell>
    );
  }

  if (isMarkdown(slug)) {
    const post = await getPost(slug);

    return (
      <PageShell segments={slug}>
        <p className="mb-8 text-sm text-zinc-500 dark:text-zinc-400">
          {formatDate(post.createdAt)}
        </p>
        <article
          className="prose prose-zinc dark:prose-invert max-w-none font-sans"
          dangerouslySetInnerHTML={{ __html: post.content }}
        />
      </PageShell>
    );
  }

  const file = getFileContent(slug);
  const highlighted = await highlightCode(file.content, file.fileName);

  return (
    <PageShell segments={slug}>
      <p className="mb-8 text-sm text-zinc-500 dark:text-zinc-400">
        {formatDate(file.createdAt)}
      </p>
      <div
        className="overflow-x-auto rounded-md text-sm"
        dangerouslySetInnerHTML={{ __html: highlighted }}
      />
    </PageShell>
  );
}
