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
import { motion } from 'framer-motion';
import { Menu, ArrowRight, ChevronRight, Sun, Moon } from 'lucide-react';

/* ─────────────────────── Nav Link Data ─────────────────────── */

const navLinks = [
  { label: 'Home', href: '/', isHash: true },
  { label: 'About', href: '/about', isHash: false },
  { label: 'Work', href: '/work', isHash: false },
  { label: 'Blog', href: '/blog', isHash: false },
  { label: 'Contact', href: '/contact', isHash: false },
] as const;

/* ─────────────────────── Theme Toggle ─────────────────────── */

function ThemeToggle() {
  const { setTheme, resolvedTheme } = useTheme();
  const isDark = resolvedTheme === 'dark';
  const [hovered, setHovered] = useState(false);

  return (
    <button
      onClick={() => setTheme(isDark ? 'light' : 'dark')}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className="relative flex size-9 items-center justify-center rounded-full text-muted-foreground transition-colors duration-300 hover:text-foreground hover:bg-muted/50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-background"
      aria-label="Toggle theme"
      suppressHydrationWarning
    >
      {/* Sun icon (light mode) - rotates on hover */}
      <motion.div
        initial={false}
        animate={{
          scale: isDark ? 0 : 1,
          rotate: hovered && !isDark ? 180 : 0,
          opacity: isDark ? 0 : 1,
        }}
        transition={{
          scale: { duration: 0.2 },
          rotate: { duration: 0.5, ease: 'easeInOut' },
          opacity: { duration: 0.2 },
        }}
        className="absolute"
      >
        <Sun className="size-[18px]" />
      </motion.div>

      {/* Moon icon (dark mode) - crescent animates to full moon on hover */}
      <motion.div
        initial={false}
        animate={{
          scale: isDark ? 1 : 0,
          opacity: isDark ? 1 : 0,
        }}
        transition={{
          scale: { duration: 0.2 },
          opacity: { duration: 0.2 },
        }}
        className="absolute"
      >
        <div className="relative size-[18px]">
          {/* Full moon base (appears on hover) */}
          <motion.div
            initial={false}
            animate={{
              opacity: hovered ? 1 : 0,
              scale: hovered ? 1 : 0.8,
            }}
            transition={{ duration: 0.4, ease: 'easeOut' }}
            className="absolute inset-0 rounded-full bg-current"
          />
          {/* Crescent moon shadow (shrinks on hover to reveal full moon) */}
          <motion.div
            initial={false}
            animate={{
              x: hovered ? 6 : 2,
              scale: hovered ? 0.6 : 1,
              opacity: hovered ? 0 : 1,
            }}
            transition={{ duration: 0.4, ease: 'easeInOut' }}
            className="absolute -top-[1px] -left-[1px] size-[14px] rounded-full bg-background"
          />
          {/* Base moon shape */}
          <Moon className="size-[18px]" />
        </div>
      </motion.div>
    </button>
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
          : 'bg-transparentc'
      }`}
    >
      <nav className="mx-auto flex h-16 max-w-7xl items-center px-4 md:px-6 lg:px-8">
        {/* ─── Logo (extreme left) ─── */}
        <Link
          href="/"
          className="group flex shrink-0 items-center text-xl font-bold tracking-tight transition-all duration-300 hover:opacity-80"
        >
          <span className="text-white transition-colors duration-300 group-hover:text-white/90">
            UNNAT
          </span>
          <span className="text-orange-500 transition-colors duration-300 group-hover:text-orange-500/80">
            {' '}
            VEGA
          </span>
        </Link>

        {/* ─── Desktop Navigation ─── */}
        <div className="hidden items-center gap-1 uppercase text-white md:flex md:ml-auto">
          {navLinks.map((link) =>
            link.isHash ? (
              <a
                key={link.label}
                href={link.href}
                className="relative px-3 py-2 text-sm font-bold transition-all duration-300 after:absolute after:bottom-0 after:left-1/2 after:h-0.5 after:w-0 after:-translate-x-1/2 after:rounded-full after:bg-primary after:transition-all after:duration-300 hover:after:w-4"
              >
                {link.label}
              </a>
            ) : (
              <Link
                key={link.label}
                href={link.href}
                className="relative px-3 py-2 text-sm font-bold transition-all duration-300 after:absolute after:bottom-0 after:left-1/2 after:h-0.5 after:w-0 after:-translate-x-1/2 after:rounded-full after:bg-primary after:transition-all after:duration-300 hover:after:w-4"
              >
                {link.label}
              </Link>
            )
          )}

          <div className="mx-2 h-5 w-px bg-border/60" />

          <ThemeToggle />
        </div>

        {/* ─── Mobile: Theme Toggle + Hamburger (right) ─── */}
        <div className="flex items-center gap-1 md:hidden ml-auto">
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
                  <span className="text-orange-500"> VEGA</span>
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
                        <ChevronRight className="size-4 text-muted-foreground/40 transition-all duration-300 group-hover:text-orange-500 group-hover:translate-x-0.5" />
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
                        <ChevronRight className="size-4 text-muted-foreground/40 transition-all duration-300 group-hover:text-orange-500 group-hover:translate-x-0.5" />
                      </Link>
                    </SheetClose>
                  )
                )}

                <div className="my-3 h-px bg-border/40" />

                <SheetClose asChild>
                  <Button
                    asChild
                    className="mt-1 bg-primary text-orange-500-foreground transition-all duration-300 hover:bg-primary/90 hover:shadow-lg hover:shadow-primary/20"
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
