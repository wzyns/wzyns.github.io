import { Breadcrumb } from "@/components/breadcrumb";
import { ThemeToggle } from "@/components/theme-toggle";

export function PageShell({
  segments,
  children,
}: {
  segments: string[];
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-1 flex-col items-center font-mono">
      <main className="w-full max-w-3xl flex-1 px-4 py-12">
        <div className="flex items-center justify-between mb-4">
          <Breadcrumb segments={segments} />
          <ThemeToggle />
        </div>
        {children}
      </main>
    </div>
  );
}
