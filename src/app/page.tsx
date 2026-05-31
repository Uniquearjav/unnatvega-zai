'use client';

import { useState, useRef, useEffect } from 'react';
import Image from 'next/image';
import { motion, useInView, AnimatePresence } from 'framer-motion';
import { useTheme } from 'next-themes';
import {
  Palette,
  Code2,
  Target,
  TrendingUp,
  Search,
  PenTool,
  Hammer,
  Rocket,
  Menu,
  ArrowRight,
  Mail,
  Phone,
  MapPin,
  Twitter,
  Linkedin,
  Github,
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
  fadeIn,
  staggerContainer,
  scaleIn,
  slideInLeft,
  slideInRight,
} from '@/lib/animations';

/* ─────────────────────── Dribbble Icon (not in lucide) ─────────────────────── */
function DribbbleIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      <circle cx="12" cy="12" r="10" />
      <path d="M19.13 5.09C15.22 9.14 10 10.44 2.25 10.94" />
      <path d="M21.75 12.84c-6.62-1.41-12.14 1-16.38 6.32" />
      <path d="M8.56 2.75c4.37 6 6.56 12 7.56 18.5" />
    </svg>
  );
}

/* ─────────────────────── Data ─────────────────────── */

const navLinks = [
  { label: 'Services', href: '#services' },
  { label: 'Work', href: '#work' },
  { label: 'Process', href: '#process' },
  { label: 'Contact', href: '#contact' },
];

const services = [
  {
    icon: Palette,
    title: 'Web Design',
    description:
      'Pixel-perfect designs that captivate and convert. We create visual stories that resonate.',
  },
  {
    icon: Code2,
    title: 'Development',
    description:
      'Clean, scalable code built with cutting-edge technology. Performance without compromise.',
  },
  {
    icon: Target,
    title: 'Brand Strategy',
    description:
      'Strategic brand positioning that sets you apart. Define your unique voice in the market.',
  },
  {
    icon: TrendingUp,
    title: 'Digital Marketing',
    description:
      'Data-driven campaigns that deliver measurable growth. Reach your audience effectively.',
  },
];

const projects = [
  {
    name: 'Luxe Fashion',
    category: 'E-Commerce',
    description: 'Premium fashion rebrand with immersive shopping experience',
    image: '/images/project-1.png',
    year: '2024',
    tech: ['Next.js', 'Shopify', 'Framer Motion'],
    metrics: '+340% Conversions',
  },
  {
    name: 'Velvet Commerce',
    category: 'E-Commerce',
    description: 'High-end e-commerce platform with seamless checkout flow',
    image: '/images/project-2.png',
    year: '2024',
    tech: ['React', 'Node.js', 'Stripe'],
    metrics: '+220% Revenue',
  },
  {
    name: 'Nexus Analytics',
    category: 'SaaS',
    description: 'Enterprise analytics dashboard with real-time data visualization',
    image: '/images/project-3.png',
    year: '2023',
    tech: ['TypeScript', 'D3.js', 'WebSocket'],
    metrics: '50K+ Daily Users',
  },
  {
    name: 'Prism Creative',
    category: 'Branding',
    description: 'Bold creative agency website with dynamic interactions',
    image: '/images/project-4.png',
    year: '2023',
    tech: ['Next.js', 'GSAP', 'Three.js'],
    metrics: 'Award Winning',
  },
  {
    name: 'Aurora Finance',
    category: 'Mobile App',
    description: 'Fintech mobile application with intuitive investment tools',
    image: '/images/project-5.png',
    year: '2023',
    tech: ['React Native', 'Firebase', 'Plaid'],
    metrics: '100K+ Downloads',
  },
  {
    name: 'Ember Dining',
    category: 'Web Design',
    description: 'Luxury restaurant website with reservation system',
    image: '/images/project-6.png',
    year: '2024',
    tech: ['Next.js', 'Prisma', 'Tailwind'],
    metrics: '+180% Bookings',
  },
];

const stats = [
  { value: '150+', label: 'Projects Delivered' },
  { value: '98%', label: 'Client Satisfaction' },
  { value: '12+', label: 'Years of Excellence' },
  { value: '40+', label: 'Team Members' },
];

const processSteps = [
  {
    number: '01',
    icon: Search,
    title: 'Discovery',
    description:
      'We dive deep into your brand, audience, and goals to build a strategic foundation.',
  },
  {
    number: '02',
    icon: PenTool,
    title: 'Design',
    description:
      'Crafting visual concepts and interactive prototypes that bring your vision to life.',
  },
  {
    number: '03',
    icon: Hammer,
    title: 'Develop',
    description:
      'Building with precision using modern technology stacks and best practices.',
  },
  {
    number: '04',
    icon: Rocket,
    title: 'Deploy',
    description:
      'Launch, optimize, and support your product for continued growth and success.',
  },
];

