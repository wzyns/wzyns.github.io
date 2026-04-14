import Link from "next/link";

export function Breadcrumb({ segments }: { segments: string[] }) {
  return (
    <nav className="mb-1.5 flex items-center gap-1.5 text-base text-zinc-600 dark:text-zinc-400">
      <Link
        href="/"
        className="font-semibold text-zinc-900 hover:underline dark:text-zinc-100"
      >
        /
      </Link>
      {segments.map((segment, i) => {
        const href = `/${segments.slice(0, i + 1).join("/")}`;
        const isLast = i === segments.length - 1;

        return (
          <span key={href} className="flex items-center gap-1.5">
            {i > 0 && <span className="text-zinc-400 dark:text-zinc-600">/</span>}
            {isLast ? (
              <span className="font-semibold text-zinc-900 dark:text-zinc-100">{segment}</span>
            ) : (
              <Link
                href={href}
                className="text-blue-600 hover:underline dark:text-blue-400"
              >
                {segment}
              </Link>
            )}
          </span>
        );
      })}
    </nav>
  );
}
