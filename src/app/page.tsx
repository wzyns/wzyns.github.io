import { getDirectoryEntries } from "@/lib/posts";
import { FileExplorer } from "@/components/file-explorer";

export default function Home() {
  const entries = getDirectoryEntries();

  return (
    <div className="flex flex-1 flex-col items-center bg-zinc-50 font-mono dark:bg-zinc-950">
      <main className="w-full max-w-3xl flex-1 px-4 py-12">
        <h1 className="mb-8 text-2xl font-bold text-zinc-900 dark:text-zinc-100">
          /posts
        </h1>
        <FileExplorer entries={entries} />
      </main>
    </div>
  );
}