const testimonials = [
  {
    quote:
      'Apex Studio transformed our digital presence completely. The attention to detail and strategic thinking behind every decision was remarkable. Our conversions increased by 340%.',
    name: 'Sarah Chen',
    title: 'CEO at Luxe Fashion',
    initials: 'SC',
  },
  {
    quote:
      "Working with Apex was a game-changer. They didn't just build a website — they crafted an experience that truly represents our brand's essence. The results speak for themselves.",
    name: 'Marcus Rivera',
    title: 'Founder of Velvet Commerce',
    initials: 'MR',
  },
  {
    quote:
      'The team at Apex brings an unmatched level of creativity and technical expertise. They delivered beyond our expectations and continue to be our trusted digital partner.',
    name: 'Emily Thornton',
    title: 'CMO at Nexus Analytics',
    initials: 'ET',
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
          <span className="text-foreground">APE</span>
          <span className="text-primary">X</span>
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
                  <span className="text-foreground">APE</span>
                  <span className="text-primary">X</span>
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
        {/* Gold gradient orbs */}
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
            PREMIUM DIGITAL AGENCY
          </Badge>
        </motion.div>

        <motion.h1
          variants={fadeInUp}
          className="text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl lg:text-7xl"
          style={{ fontFamily: 'var(--font-geist-mono)' }}
        >
          <span className="block">We Craft</span>
          <span className="gradient-text block">Extraordinary</span>
          <span className="block">Experiences</span>
        </motion.h1>

        <motion.p
          variants={fadeInUp}
          className="mx-auto mt-8 max-w-2xl text-base text-muted-foreground md:text-lg"
        >
          We design and build premium digital products that elevate brands and
          drive results. From concept to launch, every pixel tells your story.
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
            Services That Drive Results
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
      setActiveProject((prev) => (prev + 1) % projects.length);
    } else if (e.key === 'ArrowUp' || e.key === 'ArrowLeft') {
      e.preventDefault();
      setActiveProject((prev) => (prev - 1 + projects.length) % projects.length);
    }
  };

  return (
    <AnimatedSection
      id="work"
      className="relative py-20 md:py-28 lg:py-32"
    >
      {/* Section Header — compact, top-left aligned */}
      <motion.div variants={fadeInUp} className="mb-8 px-4 md:mb-10 lg:px-8">
        <Badge
          variant="outline"
          className="mb-3 border-primary/30 bg-primary/10 px-3 py-1 text-xs font-medium tracking-widest text-primary"
        >
          OUR WORK
        </Badge>
        <h2 className="text-3xl font-bold tracking-tight md:text-4xl lg:text-5xl">
          Crafted with Purpose
        </h2>
      </motion.div>

      {/* Full-width showcase area */}
      <motion.div
        variants={fadeInUp}
        className="relative flex h-[70vh] min-h-[500px] md:h-[80vh] md:min-h-[600px] lg:h-[85vh] lg:min-h-[700px]"
        onKeyDown={handleKeyDown}
        tabIndex={0}
      >
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
                    {/* Mobile: abbreviated */}
                    <span className="md:hidden">
                      {project.name.split(' ').map(w => w.charAt(0)).join('')}
                    </span>
                    {/* md+: full name */}
                    <span className="hidden md:inline">
                      {project.name}
                    </span>
                  </span>
                  {/* Category — shown on active or hover */}
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

          {/* Counter at bottom */}
          <div className="border-t border-border/30 px-3 py-3 md:px-5">
            <span className="text-xs font-bold text-primary" style={{ fontFamily: 'var(--font-geist-mono)' }}>
              {String(activeProject + 1).padStart(2, '0')}
            </span>
            <span className="text-[10px] text-muted-foreground/40">/</span>
            <span className="text-[10px] text-muted-foreground/40" style={{ fontFamily: 'var(--font-geist-mono)' }}>
              {String(projects.length).padStart(2, '0')}
            </span>
          </div>
        </div>

        {/* ─── Main Image Area (~80% of screen) ─── */}
        <div className="relative flex-1 overflow-hidden">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeProject}
              initial={{ opacity: 0, scale: 1.03, filter: 'blur(8px)' }}
              animate={{ opacity: 1, scale: 1, filter: 'blur(0px)' }}
              exit={{ opacity: 0, scale: 0.97, filter: 'blur(8px)' }}
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

              {/* Vignette effect */}
              <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-background/20" />
            </motion.div>
          </AnimatePresence>

          {/* ─── Bottom Info Bar ─── */}
          <AnimatePresence mode="wait">
            <motion.div
              key={activeProject}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94], delay: 0.15 }}
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

          {/* ─── Navigation Arrows ─── */}
          <div className="absolute right-4 top-1/2 z-10 flex -translate-y-1/2 flex-col gap-2 md:right-6">
            <button
              onClick={() => setActiveProject((prev) => (prev - 1 + projects.length) % projects.length)}
              className="flex size-10 items-center justify-center rounded-full border border-foreground/10 bg-background/30 text-foreground/50 backdrop-blur-sm transition-all duration-300 hover:border-primary/40 hover:bg-background/60 hover:text-primary md:size-12"
              aria-label="Previous project"
            >
              <ChevronRight className="size-4 rotate-90 md:size-5" />
            </button>
            <button
              onClick={() => setActiveProject((prev) => (prev + 1) % projects.length)}
              className="flex size-10 items-center justify-center rounded-full border border-foreground/10 bg-background/30 text-foreground/50 backdrop-blur-sm transition-all duration-300 hover:border-primary/40 hover:bg-background/60 hover:text-primary md:size-12"
              aria-label="Next project"
            >
              <ChevronRight className="size-4 -rotate-90 md:size-5" />
            </button>
          </div>

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
      </motion.div>

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
    </AnimatedSection>
  );
}

