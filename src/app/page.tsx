'use client';

import { useState, useRef } from 'react';
import Image from 'next/image';
import { motion, useInView, AnimatePresence } from 'framer-motion';
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
    featured: true,
    metrics: '+340% Conversions',
  },
  {
    name: 'Velvet Commerce',
    category: 'E-Commerce',
    description: 'High-end e-commerce platform with seamless checkout flow',
    image: '/images/project-2.png',
    year: '2024',
    tech: ['React', 'Node.js', 'Stripe'],
    featured: true,
    metrics: '+220% Revenue',
  },
  {
    name: 'Nexus Analytics',
    category: 'SaaS',
    description: 'Enterprise analytics dashboard with real-time data visualization',
    image: '/images/project-3.png',
    year: '2023',
    tech: ['TypeScript', 'D3.js', 'WebSocket'],
    featured: true,
    metrics: '50K+ Daily Users',
  },
  {
    name: 'Prism Creative',
    category: 'Branding',
    description: 'Bold creative agency website with dynamic interactions',
    image: '/images/project-4.png',
    year: '2023',
    tech: ['Next.js', 'GSAP', 'Three.js'],
    featured: true,
    metrics: 'Award Winning',
  },
  {
    name: 'Aurora Finance',
    category: 'Mobile App',
    description: 'Fintech mobile application with intuitive investment tools',
    image: '/images/project-5.png',
    year: '2023',
    tech: ['React Native', 'Firebase', 'Plaid'],
    featured: false,
    metrics: '100K+ Downloads',
  },
  {
    name: 'Ember Dining',
    category: 'Web Design',
    description: 'Luxury restaurant website with reservation system',
    image: '/images/project-6.png',
    year: '2024',
    tech: ['Next.js', 'Prisma', 'Tailwind'],
    featured: false,
    metrics: '+180% Bookings',
  },
];

