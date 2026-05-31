'use client';

import { useState, useRef } from 'react';
import Image from 'next/image';
import { motion, useInView, AnimatePresence } from 'framer-motion';
import { useTheme } from 'next-themes';
import {
  Palette,
  Code2,
  Target,
  TrendingUp,
  Menu,
  ArrowRight,
  Mail,
  Phone,
  MapPin,
  Twitter,
  Linkedin,
  Instagram,
  Facebook,
  Star,
  ChevronRight,
  ExternalLink,
  Send,
  Sun,
  Moon,
} from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  Sheet,
  SheetTrigger,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetClose,
} from '@/components/ui/sheet';
import { useToast } from '@/hooks/use-toast';

import {
  fadeInUp,
  staggerContainer,
  slideInLeft,
  slideInRight,
} from '@/lib/animations';

/* ─────────────────────── Data ─────────────────────── */

const navLinks = [
  { label: 'Services', href: '#services' },
  { label: 'Work', href: '/work' },
  { label: 'Contact', href: '#contact' },
];

const services = [
  {
    icon: Target,
    title: 'Export Solutions',
    description:
      'End-to-end export management helping Indian businesses reach global markets with compliance and confidence.',
  },
  {
    icon: TrendingUp,
    title: 'Import Services',
    description:
      'Seamless import facilitation with strategic sourcing, quality assurance, and customs clearance support.',
  },
  {
    icon: Code2,
    title: 'Digital Presence',
    description:
      'Powerful websites and digital platforms built for trade businesses to attract international clients and partners.',
  },
  {
    icon: Palette,
    title: 'Brand Identity',
    description:
      'Premium branding that positions your business as a trusted global player in the international trade ecosystem.',
  },
];

const projects = [
  {
    name: 'SpiceRoute Exports',
    category: 'Export',
    description: 'Premium spice export platform connecting Indian farmers to global markets',
    image: '/images/project-1.png',
    year: '2024',
    tech: ['Next.js', 'Shopify', 'Framer Motion'],
    metrics: '+340% Export Volume',
  },
  {
    name: 'TextileHub Global',
    category: 'Export',
    description: 'High-end textile export portal with seamless order management',
    image: '/images/project-2.png',
    year: '2024',
    tech: ['React', 'Node.js', 'Stripe'],
    metrics: '+220% Revenue',
  },
  {
    name: 'TradeNexus Analytics',
    category: 'SaaS',
    description: 'Enterprise trade analytics dashboard with real-time market intelligence',
    image: '/images/project-3.png',
    year: '2023',
    tech: ['TypeScript', 'D3.js', 'WebSocket'],
    metrics: '50K+ Daily Users',
  },
  {
    name: 'AgroVista Branding',
    category: 'Branding',
    description: 'Bold brand identity for an agro-products export house with global reach',
    image: '/images/project-4.png',
    year: '2023',
    tech: ['Next.js', 'GSAP', 'Three.js'],
    metrics: 'Award Winning',
  },
  {
    name: 'ImportEase App',
    category: 'Mobile App',
    description: 'Import management app with customs tracking and compliance tools',
    image: '/images/project-5.png',
    year: '2023',
    tech: ['React Native', 'Firebase', 'Plaid'],
    metrics: '100K+ Downloads',
  },
  {
    name: 'Maritime Solutions',
    category: 'Web Design',
    description: 'Corporate website for a logistics and freight forwarding company',
    image: '/images/project-6.png',
    year: '2024',
    tech: ['Next.js', 'Prisma', 'Tailwind'],
    metrics: '+180% Inquiries',
  },
];

const testimonials = [
  {
    quote:
      'Unnat Vega transformed our export operations completely. Their digital platform helped us reach 15 new countries in just 6 months. The attention to compliance and user experience was remarkable.',
    name: 'Rajesh Sharma',
    title: 'Director at SpiceRoute Exports',
    initials: 'RS',
  },
  {
    quote:
      "Working with Unnat Vega was a game-changer for our import business. They didn't just build a website — they created a complete trade management ecosystem that streamlined our entire supply chain.",
    name: 'Priya Patel',
    title: 'CEO at TextileHub Global',
    initials: 'PP',
  },
  {
    quote:
      'The team at Unnat Vega brings an unmatched level of understanding of international trade. Their digital solutions helped us reduce customs clearance time by 60% and scale our operations globally.',
    name: 'Amit Verma',
    title: 'COO at TradeNexus Analytics',
    initials: 'AV',
  },
];

