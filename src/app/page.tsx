import { getDirectoryEntries } from "@/lib/posts";
import { PageShell } from "@/components/page-shell";
import { FileExplorer } from "@/components/file-explorer";

export default function Home() {
  const entries = getDirectoryEntries();

  return (
    <PageShell segments={[]}>
      <FileExplorer entries={entries} />
    </PageShell>
  );
}
