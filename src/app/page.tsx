'use client';

import { useState, useRef, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion, useInView, AnimatePresence } from 'framer-motion';
import {
  Palette,
  Code2,
  Target,
  TrendingUp,
  ArrowRight,
  Star,
  ChevronRight,
  ExternalLink,
  Instagram,
  Facebook,
  Send,
  Globe,
  Play,
  Sparkles,
  Zap,
  Shield,
} from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

import {
  fadeInUp,
  staggerContainer,
  slideInLeft,
  slideInRight,
} from '@/lib/animations';

/* ─────────────────────── Data ─────────────────────── */

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

/* ─────────────────────── Hero ─────────────────────── */
function Hero() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });
  const [currentWord, setCurrentWord] = useState(0);
  const rotatingWords = ['Trade', 'Business', 'Exports', 'Imports'];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentWord((prev) => (prev + 1) % rotatingWords.length);
    }, 2500);
    return () => clearInterval(interval);
  }, [rotatingWords.length]);

  return (
    <section
      id="hero"
      ref={ref}
      className="relative flex min-h-screen items-center justify-center overflow-hidden px-4 py-32 md:py-40 lg:py-48"
    >
      {/* Background decorative elements */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        {/* Orange gradient orbs */}
        <div className="absolute -left-32 top-1/4 size-[500px] rounded-full bg-primary/10 blur-[150px]" />
        <div className="absolute -right-32 bottom-1/4 size-[400px] rounded-full bg-primary/8 blur-[120px]" />
        <div className="absolute left-1/2 top-1/2 size-64 -translate-x-1/2 -translate-y-1/2 rounded-full bg-primary/5 blur-[100px]" />
        {/* Animated rings */}
        <div className="absolute right-[10%] top-[20%] size-72 rounded-full border border-primary/10 md:size-96" />
        <div className="absolute right-[8%] top-[18%] size-80 rounded-full border border-primary/5 md:size-[420px]" />
        <div className="absolute left-[5%] bottom-[15%] size-48 rounded-full border border-primary/8 md:size-72" />
        {/* Grid pattern */}
        <div
          className="absolute inset-0 opacity-[0.03]"
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
        className="relative z-10 mx-auto max-w-6xl text-center"
      >
        {/* Floating badges */}
        <motion.div variants={fadeInUp} className="mb-8 flex items-center justify-center gap-3">
          <div className="flex items-center gap-2 rounded-full border border-primary/20 bg-primary/5 px-4 py-1.5 backdrop-blur-sm">
            <Sparkles className="size-3.5 text-primary" />
            <span className="text-xs font-medium text-primary">Trusted by 500+ Businesses</span>
          </div>
        </motion.div>

        <motion.h1
          variants={fadeInUp}
          className="text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl"
          style={{ fontFamily: 'var(--font-geist-mono)' }}
        >
          <span className="block">Empowering</span>
          <span className="gradient-text block">
            Global{' '}
            <AnimatePresence mode="wait">
              <motion.span
                key={currentWord}
                initial={{ opacity: 0, y: 20, filter: 'blur(8px)' }}
                animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                exit={{ opacity: 0, y: -20, filter: 'blur(8px)' }}
                transition={{ duration: 0.5, ease: 'easeInOut' }}
                className="inline-block"
              >
                {rotatingWords[currentWord]}
              </motion.span>
            </AnimatePresence>
          </span>
          <span className="block">Digital Excellence</span>
        </motion.h1>

        <motion.p
          variants={fadeInUp}
          className="mx-auto mt-8 max-w-2xl text-base text-muted-foreground md:text-lg lg:text-xl"
        >
          We help exporters, importers, and businesses build powerful digital
          presence and streamline international trade operations. From strategy to execution.
        </motion.p>

        {/* Feature pills */}
        <motion.div
          variants={fadeInUp}
          className="mt-8 flex flex-wrap items-center justify-center gap-3"
        >
          {[
            { icon: Shield, text: '100% Compliance' },
            { icon: Zap, text: 'Fast Turnaround' },
            { icon: Globe, text: '25+ Countries' },
          ].map((feature) => (
            <div
              key={feature.text}
              className="flex items-center gap-2 rounded-full border border-border/50 bg-card/50 px-4 py-2 backdrop-blur-sm"
            >
              <feature.icon className="size-4 text-primary" />
              <span className="text-xs font-medium text-muted-foreground md:text-sm">{feature.text}</span>
            </div>
          ))}
        </motion.div>

        <motion.div
          variants={fadeInUp}
          className="mt-10 flex flex-col items-center gap-4 sm:flex-row sm:justify-center"
        >
          <Button
            asChild
            size="lg"
            className="bg-primary text-primary-foreground transition-all duration-300 hover:bg-primary/90 hover:shadow-lg hover:shadow-primary/20 hover:scale-105"
          >
            <Link href="/contact">
              Start a Project
              <ArrowRight className="ml-2 size-4" />
            </Link>
          </Button>
          <Button asChild variant="outline" size="lg" className="border-border transition-all duration-300 hover:border-primary/40 hover:shadow-md hover:scale-105">
            <Link href="/work">
              View Our Work
              <ExternalLink className="ml-2 size-4" />
            </Link>
          </Button>
        </motion.div>

        {/* Play button / Video teaser */}
        <motion.div
          variants={fadeInUp}
          className="mt-14 flex items-center justify-center gap-4"
        >
          <button className="group flex items-center gap-3 transition-all duration-300 hover:gap-4">
            <div className="flex size-12 items-center justify-center rounded-full border border-primary/30 bg-primary/10 transition-all duration-300 group-hover:bg-primary/20 group-hover:shadow-lg group-hover:shadow-primary/10">
              <Play className="size-4 translate-x-0.5 text-primary" />
            </div>
            <span className="text-sm font-medium text-muted-foreground transition-colors duration-300 group-hover:text-foreground">
              Watch How We Work
            </span>
          </button>
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

  const crossfadeVariants = {
    enter: { opacity: 0, scale: 1.04 },
    center: { opacity: 1, scale: 1 },
    exit: { opacity: 0, scale: 0.96 },
  };

  const infoVariants = {
    enter: { opacity: 0, y: 30 },
    center: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: -20 },
  };

  return (
    <section
      id="work"
      className="relative px-4 py-20 md:py-28 lg:py-32"
      onKeyDown={handleKeyDown}
      tabIndex={0}
    >
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
          <Link href="/work">
            View All Work
            <ArrowRight className="ml-1 size-4" />
          </Link>
        </Button>
      </div>

      <div className="relative flex h-[70vh] min-h-[500px] md:h-[80vh] md:min-h-[600px] lg:h-[85vh] lg:min-h-[700px]">
        {/* Left Sidebar */}
        <div className="relative z-20 flex w-28 shrink-0 flex-col border-r border-border/40 bg-background/80 backdrop-blur-md md:w-40 lg:w-52">
          <div className="border-b border-border/30 px-3 py-3 md:px-5">
            <span className="text-[9px] font-medium uppercase tracking-[0.25em] text-muted-foreground/50 md:text-[10px]">
              Clients
            </span>
          </div>
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
                <div
                  className={`shrink-0 size-1.5 rounded-full transition-all duration-500 ${
                    activeProject === idx
                      ? 'bg-primary shadow-sm shadow-primary/50'
                      : 'bg-muted-foreground/20 group-hover/sidebar:bg-muted-foreground/40'
                  }`}
                />
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
                    <span className="hidden md:inline">{project.name}</span>
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
          <div className="border-t border-border/30 px-3 py-3 md:px-5">
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
              <div className="flex gap-1">
                <button
                  onClick={() => setActiveProject((prev) => Math.max(prev - 1, 0))}
                  disabled={activeProject === 0}
                  className="flex size-7 items-center justify-center rounded border border-border/40 text-muted-foreground transition-all duration-200 hover:border-primary/40 hover:text-primary disabled:opacity-30"
                  aria-label="Previous project"
                >
                  <ChevronRight className="size-3.5 -rotate-90" />
                </button>
                <button
                  onClick={() => setActiveProject((prev) => Math.min(prev + 1, projects.length - 1))}
                  disabled={activeProject === projects.length - 1}
                  className="flex size-7 items-center justify-center rounded border border-border/40 text-muted-foreground transition-all duration-200 hover:border-primary/40 hover:text-primary disabled:opacity-30"
                  aria-label="Next project"
                >
                  <ChevronRight className="size-3.5 rotate-90" />
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Main Image Area */}
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
              <div className="absolute inset-0 bg-gradient-to-t from-background via-background/20 to-transparent" />
              <div className="absolute inset-0 bg-gradient-to-r from-background/60 via-transparent to-transparent" />
              <div className="absolute inset-0 bg-gradient-to-l from-background/30 via-transparent to-transparent md:from-transparent" />
              <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-background/20" />
            </motion.div>
          </AnimatePresence>

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
              <div className="mb-3 flex items-center gap-3">
                <Badge className="border border-primary/30 bg-primary/15 px-3 py-1 text-[11px] font-medium text-primary backdrop-blur-sm">
                  {projects[activeProject].category}
                </Badge>
                <span className="text-xs text-foreground/40">{projects[activeProject].year}</span>
                <span className="text-xs font-semibold text-primary/70">{projects[activeProject].metrics}</span>
              </div>
              <h3
                className="mb-3 text-3xl font-bold tracking-tight text-foreground md:text-4xl lg:text-5xl"
                style={{ fontFamily: 'var(--font-geist-mono)' }}
              >
                {projects[activeProject].name}
              </h3>
              <p className="mb-5 max-w-xl text-sm leading-relaxed text-foreground/60 md:text-base md:text-foreground/70">
                {projects[activeProject].description}
              </p>
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
                  <Link href="/contact">
                    View Case Study
                    <ArrowRight className="ml-2 size-4" />
                  </Link>
                </Button>
              </div>
            </motion.div>
          </AnimatePresence>

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

      {/* Mobile project names */}
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

/* ─────────────────────── Listed On ─────────────────────── */
function ListedOn() {
  const platforms = [
    { name: 'Instagram', icon: Instagram, href: 'https://instagram.com/unnatvega', color: '#E4405F' },
    { name: 'Facebook', icon: Facebook, href: 'https://facebook.com/unnatvega', color: '#1877F2' },
    { name: 'Telegram', icon: Send, href: 'https://t.me/unnatvega', color: '#26A5E4' },
    { name: 'Alibaba', icon: Globe, href: 'https://alibaba.com', color: '#FF6A00' },
  ];

  return (
    <AnimatedSection className="py-16 md:py-20 lg:py-24">
      <div className="mx-auto max-w-7xl">
        <motion.div variants={fadeInUp} className="mb-10 text-center md:mb-12">
          <Badge
            variant="outline"
            className="mb-4 border-primary/30 bg-primary/10 px-3 py-1 text-xs font-medium tracking-widest text-primary"
          >
            LISTED ON
          </Badge>
          <h2 className="text-3xl font-bold tracking-tight md:text-4xl lg:text-5xl">
            Find Us Everywhere
          </h2>
        </motion.div>

        <div className="relative overflow-hidden">
          <div className="pointer-events-none absolute left-0 top-0 z-10 h-full w-20 bg-gradient-to-r from-background to-transparent md:w-32" />
          <div className="pointer-events-none absolute right-0 top-0 z-10 h-full w-20 bg-gradient-to-l from-background to-transparent md:w-32" />

          <div className="carousel-track flex items-center gap-16 md:gap-24" style={{ width: 'max-content' }}>
            {[0, 1, 2].map((set) =>
              platforms.map((platform) => (
                <a
                  key={`${set}-${platform.name}`}
                  href={platform.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex shrink-0 flex-col items-center gap-3 transition-all duration-300"
                >
                  <platform.icon
                    className="size-10 transition-all duration-300 group-hover:scale-110 md:size-12"
                    style={{ color: platform.color }}
                  />
                  <span className="text-sm font-medium text-muted-foreground transition-colors duration-300 group-hover:text-foreground md:text-base">
                    {platform.name}
                  </span>
                </a>
              ))
            )}
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
                      <Star key={i} className="size-4 fill-primary text-primary" />
                    ))}
                  </div>
                  <p className="mb-6 flex-1 text-sm leading-relaxed text-muted-foreground">
                    &ldquo;{t.quote}&rdquo;
                  </p>
                  <div className="flex items-center gap-3">
                    <div className="flex size-10 items-center justify-center rounded-full bg-primary/15 text-sm font-bold text-primary">
                      {t.initials}
                    </div>
                    <div>
                      <div className="text-sm font-semibold">{t.name}</div>
                      <div className="text-xs text-muted-foreground">{t.title}</div>
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

/* ─────────────────────── CTA Section ─────────────────────── */
function CTASection() {
  return (
    <AnimatedSection className="px-4 py-20 md:py-28">
      <div className="mx-auto max-w-4xl">
        <motion.div
          variants={fadeInUp}
          className="relative overflow-hidden rounded-3xl border border-primary/20 bg-gradient-to-br from-primary/10 via-primary/5 to-transparent p-8 text-center backdrop-blur-sm md:p-14"
        >
          {/* Decorative elements */}
          <div className="pointer-events-none absolute -right-16 -top-16 size-48 rounded-full bg-primary/10 blur-[80px]" />
          <div className="pointer-events-none absolute -bottom-16 -left-16 size-48 rounded-full bg-primary/5 blur-[80px]" />

          <div className="relative z-10">
            <Badge
              variant="outline"
              className="mb-6 border-primary/30 bg-primary/10 px-3 py-1 text-xs font-medium tracking-widest text-primary"
            >
              LET&apos;S TALK
            </Badge>
            <h2
              className="mb-4 text-3xl font-bold tracking-tight md:text-4xl lg:text-5xl"
              style={{ fontFamily: 'var(--font-geist-mono)' }}
            >
              Ready to Go <span className="gradient-text">Global</span>?
            </h2>
            <p className="mx-auto mb-8 max-w-xl text-base text-muted-foreground md:text-lg">
              Take the first step towards expanding your business internationally. Our team is ready to help you navigate global trade.
            </p>
            <div className="flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
              <Button
                asChild
                size="lg"
                className="bg-primary text-primary-foreground transition-all duration-300 hover:bg-primary/90 hover:shadow-lg hover:shadow-primary/20 hover:scale-105"
              >
                <Link href="/contact">
                  Get in Touch
                  <ArrowRight className="ml-2 size-4" />
                </Link>
              </Button>
              <Button asChild variant="outline" size="lg" className="border-border transition-all duration-300 hover:border-primary/40">
                <Link href="/about">
                  Learn About Us
                </Link>
              </Button>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatedSection>
  );
}

/* ─────────────────────── Page ─────────────────────── */
export default function Home() {
  return (
    <>
      <Hero />
      <ListedOn />
      <Services />
      <Portfolio />
      <Testimonials />
      <CTASection />
    </>
  );
}
