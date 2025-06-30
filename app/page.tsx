"use client";
import dynamic from "next/dynamic";
import PotatoBackdrop from "@/components/PotatoBackdrop";
import ThemeToggle from "@/components/ThemeToggle";
import { Github, ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/button";

// Dynamic imports to prevent hydration issues
const PotatoStatusCard = dynamic(() => import("@/components/PotatoStatusCard"), {
  ssr: false,
});

const RefreshStats = dynamic(() => import("@/components/RefreshStats"), {
  ssr: false,
});

export default function Home() {
  return (
    <>
      <PotatoBackdrop />
      
      {/* Header */}
      <header className="fixed top-0 left-0 right-0 z-10 p-4">
        <div className="flex justify-between items-center max-w-6xl mx-auto">
          <div className="flex items-center gap-2">
            <span className="text-2xl">🥔</span>
            <span className="font-bold text-lg hidden sm:inline">
              Potato Status Monitor
            </span>
          </div>
          
          <div className="flex items-center gap-2">
            <Button
              variant="ghost"
              size="icon"
              asChild
              className="hover:bg-accent hover:text-accent-foreground"
            >
              <a
                href="/api/potato"
                target="_blank"
                rel="noopener noreferrer"
                title="View API"
              >
                <ExternalLink className="h-4 w-4" />
              </a>
            </Button>
            <ThemeToggle />
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="min-h-screen flex flex-col items-center justify-center p-4 pt-20">
        <div className="w-full max-w-4xl space-y-8">
          {/* Primary Status Card */}
          <div className="flex justify-center">
            <PotatoStatusCard />
          </div>
          
          {/* Secondary Stats */}
          <div className="flex justify-center">
            <RefreshStats />
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="fixed bottom-4 left-4 right-4">
        <div className="flex justify-center">
          <div className="bg-card/80 backdrop-blur-sm border rounded-lg px-4 py-2">
            <p className="text-sm text-muted-foreground text-center">
              Critical infrastructure monitoring since {new Date().getFullYear()} 🥔
            </p>
          </div>
        </div>
      </footer>
    </>
  );
}