import Link from "next/link";

export function Breadcrumb({ segments }: { segments: string[] }) {
  return (
    <nav className="mb-8 flex items-center gap-1 text-2xl font-bold text-zinc-900 dark:text-zinc-100">
      <Link
        href="/"
        className="hover:text-blue-600 dark:hover:text-blue-400"
      >
        /
      </Link>
      {segments.map((segment, i) => {
        const href = `/${segments.slice(0, i + 1).join("/")}`;
        const isLast = i === segments.length - 1;

        return (
          <span key={href} className="flex items-center gap-1">
            {isLast ? (
              <span>{segment}</span>
            ) : (
              <>
                <Link
                  href={href}
                  className="hover:text-blue-600 dark:hover:text-blue-400"
                >
                  {segment}
                </Link>
                <span className="text-zinc-400 dark:text-zinc-600">/</span>
              </>
            )}
          </span>
        );
      })}
    </nav>
  );
}