/* ─────────────────────── Section Wrapper ─────────────────────── */
function AnimatedSection({
  children,
  id,
  className = '',
}: {
  children: React.ReactNode;
  id?: string;
  className?: string;
}) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-80px' });

  return (
    <motion.section
      id={id}
      ref={ref}
      initial="hidden"
      animate={isInView ? 'visible' : 'hidden'}
      variants={staggerContainer}
      className={className}
    >
      {children}
    </motion.section>
  );
}

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
function Navigation() {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 glass shadow-lg shadow-background/50">
      <nav className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 md:px-6 lg:px-8">
        {/* Logo */}
        <a href="#" className="flex items-center gap-0 text-xl font-bold tracking-tight transition-all duration-300 hover:opacity-80">
          <span className="text-foreground">UNNAT</span>
          <span className="text-primary"> VEGA</span>
        </a>

        {/* Desktop Nav */}
        <div className="hidden items-center gap-6 md:flex">
          {navLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              className="text-sm text-muted-foreground transition-all duration-300 hover:text-foreground"
            >
              {link.label}
            </a>
          ))}
          <ThemeToggle />
          <Button asChild className="bg-primary text-primary-foreground transition-all duration-300 hover:bg-primary/90 hover:shadow-lg hover:shadow-primary/20">
            <a href="#contact">
              Start a Project
              <ArrowRight className="ml-1 size-4" />
            </a>
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
                    <a
                      href={link.href}
                      className="flex items-center text-base text-muted-foreground transition-all duration-300 hover:text-foreground"
                    >
                      {link.label}
                      <ChevronRight className="ml-auto size-4" />
                    </a>
                  </SheetClose>
                ))}
                <SheetClose asChild>
                  <Button asChild className="mt-4 bg-primary text-primary-foreground transition-all duration-300 hover:bg-primary/90">
                    <a href="#contact">
                      Start a Project
                      <ArrowRight className="ml-1 size-4" />
                    </a>
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

/* ─────────────────────── Hero ─────────────────────── */
function Hero() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  return (
    <section
      id="hero"
      ref={ref}
      className="relative flex min-h-screen items-center justify-center overflow-hidden px-4 py-32 md:py-40 lg:py-48"
    >
      {/* Background decorative elements */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        {/* Orange gradient orbs */}
        <div className="absolute -left-32 top-1/4 size-96 rounded-full bg-primary/10 blur-[120px]" />
        <div className="absolute -right-32 bottom-1/4 size-96 rounded-full bg-primary/8 blur-[120px]" />
        <div className="absolute left-1/2 top-1/2 size-64 -translate-x-1/2 -translate-y-1/2 rounded-full bg-primary/5 blur-[100px]" />
        {/* Grid pattern */}
        <div
          className="absolute inset-0 opacity-[0.04]"
          style={{
            backgroundImage:
              'linear-gradient(var(--border) 1px, transparent 1px), linear-gradient(90deg, var(--border) 1px, transparent 1px)',
            backgroundSize: '60px 60px',
          }}
        />
      </div>

      <motion.div
        initial="hidden"
        animate={isInView ? 'visible' : 'hidden'}
        variants={staggerContainer}
        className="relative z-10 mx-auto max-w-5xl text-center"
      >
        <motion.div variants={fadeInUp}>
          <Badge
            variant="outline"
            className="mb-8 border-primary/30 bg-primary/10 px-4 py-1.5 text-xs font-medium tracking-widest text-primary"
          >
            PREMIUM TRADE & DIGITAL AGENCY
          </Badge>
        </motion.div>

        <motion.h1
          variants={fadeInUp}
          className="text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl lg:text-7xl"
          style={{ fontFamily: 'var(--font-geist-mono)' }}
        >
          <span className="block">Empowering</span>
          <span className="gradient-text block">Global Trade</span>
          <span className="block">Digital Excellence</span>
        </motion.h1>

        <motion.p
          variants={fadeInUp}
          className="mx-auto mt-8 max-w-2xl text-base text-muted-foreground md:text-lg"
        >
          We help exporters, importers, and businesses build powerful digital
          presence and streamline international trade operations. From strategy to execution.
        </motion.p>

        <motion.div
          variants={fadeInUp}
          className="mt-10 flex flex-col items-center gap-4 sm:flex-row sm:justify-center"
        >
          <Button
            asChild
            size="lg"
            className="bg-primary text-primary-foreground transition-all duration-300 hover:bg-primary/90 hover:shadow-lg hover:shadow-primary/20"
          >
            <a href="#contact">
              Start a Project
              <ArrowRight className="ml-2 size-4" />
            </a>
          </Button>
          <Button asChild variant="outline" size="lg" className="border-border transition-all duration-300 hover:border-primary/40 hover:shadow-md">
            <a href="#work">
              View Our Work
              <ExternalLink className="ml-2 size-4" />
            </a>
          </Button>
        </motion.div>
      </motion.div>
    </section>
  );
}

