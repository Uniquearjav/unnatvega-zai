"use client";

import { useState, useRef, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  motion,
  useInView,
  AnimatePresence,
  useScroll,
  useTransform,
} from "framer-motion";
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
  Zap,
  Shield,
  Heart,
  MessageCircle,
  Linkedin,
  Twitter,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

import { fadeInUp, staggerContainer } from "@/lib/animations";

/* ─────────────────────── Data ─────────────────────── */

const services = [
  {
    icon: Target,
    title: "Export Solutions",
    description:
      "End-to-end export management helping Indian businesses reach global markets with compliance and confidence.",
  },
  {
    icon: TrendingUp,
    title: "Import Services",
    description:
      "Seamless import facilitation with strategic sourcing, quality assurance, and customs clearance support.",
  },
  {
    icon: Code2,
    title: "Digital Presence",
    description:
      "Powerful websites and digital platforms built for trade businesses to attract international clients and partners.",
  },
  {
    icon: Palette,
    title: "Brand Identity",
    description:
      "Premium branding that positions your business as a trusted global player in the international trade ecosystem.",
  },
];

const projects = [
  {
    name: "Revati Craft",
    category: "Export",
    description:
      "Premium spice export platform connecting Indian farmers to global markets",
    image: "/images/work/revati_craft.png",
    year: "2026",
    tech: ["Next.js", "Shadcn UI"],
  },
  {
    name: "Nirvatatva",
    category: "Export",
    description:
      "High-end textile export portal with seamless order management",
    image: "/images/work/nirvatatva.png",
    year: "2024",
    tech: ["React", "Node.js", "Next.js"],
  },
  {
    name: "Anantastra",
    category: "SaaS",
    description:
      "Enterprise trade analytics dashboard with real-time market intelligence",
    image: "/images/work/anantastra.png",
    year: "2025",
    tech: ["Nextjs", "Tailwind CSS", "GSAP"],
  },
  {
    name: "Arjav Consultancy",
    category: "Consultancy",
    description:
      "Bold brand identity for an agro-products export house with global reach",
    image: "/images/work/arjav_consultancy.png",
    year: "2025",
    tech: ["Next.js"],
  },
  {
    name: "Numerologist Simple Bhansali",
    category: "Consultancy",
    description:
      "Import management app with customs tracking and compliance tools",
    image: "/images/work/simple_bhansali.png",
    year: "2025",
    tech: ["React", "Next.js"],
  },
];

const testimonials = [
  {
    quote:
      "Unnat Vega transformed our export operations completely. Their digital platform helped us reach 15 new countries in just 6 months. The attention to compliance and user experience was remarkable.",
    name: "Alpha Jain",
    title: "Director at SpiceRoute Exports",
    initials: "RS",
  },
  {
    quote:
      "Working with Unnat Vega was a game-changer for our import business. They didn't just build a website — they created a complete trade management ecosystem that streamlined our entire supply chain.",
    name: "Priya Patel",
    title: "CEO at TextileHub Global",
    initials: "PP",
  },
  {
    quote:
      "The team at Unnat Vega brings an unmatched level of understanding of international trade. Their digital solutions helped us reduce customs clearance time by 60% and scale our operations globally.",
    name: "Amit Verma",
    title: "COO at TradeNexus Analytics",
    initials: "AV",
  },
];

