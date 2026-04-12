import Link from "next/link";
import type { FileEntry } from "@/lib/posts";

function formatDate(date: Date): string {
  return date.toLocaleDateString("ko-KR", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
  });
}

export function FileExplorer({ entries }: { entries: FileEntry[] }) {
  return (
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
            <tr
              key={entry.path}
              className="border-b border-zinc-100 last:border-b-0 hover:bg-zinc-50 dark:border-zinc-800 dark:hover:bg-zinc-800/50"
            >
              <td className="px-4 py-2.5">
                <Link
                  href={`/${entry.path}`}
                  className="text-zinc-900 hover:text-blue-600 dark:text-zinc-100 dark:hover:text-blue-400"
                >
                  {entry.isDirectory ? "📁" : "📄"} {entry.name}
                </Link>
              </td>
              <td className="px-4 py-2.5 text-right text-zinc-500 dark:text-zinc-400 whitespace-nowrap">
                {formatDate(entry.modifiedAt)}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