/* ─────────────────────── Services ─────────────────────── */
function Services() {
  return (
    <AnimatedSection
      id="services"
      className="px-4 py-20 md:py-28 lg:py-32"
    >
      <div className="mx-auto max-w-7xl">
        <motion.div variants={fadeInUp} className="mb-12 text-center md:mb-16">
          <Badge
            variant="outline"
            className="mb-4 border-primary/30 bg-primary/10 px-3 py-1 text-xs font-medium tracking-widest text-primary"
          >
            WHAT WE DO
          </Badge>
          <h2 className="text-3xl font-bold tracking-tight md:text-4xl lg:text-5xl">
            Solutions That Drive Growth
          </h2>
        </motion.div>

        <div className="grid gap-6 md:grid-cols-2">
          {services.map((service) => (
            <motion.div key={service.title} variants={fadeInUp}>
              <Card className="group glass h-full border-transparent transition-all duration-300 hover:-translate-y-1 hover:border-primary/40 hover:shadow-lg hover:shadow-primary/5">
                <CardContent className="p-6 md:p-8">
                  <div className="mb-4 flex size-12 items-center justify-center rounded-full bg-primary/10 transition-all duration-300 group-hover:bg-primary/20">
                    <service.icon className="size-6 text-primary transition-transform duration-300 group-hover:scale-110" />
                  </div>
                  <h3 className="mb-2 text-xl font-semibold">{service.title}</h3>
                  <p className="text-sm leading-relaxed text-muted-foreground">
                    {service.description}
                  </p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </AnimatedSection>
  );
}

/* ─────────────────────── Portfolio ─────────────────────── */
function Portfolio() {
  const [activeProject, setActiveProject] = useState(0);

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'ArrowDown' || e.key === 'ArrowRight') {
      e.preventDefault();
      setActiveProject((prev) => Math.min(prev + 1, projects.length - 1));
    } else if (e.key === 'ArrowUp' || e.key === 'ArrowLeft') {
      e.preventDefault();
      setActiveProject((prev) => Math.max(prev - 1, 0));
    }
  };

  // Crossfade transition variants
  const crossfadeVariants = {
    enter: {
      opacity: 0,
      scale: 1.04,
    },
    center: {
      opacity: 1,
      scale: 1,
    },
    exit: {
      opacity: 0,
      scale: 0.96,
    },
  };

  const infoVariants = {
    enter: {
      opacity: 0,
      y: 30,
    },
    center: {
      opacity: 1,
      y: 0,
    },
    exit: {
      opacity: 0,
      y: -20,
    },
  };

  return (
    <section
      id="work"
      className="relative px-4 py-20 md:py-28 lg:py-32"
      onKeyDown={handleKeyDown}
      tabIndex={0}
    >
      {/* Section Header — compact, top-left aligned */}
      <div className="mb-8 flex items-end justify-between md:mb-10 lg:px-4">
        <div>
          <Badge
            variant="outline"
            className="mb-3 border-primary/30 bg-primary/10 px-3 py-1 text-xs font-medium tracking-widest text-primary"
          >
            OUR WORK
          </Badge>
          <h2 className="text-3xl font-bold tracking-tight md:text-4xl lg:text-5xl">
            Crafted with Purpose
          </h2>
        </div>
        <Button
          asChild
          variant="ghost"
          className="hidden text-sm text-muted-foreground transition-all duration-300 hover:text-primary md:inline-flex"
        >
          <a href="/work">
            View All Work
            <ArrowRight className="ml-1 size-4" />
          </a>
        </Button>
      </div>

      {/* Full-width showcase area */}
      <div className="relative flex h-[70vh] min-h-[500px] md:h-[80vh] md:min-h-[600px] lg:h-[85vh] lg:min-h-[700px]">
        {/* ─── Left Sidebar: Company Names (Horizontal) ─── */}
        <div className="relative z-20 flex w-28 shrink-0 flex-col border-r border-border/40 bg-background/80 backdrop-blur-md md:w-40 lg:w-52">
          {/* Label at top */}
          <div className="border-b border-border/30 px-3 py-3 md:px-5">
            <span className="text-[9px] font-medium uppercase tracking-[0.25em] text-muted-foreground/50 md:text-[10px]">
              Clients
            </span>
          </div>

          {/* Company name list */}
          <div className="flex flex-1 flex-col justify-center">
            {projects.map((project, idx) => (
              <button
                key={project.name}
                onClick={() => setActiveProject(idx)}
                className={`group/sidebar relative flex items-center gap-3 px-3 py-3 text-left transition-all duration-300 md:px-5 md:py-3.5 ${
                  activeProject === idx
                    ? 'bg-primary/10 border-l-2 border-primary'
                    : 'border-l-2 border-transparent hover:bg-muted/30'
                }`}
              >
                {/* Active indicator dot */}
                <div
                  className={`shrink-0 size-1.5 rounded-full transition-all duration-500 ${
                    activeProject === idx
                      ? 'bg-primary shadow-sm shadow-primary/50'
                      : 'bg-muted-foreground/20 group-hover/sidebar:bg-muted-foreground/40'
                  }`}
                />

                {/* Company name — horizontal */}
                <div className="min-w-0 flex-1">
                  <span
                    className={`block truncate text-xs font-medium transition-all duration-300 md:text-sm ${
                      activeProject === idx
                        ? 'text-primary font-semibold'
                        : 'text-muted-foreground/50 group-hover/sidebar:text-muted-foreground/80'
                    }`}
                  >
                    <span className="md:hidden">
                      {project.name.split(' ').map(w => w.charAt(0)).join('')}
                    </span>
                    <span className="hidden md:inline">
                      {project.name}
                    </span>
                  </span>
                  <span
                    className={`block truncate text-[9px] transition-all duration-300 md:text-[10px] ${
                      activeProject === idx
                        ? 'text-muted-foreground/60'
                        : 'text-muted-foreground/0 group-hover/sidebar:text-muted-foreground/40'
                    }`}
                  >
                    {project.category}
                  </span>
                </div>
              </button>
            ))}
          </div>

          {/* Counter + Progress bar + Navigation arrows at bottom */}
          <div className="border-t border-border/30 px-3 py-3 md:px-5">
            {/* Animated progress bar */}
            <div className="mb-3 h-0.5 w-full overflow-hidden rounded-full bg-border/30">
              <motion.div
                className="h-full rounded-full bg-primary"
                initial={false}
                animate={{ width: `${((activeProject + 1) / projects.length) * 100}%` }}
                transition={{ duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] }}
              />
            </div>
            <div className="flex items-center justify-between">
              <div>
                <span className="text-xs font-bold text-primary" style={{ fontFamily: 'var(--font-geist-mono)' }}>
                  {String(activeProject + 1).padStart(2, '0')}
                </span>
                <span className="text-[10px] text-muted-foreground/40">/</span>
                <span className="text-[10px] text-muted-foreground/40" style={{ fontFamily: 'var(--font-geist-mono)' }}>
                  {String(projects.length).padStart(2, '0')}
                </span>
              </div>
              {/* Up/Down navigation arrows */}
              <div className="flex gap-1">
                <button
                  onClick={() => setActiveProject((prev) => Math.max(prev - 1, 0))}
                  disabled={activeProject === 0}
                  className="flex size-7 items-center justify-center rounded border border-border/40 text-muted-foreground transition-all duration-200 hover:border-primary/40 hover:text-primary disabled:opacity-30 disabled:hover:border-border/40 disabled:hover:text-muted-foreground"
                  aria-label="Previous project"
                >
                  <ChevronRight className="size-3.5 -rotate-90" />
                </button>
                <button
                  onClick={() => setActiveProject((prev) => Math.min(prev + 1, projects.length - 1))}
                  disabled={activeProject === projects.length - 1}
                  className="flex size-7 items-center justify-center rounded border border-border/40 text-muted-foreground transition-all duration-200 hover:border-primary/40 hover:text-primary disabled:opacity-30 disabled:hover:border-border/40 disabled:hover:text-muted-foreground"
                  aria-label="Next project"
                >
                  <ChevronRight className="size-3.5 rotate-90" />
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* ─── Main Image Area (~80% of screen) ─── */}
        <div className="relative flex-1 overflow-hidden">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeProject}
              variants={crossfadeVariants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{ duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }}
              className="absolute inset-0"
            >
              <Image
                src={projects[activeProject].image}
                alt={projects[activeProject].name}
                fill
                className="object-cover"
                sizes="80vw"
                priority
              />

              {/* Cinematic gradient overlays */}
              <div className="absolute inset-0 bg-gradient-to-t from-background via-background/20 to-transparent" />
              <div className="absolute inset-0 bg-gradient-to-r from-background/60 via-transparent to-transparent" />
              <div className="absolute inset-0 bg-gradient-to-l from-background/30 via-transparent to-transparent md:from-transparent" />
              <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-background/20" />
            </motion.div>
          </AnimatePresence>

          {/* ─── Bottom Info Bar ─── */}
          <AnimatePresence mode="wait">
            <motion.div
              key={activeProject}
              variants={infoVariants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{ duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94], delay: 0.1 }}
              className="absolute bottom-0 left-0 right-0 z-10 px-6 pb-6 md:px-10 md:pb-10 lg:px-14 lg:pb-12"
            >
              {/* Category + Year row */}
              <div className="mb-3 flex items-center gap-3">
                <Badge className="border border-primary/30 bg-primary/15 px-3 py-1 text-[11px] font-medium text-primary backdrop-blur-sm">
                  {projects[activeProject].category}
                </Badge>
                <span className="text-xs text-foreground/40">{projects[activeProject].year}</span>
                <span className="text-xs font-semibold text-primary/70">{projects[activeProject].metrics}</span>
              </div>

              {/* Company Name */}
              <h3
                className="mb-3 text-3xl font-bold tracking-tight text-foreground md:text-4xl lg:text-5xl"
                style={{ fontFamily: 'var(--font-geist-mono)' }}
              >
                {projects[activeProject].name}
              </h3>

              {/* Description */}
              <p className="mb-5 max-w-xl text-sm leading-relaxed text-foreground/60 md:text-base md:text-foreground/70">
                {projects[activeProject].description}
              </p>

              {/* Tech stack + CTA */}
              <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
                <div className="flex flex-wrap gap-2">
                  {projects[activeProject].tech.map((t) => (
                    <span
                      key={t}
                      className="rounded-full border border-foreground/10 bg-foreground/5 px-3 py-1 text-[11px] font-medium text-foreground/50 backdrop-blur-sm"
                    >
                      {t}
                    </span>
                  ))}
                </div>
                <Button
                  asChild
                  className="bg-primary text-primary-foreground transition-all duration-300 hover:bg-primary/90 hover:shadow-lg hover:shadow-primary/25 sm:ml-auto"
                >
                  <a href="#contact">
                    View Case Study
                    <ArrowRight className="ml-2 size-4" />
                  </a>
                </Button>
              </div>
            </motion.div>
          </AnimatePresence>

          {/* ─── Progress Dots (bottom-right) ─── */}
          <div className="absolute bottom-6 right-6 z-10 hidden flex-col gap-1.5 md:flex">
            {projects.map((_, idx) => (
              <button
                key={idx}
                onClick={() => setActiveProject(idx)}
                className={`transition-all duration-500 ${
                  activeProject === idx
                    ? 'h-6 w-1.5 rounded-full bg-primary shadow-sm shadow-primary/50'
                    : 'h-1.5 w-1.5 rounded-full bg-foreground/20 hover:bg-foreground/40'
                }`}
                aria-label={`Go to project ${idx + 1}`}
              />
            ))}
          </div>
        </div>
      </div>

      {/* ─── Mobile: Swipeable project names row ─── */}
      <div className="flex gap-2 overflow-x-auto px-4 py-4 md:hidden">
        {projects.map((project, idx) => (
          <button
            key={project.name}
            onClick={() => setActiveProject(idx)}
            className={`shrink-0 rounded-full px-4 py-2 text-xs font-medium transition-all duration-300 ${
              activeProject === idx
                ? 'bg-primary text-primary-foreground shadow-lg shadow-primary/25'
                : 'border border-border text-muted-foreground hover:border-primary/40 hover:text-foreground'
            }`}
          >
            {project.name}
          </button>
        ))}
      </div>
    </section>
  );
}

