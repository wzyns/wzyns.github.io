import { getAllPaths, isDirectory, getDirectoryEntries, getPost } from "@/lib/posts";
import { Breadcrumb } from "@/components/breadcrumb";
import { FileExplorer } from "@/components/file-explorer";

export async function generateStaticParams() {
  const paths = getAllPaths();
  return paths.map(({ slug }) => ({ slug }));
}

export const dynamicParams = false;

function formatDate(date: Date): string {
  return date.toLocaleDateString("ko-KR", {
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
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
      <div className="flex flex-1 flex-col items-center bg-zinc-50 font-mono dark:bg-zinc-950">
        <main className="w-full max-w-3xl flex-1 px-4 py-12">
          <Breadcrumb segments={slug} />
          <FileExplorer entries={entries} parentHref={parentHref} />
        </main>
      </div>
    );
  }

  const post = await getPost(slug);

  return (
    <div className="flex flex-1 flex-col items-center bg-zinc-50 font-sans dark:bg-zinc-950">
      <main className="w-full max-w-3xl flex-1 px-4 py-12">
        <div className="mb-8">
          <Breadcrumb segments={slug} />
          <p className="text-sm text-zinc-500 dark:text-zinc-400">
            {formatDate(post.createdAt)}
          </p>
        </div>
        <article
          className="prose prose-zinc dark:prose-invert max-w-none"
          dangerouslySetInnerHTML={{ __html: post.content }}
        />
      </main>
    </div>
  );
}
