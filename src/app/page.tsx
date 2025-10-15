import { Header } from "@/components/app/header";
import { SafetyTips } from "@/components/app/safety-tips";
import { UrlAnalyzer } from "@/components/app/url-analyzer";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-1 flex flex-col items-center justify-start p-4 md:p-8">
        <div className="w-full max-w-4xl space-y-12">
          <UrlAnalyzer />
          <SafetyTips />
        </div>
      </main>
      <footer className="w-full py-4 px-8 text-center text-sm text-muted-foreground">
        <p>&copy; {new Date().getFullYear()} LinkGuard. All rights reserved.</p>
      </footer>
    </div>
  );
}
