import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { SiteHeader } from "@/components/site-header";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "Taskflow",
    template: "%s · Taskflow",
  },
  description:
    "Taskflow è una piccola app di gestione attività costruita con Next.js: priorità, filtri e salvataggio locale.",
};

// Applicato prima del paint per evitare il flash di tema errato.
const themeScript = `(function(){try{var s=localStorage.getItem("taskflow-theme");var d=s?s==="dark":window.matchMedia("(prefers-color-scheme: dark)").matches;if(d)document.documentElement.classList.add("dark");}catch(e){}})();`;

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="it"
      suppressHydrationWarning
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
      </head>
      <body className="min-h-full flex flex-col">
        <SiteHeader />
        <div className="flex flex-1 flex-col">{children}</div>
        <footer className="border-t py-6 text-center text-sm text-muted">
          Costruito con Next.js e Tailwind CSS 
        </footer>
      </body>
    </html>
  );
}