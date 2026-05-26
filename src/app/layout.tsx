import type { Metadata } from "next";
import "./globals.css";
import { ThemeProvider } from "@/components/shared/ThemeProvider";
import { Sidebar } from "@/components/shared/Sidebar";

export const metadata: Metadata = {
  title: "Forge | Authentic LinkedIn Personal Branding Platform",
  description: "Turn your raw experiences, startup reflections, and technical engineering metrics into high-impact, human-sounding LinkedIn posts.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="antialiased min-h-screen bg-background text-foreground bg-dot-pattern smooth-transition">
        <ThemeProvider>
          <div className="flex min-h-screen">
            {/* Sidebar navigation */}
            <Sidebar />
            
            {/* Main content viewport */}
            <main className="flex-1 flex flex-col min-w-0 md:pl-64 pt-16 md:pt-0">
              <div className="flex-1 p-6 md:p-10 max-w-7xl w-full mx-auto relative z-10">
                {children}
              </div>
            </main>
          </div>
        </ThemeProvider>
      </body>
    </html>
  );
}
