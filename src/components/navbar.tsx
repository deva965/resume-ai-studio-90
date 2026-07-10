import { Link, useRouterState } from "@tanstack/react-router";
import { Button } from "@/components/ui/button";
import { Moon, Sun, FileText } from "lucide-react";
import { useTheme } from "@/hooks/use-theme";
import { getUser } from "@/lib/auth";
import { useEffect, useState } from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";

export function Navbar() {
  const { theme, toggle } = useTheme();
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  const [user, setUser] = useState<ReturnType<typeof getUser>>(null);

  useEffect(() => {
    setUser(getUser());
  }, [pathname]);

  const isApp = ["/dashboard", "/editor", "/profile", "/settings"].some((p) =>
    pathname.startsWith(p),
  );

  return (
    <header className="no-print sticky top-0 z-40 w-full border-b border-border/60 bg-background/80 backdrop-blur">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-6">
        <Link to="/" className="flex items-center gap-2 font-display text-lg font-semibold">
          <span className="grid h-8 w-8 place-items-center rounded-lg bg-gradient-brand text-brand-foreground shadow-glow">
            <FileText className="h-4 w-4" />
          </span>
          Resumely
        </Link>

        <nav className="hidden items-center gap-8 text-sm font-medium md:flex">
          {isApp ? (
            <>
              <Link to="/dashboard" activeProps={{ className: "text-foreground" }} className="text-muted-foreground hover:text-foreground">
                Dashboard
              </Link>
              <Link to="/profile" activeProps={{ className: "text-foreground" }} className="text-muted-foreground hover:text-foreground">
                Profile
              </Link>
              <Link to="/settings" activeProps={{ className: "text-foreground" }} className="text-muted-foreground hover:text-foreground">
                Settings
              </Link>
            </>
          ) : (
            <>
              <a href="/#features" className="text-muted-foreground hover:text-foreground">
                Features
              </a>
              <a href="/#templates" className="text-muted-foreground hover:text-foreground">
                Templates
              </a>
              <a href="/#pricing" className="text-muted-foreground hover:text-foreground">
                Pricing
              </a>
            </>
          )}
        </nav>

        <div className="flex items-center gap-2">
          <Button variant="ghost" size="icon" onClick={toggle} aria-label="Toggle theme">
            {theme === "dark" ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
          </Button>
          {user ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <button className="flex items-center gap-2 rounded-full outline-none focus-visible:ring-2 focus-visible:ring-ring">
                  <Avatar className="h-9 w-9">
                    <AvatarFallback className="bg-gradient-brand text-brand-foreground text-xs font-semibold">
                      {user.name?.slice(0, 2).toUpperCase() || "U"}
                    </AvatarFallback>
                  </Avatar>
                </button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-56">
                <div className="px-2 py-1.5">
                  <p className="text-sm font-medium">{user.name}</p>
                  <p className="text-xs text-muted-foreground">{user.email}</p>
                </div>
                <DropdownMenuSeparator />
                <DropdownMenuItem asChild>
                  <Link to="/dashboard">Dashboard</Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link to="/profile">Profile</Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link to="/settings">Settings</Link>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem
                  onClick={() => {
                    localStorage.removeItem("resumely.auth");
                    window.location.href = "/";
                  }}
                >
                  Sign out
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <>
              <Button variant="ghost" asChild>
                <Link to="/login">Sign in</Link>
              </Button>
              <Button asChild className="bg-gradient-brand text-brand-foreground hover:opacity-90">
                <Link to="/signup">Get started</Link>
              </Button>
            </>
          )}
        </div>
      </div>
    </header>
  );
}
