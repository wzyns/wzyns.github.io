import { getAllPaths, isDirectory, getDirectoryEntries, getPost } from "@/lib/posts";
import { formatDate } from "@/lib/date";
import { PageShell } from "@/components/page-shell";
import { FileExplorer } from "@/components/file-explorer";

export async function generateStaticParams() {
  const paths = getAllPaths();
  return paths.map(({ slug }) => ({ slug }));
}

export const dynamicParams = false;

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
