import type { Metadata } from "next";
import { Fira_Code, Inter, Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";
import { SiteHeader } from "@/components/site-header";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const plusJakartaSans = Plus_Jakarta_Sans({
  variable: "--font-plus-jakarta",
  subsets: ["latin"],
  display: "swap",
});

const firaCode = Fira_Code({
  variable: "--font-fira-code",
  subsets: ["latin"],
  display: "swap",
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
      className={`${inter.variable} ${plusJakartaSans.variable} ${firaCode.variable} h-full antialiased`}
    >
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
      </head>
      <body className="flex min-h-full flex-col bg-background font-sans text-foreground">
        <SiteHeader />
        <div className="flex flex-1 flex-col">{children}</div>
        <footer className="border-t border-border-subtle py-6 text-center text-xs tracking-[0.02em] text-subtle">
          Costruito con Next.js e Tailwind CSS
        </footer>
      </body>
    </html>
  );
}
