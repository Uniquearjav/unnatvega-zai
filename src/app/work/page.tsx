'use client';

import { useState, useRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion, useInView, AnimatePresence } from 'framer-motion';
import { useTheme } from 'next-themes';
import {
  ArrowRight,
  ArrowLeft,
  Sun,
  Moon,
  Menu,
  ExternalLink,
  ChevronRight,
  Filter,
  Phone,
  Mail,
  MapPin,
  Twitter,
  Linkedin,
  Instagram,
  Facebook,
  Send,
} from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import {
  Sheet,
  SheetTrigger,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetClose,
} from '@/components/ui/sheet';

import {
  fadeInUp,
  staggerContainer,
} from '@/lib/animations';

/* ─────────────────────── Data ─────────────────────── */

const projects = [
  {
    name: 'SpiceRoute Exports',
    category: 'Export',
    description: 'Premium spice export platform connecting Indian farmers to global markets',
    fullDescription: 'A complete digital transformation for a leading spice export house. We built an end-to-end platform connecting Indian farmers directly to international buyers, with real-time inventory tracking, compliance management, and seamless documentation workflows.',
    image: '/images/project-1.png',
    year: '2024',
    tech: ['Next.js', 'Shopify', 'Framer Motion'],
    metrics: '+340% Export Volume',
    color: 'from-orange-500/20 to-orange-700/10',
  },
  {
    name: 'TextileHub Global',
    category: 'Export',
    description: 'High-end textile export portal with seamless order management',
    fullDescription: 'An enterprise-grade textile export portal built for speed and conversion. We engineered a frictionless order management experience that reduced processing time by 60% while maintaining a premium aesthetic that reflects the quality of Indian textiles.',
    image: '/images/project-2.png',
    year: '2024',
    tech: ['React', 'Node.js', 'Stripe'],
    metrics: '+220% Revenue',
    color: 'from-orange-600/20 to-amber-600/10',
  },
  {
    name: 'TradeNexus Analytics',
    category: 'SaaS',
    description: 'Enterprise trade analytics dashboard with real-time market intelligence',
    fullDescription: 'A sophisticated trade analytics platform handling millions of data points in real time. We built an intuitive dashboard that makes complex trade data accessible, enabling exporters and importers to make data-driven decisions faster than ever.',
    image: '/images/project-3.png',
    year: '2023',
    tech: ['TypeScript', 'D3.js', 'WebSocket'],
    metrics: '50K+ Daily Users',
    color: 'from-orange-400/20 to-yellow-600/10',
  },
  {
    name: 'AgroVista Branding',
    category: 'Branding',
    description: 'Bold brand identity for an agro-products export house with global reach',
    fullDescription: 'An award-winning brand identity that positions an agro-products export house as a global leader. We created a visual system that communicates trust, quality, and international standards across all touchpoints.',
    image: '/images/project-4.png',
    year: '2023',
    tech: ['Next.js', 'GSAP', 'Three.js'],
    metrics: 'Award Winning',
    color: 'from-amber-500/20 to-orange-400/10',
  },
  {
    name: 'ImportEase App',
    category: 'Mobile App',
    description: 'Import management app with customs tracking and compliance tools',
    fullDescription: 'A next-generation import management app that makes customs clearance accessible and transparent. We designed an intuitive interface that simplifies complex import regulations, resulting in massive adoption by businesses across India.',
    image: '/images/project-5.png',
    year: '2023',
    tech: ['React Native', 'Firebase', 'Plaid'],
    metrics: '100K+ Downloads',
    color: 'from-orange-700/20 to-red-600/10',
  },
  {
    name: 'Maritime Solutions',
    category: 'Web Design',
    description: 'Corporate website for a logistics and freight forwarding company',
    fullDescription: 'A powerful corporate website for a logistics and freight forwarding company. We crafted a digital experience that showcases their global network, complete with real-time shipment tracking and an integrated inquiry system.',
    image: '/images/project-6.png',
    year: '2024',
    tech: ['Next.js', 'Prisma', 'Tailwind'],
    metrics: '+180% Inquiries',
    color: 'from-red-500/20 to-orange-600/10',
  },
];

