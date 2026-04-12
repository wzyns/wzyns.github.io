import { getDirectoryEntries } from "@/lib/posts";
import { Breadcrumb } from "@/components/breadcrumb";
import { FileExplorer } from "@/components/file-explorer";

export default function Home() {
  const entries = getDirectoryEntries();

  return (
    <div className="flex flex-1 flex-col items-center bg-zinc-50 font-mono dark:bg-zinc-950">
      <main className="w-full max-w-3xl flex-1 px-4 py-12">
        <Breadcrumb segments={[]} />
        <FileExplorer entries={entries} />
      </main>
    </div>
  );
}