/* ─────────────────────── Section Wrapper ─────────────────────── */
function AnimatedSection({
  children,
  id,
  className = "",
}: {
  children: React.ReactNode;
  id?: string;
  className?: string;
}) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <motion.section
      id={id}
      ref={ref}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
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
  const rotatingWords = ["Traders","Consultants", "Businesses", "Exporters", "Importers"];

  // Parallax scroll effect
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });
  const bgY = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);
  const bgScale = useTransform(scrollYProgress, [0, 1], [1, 1.1]);

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
      className="relative flex min-h-screen items-center justify-center overflow-hidden px-4 py-20 sm:py-28 md:py-36 lg:py-44"
    >
      {/* Background image with parallax */}
      <motion.div
        className="pointer-events-none absolute inset-0"
        style={{ y: bgY, scale: bgScale }}
      >
        <Image
          src="/images/hero.png"
          alt="Global trade and commerce background"
          fill
          className="object-cover"
          sizes="100vw"
          priority
          quality={85}
        />
      </motion.div>

      {/* Dark overlay for text readability */}
      <div className="pointer-events-none absolute inset-0 bg-black/50 dark:bg-background/80" />
      {/* Background decorative elements (subtle overlays on top of image) */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        {/* Orange gradient orbs - more subtle over image */}
        <div className="absolute -left-32 top-1/4 size-[400px] rounded-full bg-primary/8 blur-[150px] md:size-[500px]" />
        <div className="absolute -right-32 bottom-1/4 size-[300px] rounded-full bg-primary/6 blur-[120px] md:size-[400px]" />
        <div className="absolute left-1/2 top-1/2 size-48 -translate-x-1/2 -translate-y-1/2 rounded-full bg-primary/4 blur-[100px] md:size-64" />
        {/* Animated rings */}
        <div className="absolute right-[10%] top-[20%] hidden size-72 rounded-full border border-primary/8 md:block md:size-96" />
        <div className="absolute right-[8%] top-[18%] hidden size-80 rounded-full border border-primary/4 md:block md:size-[420px]" />
        <div className="absolute left-[5%] bottom-[15%] hidden size-48 rounded-full border border-primary/6 md:block md:size-72" />
        {/* Grid pattern */}
        <div
          className="absolute inset-0 opacity-[0.02]"
          style={{
            backgroundImage:
              "linear-gradient(var(--border) 1px, transparent 1px), linear-gradient(90deg, var(--border) 1px, transparent 1px)",
            backgroundSize: "60px 60px",
          }}
        />
      </div>

      <motion.div
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
        variants={staggerContainer}
        className="relative z-10 mx-auto max-w-6xl text-center"
      >

        <motion.h1
          variants={fadeInUp}
          className="text-3xl text-white font-bold tracking-tight "
          style={{ fontFamily: "var(--font-geist-mono)" }}
        >
          <span className="block sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl 2xl:text-8xl">Unnat Vega</span>
          <span className=" block">
            Luxury Web Design for {" "}
            <AnimatePresence mode="wait">
              <motion.span
                key={currentWord}
                initial={{ opacity: 0, y: 20, filter: "blur(8px)" }}
                animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                exit={{ opacity: 0, y: -20, filter: "blur(8px)" }}
                transition={{ duration: 0.5, ease: "easeInOut" }}
                className="inline-block"
              >
                {rotatingWords[currentWord]}
              </motion.span>
            </AnimatePresence>
          </span>
        </motion.h1>

        <motion.div
          variants={fadeInUp}
          className="mt-8 flex flex-col items-center gap-3 sm:mt-10 sm:flex-row sm:justify-center sm:gap-4"
        >
          <Button
            asChild
            size="lg"
            className="min-h-[44px] bg-primary text-primary-foreground transition-all duration-300 hover:bg-primary/90 hover:shadow-lg hover:shadow-primary/20 hover:scale-105"
          >
            <Link href="/contact">
              Start a Project
              <ArrowRight className="ml-2 size-4" />
            </Link>
          </Button>
          <Button
            asChild
            variant="outline"
            size="lg"
            className="min-h-[44px] border-border transition-all duration-300 hover:border-primary/40 hover:shadow-md hover:scale-105"
          >
            <Link href="/work">
              View Our Work
              <ExternalLink className="ml-2 size-4" />
            </Link>
          </Button>
        </motion.div>
      </motion.div>
    </section>
  );
}

