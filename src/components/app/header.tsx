import { ShieldHalf } from "lucide-react";

export function Header() {
  return (
    <header className="w-full border-b">
      <div className="container mx-auto flex h-16 items-center justify-between px-4 md:px-6">
        <div className="flex items-center gap-3">
          <ShieldHalf className="h-8 w-8 text-primary" />
          <h1 className="text-2xl font-bold tracking-tight font-headline">
            LinkGuard
          </h1>
        </div>
      </div>
    </header>
  );
}