/* ─────────────────────── Testimonials ─────────────────────── */
function Testimonials() {
  return (
    <AnimatedSection className="px-4 py-20 md:py-28 lg:py-32">
      <div className="mx-auto max-w-7xl">
        <motion.div variants={fadeInUp} className="mb-12 text-center md:mb-16">
          <Badge
            variant="outline"
            className="mb-4 border-primary/30 bg-primary/10 px-3 py-1 text-xs font-medium tracking-widest text-primary"
          >
            TESTIMONIALS
          </Badge>
          <h2 className="text-3xl font-bold tracking-tight md:text-4xl lg:text-5xl">
            What Our Clients Say
          </h2>
        </motion.div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {testimonials.map((t) => (
            <motion.div key={t.name} variants={fadeInUp}>
              <Card className="glass h-full border-transparent transition-all duration-300 hover:-translate-y-1 hover:border-primary/40 hover:shadow-lg hover:shadow-primary/5">
                <CardContent className="flex h-full flex-col p-6">
                  <div className="mb-4 flex gap-1">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className="size-4 fill-primary text-primary"
                      />
                    ))}
                  </div>
                  <p className="mb-6 flex-1 text-sm leading-relaxed text-muted-foreground">
                    &ldquo;{t.quote}&rdquo;
                  </p>
                  <div className="flex items-center gap-3">
                    <div className="flex size-10 items-center justify-center rounded-full bg-primary/15 text-sm font-bold text-primary transition-all duration-300 group-hover:bg-primary/25">
                      {t.initials}
                    </div>
                    <div>
                      <div className="text-sm font-semibold">{t.name}</div>
                      <div className="text-xs text-muted-foreground">
                        {t.title}
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </AnimatedSection>
  );
}