const categories = ['All', 'E-Commerce', 'SaaS', 'Branding', 'Mobile App', 'Web Design'];

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
        <div className="hidden items-center gap-8 md:flex">
          {navLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              className="text-sm text-muted-foreground transition-all duration-300 hover:text-foreground"
            >
              {link.label}
            </a>
          ))}
          <Button asChild className="bg-primary text-primary-foreground transition-all duration-300 hover:bg-primary/90 hover:shadow-lg hover:shadow-primary/20">
            <a href="#contact">
              Start a Project
              <ArrowRight className="ml-1 size-4" />
            </a>
          </Button>
        </div>

        {/* Mobile Nav */}
        <div className="md:hidden">
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
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage:
              'linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)',
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
  const [activeCategory, setActiveCategory] = useState('All');
  const [isCustomCursor, setIsCustomCursor] = useState(false);
  const [cursorPos, setCursorPos] = useState({ x: 0, y: 0 });
  const showcaseRef = useRef<HTMLDivElement>(null);

  const filteredProjects =
    activeCategory === 'All'
      ? projects
      : projects.filter((p) => p.category === activeCategory);

  const featuredProjects = filteredProjects.filter((p) => p.featured);
  const nonFeaturedProjects = filteredProjects.filter((p) => !p.featured);

  const handleShowcaseMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!showcaseRef.current) return;
    const rect = showcaseRef.current.getBoundingClientRect();
    setCursorPos({ x: e.clientX - rect.left, y: e.clientY - rect.top });
  };

  const handleBentoMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    e.currentTarget.style.transform = `perspective(1000px) rotateY(${x * 5}deg) rotateX(${-y * 5}deg)`;
  };

  const handleBentoMouseLeave = (e: React.MouseEvent<HTMLDivElement>) => {
    e.currentTarget.style.transform = 'perspective(1000px) rotateY(0deg) rotateX(0deg)';
  };

  // Reset activeProject when category changes if out of range
  const safeActiveProject = Math.min(activeProject, Math.max(featuredProjects.length - 1, 0));

  return (
    <AnimatedSection
      id="work"
      className="px-4 py-20 md:py-28 lg:py-32"
    >
      <div className="mx-auto max-w-7xl">
        {/* Section Header */}
        <motion.div variants={fadeInUp} className="mb-10 text-center md:mb-14">
          <Badge
            variant="outline"
            className="mb-4 border-primary/30 bg-primary/10 px-3 py-1 text-xs font-medium tracking-widest text-primary"
          >
            OUR WORK
          </Badge>
          <h2 className="text-3xl font-bold tracking-tight md:text-4xl lg:text-5xl">
            Crafted with Purpose
          </h2>
        </motion.div>

        {/* Category Filter Tabs */}
        <motion.div variants={fadeInUp} className="mb-12 flex items-center gap-2 overflow-x-auto pb-2 md:justify-center">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => {
                setActiveCategory(cat);
                setActiveProject(0);
              }}
              className={`shrink-0 rounded-full px-5 py-2 text-sm font-medium transition-all duration-300 ${
                activeCategory === cat
                  ? 'bg-primary text-primary-foreground shadow-lg shadow-primary/25'
                  : 'border border-border bg-background text-muted-foreground hover:border-primary/40 hover:text-foreground'
              }`}
            >
              {cat}
            </button>
          ))}
        </motion.div>

        {/* Part 1: Interactive Split Showcase */}
        {featuredProjects.length > 0 ? (
          <motion.div
            variants={fadeInUp}
            ref={showcaseRef}
            onMouseMove={handleShowcaseMouseMove}
            onMouseEnter={() => setIsCustomCursor(true)}
            onMouseLeave={() => setIsCustomCursor(false)}
            className="relative mb-12 grid gap-6 md:grid-cols-5 md:gap-8 lg:mb-16"
            style={{ cursor: isCustomCursor ? 'none' : 'default' }}
          >
            {/* Custom Cursor */}
            {isCustomCursor && (
              <div
                className="pointer-events-none absolute z-50 flex size-20 items-center justify-center rounded-full border border-primary/50 bg-primary/10 backdrop-blur-sm transition-[left,top] duration-100"
                style={{
                  left: cursorPos.x - 40,
                  top: cursorPos.y - 40,
                }}
              >
                <span className="text-xs font-bold text-primary">VIEW</span>
              </div>
            )}

            {/* Left: Project List (2 cols) */}
            <div className="flex flex-col md:col-span-2">
              {featuredProjects.map((project, idx) => (
                <motion.button
                  key={project.name}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: idx * 0.1, duration: 0.4 }}
                  onMouseEnter={() => setActiveProject(idx)}
                  className={`group relative flex items-start gap-4 py-5 text-left transition-all duration-300 md:py-6 ${
                    safeActiveProject === idx
                      ? 'border-l-2 border-primary pl-4'
                      : 'border-l-2 border-transparent pl-4'
                  }`}
                >
                  {/* Project Number */}
                  <span
                    className={`shrink-0 text-3xl font-bold tracking-tighter transition-all duration-300 md:text-4xl ${
                      safeActiveProject === idx
                        ? 'text-primary/60'
                        : 'text-muted-foreground/20'
                    }`}
                    style={{ fontFamily: 'var(--font-geist-mono)' }}
                  >
                    {String(idx + 1).padStart(2, '0')}
                  </span>

                  {/* Project Info */}
                  <div className="min-w-0 flex-1 pt-1">
                    <div className="flex items-center gap-2">
                      <h3
                        className={`text-lg font-bold transition-all duration-300 md:text-xl ${
                          safeActiveProject === idx
                            ? 'text-foreground'
                            : 'text-muted-foreground group-hover:text-foreground/80'
                        }`}
                      >
                        {project.name}
                      </h3>
                      <span className="text-xs text-muted-foreground/60">{project.year}</span>
                    </div>
                    <div className="mt-1 flex items-center gap-2">
                      <Badge
                        variant="secondary"
                        className="bg-primary/10 text-[10px] text-primary"
                      >
                        {project.category}
                      </Badge>
                      <span className="text-xs font-medium text-primary/70">{project.metrics}</span>
                    </div>
                    {/* Tech pills */}
                    <div className="mt-2 flex flex-wrap gap-1">
                      {project.tech.map((t) => (
                        <span
                          key={t}
                          className="rounded-full border border-border/50 bg-muted/50 px-2 py-0.5 text-[10px] text-muted-foreground"
                        >
                          {t}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Separator */}
                  {idx < featuredProjects.length - 1 && (
                    <div className="absolute bottom-0 right-0 left-4 h-px bg-gradient-to-r from-primary/30 via-primary/15 to-transparent" />
                  )}
                </motion.button>
              ))}
            </div>

            {/* Right: Image Preview (3 cols) */}
            <div className="relative min-h-[300px] overflow-hidden rounded-2xl md:col-span-3 md:min-h-[450px] lg:min-h-[520px]">
              <AnimatePresence mode="wait">
                <motion.div
                  key={safeActiveProject}
                  initial={{ opacity: 0, scale: 1.05 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.4, ease: 'easeInOut' }}
                  className="absolute inset-0"
                >
                  {featuredProjects[safeActiveProject] && (
                    <>
                      <Image
                        src={featuredProjects[safeActiveProject].image}
                        alt={featuredProjects[safeActiveProject].name}
                        fill
                        className="object-cover"
                        sizes="(max-width: 768px) 100vw, 60vw"
                        priority
                      />
                      {/* Gradient overlay */}
                      <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-background/30 to-transparent" />

                      {/* Text overlay */}
                      <div className="absolute bottom-0 left-0 right-0 p-6 md:p-8">
                        <p className="mb-3 max-w-md text-sm leading-relaxed text-foreground/80 md:text-base">
                          {featuredProjects[safeActiveProject].description}
                        </p>
                        <Button
                          className="bg-primary text-primary-foreground opacity-0 transition-all duration-300 group-hover:opacity-100 hover:bg-primary/90 hover:shadow-lg hover:shadow-primary/25"
                          style={{ opacity: 1 }}
                        >
                          View Case Study
                          <ArrowRight className="ml-2 size-4" />
                        </Button>
                      </div>
                    </>
                  )}
                </motion.div>
              </AnimatePresence>
            </div>
          </motion.div>
        ) : (
          <motion.div
            variants={fadeInUp}
            className="mb-12 flex min-h-[300px] items-center justify-center rounded-2xl border border-dashed border-border/50"
          >
            <p className="text-muted-foreground">No projects found in this category.</p>
          </motion.div>
        )}

        {/* Part 2: Bento Grid */}
        <div className="grid gap-4 md:grid-cols-3 lg:gap-5">
          {nonFeaturedProjects.map((project, idx) => (
            <motion.div
              key={project.name}
              variants={fadeInUp}
              className={`${idx === 0 ? 'md:col-span-2' : 'md:col-span-1'}`}
            >
              <div
                onMouseMove={handleBentoMouseMove}
                onMouseLeave={handleBentoMouseLeave}
                className="glass group h-full overflow-hidden rounded-2xl border border-transparent transition-all duration-300 ease-out hover:border-primary/40 hover:shadow-xl hover:shadow-primary/5"
                style={{ transition: 'transform 0.15s ease-out, border-color 0.3s, box-shadow 0.3s' }}
              >
                <div className={`relative overflow-hidden ${idx === 0 ? 'aspect-[2/1]' : 'aspect-square'}`}>
                  <Image
                    src={project.image}
                    alt={project.name}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-110"
                    sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-transparent to-transparent" />
                  <div className="absolute bottom-0 left-0 right-0 p-4 md:p-5">
                    <div className="flex items-center gap-2">
                      <Badge className="bg-primary/15 text-[10px] text-primary backdrop-blur-sm">
                        {project.category}
                      </Badge>
                      <span className="text-[10px] text-foreground/60">{project.year}</span>
                    </div>
                    <h3 className="mt-1 text-base font-bold md:text-lg">{project.name}</h3>
                    <p className="mt-0.5 text-xs text-muted-foreground line-clamp-2">{project.description}</p>
                    <div className="mt-2 flex flex-wrap gap-1">
                      {project.tech.map((t) => (
                        <span
                          key={t}
                          className="rounded-full border border-white/10 bg-white/5 px-1.5 py-0.5 text-[9px] text-foreground/60"
                        >
                          {t}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
                <div className="p-4 pt-0">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-semibold text-primary">{project.metrics}</span>
                    <ExternalLink className="size-3.5 text-muted-foreground transition-colors duration-300 group-hover:text-primary" />
                  </div>
                </div>
              </div>
            </motion.div>
          ))}

          {/* Stats Card */}
          <motion.div variants={fadeInUp}>
            <div
              onMouseMove={handleBentoMouseMove}
              onMouseLeave={handleBentoMouseLeave}
              className="relative flex h-full min-h-[220px] flex-col items-center justify-center overflow-hidden rounded-2xl border border-transparent transition-all duration-300 ease-out hover:border-primary/40 hover:shadow-xl hover:shadow-primary/5"
              style={{ transition: 'transform 0.15s ease-out, border-color 0.3s, box-shadow 0.3s' }}
            >
              {/* Decorative background */}
              <div className="absolute inset-0 bg-gradient-to-br from-primary/20 via-primary/5 to-transparent" />
              <div className="absolute -right-8 -top-8 size-32 rounded-full bg-primary/10 blur-2xl" />
              <div className="absolute -bottom-8 -left-8 size-32 rounded-full bg-primary/10 blur-2xl" />
              <div className="relative z-10 text-center">
                <div
                  className="text-5xl font-bold tracking-tight text-primary md:text-6xl"
                  style={{ fontFamily: 'var(--font-geist-mono)' }}
                >
                  150+
                </div>
                <p className="mt-2 text-sm font-medium text-muted-foreground">
                  Projects Delivered
                </p>
                <p className="mt-1 text-xs text-muted-foreground/60">
                  Across 12+ industries
                </p>
              </div>
            </div>
          </motion.div>

          {/* CTA Card */}
          <motion.div variants={fadeInUp} className="md:col-span-2">
            <div
              onMouseMove={handleBentoMouseMove}
              onMouseLeave={handleBentoMouseLeave}
              className="relative flex h-full min-h-[220px] flex-col items-center justify-center overflow-hidden rounded-2xl border border-transparent transition-all duration-300 ease-out hover:border-primary/40 hover:shadow-xl hover:shadow-primary/5"
              style={{ transition: 'transform 0.15s ease-out, border-color 0.3s, box-shadow 0.3s' }}
            >
              {/* Gradient background */}
              <div className="absolute inset-0 bg-gradient-to-br from-primary/15 via-primary/5 to-transparent" />
              <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_70%_50%,oklch(0.85_0.08_75)_0%,transparent_60%)] opacity-30" />
              {/* Grid pattern */}
              <div
                className="absolute inset-0 opacity-[0.04]"
                style={{
                  backgroundImage:
                    'linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)',
                  backgroundSize: '30px 30px',
                }}
              />
              <div className="relative z-10 text-center">
                <h3 className="mb-2 text-xl font-bold md:text-2xl">
                  Ready to Start Your Project?
                </h3>
                <p className="mb-5 max-w-sm text-sm text-muted-foreground">
                  Explore our full portfolio and let&apos;s bring your vision to life.
                </p>
                <Button
                  asChild
                  size="lg"
                  className="bg-primary text-primary-foreground transition-all duration-300 hover:bg-primary/90 hover:shadow-lg hover:shadow-primary/25"
                >
                  <a href="#contact">
                    View All Projects
                    <ArrowRight className="ml-2 size-4" />
                  </a>
                </Button>
              </div>
            </div>
          </motion.div>
        </div>
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
        className="absolute inset-0 opacity-[0.06]"
        style={{
          backgroundImage:
            'linear-gradient(135deg, rgba(255,255,255,0.15) 25%, transparent 25%, transparent 50%, rgba(255,255,255,0.15) 50%, rgba(255,255,255,0.15) 75%, transparent 75%)',
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
