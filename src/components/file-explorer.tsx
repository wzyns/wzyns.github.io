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

const iconClass = "inline-block mr-2 text-zinc-400 dark:text-zinc-500";

function FileIcon() {
  return (
    <svg aria-hidden="true" className={iconClass} width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
      <path d="M2 1.75C2 .784 2.784 0 3.75 0h6.586c.464 0 .909.184 1.237.513l2.914 2.914c.329.328.513.773.513 1.237v9.586A1.75 1.75 0 0 1 13.25 16h-9.5A1.75 1.75 0 0 1 2 14.25Zm1.75-.25a.25.25 0 0 0-.25.25v12.5c0 .138.112.25.25.25h9.5a.25.25 0 0 0 .25-.25V6h-2.75A1.75 1.75 0 0 1 9 4.25V1.5Zm6.75.062V4.25c0 .138.112.25.25.25h2.688l-.011-.013-2.914-2.914-.013-.011Z" />
    </svg>
  );
}

function MarkdownIcon() {
  return (
    <svg aria-hidden="true" className={iconClass} width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
      <path d="M14.85 3c.63 0 1.15.52 1.14 1.15v7.7c0 .63-.51 1.15-1.15 1.15H1.15C.52 13 0 12.48 0 11.84V4.15C0 3.52.52 3 1.15 3ZM9 11V5H7L5.5 7 4 5H2v6h2V8l1.5 1.92L7 8v3Zm2.99.5L14.5 8H13V5h-2v3H9.5Z" />
    </svg>
  );
}

function CodeFileIcon() {
  return (
    <svg aria-hidden="true" className={iconClass} width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
      <path d="M4 1.75C4 .784 4.784 0 5.75 0h5.586c.464 0 .909.184 1.237.513l2.914 2.914c.329.328.513.773.513 1.237v8.586A1.75 1.75 0 0 1 14.25 15h-9a.75.75 0 0 1 0-1.5h9a.25.25 0 0 0 .25-.25V6h-2.75A1.75 1.75 0 0 1 10 4.25V1.5H5.75a.25.25 0 0 0-.25.25v2.5a.75.75 0 0 1-1.5 0Zm1.72 4.97a.75.75 0 0 1 1.06 0l2 2a.75.75 0 0 1 0 1.06l-2 2a.749.749 0 0 1-1.275-.326.749.749 0 0 1 .215-.734l1.47-1.47-1.47-1.47a.75.75 0 0 1 0-1.06ZM3.28 7.78 1.81 9.25l1.47 1.47a.751.751 0 0 1-.018 1.042.751.751 0 0 1-1.042.018l-2-2a.75.75 0 0 1 0-1.06l2-2a.751.751 0 0 1 1.042.018.751.751 0 0 1 .018 1.042Zm8.22-6.218V4.25c0 .138.112.25.25.25h2.688l-.011-.013-2.914-2.914-.013-.011Z" />
    </svg>
  );
}

const codeExtensions = new Set([
  ".js", ".jsx", ".ts", ".tsx", ".py", ".rb", ".rs", ".go",
  ".java", ".c", ".cpp", ".h", ".cs", ".swift", ".kt",
  ".sh", ".bash", ".zsh", ".fish",
  ".html", ".css", ".scss", ".less",
  ".json", ".yaml", ".yml", ".toml", ".xml",
  ".sql", ".graphql", ".proto",
  ".lua", ".php", ".ex", ".exs", ".zig", ".hs",
]);

function getFileIcon(name: string) {
  if (name.endsWith(".md")) return <MarkdownIcon />;
  const ext = name.substring(name.lastIndexOf("."));
  if (codeExtensions.has(ext)) return <CodeFileIcon />;
  return <FileIcon />;
}

export function FileExplorer({
  entries,
  parentHref,
}: {
  entries: FileEntry[];
  parentHref?: string;
}) {
  return (
    <div className="overflow-hidden rounded-md border border-zinc-300 dark:border-[#3d444d]">
      <table className="w-full text-sm">
        <thead>
          <tr className="bg-zinc-100 border-b border-zinc-300 dark:bg-[#151b23] dark:border-[#3d444d]">
            <th className="px-4 py-2.5 text-left font-semibold text-zinc-700 dark:text-zinc-300">Name</th>
            <th className="px-4 py-2.5 text-right font-semibold text-zinc-700 dark:text-zinc-300">Last modified</th>
          </tr>
        </thead>
        <tbody className="bg-white dark:bg-[#0d1117]">
          {parentHref != null && (
            <tr className="border-b border-zinc-200 hover:bg-zinc-50 dark:border-[#3d444d] dark:hover:bg-[#151b23]">
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
              className="border-b border-zinc-200 last:border-b-0 hover:bg-zinc-50 dark:border-[#3d444d] dark:hover:bg-[#151b23]"
            >
              <td className="px-4 py-2">
                <Link
                  href={`/${entry.path}`}
                  className="text-blue-600 hover:underline dark:text-blue-400"
                >
                  {entry.isDirectory ? <FolderIcon /> : getFileIcon(entry.name)}
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