/* ─────────────────────── Contact ─────────────────────── */
function Contact() {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    budget: '',
    message: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (!res.ok) throw new Error('Failed to submit');

      toast({
        title: 'Message sent!',
        description: "We'll get back to you within 24 hours.",
      });
      setFormData({ name: '', email: '', company: '', budget: '', message: '' });
    } catch {
      toast({
        title: 'Something went wrong',
        description: 'Please try again later.',
        variant: 'destructive',
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <AnimatedSection
      id="contact"
      className="px-4 py-20 md:py-28 lg:py-32"
    >
      <div className="mx-auto max-w-7xl">
        <motion.div variants={fadeInUp} className="mb-12 text-center md:mb-16">
          <Badge
            variant="outline"
            className="mb-4 border-primary/30 bg-primary/10 px-3 py-1 text-xs font-medium tracking-widest text-primary"
          >
            GET IN TOUCH
          </Badge>
          <h2 className="text-3xl font-bold tracking-tight md:text-4xl lg:text-5xl">
            Let&apos;s Grow Your Business Globally
          </h2>
        </motion.div>

        <div className="grid gap-12 lg:grid-cols-2 lg:gap-16">
          {/* Form */}
          <motion.div variants={slideInLeft}>
            <Card className="glass border-border/50">
              <CardContent className="p-6 md:p-8">
                <form onSubmit={handleSubmit} className="space-y-5">
                  <div className="grid gap-5 md:grid-cols-2">
                    <div>
                      <label
                        htmlFor="name"
                        className="mb-1.5 block text-sm font-medium"
                      >
                        Name
                      </label>
                      <Input
                        id="name"
                        name="name"
                        placeholder="Your name"
                        required
                        value={formData.name}
                        onChange={handleChange}
                        className="bg-input/30 transition-all duration-300 focus:bg-input/50"
                      />
                    </div>
                    <div>
                      <label
                        htmlFor="email"
                        className="mb-1.5 block text-sm font-medium"
                      >
                        Email
                      </label>
                      <Input
                        id="email"
                        name="email"
                        type="email"
                        placeholder="you@company.com"
                        required
                        value={formData.email}
                        onChange={handleChange}
                        className="bg-input/30 transition-all duration-300 focus:bg-input/50"
                      />
                    </div>
                  </div>
                  <div className="grid gap-5 md:grid-cols-2">
                    <div>
                      <label
                        htmlFor="company"
                        className="mb-1.5 block text-sm font-medium"
                      >
                        Company
                      </label>
                      <Input
                        id="company"
                        name="company"
                        placeholder="Your company"
                        value={formData.company}
                        onChange={handleChange}
                        className="bg-input/30 transition-all duration-300 focus:bg-input/50"
                      />
                    </div>
                    <div>
                      <label
                        htmlFor="budget"
                        className="mb-1.5 block text-sm font-medium"
                      >
                        Budget
                      </label>
                      <Select
                        value={formData.budget}
                        onValueChange={(value) =>
                          setFormData((prev) => ({ ...prev, budget: value }))
                        }
                      >
                        <SelectTrigger className="w-full bg-input/30 transition-all duration-300 focus:bg-input/50">
                          <SelectValue placeholder="Select budget" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="10k-25k">$10k &ndash; $25k</SelectItem>
                          <SelectItem value="25k-50k">$25k &ndash; $50k</SelectItem>
                          <SelectItem value="50k-100k">$50k &ndash; $100k</SelectItem>
                          <SelectItem value="100k+">$100k+</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                  <div>
                    <label
                      htmlFor="message"
                      className="mb-1.5 block text-sm font-medium"
                    >
                      Message
                    </label>
                    <Textarea
                      id="message"
                      name="message"
                      placeholder="Tell us about your project..."
                      required
                      rows={5}
                      value={formData.message}
                      onChange={handleChange}
                      className="bg-input/30 transition-all duration-300 focus:bg-input/50"
                    />
                  </div>
                  <Button
                    type="submit"
                    size="lg"
                    disabled={isSubmitting}
                    className="w-full bg-primary text-primary-foreground transition-all duration-300 hover:bg-primary/90 hover:shadow-lg hover:shadow-primary/20 md:w-auto"
                  >
                    {isSubmitting ? 'Sending...' : 'Send Message'}
                    <Send className="ml-2 size-4" />
                  </Button>
                </form>
              </CardContent>
            </Card>
          </motion.div>

          {/* Contact Info */}
          <motion.div variants={slideInRight} className="flex flex-col gap-8">
            <div>
              <h3 className="mb-4 text-lg font-semibold">Contact Information</h3>
              <div className="space-y-4">
                <a
                  href="mailto:info@unnatvega.com"
                  className="flex items-center gap-3 text-sm text-muted-foreground transition-all duration-300 hover:text-foreground"
                >
                  <div className="flex size-10 items-center justify-center rounded-full bg-primary/10">
                    <Mail className="size-4 text-primary" />
                  </div>
                  info@unnatvega.com
                </a>
                <a
                  href="tel:+919876543210"
                  className="flex items-center gap-3 text-sm text-muted-foreground transition-all duration-300 hover:text-foreground"
                >
                  <div className="flex size-10 items-center justify-center rounded-full bg-primary/10">
                    <Phone className="size-4 text-primary" />
                  </div>
                  +91 98765 43210
                </a>
                <div className="flex items-center gap-3 text-sm text-muted-foreground">
                  <div className="flex size-10 items-center justify-center rounded-full bg-primary/10">
                    <MapPin className="size-4 text-primary" />
                  </div>
                  Mumbai, Maharashtra, India
                </div>
              </div>
            </div>

            <div>
              <h3 className="mb-4 text-lg font-semibold">Follow Us</h3>
              <div className="flex gap-3">
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
                    className="flex size-10 items-center justify-center rounded-full bg-primary/10 text-muted-foreground transition-all duration-300 hover:bg-primary hover:text-primary-foreground hover:shadow-md hover:shadow-primary/20"
                  >
                    <social.icon className="size-4" />
                  </a>
                ))}
              </div>
            </div>

            {/* Decorative card */}
            <Card className="glass hidden border-primary/20 transition-all duration-300 hover:border-primary/30 lg:block">
              <CardContent className="p-6">
                <h4 className="mb-2 font-semibold">Ready to expand globally?</h4>
                <p className="text-sm text-muted-foreground">
                  Our team is ready to help you navigate international trade. Let&apos;s start a
                  conversation about taking your business to the world.
                </p>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>
    </AnimatedSection>
  );
}

