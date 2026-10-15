// layout.tsx
import "./globals.css";
import { ReactNode } from "react";
import Link from "next/link";
import fs from "fs";
import path from "path";
import type { Metadata } from "next";
import ThemeInit from "@/components/ThemeInit";

// The Resume button only renders once this file exists in /public
const RESUME_FILE = "Luis_Roman_Resume.pdf";
const hasResume = fs.existsSync(path.join(process.cwd(), "public", RESUME_FILE));

const SITE_TITLE = "Luis E. Román Lizasoain — Portfolio";
const SITE_DESCRIPTION =
  "AI and software engineering, research, and startups by Luis E. Román Lizasoain.";

export const metadata: Metadata = {
  metadataBase: new URL("https://www.le-rl.com"),
  title: SITE_TITLE,
  description: SITE_DESCRIPTION,
  openGraph: {
    title: SITE_TITLE,
    description: SITE_DESCRIPTION,
    url: "/",
    siteName: "LERL",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: SITE_TITLE,
    description: SITE_DESCRIPTION,
  },
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en" className="dark" suppressHydrationWarning>
      <head>
        <meta name="color-scheme" content="dark light" />
        <style dangerouslySetInnerHTML={{
          __html: `html{background-color:#18181b!important;color:#fafafa!important}html:not(.dark){background-color:#f4f4f5!important;color:#09090b!important}body{background-color:#18181b!important;color:#fafafa!important;min-height:100vh}`
        }} />
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(){try{document.documentElement.classList.add('dark');localStorage.setItem('theme','dark');document.documentElement.style.cssText='background-color:#18181b!important;color:#fafafa!important';var s=document.createElement('style');s.textContent='body{background-color:#18181b!important;color:#fafafa!important}';document.head.appendChild(s)}catch(_){document.documentElement.style.cssText='background-color:#18181b!important;color:#fafafa!important';var s=document.createElement('style');s.textContent='body{background-color:#18181b!important;color:#fafafa!important}';document.head.appendChild(s)}})();`
          }}
        />
      </head>
      <body className="min-h-screen flex flex-col bg-zinc-100 text-black dark:bg-zinc-900 dark:text-white font-sans">
        <ThemeInit />
        <header className="sticky top-0 z-50 p-4 border-b border-zinc-200 dark:border-zinc-700 bg-zinc-100 dark:bg-zinc-900 backdrop-blur-sm bg-opacity-95 dark:bg-opacity-95">
          <nav className="flex flex-wrap items-center justify-between gap-x-4 gap-y-2 max-w-5xl mx-auto">
            <h1 className="text-lg sm:text-xl font-semibold">Luis E. Román Lizasoain</h1>
            <ul className="flex gap-4 text-sm items-center">
              <li><Link href="/" className="hover:underline">Projects</Link></li>
              <li><Link href="/contact" className="hover:underline">Contact</Link></li>
              {hasResume && (
                <li>
                  <a
                    href={`/${RESUME_FILE}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-3 py-1 rounded-md border border-zinc-400 dark:border-zinc-500 hover:bg-zinc-200 dark:hover:bg-zinc-800 transition-colors"
                  >
                    Resume
                  </a>
                </li>
              )}
              <li>
                <a href="https://www.linkedin.com/in/luiserom/" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn" title="LinkedIn" className="block text-zinc-600 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-white transition-colors">
                  <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                    <path d="M20.45 20.45h-3.56v-5.57c0-1.33-.02-3.04-1.85-3.04-1.85 0-2.14 1.45-2.14 2.94v5.67H9.35V9h3.41v1.56h.05c.48-.9 1.64-1.85 3.37-1.85 3.6 0 4.27 2.37 4.27 5.46v6.28zM5.34 7.43a2.06 2.06 0 1 1 0-4.13 2.06 2.06 0 0 1 0 4.13zM7.12 20.45H3.56V9h3.56v11.45zM22.22 0H1.77C.79 0 0 .77 0 1.73v20.54C0 23.23.79 24 1.77 24h20.45c.98 0 1.78-.77 1.78-1.73V1.73C24 .77 23.2 0 22.22 0z" />
                  </svg>
                </a>
              </li>
              <li>
                <a href="https://github.com/LuisERom" target="_blank" rel="noopener noreferrer" aria-label="GitHub" title="GitHub" className="block text-zinc-600 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-white transition-colors">
                  <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                    <path d="M12 .3a12 12 0 0 0-3.8 23.38c.6.12.83-.26.83-.57L9 21.07c-3.34.72-4.04-1.61-4.04-1.61-.55-1.39-1.34-1.76-1.34-1.76-1.08-.74.09-.73.09-.73 1.2.09 1.83 1.24 1.83 1.24 1.07 1.83 2.81 1.3 3.5 1 .1-.78.42-1.31.76-1.61-2.67-.3-5.47-1.33-5.47-5.93 0-1.31.47-2.38 1.24-3.22-.14-.3-.54-1.52.1-3.18 0 0 1-.32 3.3 1.23a11.5 11.5 0 0 1 6 0c2.28-1.55 3.29-1.23 3.29-1.23.64 1.66.24 2.88.12 3.18a4.65 4.65 0 0 1 1.23 3.22c0 4.61-2.8 5.63-5.48 5.92.42.36.81 1.1.81 2.22l-.01 3.29c0 .31.2.69.82.57A12 12 0 0 0 12 .3" />
                  </svg>
                </a>
              </li>
            </ul>
          </nav>
        </header>
        <main className="max-w-5xl mx-auto p-6 relative z-10 flex-1">{children}</main>
        <footer className="border-t border-zinc-200 dark:border-zinc-700 mt-auto">
          <div className="max-w-5xl mx-auto px-6 py-4 flex flex-wrap items-center justify-between gap-2 text-sm text-zinc-600 dark:text-zinc-400">
            <span>© {new Date().getFullYear()} Luis E. Román Lizasoain</span>
            <Link href="/privacy" className="hover:underline">
              Privacy
            </Link>
          </div>
        </footer>
      </body>
    </html>
  );
}
