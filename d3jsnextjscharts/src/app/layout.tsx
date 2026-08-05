import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import Link from "next/link";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "WDA Charts Database",
  description: "Interactive visual charts database for World Data Analysis Project",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-zinc-50 dark:bg-zinc-950 text-zinc-900 dark:text-zinc-50 transition-colors duration-200">
        {/* Navigation Bar */}
        <nav className="shrink-0 border-b border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900/80 backdrop-blur-md sticky top-0 z-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-14 flex items-center justify-between">
            <Link
              href="/"
              className="text-base font-bold tracking-tight text-zinc-900 dark:text-zinc-50 hover:opacity-85 font-sans"
            >
              WDA Charts Database.
            </Link>
            <div className="text-xs font-semibold text-zinc-500 dark:text-zinc-400 font-mono">
              WPA Project
            </div>
          </div>
        </nav>

        {/* Main Content Area */}
        <div className="flex-1 flex flex-col min-h-0 relative">
          {children}
        </div>

        {/* Footer */}
        <footer className="shrink-0 border-t border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900/50 py-8 px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto flex flex-col gap-6">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div>
                <h4 className="text-sm font-bold text-zinc-800 dark:text-zinc-200 font-sans">
                  WDA Project
                </h4>
                <p className="text-xs text-zinc-500 dark:text-zinc-400 mt-1 max-w-sm font-sans">
                  Analyzing demographics, finances, geography, and sciences.
                </p>
              </div>

              {/* Contact and Social Links */}
              <div className="flex flex-col sm:items-end gap-1.5 text-xs text-zinc-500 dark:text-zinc-400 font-sans">
                <p>Email: <a href="mailto:info@wdaproject.org" className="text-indigo-600 dark:text-indigo-400 hover:underline">info@wdaproject.org</a></p>
                <p>Phone: <span className="text-zinc-700 dark:text-zinc-300 font-medium">+254 700 000000</span></p>
                
                {/* Simple Social Icons */}
                <div className="flex gap-3 mt-2 text-zinc-400 dark:text-zinc-500">
                  <span className="hover:text-zinc-600 dark:hover:text-zinc-300 cursor-pointer">Twitter</span>
                  <span className="hover:text-zinc-600 dark:hover:text-zinc-300 cursor-pointer">GitHub</span>
                  <span className="hover:text-zinc-600 dark:hover:text-zinc-300 cursor-pointer">LinkedIn</span>
                </div>
              </div>
            </div>

            <div className="border-t border-zinc-150 dark:border-zinc-800/60 pt-6 text-center text-[11px] text-zinc-400 dark:text-zinc-500 font-sans">
              <p className="mb-1">
                Inspired by Visual Capitalist | Powered by D3.js & Next.js
              </p>
              <p>
                Made by Joseph Wanyoike Njoroge. All copyright reserved, © 2026.
              </p>
            </div>
          </div>
        </footer>
      </body>
    </html>
  );
}
