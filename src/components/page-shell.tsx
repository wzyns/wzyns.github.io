import { Breadcrumb } from "@/components/breadcrumb";

export function PageShell({
  segments,
  children,
}: {
  segments: string[];
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-1 flex-col items-center bg-zinc-50 font-mono dark:bg-zinc-950">
      <main className="w-full max-w-3xl flex-1 px-4 py-12">
        <Breadcrumb segments={segments} />
        {children}
      </main>
    </div>
  );
}
