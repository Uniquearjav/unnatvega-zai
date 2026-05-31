'use client';

import { useState, useEffect } from 'react';
import { useTheme } from 'next-themes';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import {
  Sheet,
  SheetTrigger,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetClose,
} from '@/components/ui/sheet';
import { Menu, ArrowRight, ChevronRight, Sun, Moon } from 'lucide-react';

/* ─────────────────────── Nav Link Data ─────────────────────── */

const navLinks = [
  { label: 'Services', href: '#services', isHash: true },
  { label: 'About', href: '/about', isHash: false },
  { label: 'Work', href: '/work', isHash: false },
  { label: 'Contact', href: '/contact', isHash: false },
] as const;

/* ─────────────────────── Theme Toggle ─────────────────────── */

function ThemeToggle() {
  const { setTheme, resolvedTheme } = useTheme();

  return (
    <Button
      variant="ghost"
      size="icon"
      onClick={() => setTheme(resolvedTheme === 'dark' ? 'light' : 'dark')}
      className="relative transition-all duration-300 hover:text-primary"
      aria-label="Toggle theme"
      suppressHydrationWarning
    >
      <Sun className="size-4 rotate-0 scale-100 transition-all duration-300 dark:-rotate-90 dark:scale-0" />
      <Moon className="absolute size-4 rotate-90 scale-0 transition-all duration-300 dark:rotate-0 dark:scale-100" />
    </Button>
  );
}

/* ─────────────────────── Navigation ─────────────────────── */

export default function Navigation() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled
          ? 'glass border-b border-border/40 shadow-lg shadow-background/5'
          : 'bg-transparent'
      }`}
    >
      <nav className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 md:px-6 lg:px-8">
        {/* ─── Logo ─── */}
        <Link
          href="/"
          className="group flex items-center gap-0 text-xl font-bold tracking-tight transition-all duration-300 hover:opacity-80"
        >
          <span className="text-foreground transition-colors duration-300 group-hover:text-foreground/90">
            UNNAT
          </span>
          <span className="text-primary transition-colors duration-300 group-hover:text-primary/80">
            {' '}
            VEGA
          </span>
        </Link>

        {/* ─── Desktop Navigation ─── */}
        <div className="hidden items-center gap-1 md:flex">
          {navLinks.map((link) =>
            link.isHash ? (
              <a
                key={link.label}
                href={link.href}
                className="relative px-3 py-2 text-sm font-medium text-muted-foreground transition-all duration-300 hover:text-foreground after:absolute after:bottom-0 after:left-1/2 after:h-0.5 after:w-0 after:-translate-x-1/2 after:rounded-full after:bg-primary after:transition-all after:duration-300 hover:after:w-4"
              >
                {link.label}
              </a>
            ) : (
              <Link
                key={link.label}
                href={link.href}
                className="relative px-3 py-2 text-sm font-medium text-muted-foreground transition-all duration-300 hover:text-foreground after:absolute after:bottom-0 after:left-1/2 after:h-0.5 after:w-0 after:-translate-x-1/2 after:rounded-full after:bg-primary after:transition-all after:duration-300 hover:after:w-4"
              >
                {link.label}
              </Link>
            )
          )}

          <div className="mx-2 h-5 w-px bg-border/60" />

          <ThemeToggle />

          <Button
            asChild
            className="ml-3 bg-primary text-primary-foreground transition-all duration-300 hover:bg-primary/90 hover:shadow-lg hover:shadow-primary/20"
          >
            <Link href="/contact">
              Start a Project
              <ArrowRight className="ml-1 size-4 transition-transform duration-300 group-hover:translate-x-0.5" />
            </Link>
          </Button>
        </div>

        {/* ─── Mobile Navigation ─── */}
        <div className="flex items-center gap-2 md:hidden">
          <ThemeToggle />

          <Sheet open={mobileOpen} onOpenChange={setMobileOpen}>
            <SheetTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                className="transition-all duration-300"
                aria-label="Open menu"
              >
                <Menu className="size-5" />
              </Button>
            </SheetTrigger>

            <SheetContent side="right" className="w-72 bg-background p-0">
              <SheetHeader className="border-b border-border/40 px-6 py-5">
                <SheetTitle className="flex items-center gap-0 text-xl font-bold tracking-tight">
                  <span className="text-foreground">UNNAT</span>
                  <span className="text-primary"> VEGA</span>
                </SheetTitle>
              </SheetHeader>

              <div className="flex flex-col gap-1 px-4 py-6">
                {navLinks.map((link, idx) =>
                  link.isHash ? (
                    <SheetClose asChild key={link.label}>
                      <a
                        href={link.href}
                        className="group flex items-center rounded-lg px-3 py-3 text-base font-medium text-muted-foreground transition-all duration-300 hover:bg-primary/5 hover:text-foreground"
                        style={{ animationDelay: `${idx * 50}ms` }}
                      >
                        <span className="flex-1">{link.label}</span>
                        <ChevronRight className="size-4 text-muted-foreground/40 transition-all duration-300 group-hover:text-primary group-hover:translate-x-0.5" />
                      </a>
                    </SheetClose>
                  ) : (
                    <SheetClose asChild key={link.label}>
                      <Link
                        href={link.href}
                        className="group flex items-center rounded-lg px-3 py-3 text-base font-medium text-muted-foreground transition-all duration-300 hover:bg-primary/5 hover:text-foreground"
                        style={{ animationDelay: `${idx * 50}ms` }}
                      >
                        <span className="flex-1">{link.label}</span>
                        <ChevronRight className="size-4 text-muted-foreground/40 transition-all duration-300 group-hover:text-primary group-hover:translate-x-0.5" />
                      </Link>
                    </SheetClose>
                  )
                )}

                <div className="my-3 h-px bg-border/40" />

                <SheetClose asChild>
                  <Button
                    asChild
                    className="mt-1 bg-primary text-primary-foreground transition-all duration-300 hover:bg-primary/90 hover:shadow-lg hover:shadow-primary/20"
                  >
                    <Link href="/contact">
                      Start a Project
                      <ArrowRight className="ml-2 size-4" />
                    </Link>
                  </Button>
                </SheetClose>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </nav>
    </header>
  );
}
