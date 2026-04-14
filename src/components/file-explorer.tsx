import Link from "next/link";
import type { FileEntry } from "@/lib/posts";
import { LocalDate } from "@/components/local-date";

function FolderIcon() {
  return (
    <svg aria-hidden="true" className="inline-block mr-2 text-blue-400" width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
      <path d="M1.75 1A1.75 1.75 0 0 0 0 2.75v10.5C0 14.216.784 15 1.75 15h12.5A1.75 1.75 0 0 0 16 13.25v-8.5A1.75 1.75 0 0 0 14.25 3H7.5a.25.25 0 0 1-.2-.1l-.9-1.2C6.07 1.26 5.55 1 5 1H1.75Z" />
    </svg>
  );
}

function FileIcon() {
  return (
    <svg aria-hidden="true" className="inline-block mr-2 text-zinc-400 dark:text-zinc-500" width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
      <path d="M2 1.75C2 .784 2.784 0 3.75 0h6.586c.464 0 .909.184 1.237.513l2.914 2.914c.329.328.513.773.513 1.237v9.586A1.75 1.75 0 0 1 13.25 16h-9.5A1.75 1.75 0 0 1 2 14.25Zm1.75-.25a.25.25 0 0 0-.25.25v12.5c0 .138.112.25.25.25h9.5a.25.25 0 0 0 .25-.25V6h-2.75A1.75 1.75 0 0 1 9 4.25V1.5Zm6.75.062V4.25c0 .138.112.25.25.25h2.688l-.011-.013-2.914-2.914-.013-.011Z" />
    </svg>
  );
}

export function FileExplorer({
  entries,
  parentHref,
}: {
  entries: FileEntry[];
  parentHref?: string;
}) {
  return (
    <div className="overflow-hidden rounded-md border border-zinc-300 dark:border-zinc-700">
      <table className="w-full text-sm">
        <thead>
          <tr className="bg-zinc-100 border-b border-zinc-300 dark:bg-zinc-800 dark:border-zinc-700">
            <th className="px-4 py-2.5 text-left font-semibold text-zinc-700 dark:text-zinc-300">Name</th>
            <th className="px-4 py-2.5 text-right font-semibold text-zinc-700 dark:text-zinc-300">Last modified</th>
          </tr>
        </thead>
        <tbody className="bg-white dark:bg-zinc-900">
          {parentHref != null && (
            <tr className="border-b border-zinc-200 hover:bg-zinc-50 dark:border-zinc-800 dark:hover:bg-zinc-800/60">
              <td className="px-4 py-2" colSpan={2}>
                <Link href={parentHref} className="text-zinc-700 hover:underline dark:text-zinc-300">
                  <FolderIcon />..
                </Link>
              </td>
            </tr>
          )}
          {entries.map((entry) => (
            <tr
              key={entry.path}
              className="border-b border-zinc-200 last:border-b-0 hover:bg-zinc-50 dark:border-zinc-800 dark:hover:bg-zinc-800/60"
            >
              <td className="px-4 py-2">
                <Link
                  href={`/${entry.path}`}
                  className="text-blue-600 hover:underline dark:text-blue-400"
                >
                  {entry.isDirectory ? <FolderIcon /> : <FileIcon />}
                  {entry.name}
                </Link>
              </td>
              <td className="px-4 py-2 text-right text-zinc-500 dark:text-zinc-400 whitespace-nowrap">
                <LocalDate date={entry.modifiedAt.toISOString()} />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
