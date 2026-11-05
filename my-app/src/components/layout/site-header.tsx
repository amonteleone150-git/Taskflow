"use client";

import { usePathname } from "next/navigation";
import { SiteLogo } from "@/components/layout/site-logo";
import { HeaderNavLink } from "@/components/layout/header-nav-link";
import { ThemeToggle } from "@/components/layout/theme-toggle";
import { LogoutButton } from "@/components/auth/logout-button";
import { authClient } from "@/lib/auth-client";

const links = [
  { href: "/", label: "Home" },
  { href: "/tasks", label: "Attività" },
  { href: "/calendar", label: "Calendario" },
  { href: "/about", label: "Info" },
] as const;

export function SiteHeader() {
  const pathname = usePathname();
  const { data: session, isPending } = authClient.useSession();
  const user = session?.user;

  const isActive = (href: string) =>
    href === "/" ? pathname === "/" : pathname.startsWith(href);

  return (
    <header className="sticky top-0 z-20 border-b border-border-subtle bg-background/85 backdrop-blur-md">
      <div className="mx-auto flex w-full max-w-3xl flex-wrap items-center justify-between gap-x-3 gap-y-2 px-4 py-3 sm:px-6">
        <SiteLogo />

        <nav
          aria-label="Navigazione principale"
          className="flex items-center gap-1"
        >
          {links.map((link) => (
            <HeaderNavLink
              key={link.href}
              href={link.href}
              label={link.label}
              active={isActive(link.href)}
            />
          ))}

          <div className="ml-1 flex items-center gap-1 border-l border-border-subtle pl-2 sm:ml-2">
            {!isPending && user ? (
              <>
                <HeaderNavLink
                  href="/dashboard"
                  label="Dashboard"
                  active={pathname.startsWith("/dashboard")}
                />
                <LogoutButton />
              </>
            ) : null}

            {!isPending && !user ? (
              <HeaderNavLink
                href="/login"
                label="Accedi"
                active={
                  pathname.startsWith("/login") ||
                  pathname.startsWith("/register")
                }
              />
            ) : null}

            <ThemeToggle />
          </div>
        </nav>
      </div>
    </header>
  );
}