/* ─────────────────────── Services ─────────────────────── */
function Services() {
  return (
    <AnimatedSection id="services" className="px-4 py-16 md:py-20 lg:py-24">
      <div className="mx-auto max-w-7xl">
        <motion.div variants={fadeInUp} className="mb-10 text-center md:mb-14">
          <Badge
            variant="outline"
            className="mb-3 border-primary/30 bg-primary/10 px-3 py-1 text-xs font-medium tracking-widest text-primary"
          >
            WHAT WE DO
          </Badge>
          <h2 className="text-2xl font-bold tracking-tight sm:text-3xl md:text-4xl lg:text-5xl">
            Solutions That Drive Growth
          </h2>
        </motion.div>

        <div className="grid gap-4 sm:grid-cols-2 md:gap-6">
          {services.map((service) => (
            <motion.div key={service.title} variants={fadeInUp}>
              <Card className="group glass h-full border-transparent transition-all duration-300 hover:-translate-y-1 hover:border-primary/40 hover:shadow-lg hover:shadow-primary/5">
                <CardContent className="p-5 md:p-8">
                  <div className="mb-3 flex size-11 items-center justify-center rounded-full bg-primary/10 transition-all duration-300 group-hover:bg-primary/20 md:mb-4 md:size-12">
                    <service.icon className="size-5 text-primary transition-transform duration-300 group-hover:scale-110 md:size-6" />
                  </div>
                  <h3 className="mb-1.5 text-lg font-semibold md:mb-2 md:text-xl">
                    {service.title}
                  </h3>
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
    if (e.key === "ArrowDown" || e.key === "ArrowRight") {
      e.preventDefault();
      setActiveProject((prev) => Math.min(prev + 1, projects.length - 1));
    } else if (e.key === "ArrowUp" || e.key === "ArrowLeft") {
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
      className="relative px-4 py-16 md:px-4 md:py-20 lg:py-24"
      onKeyDown={handleKeyDown}
      tabIndex={0}
    >
      <div className="mb-6 flex items-end justify-between md:mb-10 lg:px-4">
        <div>
          <Badge
            variant="outline"
            className="mb-2 border-primary/30 bg-primary/10 px-3 py-1 text-xs font-medium tracking-widest text-primary md:mb-3"
          >
            OUR WORK
          </Badge>
          <h2 className="text-2xl font-bold tracking-tight sm:text-3xl md:text-4xl lg:text-5xl">
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

      {/* Mobile project selector pills - shown above the image on mobile */}
      <div className="mb-3 flex gap-2 overflow-x-auto pb-2 scrollbar-hide md:hidden">
        {projects.map((project, idx) => (
          <button
            key={project.name}
            onClick={() => setActiveProject(idx)}
            className={`shrink-0 rounded-full px-3 py-2 text-xs font-medium transition-all duration-300 min-h-[44px] ${
              activeProject === idx
                ? "bg-primary text-primary-foreground shadow-lg shadow-primary/25"
                : "border border-border text-muted-foreground hover:border-primary/40 hover:text-foreground"
            }`}
          >
            {project.name}
          </button>
        ))}
      </div>

      <div className="relative flex h-[60vh] min-h-[380px] md:h-[80vh] md:min-h-[600px] lg:h-[85vh] lg:min-h-[700px]">
        {/* Left Sidebar - hidden on mobile */}
        <div className="relative z-20 hidden w-40 shrink-0 flex-col border-r border-border/40 bg-background/80 backdrop-blur-md md:flex lg:w-52">
          <div className="border-b border-border/30 px-5 py-3">
            <span className="text-[10px] font-medium uppercase tracking-[0.25em] text-muted-foreground/50">
              Clients
            </span>
          </div>
          <div className="flex flex-1 flex-col justify-center">
            {projects.map((project, idx) => (
              <button
                key={project.name}
                onClick={() => setActiveProject(idx)}
                className={`group/sidebar relative flex items-center gap-3 px-5 py-3.5 text-left transition-all duration-300 ${
                  activeProject === idx
                    ? "bg-primary/10 border-l-2 border-primary"
                    : "border-l-2 border-transparent hover:bg-muted/30"
                }`}
              >
                <div
                  className={`shrink-0 size-1.5 rounded-full transition-all duration-500 ${
                    activeProject === idx
                      ? "bg-primary shadow-sm shadow-primary/50"
                      : "bg-muted-foreground/20 group-hover/sidebar:bg-muted-foreground/40"
                  }`}
                />
                <div className="min-w-0 flex-1">
                  <span
                    className={`block truncate text-sm font-medium transition-all duration-300 ${
                      activeProject === idx
                        ? "text-primary font-semibold"
                        : "text-muted-foreground/50 group-hover/sidebar:text-muted-foreground/80"
                    }`}
                  >
                    {project.name}
                  </span>
                  <span
                    className={`block truncate text-[10px] transition-all duration-300 ${
                      activeProject === idx
                        ? "text-muted-foreground/60"
                        : "text-muted-foreground/0 group-hover/sidebar:text-muted-foreground/40"
                    }`}
                  >
                    {project.category}
                  </span>
                </div>
              </button>
            ))}
          </div>
          <div className="border-t border-border/30 px-5 py-3">
            <div className="mb-3 h-0.5 w-full overflow-hidden rounded-full bg-border/30">
              <motion.div
                className="h-full rounded-full bg-primary"
                initial={false}
                animate={{
                  width: `${((activeProject + 1) / projects.length) * 100}%`,
                }}
                transition={{ duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] }}
              />
            </div>
            <div className="flex items-center justify-between">
              <div>
                <span
                  className="text-xs font-bold text-primary"
                  style={{ fontFamily: "var(--font-geist-mono)" }}
                >
                  {String(activeProject + 1).padStart(2, "0")}
                </span>
                <span className="text-[10px] text-muted-foreground/40">/</span>
                <span
                  className="text-[10px] text-muted-foreground/40"
                  style={{ fontFamily: "var(--font-geist-mono)" }}
                >
                  {String(projects.length).padStart(2, "0")}
                </span>
              </div>
              <div className="flex gap-1">
                <button
                  onClick={() =>
                    setActiveProject((prev) => Math.max(prev - 1, 0))
                  }
                  disabled={activeProject === 0}
                  className="flex size-7 items-center justify-center rounded border border-border/40 text-muted-foreground transition-all duration-200 hover:border-primary/40 hover:text-primary disabled:opacity-30"
                  aria-label="Previous project"
                >
                  <ChevronRight className="size-3.5 -rotate-90" />
                </button>
                <button
                  onClick={() =>
                    setActiveProject((prev) =>
                      Math.min(prev + 1, projects.length - 1),
                    )
                  }
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
        <div className="relative flex-1 overflow-hidden rounded-lg md:rounded-none">
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
                alt={projects[activeProbrject].name}
                fill
                className="object-cover"
                // sizes="(max-width: 768px) 100vw, 80vw"
              />
              {/* Overlay gradients - heavier on mobile for readability */}
              <div className="absolute inset-0 bg-gradient-to-t from-background via-background/30 to-background/20" />
            </motion.div>
          </AnimatePresence>

          <AnimatePresence mode="wait">
            <motion.div
              key={activeProject}
              variants={infoVariants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{
                duration: 0.5,
                ease: [0.25, 0.46, 0.45, 0.94],
                delay: 0.1,
              }}
              className="absolute bottom-0 left-0 right-0 z-10 px-4 pb-4 sm:px-6 sm:pb-6 md:px-10 md:pb-10 lg:px-14 lg:pb-12"
            >
              <div className="mb-2 flex flex-wrap items-center gap-2 md:mb-3 md:gap-3">
                <Badge className="border border-primary/30 bg-primary/15 px-2 py-0.5 text-[10px] font-medium text-primary backdrop-blur-sm sm:px-3 sm:py-1 sm:text-[11px]">
                  {projects[activeProject].category}
                </Badge>
                <span className="text-[11px] text-foreground/40 sm:text-xs">
                  {projects[activeProject].year}
                </span>
                <span className="text-[11px] font-semibold text-primary/70 sm:text-xs">
                  {projects[activeProject].metrics}
                </span>
              </div>
              <h3
                className="mb-2 text-xl font-bold tracking-tight text-foreground sm:text-2xl md:mb-3 md:text-4xl lg:text-5xl"
                style={{ fontFamily: "var(--font-geist-mono)" }}
              >
                {projects[activeProject].name}
              </h3>
              <p className="mb-4 max-w-xl text-sm leading-relaxed text-foreground/60 sm:mb-5 md:text-base md:text-foreground/70">
                {projects[activeProject].description}
              </p>
              <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:gap-4">
                <div className="flex flex-wrap gap-1.5 sm:gap-2">
                  {projects[activeProject].tech.map((t) => (
                    <span
                      key={t}
                      className="rounded-full border border-foreground/10 bg-foreground/5 px-2 py-0.5 text-[10px] font-medium text-foreground/50 backdrop-blur-sm sm:px-3 sm:py-1 sm:text-[11px]"
                    >
                      {t}
                    </span>
                  ))}
                </div>
                <Button
                  asChild
                  className="min-h-[44px] bg-primary text-primary-foreground transition-all duration-300 hover:bg-primary/90 hover:shadow-lg hover:shadow-primary/25 sm:ml-auto"
                >
                  <Link href="/contact">
                    View Case Study
                    <ArrowRight className="ml-2 size-4" />
                  </Link>
                </Button>
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Right-side dot navigation - hidden on mobile */}
          <div className="absolute bottom-6 right-6 z-10 hidden flex-col gap-1.5 md:flex">
            {projects.map((_, idx) => (
              <button
                key={idx}
                onClick={() => setActiveProject(idx)}
                className={`transition-all duration-500 ${
                  activeProject === idx
                    ? "h-6 w-1.5 rounded-full bg-primary shadow-sm shadow-primary/50"
                    : "h-1.5 w-1.5 rounded-full bg-foreground/20 hover:bg-foreground/40"
                }`}
                aria-label={`Go to project ${idx + 1}`}
              />
            ))}
          </div>
        </div>
      </div>

      {/* Mobile navigation arrows - below the image */}
      <div className="mt-3 flex items-center justify-between md:hidden">
        <div className="flex items-center gap-2">
          <span
            className="text-xs font-bold text-primary"
            style={{ fontFamily: "var(--font-geist-mono)" }}
          >
            {String(activeProject + 1).padStart(2, "0")}
          </span>
          <span className="text-[10px] text-muted-foreground/40">/</span>
          <span
            className="text-[10px] text-muted-foreground/40"
            style={{ fontFamily: "var(--font-geist-mono)" }}
          >
            {String(projects.length).padStart(2, "0")}
          </span>
        </div>
        <div className="flex gap-2">
          <button
            onClick={() => setActiveProject((prev) => Math.max(prev - 1, 0))}
            disabled={activeProject === 0}
            className="flex size-9 items-center justify-center rounded border border-border/40 text-muted-foreground transition-all duration-200 hover:border-primary/40 hover:text-primary disabled:opacity-30"
            aria-label="Previous project"
          >
            <ChevronRight className="size-4 -rotate-90" />
          </button>
          <button
            onClick={() =>
              setActiveProject((prev) =>
                Math.min(prev + 1, projects.length - 1),
              )
            }
            disabled={activeProject === projects.length - 1}
            className="flex size-9 items-center justify-center rounded border border-border/40 text-muted-foreground transition-all duration-200 hover:border-primary/40 hover:text-primary disabled:opacity-30"
            aria-label="Next project"
          >
            <ChevronRight className="size-4 rotate-90" />
          </button>
        </div>
      </div>
    </section>
  );
}

/* ─────────────────────── Listed On ─────────────────────── */
function ListedOn() {
  const platforms = [
    {
      name: "Clutch",
      image: "/images/listing/clutch.png",
      href: "https://instagram.com/unnatvega",
    },
    {
      name: "Google My Business",
      image: "/images/listing/gmb.webp",
      href: "https://facebook.com/unnatvega",
    },
    {
      name: "The Mainfest",
      image: "/images/listing/manifest.png",
      href: "https://t.me/unnatvega",
    },
    {
      name: "Good Firms",
      image: "/images/listing/goodfirms.jpeg",
      href: "https://www.goodfirms.co/company/unnat-vega",
    },
    {
      name: "Dribbble",
      image: "/images/listing/dribbble.png",
      href: "https://dribbble.com/unnat-vega",
    },
  ];

  return (
    <AnimatedSection className="py-12 md:py-20 lg:py-24">
      <div className="mx-auto max-w-7xl">
        <motion.div variants={fadeInUp} className="mb-8 text-center md:mb-12">
          <Badge
            variant="outline"
            className="mb-3 border-primary/30 bg-primary/10 px-3 py-1 text-xs font-medium tracking-widest text-primary md:mb-4"
          >
            LISTED ON
          </Badge>
          <h2 className="text-2xl font-bold tracking-tight sm:text-3xl md:text-4xl lg:text-5xl">
            Find Us Everywhere
          </h2>
        </motion.div>

        <div className="relative overflow-hidden">
          <div className="pointer-events-none absolute left-0 top-0 z-10 h-full w-16 bg-gradient-to-r from-background to-transparent sm:w-20 md:w-32" />
          <div className="pointer-events-none absolute right-0 top-0 z-10 h-full w-16 bg-gradient-to-l from-background to-transparent sm:w-20 md:w-32" />

          <div
            className="carousel-track flex items-center gap-10 md:gap-24"
            style={{ width: "max-content" }}
          >
            {[0, 1, 2].map((set) =>
              platforms.map((platform) => (
                <a
                  key={`${set}-${platform.name}`}
                  href={platform.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex shrink-0 flex-col items-center gap-2 transition-all duration-300 sm:gap-3"
                >
                  <Image
                    src={platform.image}
                    alt={platform.name}
                    width={100}
                    height={100}
                    className="transition-all grayscale hover:grayscale-0 duration-300 group-hover:scale-110"
                  />
                  <span className="text-xs font-medium text-muted-foreground transition-colors duration-300 group-hover:text-foreground sm:text-sm md:text-base">
                    {platform.name}
                  </span>
                </a>
              )),
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
    <AnimatedSection className="px-4 py-16 md:py-20 lg:py-24">
      <div className="mx-auto max-w-7xl">
        <motion.div variants={fadeInUp} className="mb-10 text-center md:mb-14">
          <Badge
            variant="outline"
            className="mb-3 border-primary/30 bg-primary/10 px-3 py-1 text-xs font-medium tracking-widest text-primary md:mb-4"
          >
            TESTIMONIALS
          </Badge>
          <h2 className="text-2xl font-bold tracking-tight sm:text-3xl md:text-4xl lg:text-5xl">
            What Our Clients Say
          </h2>
        </motion.div>

        <div className="grid gap-4 sm:grid-cols-2 sm:gap-6 lg:grid-cols-3">
          {testimonials.map((t) => (
            <motion.div key={t.name} variants={fadeInUp}>
              <Card className="glass h-full border-transparent transition-all duration-300 hover:-translate-y-1 hover:border-primary/40 hover:shadow-lg hover:shadow-primary/5">
                <CardContent className="flex h-full flex-col p-4 sm:p-6">
                  <div className="mb-3 flex gap-1 sm:mb-4">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className="size-3.5 fill-primary text-primary sm:size-4"
                      />
                    ))}
                  </div>
                  <p className="mb-4 flex-1 text-sm leading-relaxed text-muted-foreground sm:mb-6">
                    &ldquo;{t.quote}&rdquo;
                  </p>
                  <div className="flex items-center gap-3">
                    <div className="flex size-9 items-center justify-center rounded-full bg-primary/15 text-xs font-bold text-primary sm:size-10 sm:text-sm">
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

/* ─────────────────────── Social Media ─────────────────────── */
const socialPosts = [
  {
    id: 1,
    platform: "instagram" as const,
    image: "/images/social-1.png",
    caption:
      "From farm to global market 🌍 Our export solutions connect Indian artisans and farmers to 25+ countries worldwide. Quality that speaks for itself.",
    likes: 284,
    comments: 18,
    time: "2h ago",
  },
  {
    id: 2,
    platform: "linkedin" as const,
    image: "/images/social-2.png",
    caption:
      "Global trade never sleeps. Our logistics team ensures seamless container tracking and customs clearance across major ports worldwide. 🚢",
    likes: 156,
    comments: 24,
    time: "5h ago",
  },
  {
    id: 3,
    platform: "instagram" as const,
    image: "/images/social-3.png",
    caption:
      "Behind every successful trade deal is a dedicated team 💼 Strategy meetings that turn global opportunities into real business growth.",
    likes: 412,
    comments: 32,
    time: "1d ago",
  },
  {
    id: 4,
    platform: "facebook" as const,
    image: "/images/social-4.png",
    caption:
      "Indian textiles reaching the world 🧵 Premium silk and embroidery exports that showcase the artistry of Indian craftsmanship on the global stage.",
    likes: 389,
    comments: 45,
    time: "1d ago",
  },
  {
    id: 5,
    platform: "twitter" as const,
    image: "/images/social-5.png",
    caption:
      "Data-driven trade decisions are the future. Our analytics platform helps businesses identify the most profitable markets and routes in real-time. 📊",
    likes: 203,
    comments: 15,
    time: "2d ago",
  },
  {
    id: 6,
    platform: "instagram" as const,
    image: "/images/social-6.png",
    caption:
      "Milestone unlocked! 🎉 Celebrating 500+ businesses empowered and counting. Thank you for trusting Unnat Vega with your global journey.",
    likes: 567,
    comments: 89,
    time: "3d ago",
  },
];

const platformConfig = {
  instagram: {
    icon: Instagram,
    label: "Instagram",
    color: "#E4405F",
    gradient: "from-[#E4405F]/20 via-[#F77737]/10 to-[#FCAF45]/10",
  },
  linkedin: {
    icon: Linkedin,
    label: "LinkedIn",
    color: "#0A66C2",
    gradient: "from-[#0A66C2]/20 via-[#0A66C2]/10 to-transparent",
  },
  facebook: {
    icon: Facebook,
    label: "Facebook",
    color: "#1877F2",
    gradient: "from-[#1877F2]/20 via-[#1877F2]/10 to-transparent",
  },
  twitter: {
    icon: Twitter,
    label: "X",
    color: "#000000",
    gradient: "from-foreground/10 via-foreground/5 to-transparent",
  },
};

function SocialMedia() {
  const [hoveredPost, setHoveredPost] = useState<number | null>(null);

  return (
    <AnimatedSection className="px-4 py-16 md:py-20 lg:py-24">
      <div className="mx-auto max-w-7xl">
        <motion.div variants={fadeInUp} className="mb-10 text-center md:mb-14">
          <Badge
            variant="outline"
            className="mb-3 border-primary/30 bg-primary/10 px-3 py-1 text-xs font-medium tracking-widest text-primary md:mb-4"
          >
            SOCIAL FEED
          </Badge>
          <h2 className="text-2xl font-bold tracking-tight sm:text-3xl md:text-4xl lg:text-5xl">
            Follow Our <span className="gradient-text">Journey</span>
          </h2>
          <p className="mx-auto mt-3 max-w-xl text-sm text-muted-foreground sm:mt-4 sm:text-base">
            Stay connected with us on social media for the latest updates, trade
            insights, and behind-the-scenes moments.
          </p>
        </motion.div>

        {/* Platform links */}
        <motion.div
          variants={fadeInUp}
          className="mb-8 flex items-center justify-center gap-3 sm:gap-4"
        >
          {Object.entries(platformConfig).map(([key, config]) => {
            const IconComp = config.icon;
            return (
              <a
                key={key}
                href="#"
                className="group flex items-center gap-2 rounded-full border border-border/60 px-3.5 py-2 transition-all duration-300 hover:border-primary/40 hover:shadow-md hover:shadow-primary/5 sm:px-4"
              >
                <IconComp
                  className="size-4 transition-transform duration-300 group-hover:scale-110"
                  style={{ color: config.color }}
                />
                <span className="hidden text-xs font-medium text-muted-foreground transition-colors group-hover:text-foreground sm:inline">
                  {config.label}
                </span>
              </a>
            );
          })}
        </motion.div>

        {/* Posts grid */}
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 sm:gap-5">
          {socialPosts.map((post, index) => {
            const config = platformConfig[post.platform];
            const IconComp = config.icon;
            const isHovered = hoveredPost === post.id;

            return (
              <motion.div
                key={post.id}
                variants={fadeInUp}
                onMouseEnter={() => setHoveredPost(post.id)}
                onMouseLeave={() => setHoveredPost(null)}
                className="group"
              >
                <div className="overflow-hidden rounded-2xl border border-border/40 bg-card/50 backdrop-blur-sm transition-all duration-500 hover:border-primary/30 hover:shadow-xl hover:shadow-primary/5">
                  {/* Image */}
                  <div className="relative aspect-square overflow-hidden">
                    <Image
                      src={post.image}
                      alt={post.caption}
                      fill
                      className="object-cover transition-transform duration-700 group-hover:scale-105"
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    />
                    {/* Overlay on hover */}
                    <div
                      className={`absolute inset-0 bg-background/60 backdrop-blur-[2px] transition-opacity duration-300 ${isHovered ? "opacity-100" : "opacity-0"}`}
                    />
                    {/* Platform badge */}
                    <div
                      className={`absolute left-3 top-3 flex items-center gap-1.5 rounded-full px-2.5 py-1 backdrop-blur-sm transition-all duration-300 ${isHovered ? "bg-primary/90" : "bg-background/80"}`}
                    >
                      <IconComp
                        className={`size-3 ${isHovered ? "text-primary-foreground" : ""}`}
                        style={!isHovered ? { color: config.color } : undefined}
                      />
                      <span
                        className={`text-[10px] font-semibold ${isHovered ? "text-primary-foreground" : "text-foreground/70"}`}
                      >
                        {config.label}
                      </span>
                    </div>
                    {/* Hover stats */}
                    <div
                      className={`absolute inset-0 flex items-center justify-center gap-6 transition-opacity duration-300 ${isHovered ? "opacity-100" : "opacity-0"}`}
                    >
                      <div className="flex items-center gap-1.5 text-foreground">
                        <Heart className="size-5 fill-primary text-primary" />
                        <span className="text-sm font-bold">{post.likes}</span>
                      </div>
                      <div className="flex items-center gap-1.5 text-foreground">
                        <MessageCircle className="size-5 text-primary" />
                        <span className="text-sm font-bold">
                          {post.comments}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Content */}
                  <div className="p-3.5 sm:p-4">
                    <p className="mb-2.5 line-clamp-2 text-xs leading-relaxed text-muted-foreground sm:text-sm">
                      {post.caption}
                    </p>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2.5 text-[10px] text-muted-foreground/60">
                        <span className="flex items-center gap-1">
                          <Heart className="size-3" />
                          {post.likes}
                        </span>
                        <span className="flex items-center gap-1">
                          <MessageCircle className="size-3" />
                          {post.comments}
                        </span>
                      </div>
                      <span className="text-[10px] text-muted-foreground/40">
                        {post.time}
                      </span>
                    </div>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* CTA to follow */}
        <motion.div variants={fadeInUp} className="mt-8 text-center sm:mt-10">
          <Button
            asChild
            variant="outline"
            className="gap-2 border-border/60 transition-all duration-300 hover:border-primary/40 hover:shadow-lg hover:shadow-primary/5"
          >
            <a
              href="https://instagram.com/unnatvega"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Instagram className="size-4" />
              Follow Us on Instagram
              <ArrowRight className="ml-1 size-4" />
            </a>
          </Button>
        </motion.div>
      </div>
    </AnimatedSection>
  );
}

/* ─────────────────────── CTA Section ─────────────────────── */
function CTASection() {
  return (
    <AnimatedSection className="px-4 py-16 md:py-20">
      <div className="mx-auto max-w-4xl">
        <motion.div
          variants={fadeInUp}
          className="relative overflow-hidden rounded-2xl border border-primary/20 bg-gradient-to-br from-primary/10 via-primary/5 to-transparent p-6 text-center backdrop-blur-sm sm:p-8 md:rounded-3xl md:p-14"
        >
          {/* Decorative elements */}
          <div className="pointer-events-none absolute -right-16 -top-16 size-48 rounded-full bg-primary/10 blur-[80px]" />
          <div className="pointer-events-none absolute -bottom-16 -left-16 size-48 rounded-full bg-primary/5 blur-[80px]" />

          <div className="relative z-10">
            <Badge
              variant="outline"
              className="mb-4 border-primary/30 bg-primary/10 px-3 py-1 text-xs font-medium tracking-widest text-primary sm:mb-6"
            >
              LET&apos;S TALK
            </Badge>
            <h2
              className="mb-3 text-2xl font-bold tracking-tight sm:text-3xl md:mb-4 md:text-4xl lg:text-5xl"
              style={{ fontFamily: "var(--font-geist-mono)" }}
            >
              Ready to Go <span className="gradient-text">Global</span>?
            </h2>
            <p className="mx-auto mb-6 max-w-xl text-sm text-muted-foreground sm:mb-8 sm:text-base md:text-lg">
              Take the first step towards expanding your business
              internationally. Our team is ready to help you navigate global
              trade.
            </p>
            <div className="flex flex-col items-center gap-3 sm:flex-row sm:justify-center sm:gap-4">
              <Button
                asChild
                size="lg"
                className="min-h-[44px] bg-primary text-primary-foreground transition-all duration-300 hover:bg-primary/90 hover:shadow-lg hover:shadow-primary/20 hover:scale-105"
              >
                <Link href="/contact">
                  Get in Touch
                  <ArrowRight className="ml-2 size-4" />
                </Link>
              </Button>
              <Button
                asChild
                variant="outline"
                size="lg"
                className="min-h-[44px] border-border transition-all duration-300 hover:border-primary/40"
              >
                <Link href="/about">Learn About Us</Link>
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
      <SocialMedia />
      <CTASection />
    </>
  );
}