/* ─────────────────────── Stats ─────────────────────── */
function Stats() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-80px' });

  return (
    <section
      ref={ref}
      className="relative overflow-hidden px-4 py-20 md:py-28"
    >
      {/* Stunning gold gradient background */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary via-primary to-primary/80" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_20%_50%,oklch(0.9_0.12_75)_0%,transparent_60%)] opacity-30" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_80%_50%,oklch(0.85_0.15_60)_0%,transparent_60%)] opacity-20" />
      {/* Subtle shimmer pattern */}
      <div
        className="absolute inset-0 opacity-[0.08]"
        style={{
          backgroundImage:
            'linear-gradient(135deg, rgba(255,255,255,0.2) 25%, transparent 25%, transparent 50%, rgba(255,255,255,0.2) 50%, rgba(255,255,255,0.2) 75%, transparent 75%)',
          backgroundSize: '40px 40px',
        }}
      />

      <motion.div
        initial="hidden"
        animate={isInView ? 'visible' : 'hidden'}
        variants={staggerContainer}
        className="relative z-10 mx-auto grid max-w-7xl gap-10 sm:grid-cols-2 lg:grid-cols-4"
      >
        {stats.map((stat) => (
          <motion.div
            key={stat.label}
            variants={fadeInUp}
            className="text-center"
          >
            <div
              className="text-4xl font-bold tracking-tight text-primary-foreground md:text-5xl"
              style={{ fontFamily: 'var(--font-geist-mono)' }}
            >
              {stat.value}
            </div>
            <div className="mt-2 text-sm font-medium tracking-wide text-primary-foreground/80">
              {stat.label}
            </div>
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
}

/* ─────────────────────── Process ─────────────────────── */
function Process() {
  return (
    <AnimatedSection
      id="process"
      className="px-4 py-20 md:py-28 lg:py-32"
    >
      <div className="mx-auto max-w-7xl">
        <motion.div variants={fadeInUp} className="mb-12 text-center md:mb-16">
          <Badge
            variant="outline"
            className="mb-4 border-primary/30 bg-primary/10 px-3 py-1 text-xs font-medium tracking-widest text-primary"
          >
            HOW WE WORK
          </Badge>
          <h2 className="text-3xl font-bold tracking-tight md:text-4xl lg:text-5xl">
            Our Proven Process
          </h2>
        </motion.div>

        {/* Timeline */}
        <div className="relative">
          {/* Horizontal line (desktop) */}
          <div className="absolute top-16 right-0 left-0 hidden h-px bg-border lg:block" />
          {/* Gold dots on the line (desktop) */}
          <div className="absolute top-[61px] right-0 left-0 hidden lg:flex lg:justify-around">
            {processSteps.map((_, i) => (
              <div key={i} className="size-2.5 rounded-full bg-primary" />
            ))}
          </div>

          <div className="grid gap-10 lg:grid-cols-4 lg:gap-6">
            {processSteps.map((step) => (
              <motion.div
                key={step.number}
                variants={fadeInUp}
                className="relative flex gap-4 lg:flex-col lg:items-center lg:text-center"
              >
                {/* Vertical line on mobile */}
                <div className="absolute top-12 bottom-0 left-5 w-px bg-border lg:hidden" />
                <div className="flex flex-col items-center lg:items-center">
                  <div className="relative z-10 flex size-12 items-center justify-center rounded-full bg-primary/10 transition-all duration-300 group-hover:bg-primary/20">
                    <step.icon className="size-5 text-primary" />
                  </div>
                  <span className="mt-1 text-xs font-bold tracking-widest text-primary">
                    {step.number}
                  </span>
                </div>
                <div className="pb-2 lg:mt-2">
                  <h3 className="mb-1 text-lg font-semibold">{step.title}</h3>
                  <p className="text-sm leading-relaxed text-muted-foreground">
                    {step.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </AnimatedSection>
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
            Let&apos;s Create Something Extraordinary
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
                  href="mailto:hello@apexstudio.com"
                  className="flex items-center gap-3 text-sm text-muted-foreground transition-all duration-300 hover:text-foreground"
                >
                  <div className="flex size-10 items-center justify-center rounded-full bg-primary/10 transition-all duration-300 group-hover:bg-primary/20">
                    <Mail className="size-4 text-primary" />
                  </div>
                  hello@apexstudio.com
                </a>
                <a
                  href="tel:+15551234567"
                  className="flex items-center gap-3 text-sm text-muted-foreground transition-all duration-300 hover:text-foreground"
                >
                  <div className="flex size-10 items-center justify-center rounded-full bg-primary/10 transition-all duration-300 group-hover:bg-primary/20">
                    <Phone className="size-4 text-primary" />
                  </div>
                  +1 (555) 123-4567
                </a>
                <div className="flex items-center gap-3 text-sm text-muted-foreground">
                  <div className="flex size-10 items-center justify-center rounded-full bg-primary/10">
                    <MapPin className="size-4 text-primary" />
                  </div>
                  123 Creative Ave, San Francisco, CA 94102
                </div>
              </div>
            </div>

            <div>
              <h3 className="mb-4 text-lg font-semibold">Follow Us</h3>
              <div className="flex gap-3">
                {[
                  { icon: Twitter, label: 'Twitter', href: '#' },
                  { icon: Linkedin, label: 'LinkedIn', href: '#' },
                  { icon: DribbbleIcon, label: 'Dribbble', href: '#' },
                  { icon: Github, label: 'GitHub', href: '#' },
                ].map((social) => (
                  <a
                    key={social.label}
                    href={social.href}
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
                <h4 className="mb-2 font-semibold">Ready to elevate your brand?</h4>
                <p className="text-sm text-muted-foreground">
                  Our team is ready to bring your vision to life. Let&apos;s start a
                  conversation about your next project.
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
      <div className="mx-auto max-w-7xl px-4 py-12 md:px-6 lg:px-8">
        <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-3">
          {/* Brand */}
          <div>
            <div className="mb-3 text-xl font-bold tracking-tight">
              <span className="text-foreground">APE</span>
              <span className="text-primary">X</span>
            </div>
            <p className="max-w-xs text-sm leading-relaxed text-muted-foreground">
              Crafting extraordinary digital experiences for visionary brands.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="mb-3 text-sm font-semibold">Quick Links</h4>
            <div className="flex flex-col gap-2">
              {navLinks.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  className="text-sm text-muted-foreground transition-all duration-300 hover:text-foreground"
                >
                  {link.label}
                </a>
              ))}
            </div>
          </div>

          {/* Newsletter */}
          <div>
            <h4 className="mb-3 text-sm font-semibold">Stay Updated</h4>
            <p className="mb-3 text-sm text-muted-foreground">
              Subscribe to our newsletter for the latest insights and trends.
            </p>
            <form onSubmit={handleSubscribe} className="flex gap-2">
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
                className="bg-primary text-primary-foreground transition-all duration-300 hover:bg-primary/90"
              >
                Subscribe
              </Button>
            </form>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-10 flex flex-col items-center gap-2 border-t border-border pt-6 text-xs text-muted-foreground sm:flex-row sm:justify-between">
          <span>&copy; 2024 Apex Studio. All rights reserved.</span>
          <div className="flex gap-4">
            <a href="#" className="transition-all duration-300 hover:text-foreground">
              Privacy Policy
            </a>
            <a href="#" className="transition-all duration-300 hover:text-foreground">
              Terms of Service
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
        <Stats />
        <Process />
        <Testimonials />
        <Contact />
      </main>
      <Footer />
    </div>
  );
}