/* ─────────────────────── Footer ─────────────────────── */
function Footer() {
  const [email, setEmail] = useState('');

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    setEmail('');
  };

  return (
    <footer className="mt-auto border-t border-border bg-background">
      <div className="mx-auto max-w-7xl px-4 py-14 md:px-6 md:py-16 lg:px-8">
        <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-4">
          {/* Brand + Contact */}
          <div className="lg:col-span-1">
            <div className="mb-4 text-xl font-bold tracking-tight">
              <span className="text-foreground">UNNAT</span>
              <span className="text-primary"> VEGA</span>
            </div>
            <p className="mb-6 max-w-xs text-sm leading-relaxed text-muted-foreground">
              Empowering exporters, importers, and businesses with powerful digital solutions for global trade excellence.
            </p>
            {/* Contact Info */}
            <div className="space-y-3">
              <a
                href="tel:+919876543210"
                className="flex items-center gap-2.5 text-sm text-muted-foreground transition-all duration-300 hover:text-primary"
              >
                <Phone className="size-3.5 shrink-0 text-primary" />
                +91 98765 43210
              </a>
              <a
                href="mailto:info@unnatvega.com"
                className="flex items-center gap-2.5 text-sm text-muted-foreground transition-all duration-300 hover:text-primary"
              >
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
                { label: 'Services', href: '#services' },
                { label: 'Our Work', href: '/work' },
                { label: 'Contact', href: '#contact' },
              ].map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  className="text-sm text-muted-foreground transition-all duration-300 hover:text-primary hover:pl-1"
                >
                  {link.label}
                </a>
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
                <a
                  key={link.label}
                  href={link.href}
                  className="text-sm text-muted-foreground transition-all duration-300 hover:text-primary hover:pl-1"
                >
                  {link.label}
                </a>
              ))}
            </div>
          </div>

          {/* Newsletter + Social */}
          <div>
            <h4 className="mb-4 text-sm font-semibold uppercase tracking-wider">Stay Updated</h4>
            <p className="mb-3 text-sm text-muted-foreground">
              Subscribe for trade insights, export tips, and digital trends.
            </p>
            <form onSubmit={handleSubscribe} className="mb-6 flex gap-2">
              <Input
                type="email"
                placeholder="your@email.com"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="bg-input/30 text-sm transition-all duration-300 focus:bg-input/50"
              />
              <Button
                type="submit"
                size="sm"
                className="bg-primary text-primary-foreground shrink-0 transition-all duration-300 hover:bg-primary/90"
              >
                <Send className="size-4" />
              </Button>
            </form>

            {/* Social Links */}
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
            <a href="/privacy-policy" className="transition-all duration-300 hover:text-primary">
              Privacy Policy
            </a>
            <span className="text-border">|</span>
            <a href="/terms-and-conditions" className="transition-all duration-300 hover:text-primary">
              Terms &amp; Conditions
            </a>
            <span className="text-border">|</span>
            <a href="/refund-policy" className="transition-all duration-300 hover:text-primary">
              Refund Policy
            </a>
            <span className="text-border">|</span>
            <a href="/shipping-policy" className="transition-all duration-300 hover:text-primary">
              Shipping Policy
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}

/* ─────────────────────── Page ─────────────────────── */
export default function Home() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navigation />
      <main className="flex-1">
        <Hero />
        <Services />
        <Portfolio />
        <Testimonials />
        <Contact />
      </main>
      <Footer />
    </div>
  );
}
