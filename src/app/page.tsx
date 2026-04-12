import Link from "next/link";
import { getDirectoryTree, type FileEntry } from "@/lib/posts";

function formatDate(date: Date): string {
  return date.toLocaleDateString("ko-KR", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
  });
}

function FileRow({ entry, depth = 0 }: { entry: FileEntry; depth?: number }) {
  return (
    <>
      <tr className="border-b border-zinc-100 last:border-b-0 hover:bg-zinc-50 dark:border-zinc-800 dark:hover:bg-zinc-800/50">
        <td className="px-4 py-2.5" style={{ paddingLeft: `${depth * 20 + 16}px` }}>
          {entry.isDirectory ? (
            <span className="text-zinc-700 dark:text-zinc-300">
              📁 {entry.name}
            </span>
          ) : (
            <Link
              href={`/${entry.path}`}
              className="text-zinc-900 hover:text-blue-600 dark:text-zinc-100 dark:hover:text-blue-400"
            >
              📄 {entry.name}
            </Link>
          )}
        </td>
        <td className="px-4 py-2.5 text-right text-zinc-500 dark:text-zinc-400 whitespace-nowrap">
          {formatDate(entry.modifiedAt)}
        </td>
      </tr>
      {entry.children?.map((child) => (
        <FileRow key={child.path} entry={child} depth={depth + 1} />
      ))}
    </>
  );
}

export default function Home() {
  const entries = getDirectoryTree();

  return (
    <div className="flex flex-1 flex-col items-center bg-zinc-50 font-mono dark:bg-zinc-950">
      <main className="w-full max-w-3xl flex-1 px-4 py-12">
        <h1 className="mb-8 text-2xl font-bold text-zinc-900 dark:text-zinc-100">
          /posts
        </h1>
        <div className="overflow-hidden rounded-lg border border-zinc-200 bg-white dark:border-zinc-800 dark:bg-zinc-900">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-zinc-200 text-left text-zinc-500 dark:border-zinc-800 dark:text-zinc-400">
                <th className="px-4 py-3 font-medium">Name</th>
                <th className="px-4 py-3 font-medium text-right">Modified</th>
              </tr>
            </thead>
            <tbody>
              {entries.map((entry) => (
                <FileRow key={entry.path} entry={entry} />
              ))}
            </tbody>
          </table>
        </div>
      </main>
    </div>
  );
}
