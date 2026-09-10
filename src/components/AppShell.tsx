import { Link, useRouterState } from "@tanstack/react-router";
import type { ReactNode } from "react";
import { Home, Dumbbell, LibraryBig, User } from "lucide-react";

const NAV = [
  { to: "/", label: "Início", icon: Home },
  { to: "/treinos", label: "Treinos", icon: Dumbbell },
  { to: "/exercicios", label: "Exercícios", icon: LibraryBig },
  { to: "/perfil", label: "Perfil", icon: User },
] as const;

function isActive(pathname: string, to: string) {
  return to === "/" ? pathname === "/" : pathname.startsWith(to);
}

export function AppShell({ children }: { children: ReactNode }) {
  const pathname = useRouterState({ select: (s) => s.location.pathname });

  return (
    <div className="min-h-[100dvh] bg-background">
      {/* Navegação superior — desktop / tablet */}
      <header className="sticky top-0 z-20 hidden border-b border-border bg-background/85 backdrop-blur md:block">
        <div className="mx-auto flex max-w-4xl items-center justify-between gap-6 px-8 py-4">
          <Link to="/" className="font-display text-lg tracking-[0.3em] text-foreground">
            FORMA
          </Link>
          <nav className="flex items-center gap-1">
            {NAV.map((item) => (
              <Link
                key={item.to}
                to={item.to}
                className={`rounded-full px-4 py-2 text-sm transition-colors ${
                  isActive(pathname, item.to)
                    ? "bg-accent text-accent-foreground"
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                {item.label}
              </Link>
            ))}
          </nav>
        </div>
      </header>

      <main className="mx-auto w-full max-w-4xl px-5 pt-8 pb-28 sm:px-8 md:pb-16">{children}</main>

      {/* Navegação inferior — mobile */}
      <nav className="fixed inset-x-0 bottom-0 z-20 border-t border-border bg-background/95 backdrop-blur md:hidden">
        <ul className="mx-auto flex max-w-md items-stretch justify-between px-2 pt-2 pb-[max(0.5rem,env(safe-area-inset-bottom))]">
          {NAV.map((item) => {
            const Icon = item.icon;
            const active = isActive(pathname, item.to);
            return (
              <li key={item.to} className="flex-1">
                <Link
                  to={item.to}
                  className={`flex flex-col items-center gap-1 rounded-2xl px-2 py-2 text-[0.68rem] transition-colors ${
                    active ? "text-primary" : "text-muted-foreground"
                  }`}
                >
                  <span
                    className={`flex h-9 w-12 items-center justify-center rounded-full transition-colors ${
                      active ? "bg-accent" : "bg-transparent"
                    }`}
                  >
                    <Icon className="h-[1.15rem] w-[1.15rem]" strokeWidth={1.6} />
                  </span>
                  {item.label}
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>
    </div>
  );
}
