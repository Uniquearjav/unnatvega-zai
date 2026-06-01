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
import { Menu, ArrowRight, ChevronRight } from 'lucide-react';

/* ─────────────────────── Nav Link Data ─────────────────────── */

const navLinks = [
  { label: 'Services', href: '#services', isHash: true },
  { label: 'About', href: '/about', isHash: false },
  { label: 'Work', href: '/work', isHash: false },
  { label: 'Blog', href: '/blog', isHash: false },
  { label: 'Contact', href: '/contact', isHash: false },
] as const;

/* ─────────────────────── Theme Toggle ─────────────────────── */

function ThemeToggle() {
  const { setTheme, resolvedTheme } = useTheme();
  const isDark = resolvedTheme === 'dark';

  return (
    <button
      onClick={() => setTheme(isDark ? 'light' : 'dark')}
      className="relative flex h-7 w-[52px] items-center rounded-full p-[3px] transition-all duration-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-background"
      style={{
        background: isDark
          ? 'linear-gradient(135deg, #1e1b4b 0%, #312e81 50%, #1e1b4b 100%)'
          : 'linear-gradient(135deg, #7dd3fc 0%, #38bdf8 50%, #bae6fd 100%)',
      }}
      aria-label="Toggle theme"
      suppressHydrationWarning
    >
      {/* Stars (visible in dark) */}
      <div className="absolute inset-0 overflow-hidden rounded-full">
        {[{ t: 6, l: 8, d: 0 }, { t: 14, l: 18, d: 1.2 }, { t: 4, l: 28, d: 0.6 }, { t: 16, l: 36, d: 1.8 }, { t: 10, l: 44, d: 0.3 }].map((star, i) => (
          <motion.span
            key={i}
            className="absolute size-[2px] rounded-full bg-white"
            style={{ top: `${star.t}px`, left: `${star.l}px` }}
            initial={false}
            animate={{
              opacity: isDark ? [0, 1, 0.5, 1] : 0,
              scale: isDark ? [0, 1.2, 0.8, 1] : 0,
            }}
            transition={{
              duration: 1.5,
              delay: star.d,
              repeat: isDark ? Infinity : 0,
              repeatType: 'reverse',
            }}
          />
        ))}
      </div>

      {/* Clouds (visible in light) */}
      <div className="absolute inset-0 overflow-hidden rounded-full">
        <motion.div
          className="absolute"
          initial={false}
          animate={{
            x: isDark ? 20 : 4,
            opacity: isDark ? 0 : 0.6,
          }}
          transition={{ duration: 0.5, delay: 0.1 }}
          style={{ top: 3 }}
        >
          <div className="flex items-end gap-[1px]">
            <div className="size-[5px] rounded-full bg-white" />
            <div className="size-[7px] rounded-full bg-white" />
            <div className="size-[4px] rounded-full bg-white" />
          </div>
        </motion.div>
        <motion.div
          className="absolute"
          initial={false}
          animate={{
            x: isDark ? 20 : 22,
            opacity: isDark ? 0 : 0.4,
          }}
          transition={{ duration: 0.5, delay: 0.2 }}
          style={{ top: 10 }}
        >
          <div className="flex items-end gap-[1px]">
            <div className="size-[4px] rounded-full bg-white" />
            <div className="size-[6px] rounded-full bg-white" />
            <div className="size-[3px] rounded-full bg-white" />
          </div>
        </motion.div>
      </div>

      {/* Sliding thumb (sun / moon) */}
      <motion.div
        className="relative z-10 flex size-[22px] shrink-0 items-center justify-center rounded-full"
        initial={false}
        animate={{
          x: isDark ? 22 : 0,
          background: isDark
            ? 'linear-gradient(135deg, #c4b5fd, #8b5cf6)'
            : 'linear-gradient(135deg, #fbbf24, #f59e0b)',
          boxShadow: isDark
            ? '0 0 8px 2px rgba(139,92,246,0.4)'
            : '0 0 8px 2px rgba(251,191,36,0.5)',
        }}
        transition={{ type: 'spring', stiffness: 250, damping: 20 }}
      >
        {/* Sun rays */}
        <motion.div
          className="absolute inset-0"
          initial={false}
          animate={{ rotate: isDark ? 0 : 180, opacity: isDark ? 0 : 1 }}
          transition={{ duration: 0.5 }}
        >
          {[0, 45, 90, 135, 180, 225, 270, 315].map((angle) => (
            <span
              key={angle}
              className="absolute left-1/2 top-1/2 h-[2px] w-[3px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-amber-800/60"
              style={{
                transform: `rotate(${angle}deg) translateY(-7px)`,
              }}
            />
          ))}
        </motion.div>

        {/* Moon crater */}
        <motion.div
          className="absolute"
          initial={false}
          animate={{ opacity: isDark ? 1 : 0, scale: isDark ? 1 : 0 }}
          transition={{ duration: 0.3, delay: isDark ? 0.15 : 0 }}
        >
          <span className="absolute -right-[2px] -top-[1px] size-[6px] rounded-full bg-violet-300/40" />
          <span className="absolute -bottom-[1px] left-[1px] size-[4px] rounded-full bg-violet-300/30" />
        </motion.div>

        {/* Center dot */}
        <motion.div
          className="relative size-[8px] rounded-full"
          initial={false}
          animate={{
            background: isDark ? '#e0d4fc' : '#fef3c7',
          }}
          transition={{ duration: 0.3 }}
        />
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
          : 'bg-transparent'
      }`}
    >
      <nav className="mx-auto flex h-16 max-w-7xl items-center px-4 md:px-6 lg:px-8">
        {/* ─── Mobile: Theme Toggle (left) ─── */}
        <div className="flex items-center md:hidden">
          <ThemeToggle />
        </div>

        {/* ─── Logo (centered on mobile, left on desktop) ─── */}
        <Link
          href="/"
          className="group flex flex-1 items-center justify-center text-xl font-bold tracking-tight transition-all duration-300 hover:opacity-80 md:flex-none md:justify-start md:mr-auto"
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

        {/* ─── Mobile: Hamburger (right) ─── */}
        <div className="flex items-center md:hidden">
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