const categories = ['All', ...Array.from(new Set(projects.map((p) => p.category)))];

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
function WorkNavigation() {
  const navLinks = [
    { label: 'Home', href: '/' },
    { label: 'Work', href: '/work' },
    { label: 'Contact', href: '/#contact' },
  ];

  return (
    <header className="fixed top-0 left-0 right-0 z-50 glass shadow-lg shadow-background/50">
      <nav className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 md:px-6 lg:px-8">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-0 text-xl font-bold tracking-tight transition-all duration-300 hover:opacity-80">
          <span className="text-foreground">UNNAT</span>
          <span className="text-primary"> VEGA</span>
        </Link>

        {/* Desktop Nav */}
        <div className="hidden items-center gap-6 md:flex">
          {navLinks.map((link) => (
            <Link
              key={link.label}
              href={link.href}
              className={`text-sm transition-all duration-300 hover:text-foreground ${
                link.label === 'Work' ? 'text-primary font-medium' : 'text-muted-foreground'
              }`}
            >
              {link.label}
            </Link>
          ))}
          <ThemeToggle />
          <Button asChild className="bg-primary text-primary-foreground transition-all duration-300 hover:bg-primary/90 hover:shadow-lg hover:shadow-primary/20">
            <Link href="/#contact">
              Start a Project
              <ArrowRight className="ml-1 size-4" />
            </Link>
          </Button>
        </div>

        {/* Mobile Nav */}
        <div className="flex items-center gap-2 md:hidden">
          <ThemeToggle />
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="transition-all duration-300">
                <Menu className="size-5" />
                <span className="sr-only">Open menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-72 bg-background">
              <SheetHeader>
                <SheetTitle className="flex items-center gap-0 text-xl font-bold tracking-tight">
                  <span className="text-foreground">UNNAT</span>
                  <span className="text-primary"> VEGA</span>
                </SheetTitle>
              </SheetHeader>
              <div className="flex flex-col gap-4 px-4 pt-4">
                {navLinks.map((link) => (
                  <SheetClose asChild key={link.label}>
                    <Link
                      href={link.href}
                      className={`flex items-center text-base transition-all duration-300 hover:text-foreground ${
                        link.label === 'Work' ? 'text-primary font-medium' : 'text-muted-foreground'
                      }`}
                    >
                      {link.label}
                      <ChevronRight className="ml-auto size-4" />
                    </Link>
                  </SheetClose>
                ))}
                <SheetClose asChild>
                  <Button asChild className="mt-4 bg-primary text-primary-foreground transition-all duration-300 hover:bg-primary/90">
                    <Link href="/#contact">
                      Start a Project
                      <ArrowRight className="ml-1 size-4" />
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

/* ─────────────────────── Project Card ─────────────────────── */
function ProjectCard({
  project,
  index,
}: {
  project: (typeof projects)[0];
  index: number;
}) {
  const [isHovered, setIsHovered] = useState(false);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-60px' });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 40 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
      transition={{
        duration: 0.6,
        ease: [0.25, 0.46, 0.45, 0.94],
        delay: index % 2 === 0 ? 0 : 0.15,
      }}
      className="group"
    >
      <div
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        className="relative overflow-hidden rounded-2xl border border-border/40 bg-card transition-all duration-500 hover:border-primary/30 hover:shadow-2xl hover:shadow-primary/5"
      >
        {/* Image Container */}
        <div className="relative aspect-[16/10] overflow-hidden">
          <Image
            src={project.image}
            alt={project.name}
            fill
            className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />

          {/* Gradient overlays */}
          <div className="absolute inset-0 bg-gradient-to-t from-card via-transparent to-transparent opacity-60" />
          <div className="absolute inset-0 bg-gradient-to-b from-card/40 via-transparent to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />

          {/* Hover overlay with actions */}
          <motion.div
            initial={false}
            animate={{ opacity: isHovered ? 1 : 0 }}
            transition={{ duration: 0.3 }}
            className="absolute inset-0 flex items-center justify-center bg-background/40 backdrop-blur-sm"
          >
            <Button
              size="lg"
              className="bg-primary text-primary-foreground shadow-xl shadow-primary/25 transition-all duration-300 hover:bg-primary/90 hover:shadow-2xl hover:shadow-primary/30"
            >
              View Case Study
              <ArrowRight className="ml-2 size-4" />
            </Button>
          </motion.div>

          {/* Category badge - top left */}
          <div className="absolute left-4 top-4 z-10">
            <Badge className="border border-primary/30 bg-primary/15 px-3 py-1 text-[11px] font-medium text-primary backdrop-blur-md">
              {project.category}
            </Badge>
          </div>

          {/* Year badge - top right */}
          <div className="absolute right-4 top-4 z-10">
            <span className="rounded-full bg-background/60 px-3 py-1 text-[11px] font-medium text-foreground/60 backdrop-blur-md">
              {project.year}
            </span>
          </div>
        </div>

        {/* Content */}
        <div className="p-5 md:p-6">
          {/* Name + Metrics */}
          <div className="mb-2 flex items-start justify-between gap-3">
            <h3
              className="text-xl font-bold tracking-tight text-foreground transition-colors duration-300 group-hover:text-primary md:text-2xl"
              style={{ fontFamily: 'var(--font-geist-mono)' }}
            >
              {project.name}
            </h3>
            <span className="shrink-0 rounded-full bg-primary/10 px-3 py-1 text-[11px] font-semibold text-primary">
              {project.metrics}
            </span>
          </div>

          {/* Description */}
          <p className="mb-4 text-sm leading-relaxed text-muted-foreground">
            {project.description}
          </p>

          {/* Tech stack */}
          <div className="flex flex-wrap gap-2">
            {project.tech.map((t) => (
              <span
                key={t}
                className="rounded-full border border-border/60 bg-muted/50 px-2.5 py-0.5 text-[11px] font-medium text-muted-foreground transition-colors duration-300 group-hover:border-primary/20 group-hover:text-foreground/70"
              >
                {t}
              </span>
            ))}
          </div>
        </div>
      </div>
    </motion.div>
  );
}

/* ─────────────────────── Featured Project ─────────────────────── */
function FeaturedProject() {
  const project = projects[0];
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-80px' });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 50 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
      transition={{ duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94] }}
      className="group relative mb-16 overflow-hidden rounded-3xl border border-border/40 bg-card md:mb-20"
    >
      <div className="grid md:grid-cols-2">
        {/* Image side */}
        <div className="relative aspect-[16/10] md:aspect-auto md:min-h-[500px]">
          <Image
            src={project.image}
            alt={project.name}
            fill
            className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
            sizes="(max-width: 768px) 100vw, 50vw"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-transparent to-card/80 md:bg-gradient-to-l" />
          <div className="absolute inset-0 bg-gradient-to-t from-card/60 to-transparent md:hidden" />

          {/* Featured badge */}
          <div className="absolute left-5 top-5 z-10">
            <Badge className="border border-primary/40 bg-primary/20 px-4 py-1.5 text-[11px] font-semibold tracking-wider text-primary backdrop-blur-md">
              FEATURED PROJECT
            </Badge>
          </div>
        </div>

        {/* Content side */}
        <div className="flex flex-col justify-center p-6 md:p-10 lg:p-14">
          <div className="mb-4 flex items-center gap-3">
            <Badge className="border border-primary/30 bg-primary/15 px-3 py-1 text-[11px] font-medium text-primary">
              {project.category}
            </Badge>
            <span className="text-xs text-muted-foreground/60">{project.year}</span>
          </div>

          <h2
            className="mb-4 text-3xl font-bold tracking-tight text-foreground md:text-4xl lg:text-5xl"
            style={{ fontFamily: 'var(--font-geist-mono)' }}
          >
            {project.name}
          </h2>

          <p className="mb-6 text-sm leading-relaxed text-muted-foreground md:text-base">
            {project.fullDescription}
          </p>

          {/* Metrics highlight */}
          <div className="mb-6 flex items-center gap-4">
            <div className="rounded-xl bg-primary/10 px-5 py-3">
              <div className="text-2xl font-bold text-primary" style={{ fontFamily: 'var(--font-geist-mono)' }}>
                {project.metrics}
              </div>
              <div className="text-[11px] font-medium text-muted-foreground">Key Result</div>
            </div>
          </div>

          {/* Tech stack */}
          <div className="mb-8 flex flex-wrap gap-2">
            {project.tech.map((t) => (
              <span
                key={t}
                className="rounded-full border border-border/60 bg-muted/50 px-3 py-1.5 text-[12px] font-medium text-muted-foreground"
              >
                {t}
              </span>
            ))}
          </div>

          <div>
            <Button
              size="lg"
              className="bg-primary text-primary-foreground shadow-lg shadow-primary/20 transition-all duration-300 hover:bg-primary/90 hover:shadow-xl hover:shadow-primary/25"
            >
              View Case Study
              <ArrowRight className="ml-2 size-4" />
            </Button>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

/* ─────────────────────── Work Page ─────────────────────── */
export default function WorkPage() {
  const [activeCategory, setActiveCategory] = useState('All');
  const headerRef = useRef(null);
  const headerInView = useInView(headerRef, { once: true });

  const filteredProjects = activeCategory === 'All'
    ? projects
    : projects.filter((p) => p.category === activeCategory);

  return (
    <div className="min-h-screen bg-background">
      <WorkNavigation />

      {/* Hero Header */}
      <section className="relative px-4 pt-28 pb-12 md:pt-36 md:pb-16 lg:pt-40 lg:pb-20">
        {/* Background decorations */}
        <div className="pointer-events-none absolute inset-0 overflow-hidden">
          <div className="absolute -left-32 top-1/4 size-96 rounded-full bg-primary/10 blur-[120px]" />
          <div className="absolute -right-32 bottom-1/4 size-64 rounded-full bg-primary/8 blur-[100px]" />
          <div
            className="absolute inset-0 opacity-[0.04]"
            style={{
              backgroundImage:
                'linear-gradient(var(--border) 1px, transparent 1px), linear-gradient(90deg, var(--border) 1px, transparent 1px)',
              backgroundSize: '60px 60px',
            }}
          />
        </div>

        <div className="relative z-10 mx-auto max-w-7xl">
          <motion.div
            ref={headerRef}
            initial="hidden"
            animate={headerInView ? 'visible' : 'hidden'}
            variants={staggerContainer}
          >
            <motion.div variants={fadeInUp}>
              <Badge
                variant="outline"
                className="mb-6 border-primary/30 bg-primary/10 px-4 py-1.5 text-xs font-medium tracking-widest text-primary"
              >
                OUR PORTFOLIO
              </Badge>
            </motion.div>

            <motion.h1
              variants={fadeInUp}
              className="mb-6 text-4xl font-bold tracking-tight md:text-5xl lg:text-7xl"
              style={{ fontFamily: 'var(--font-geist-mono)' }}
            >
              All Our{' '}
              <span className="gradient-text">Work</span>
            </motion.h1>

            <motion.p
              variants={fadeInUp}
              className="max-w-2xl text-base text-muted-foreground md:text-lg"
            >
              Explore our complete collection of projects. Each one is a story of
              collaboration, innovation, and exceptional craft.
            </motion.p>

            {/* Stats row */}
            <motion.div
              variants={fadeInUp}
              className="mt-8 flex flex-wrap gap-8 md:gap-12"
            >
              <div>
                <div className="text-3xl font-bold text-primary" style={{ fontFamily: 'var(--font-geist-mono)' }}>
                  {projects.length}
                </div>
                <div className="text-xs font-medium text-muted-foreground">Projects</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-primary" style={{ fontFamily: 'var(--font-geist-mono)' }}>
                  {new Set(projects.map((p) => p.category)).size}
                </div>
                <div className="text-xs font-medium text-muted-foreground">Categories</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-primary" style={{ fontFamily: 'var(--font-geist-mono)' }}>
                  98%
                </div>
                <div className="text-xs font-medium text-muted-foreground">Satisfaction</div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Featured Project */}
      <div className="mx-auto max-w-7xl px-4">
        <FeaturedProject />
      </div>

      {/* Filter Bar */}
      <div className="mx-auto max-w-7xl px-4 mb-10 md:mb-14">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-center gap-2">
            <Filter className="size-4 text-muted-foreground/50" />
            <span className="text-xs font-medium uppercase tracking-widest text-muted-foreground/50">
              Filter by
            </span>
          </div>

          <div className="flex flex-wrap gap-2">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`rounded-full px-4 py-2 text-xs font-medium transition-all duration-300 ${
                  activeCategory === cat
                    ? 'bg-primary text-primary-foreground shadow-lg shadow-primary/25'
                    : 'border border-border text-muted-foreground hover:border-primary/40 hover:text-foreground'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Project Grid */}
      <div className="mx-auto max-w-7xl px-4 pb-20 md:pb-28">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeCategory}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.4, ease: [0.25, 0.46, 0.45, 0.94] }}
            className="grid gap-6 sm:grid-cols-2 lg:gap-8"
          >
            {filteredProjects.map((project, index) => (
              <ProjectCard
                key={project.name}
                project={project}
                index={index}
              />
            ))}
          </motion.div>
        </AnimatePresence>

        {/* Empty state */}
        {filteredProjects.length === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="py-20 text-center"
          >
            <p className="text-lg text-muted-foreground">
              No projects found in this category.
            </p>
            <button
              onClick={() => setActiveCategory('All')}
              className="mt-4 text-sm font-medium text-primary transition-all duration-300 hover:text-primary/80"
            >
              View all projects
            </button>
          </motion.div>
        )}
      </div>

      {/* CTA Section */}
      <section className="relative overflow-hidden px-4 py-20 md:py-28">
        <div className="absolute inset-0 bg-gradient-to-br from-primary via-primary to-primary/80" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_20%_50%,oklch(0.85_0.15_40)_0%,transparent_60%)] opacity-30" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_80%_50%,oklch(0.8_0.18_30)_0%,transparent_60%)] opacity-20" />

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-80px' }}
          variants={staggerContainer}
          className="relative z-10 mx-auto max-w-3xl text-center"
        >
          <motion.h2
            variants={fadeInUp}
            className="mb-6 text-3xl font-bold tracking-tight text-primary-foreground md:text-4xl lg:text-5xl"
            style={{ fontFamily: 'var(--font-geist-mono)' }}
          >
            Ready to Go Global?
          </motion.h2>
          <motion.p
            variants={fadeInUp}
            className="mb-10 text-base text-primary-foreground/70 md:text-lg"
          >
            Let&apos;s build your digital presence and streamline your international trade operations.
          </motion.p>
          <motion.div variants={fadeInUp} className="flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
            <Button
              asChild
              size="lg"
              className="bg-primary-foreground text-primary shadow-xl transition-all duration-300 hover:bg-primary-foreground/90 hover:shadow-2xl"
            >
              <Link href="/#contact">
                Start a Project
                <ArrowRight className="ml-2 size-4" />
              </Link>
            </Button>
            <Button
              asChild
              size="lg"
              variant="outline"
              className="border-primary-foreground/30 bg-transparent text-primary-foreground transition-all duration-300 hover:bg-primary-foreground/10 hover:border-primary-foreground/50"
            >
              <Link href="/">
                Back to Home
                <ArrowLeft className="ml-2 size-4" />
              </Link>
            </Button>
          </motion.div>
        </motion.div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border bg-background">
        <div className="mx-auto max-w-7xl px-4 py-14 md:px-6 md:py-16 lg:px-8">
          <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-4">
            {/* Brand + Contact */}
            <div className="lg:col-span-1">
              <div className="mb-4 text-xl font-bold tracking-tight">
                <Link href="/" className="flex items-center gap-0">
                  <span className="text-foreground">UNNAT</span>
                  <span className="text-primary"> VEGA</span>
                </Link>
              </div>
              <p className="mb-6 max-w-xs text-sm leading-relaxed text-muted-foreground">
                Empowering exporters, importers, and businesses with powerful digital solutions for global trade excellence.
              </p>
              <div className="space-y-3">
                <a href="tel:+919876543210" className="flex items-center gap-2.5 text-sm text-muted-foreground transition-all duration-300 hover:text-primary">
                  <Phone className="size-3.5 shrink-0 text-primary" />
                  +91 98765 43210
                </a>
                <a href="mailto:info@unnatvega.com" className="flex items-center gap-2.5 text-sm text-muted-foreground transition-all duration-300 hover:text-primary">
                  <Mail className="size-3.5 shrink-0 text-primary" />
                  info@unnatvega.com
                </a>
                <div className="flex items-start gap-2.5 text-sm text-muted-foreground">
                  <MapPin className="size-3.5 mt-0.5 shrink-0 text-primary" />
                  Mumbai, Maharashtra, India
                </div>
              </div>
            </div>

            {/* Quick Links */}
            <div>
              <h4 className="mb-4 text-sm font-semibold uppercase tracking-wider">Quick Links</h4>
              <div className="flex flex-col gap-2.5">
                {[
                  { label: 'Home', href: '/' },
                  { label: 'Services', href: '/#services' },
                  { label: 'Our Work', href: '/work' },
                  { label: 'Contact', href: '/#contact' },
                ].map((link) => (
                  <Link
                    key={link.label}
                    href={link.href}
                    className="text-sm text-muted-foreground transition-all duration-300 hover:text-primary hover:pl-1"
                  >
                    {link.label}
                  </Link>
                ))}
              </div>
            </div>

            {/* Legal */}
            <div>
              <h4 className="mb-4 text-sm font-semibold uppercase tracking-wider">Legal</h4>
              <div className="flex flex-col gap-2.5">
                {[
                  { label: 'Privacy Policy', href: '/privacy-policy' },
                  { label: 'Terms & Conditions', href: '/terms-and-conditions' },
                  { label: 'Refund Policy', href: '/refund-policy' },
                  { label: 'Shipping Policy', href: '/shipping-policy' },
                ].map((link) => (
                  <Link
                    key={link.label}
                    href={link.href}
                    className="text-sm text-muted-foreground transition-all duration-300 hover:text-primary hover:pl-1"
                  >
                    {link.label}
                  </Link>
                ))}
              </div>
            </div>

            {/* Newsletter + Social */}
            <div>
              <h4 className="mb-4 text-sm font-semibold uppercase tracking-wider">Stay Updated</h4>
              <p className="mb-3 text-sm text-muted-foreground">
                Subscribe for trade insights, export tips, and digital trends.
              </p>
              <form onSubmit={(e) => e.preventDefault()} className="mb-6 flex gap-2">
                <input
                  type="email"
                  placeholder="your@email.com"
                  className="h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm transition-colors placeholder:text-muted-foreground/50 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
                />
                <Button
                  type="submit"
                  size="sm"
                  className="bg-primary text-primary-foreground shrink-0 transition-all duration-300 hover:bg-primary/90"
                >
                  <Send className="size-4" />
                </Button>
              </form>

              <h4 className="mb-3 text-sm font-semibold uppercase tracking-wider">Follow Us</h4>
              <div className="flex gap-2.5">
                {[
                  { icon: Twitter, label: 'Twitter', href: 'https://twitter.com/unnatvega' },
                  { icon: Linkedin, label: 'LinkedIn', href: 'https://linkedin.com/company/unnatvega' },
                  { icon: Instagram, label: 'Instagram', href: 'https://instagram.com/unnatvega' },
                  { icon: Facebook, label: 'Facebook', href: 'https://facebook.com/unnatvega' },
                ].map((social) => (
                  <a
                    key={social.label}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={social.label}
                    className="flex size-9 items-center justify-center rounded-full bg-primary/10 text-muted-foreground transition-all duration-300 hover:bg-primary hover:text-primary-foreground hover:shadow-md hover:shadow-primary/20"
                  >
                    <social.icon className="size-4" />
                  </a>
                ))}
              </div>
            </div>
          </div>

          {/* Bottom Bar */}
          <div className="mt-12 flex flex-col items-center gap-4 border-t border-border pt-6 sm:flex-row sm:justify-between">
            <span className="text-xs text-muted-foreground">&copy; 2026 Unnat Vega. All rights reserved.</span>
            <div className="flex flex-wrap justify-center gap-4 text-xs text-muted-foreground">
              <Link href="/privacy-policy" className="transition-all duration-300 hover:text-primary">
                Privacy Policy
              </Link>
              <span className="text-border">|</span>
              <Link href="/terms-and-conditions" className="transition-all duration-300 hover:text-primary">
                Terms &amp; Conditions
              </Link>
              <span className="text-border">|</span>
              <Link href="/refund-policy" className="transition-all duration-300 hover:text-primary">
                Refund Policy
              </Link>
              <span className="text-border">|</span>
              <Link href="/shipping-policy" className="transition-all duration-300 hover:text-primary">
                Shipping Policy
              </Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
