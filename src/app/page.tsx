"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  motion,
  useInView,
  AnimatePresence,
  useScroll,
  useTransform,
  useSpring,
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
  Heart,
  MessageCircle,
  Linkedin,
  Twitter,
  Phone,
  Mail,
  ChevronDown,
  CheckCircle2,
  Pause,
  Play,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "@/components/ui/accordion";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

import {
  fadeInUp,
  staggerContainer,
  scrollLineVariant,
} from "@/lib/animations";

const services = [
  {
    icon: Target,
    title: "Export Solutions",
    description:
      "End-to-end export management helping Indian businesses reach global markets with compliance and confidence.",
    number: "01",
    features: ["Compliance", "Logistics", "Documentation"],
    accent: "from-orange-500/15 to-orange-600/5",
    accentSolid: "bg-orange-500",
    gridClass: "md:col-span-2 md:row-span-2", // Big hero card
    layout: "hero" as const,
  },
  {
    icon: TrendingUp,
    title: "Import Services",
    description:
      "Seamless import facilitation with strategic sourcing, quality assurance, and customs clearance support.",
    number: "02",
    features: ["Sourcing", "Quality Check", "Customs"],
    accent: "from-emerald-500/15 to-emerald-600/5",
    accentSolid: "bg-emerald-500",
    gridClass: "md:col-span-2", // Wide top-right
    layout: "wide" as const,
  },
  {
    icon: Code2,
    title: "Digital Presence",
    description:
      "Powerful websites and digital platforms built for trade businesses to attract international clients.",
    number: "03",
    features: ["Websites", "SEO", "Analytics"],
    accent: "from-violet-500/15 to-violet-600/5",
    accentSolid: "bg-violet-500",
    gridClass: "md:col-span-1", // Small bottom-left
    layout: "compact" as const,
  },
  {
    icon: Palette,
    title: "Brand Identity",
    description:
      "Premium branding that positions your business as a trusted global player in the trade ecosystem.",
    number: "04",
    features: ["Logo", "Strategy", "Guidelines"],
    accent: "from-rose-500/15 to-rose-600/5",
    accentSolid: "bg-rose-500",
    gridClass: "md:col-span-1", // Small bottom-right
    layout: "compact" as const,
  },
];

const projects = [
  {
    name: "Revati Craft",
    category: "Export",
    description:
      "Premium spice export platform connecting Indian farmers to global markets",
    image: "/images/work/revati_craft.webp",
    year: "2026",
    website: "https://www.revaticraft.com",
  },
  {
    name: "Nirvatatva",
    category: "Export",
    description:
      "High-end textile export portal with seamless order management",
    image: "/images/work/nirvatatva.webp",
    year: "2024",
    website: "https://www.nirvatatva.com/",
  },
  {
    name: "Anantastra",
    category: "SaaS",
    description:
      "Enterprise trade analytics dashboard with real-time market intelligence",
    image: "/images/work/anantastra.webp",
    year: "2025",
    website: "https://anantastra.vercel.app/",

  },
  {
    name: "Arjav Consultancy",
    category: "Consultancy",
    description:
      "Bold brand identity for an agro-products export house with global reach",
    image: "/images/work/arjav_consultancy.webp",
    year: "2025",
    website: "https://arjavconsultancy.vercel.app/"
  },
  {
    name: "Numerologist Simple Bhansali",
    category: "Consultancy",
    description:
      "Import management app with customs tracking and compliance tools",
    image: "/images/work/simple_bhansali.webp",
    year: "2025",
    website: "https://numerologistsimplebhansali.vercel.app/"
  },
];

const testimonials = [
  {
    quote:
      "Unnat Vega created a sophisticated and highly professional website for our finance consultancy. Their attention to detail, modern design approach, and focus on user experience exceeded our expectations. A valuable investment for our business growth.",
    name: "Alpha Jain",
    title: "Owner of Alritz Consultancy",
    initials: "AJ",
  },
  {
    quote:
      "Unnat Vega transformed my vision into a beautiful online presence. The website feels premium, loads quickly, and reflects the credibility of my numerology services. Highly recommended for any consultant looking to grow online.",
    name: "Simple Bhansali",
    title: "Numerologist",
    initials: "SB",
  },
  {
    quote:
      "We needed a website that reflected the quality of our leather products, and Unnat Vega delivered exactly that. The modern design, fast performance, and export-focused presentation have made a great impression on our clients worldwide.",
    name: "Siddhart Dash",
    title: "Partner of Revati Craft",
    initials: "SD",
  },
  {
    quote:
      "Our handloom products deserve a platform that reflects their quality, and Unnat Vega delivered exactly that. The website is professional, visually appealing, and easy to navigate. It has strengthened our brand presence online.",
    name: "Nehal Jaisalmeria",
    title: "Partner at Jaiselmeria Handlooms",
    initials: "NJ",
  },
  {
    quote:
      "They transformed our vision into a premium digital experience. The website reflects the quality and professionalism of our garments business while providing a smooth experience for visitors. We've received great feedback from both customers and partners. ",
    name: "Siddharth Jain",
    title: "Owner at Osiya Garments",
    initials: "SJ",
  },
];

const stats = [
  { value: 500, suffix: "+", label: "Instagram Followers" },
  { value: 100, suffix: "+", label: "Countries Reached" },
  { value: 60, suffix: "%", label: "More Leads" },
  { value: 100, suffix: "%", label: "Client Satisfaction" },
];

const processSteps = [
  {
    step: "01",
    title: "Discovery",
    description:
      "We analyze your business, market, and goals to craft a tailored strategy.",
    icon: Target,
  },
  {
    step: "02",
    title: "Strategy",
    description:
      "Our team designs a comprehensive plan covering branding, digital, and trade logistics.",
    icon: Globe,
  },
  {
    step: "03",
    title: "Execution",
    description:
      "We build, launch, and manage your digital presence and trade operations.",
    icon: Zap,
  },
  {
    step: "04",
    title: "Growth",
    description:
      "Continuous optimization and scaling to expand your global reach.",
    icon: TrendingUp,
  },
];

const faqs = [
  {
    question: "What industries does Unnat Vega serve?",
    answer:
      "We specialize in export/import businesses, trade companies, textile exporters, spice merchants, and any business looking to establish a global digital presence. Our solutions are tailored for the international trade ecosystem.",
  },
  {
    question: "How long does it take to build a website?",
    answer:
      "Typical projects take 4-8 weeks from discovery to launch, depending on complexity. We follow an agile process with weekly milestones so you see progress throughout.",
  },
  {
    question: "Do you help with export/import compliance?",
    answer:
      "Yes! Our digital solutions include compliance management tools, customs documentation automation, and trade regulation tracking to keep your business compliant across all markets.",
  },
  {
    question: "What makes Unnat Vega different from other agencies?",
    answer:
      "We combine deep trade industry expertise with cutting-edge digital solutions. Unlike generic agencies, we understand the unique challenges of international trade — from customs to compliance to global branding.",
  },
  {
    question: "Do you offer ongoing support after launch?",
    answer:
      "Absolutely. We offer comprehensive maintenance packages including security updates, performance optimization, content updates, and 24/7 monitoring to ensure your platform runs smoothly.",
  },
  {
    question: "Can you help with branding from scratch?",
    answer:
      "Yes! From logo design and brand identity to complete brand strategy, we build premium brands that resonate with international audiences and position you as a trusted global player.",
  },
];

const socialPosts = [
  {
    id: 1,
    platform: "instagram" as const,
    image: "/images/social-1.webp",
    caption:
      "From farm to global market Our export solutions connect Indian artisans and farmers to 25+ countries worldwide.",
    likes: 284,
    comments: 18,
    time: "2h ago",
  },
  {
    id: 2,
    platform: "linkedin" as const,
    image: "/images/social-2.webp",
    caption:
      "Global trade never sleeps. Our logistics team ensures seamless container tracking and customs clearance across major ports worldwide.",
    likes: 156,
    comments: 24,
    time: "5h ago",
  },
  {
    id: 3,
    platform: "instagram" as const,
    image: "/images/social-3.webp",
    caption:
      "Behind every successful trade deal is a dedicated team. Strategy meetings that turn global opportunities into real business growth.",
    likes: 412,
    comments: 32,
    time: "1d ago",
  },
  {
    id: 4,
    platform: "facebook" as const,
    image: "/images/social-4.webp",
    caption:
      "Indian textiles reaching the world. Premium silk and embroidery exports that showcase the artistry of Indian craftsmanship.",
    likes: 389,
    comments: 45,
    time: "1d ago",
  },
  {
    id: 5,
    platform: "twitter" as const,
    image: "/images/social-5.webp",
    caption:
      "Data-driven trade decisions are the future. Our analytics platform helps businesses identify the most profitable markets in real-time.",
    likes: 203,
    comments: 15,
    time: "2d ago",
  },
  {
    id: 6,
    platform: "instagram" as const,
    image: "/images/social-6.webp",
    caption:
      "Milestone unlocked! Celebrating 500+ businesses empowered and counting. Thank you for trusting Unnat Vega with your global journey.",
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

/* ─────────────────────── Scroll Progress Bar ─────────────────────── */
function ScrollProgressBar() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });

  return (
    <motion.div
      className="fixed top-0 left-0 right-0 z-[100] h-[3px] origin-left bg-primary"
      style={{ scaleX }}
    />
  );
}

/* ─────────────────────── Hero ─────────────────────── */
function Hero() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });
  const [currentWord, setCurrentWord] = useState(0);
  const rotatingWords = [
    "Traders",
    "Consultants",
    "Businesses",
    "Exporters",
    "Importers",
  ];

  // Parallax scroll effect
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });
  const bgY = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);
  const bgScale = useTransform(scrollYProgress, [0, 1], [1, 1.1]);
  const textOpacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);
  const textY = useTransform(scrollYProgress, [0, 0.5], [0, -60]);

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
          src="/images/hero.webp"
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
      {/* Background decorative elements */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
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
        style={{ opacity: textOpacity, y: textY }}
        className="relative z-10 mx-auto max-w-6xl text-center"
      >
        <motion.h1
          variants={fadeInUp}
          className="text-3xl font-bold tracking-tight text-white"
          style={{ fontFamily: "var(--font-geist-mono)" }}
        >
          <span className="block sm:text-6xl p-5 md:text-4xl lg:text-8xl xl:text-7xl 2xl:text-8xl">
            Unnat Vega
          </span>
          <span className="block text-2xl">
            Luxury Web Design for{" "}
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
            className="min-h-[44px] bg-primary text-orange-500-foreground transition-all duration-300 hover:bg-primary/90 hover:shadow-lg hover:shadow-primary/20 hover:scale-105"
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
            className="min-h-[44px] border-white/20 bg-white/10 text-white backdrop-blur-2xl rounded-xl transition-all duration-300 hover:border-primary/40 hover:bg-white/20 hover:shadow-md hover:scale-105"
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

/* ─────────────────────── Stats Counter ─────────────────────── */
function CounterItem({
  value,
  suffix,
  label,
}: {
  value: number;
  suffix: string;
  label: string;
}) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!isInView) return;

    let start = 0;
    const duration = 2000;
    const increment = value / (duration / 16);
    const timer = setInterval(() => {
      start += increment;
      if (start >= value) {
        setCount(value);
        clearInterval(timer);
      } else {
        setCount(Math.floor(start));
      }
    }, 16);

    return () => clearInterval(timer);
  }, [isInView, value]);

  return (
    <motion.div ref={ref} variants={fadeInUp} className="text-center">
      <div
        className="text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl"
        style={{ fontFamily: "var(--font-geist-mono)" }}
      >
        <span className="text-orange-500">
          {count}
          {suffix}
        </span>
      </div>
      <p className="mt-1.5 text-xs font-medium text-muted-foreground sm:mt-2 sm:text-sm md:text-base">
        {label}
      </p>
    </motion.div>
  );
}

function StatsCounter() {
  return (
    <AnimatedSection className="border-y border-border/40 bg-muted/30 px-4 py-12 md:py-16 lg:py-20">
      <div className="mx-auto max-w-7xl">
        <div className="grid grid-cols-2 gap-8 md:gap-12 lg:grid-cols-4">
          {stats.map((stat) => (
            <CounterItem
              key={stat.label}
              value={stat.value}
              suffix={stat.suffix}
              label={stat.label}
            />
          ))}
        </div>
      </div>
    </AnimatedSection>
  );
}

/* ─────────────────────── Services ─────────────────────── */
function Services() {
  return (
    <AnimatedSection
      id="services"
      className="relative overflow-hidden px-4 py-16 md:py-20 lg:py-28"
    >
      <div className="relative mx-auto max-w-7xl">
        {/* Header */}
        <motion.div variants={fadeInUp} className="mb-10 md:mb-14 lg:mb-16">
          <div className="flex flex-col items-start gap-3 md:flex-row md:items-end md:justify-between md:gap-6">
            <div>
              <div className="mb-3 flex items-center gap-3">
                <div className="h-px w-8 bg-primary" />
                <span className="text-[11px] font-semibold uppercase tracking-[0.25em] text-orange-500">
                  What We Do
                </span>
              </div>
              <h2 className="text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl lg:text-[3.4rem] lg:leading-[1.1]">
                Solutions That Drive
                <br />
                <span className="text-orange-500">Growth</span>
              </h2>
            </div>
          </div>
        </motion.div>
        <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-4 md:gap-5 lg:gap-6">
          {services.map((service) => {
            const IconComp = service.icon;
            if (service.layout === "hero") {
              return (
                <motion.div
                  key={service.title}
                  variants={fadeInUp}
                  className={`sm:col-span-2 ${service.gridClass}`}
                >
                  <div className="group relative flex h-full min-h-[320px] flex-col justify-between overflow-hidden rounded-2xl border border-border/30 bg-card/50 p-6 backdrop-blur-sm transition-all duration-500 hover:border-primary/30 hover:shadow-2xl hover:shadow-primary/5 md:min-h-[440px] md:rounded-3xl md:p-8 lg:p-10">
                    {/* Gradient orb */}
                    <div
                      className={`pointer-events-none absolute -right-32 -top-32 size-80 rounded-full bg-gradient-to-br ${service.accent} opacity-0 blur-[80px] transition-all duration-700 group-hover:opacity-100 group-hover:scale-125`}
                    />

                    {/* Decorative grid lines */}
                    <div
                      className="pointer-events-none absolute inset-0 opacity-[0.015] transition-opacity duration-500 group-hover:opacity-[0.035]"
                      style={{
                        backgroundImage:
                          "linear-gradient(var(--foreground) 1px, transparent 1px), linear-gradient(90deg, var(--foreground) 1px, transparent 1px)",
                        backgroundSize: "48px 48px",
                      }}
                    />

                    {/* Top: Number + Icon */}
                    <div className="relative flex items-start justify-between">
                      <span
                        className="text-6xl font-black tracking-tighter text-black/[0.03] transition-colors duration-500 group-hover:text-black/[0.07] md:text-7xl lg:text-8xl"
                        style={{ fontFamily: "var(--font-geist-mono)" }}
                      >
                        {service.number}
                      </span>
                      <div className="relative">
                        <div className="absolute inset-0 rounded-2xl bg-primary/0 blur-xl transition-all duration-500 group-hover:bg-primary/20" />
                        <div className="relative flex size-14 items-center justify-center rounded-2xl border border-border/50 bg-background/80 backdrop-blur-sm transition-all duration-500 group-hover:border-primary/30 group-hover:bg-primary/10 group-hover:shadow-lg group-hover:shadow-primary/10 lg:size-16">
                          <IconComp className="size-6 text-orange-500 transition-all duration-500 group-hover:scale-110 group-hover:rotate-6 lg:size-7" />
                        </div>
                      </div>
                    </div>

                    {/* Bottom: Content */}
                    <div className="relative mt-auto">
                      <h3 className="mb-3 text-2xl font-bold tracking-tight md:text-3xl lg:text-4xl">
                        {service.title}
                      </h3>
                      <p className="mb-5 max-w-md text-sm leading-relaxed text-muted-foreground md:text-[15px] lg:text-base">
                        {service.description}
                      </p>
                      <div className="flex flex-wrap items-center gap-2">
                        {service.features.map((feature) => (
                          <span
                            key={feature}
                            className="rounded-full border border-border/40 bg-muted/30 px-3.5 py-1.5 text-[11px] font-medium text-muted-foreground/70 transition-all duration-300 group-hover:border-primary/20 group-hover:bg-primary/5 group-hover:text-orange-500/80"
                          >
                            {feature}
                          </span>
                        ))}
                        <span className="ml-2 flex items-center gap-1.5 text-muted-foreground/30 transition-all duration-500 group-hover:text-orange-500">
                          <span className="text-xs font-medium uppercase tracking-wider">
                            Explore
                          </span>
                          <ArrowRight className="size-3.5 transition-transform duration-500 group-hover:translate-x-1" />
                        </span>
                      </div>
                    </div>
                  </div>
                </motion.div>
              );
            }

            if (service.layout === "wide") {
              return (
                <motion.div
                  key={service.title}
                  variants={fadeInUp}
                  className={`sm:col-span-2 ${service.gridClass}`}
                >
                  <div className="group relative flex h-full min-h-[180px] overflow-hidden rounded-2xl border border-border/30 bg-card/50 backdrop-blur-sm transition-all duration-500 hover:border-primary/30 hover:shadow-2xl hover:shadow-primary/5 md:rounded-3xl">
                    {/* Gradient orb */}
                    <div
                      className={`pointer-events-none absolute -left-20 -top-20 size-56 rounded-full bg-gradient-to-br ${service.accent} opacity-0 blur-[60px] transition-all duration-700 group-hover:opacity-100 group-hover:scale-125`}
                    />

                    <div className="relative flex w-full flex-col justify-between p-6 md:flex-row md:items-center md:p-8 lg:p-10">
                      {/* Left: Number + Icon + Title */}
                      <div className="flex items-start gap-4 md:items-center md:gap-6">
                        <div className="flex items-center gap-3">
                          <span
                            className="text-4xl font-black tracking-tighter text-black/[0.03] transition-colors duration-500 group-hover:text-black/[0.07] md:text-5xl"
                            style={{ fontFamily: "var(--font-geist-mono)" }}
                          >
                            {service.number}
                          </span>
                          <div className="relative">
                            <div className="absolute inset-0 rounded-xl bg-primary/0 blur-lg transition-all duration-500 group-hover:bg-primary/20" />
                            <div className="relative flex size-11 items-center justify-center rounded-xl border border-border/50 bg-background/80 backdrop-blur-sm transition-all duration-500 group-hover:border-primary/30 group-hover:bg-primary/10 group-hover:shadow-lg group-hover:shadow-primary/10 md:size-12">
                              <IconComp className="size-5 text-orange-500 transition-all duration-500 group-hover:scale-110 group-hover:rotate-6 md:size-6" />
                            </div>
                          </div>
                        </div>
                        <div>
                          <h3 className="text-lg font-bold tracking-tight md:text-xl lg:text-2xl">
                            {service.title}
                          </h3>
                          <p className="mt-1 max-w-sm text-xs leading-relaxed text-muted-foreground md:text-sm">
                            {service.description}
                          </p>
                        </div>
                      </div>

                      {/* Right: Feature tags */}
                      <div className="mt-4 flex flex-wrap gap-2 md:mt-0 md:shrink-0">
                        {service.features.map((feature) => (
                          <span
                            key={feature}
                            className="rounded-full border border-border/40 bg-muted/30 px-3 py-1 text-[10px] font-medium text-muted-foreground/70 transition-all duration-300 group-hover:border-primary/20 group-hover:bg-primary/5 group-hover:text-orange-500/80 md:text-[11px]"
                          >
                            {feature}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </motion.div>
              );
            }

            /* ──── COMPACT CARD (Digital Presence / Brand Identity) ──── */
            return (
              <motion.div
                key={service.title}
                variants={fadeInUp}
                className={service.gridClass}
              >
                <div className="group relative flex h-full min-h-[220px] flex-col overflow-hidden rounded-2xl border border-border/30 bg-card/50 backdrop-blur-sm transition-all duration-500 hover:border-primary/30 hover:shadow-2xl hover:shadow-primary/5 md:min-h-[240px] md:rounded-3xl">
                  {/* Accent bar at top */}
                  <div
                    className={`h-1 w-full ${service.accentSolid} opacity-20 transition-opacity duration-500 group-hover:opacity-60`}
                  />

                  {/* Gradient orb */}
                  <div
                    className={`pointer-events-none absolute -right-16 -top-16 size-40 rounded-full bg-gradient-to-br ${service.accent} opacity-0 blur-[50px] transition-all duration-700 group-hover:opacity-100 group-hover:scale-150`}
                  />

                  <div className="relative flex flex-1 flex-col justify-between p-5 md:p-6">
                    {/* Top: Number + Icon */}
                    <div className="flex items-start justify-between">
                      <span
                        className="text-4xl font-black tracking-tighter text-black/[0.03] transition-colors duration-500 group-hover:text-black/[0.07] md:text-5xl"
                        style={{ fontFamily: "var(--font-geist-mono)" }}
                      >
                        {service.number}
                      </span>
                      <div className="relative">
                        <div className="absolute inset-0 rounded-xl bg-primary/0 blur-lg transition-all duration-500 group-hover:bg-primary/20" />
                        <div className="relative flex size-10 items-center justify-center rounded-xl border border-border/50 bg-background/80 backdrop-blur-sm transition-all duration-500 group-hover:border-primary/30 group-hover:bg-primary/10 group-hover:shadow-lg group-hover:shadow-primary/10 md:size-11">
                          <IconComp className="size-4.5 text-orange-500 transition-all duration-500 group-hover:scale-110 group-hover:rotate-6 md:size-5" />
                        </div>
                      </div>
                    </div>

                    {/* Bottom: Title + first feature */}
                    <div>
                      <h3 className="mb-1.5 text-base font-bold tracking-tight md:text-lg">
                        {service.title}
                      </h3>
                      <p className="mb-3 line-clamp-2 text-xs leading-relaxed text-muted-foreground md:text-[13px]">
                        {service.description}
                      </p>
                      <div className="flex items-center justify-between">
                        <div className="flex gap-1.5">
                          {service.features.slice(0, 2).map((feature) => (
                            <span
                              key={feature}
                              className="rounded-full border border-border/40 bg-muted/30 px-2.5 py-0.5 text-[9px] font-medium text-muted-foreground/60 transition-all duration-300 group-hover:border-primary/20 group-hover:bg-primary/5 group-hover:text-orange-500/80 md:text-[10px]"
                            >
                              {feature}
                            </span>
                          ))}
                        </div>
                        <ArrowRight className="size-3.5 text-muted-foreground/20 transition-all duration-500 group-hover:translate-x-0.5 group-hover:text-orange-500" />
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </AnimatedSection>
  );
}

/* ─────────────────────── Portfolio ─────────────────────── */
function Portfolio() {
  const [activeProject, setActiveProject] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const [autoProgress, setAutoProgress] = useState(0);
  const autoPlayRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const progressRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const AUTO_INTERVAL = 5000; // 5 seconds per slide
  const PROGRESS_STEP = 50; // Update progress every 50ms

  // Auto-play logic
  const elapsedRef = useRef(0);
  const isAutoPlayingRef = useRef(true);

  // Keep ref in sync with state
  useEffect(() => {
    isAutoPlayingRef.current = isAutoPlaying;
  }, [isAutoPlaying]);

  const startAutoPlay = useCallback(() => {
    // Clear any existing intervals
    if (autoPlayRef.current) clearInterval(autoPlayRef.current);
    if (progressRef.current) clearInterval(progressRef.current);

    elapsedRef.current = 0;

    progressRef.current = setInterval(() => {
      if (!isAutoPlayingRef.current) return;
      elapsedRef.current += PROGRESS_STEP;
      setAutoProgress((elapsedRef.current / AUTO_INTERVAL) * 100);
    }, PROGRESS_STEP);

    autoPlayRef.current = setInterval(() => {
      if (!isAutoPlayingRef.current) return;
      elapsedRef.current = 0;
      setAutoProgress(0);
      setActiveProject((prev) => (prev + 1) % projects.length);
    }, AUTO_INTERVAL);
  }, []);

  const stopAutoPlay = useCallback(() => {
    if (autoPlayRef.current) clearInterval(autoPlayRef.current);
    if (progressRef.current) clearInterval(progressRef.current);
    autoPlayRef.current = null;
    progressRef.current = null;
    elapsedRef.current = 0;
  }, []);

  // Start auto-play on mount and manage based on isAutoPlaying
  useEffect(() => {
    if (isAutoPlaying) {
      startAutoPlay();
    } else {
      stopAutoPlay();
    }
    return () => {
      if (autoPlayRef.current) clearInterval(autoPlayRef.current);
      if (progressRef.current) clearInterval(progressRef.current);
    };
  }, [isAutoPlaying, startAutoPlay, stopAutoPlay]);

  // Reset progress when project changes manually
  const goToProject = useCallback(
    (idx: number) => {
      setActiveProject(idx);
      if (isAutoPlaying) {
        startAutoPlay(); // Restart timer
      }
    },
    [isAutoPlaying, startAutoPlay],
  );

  const nextProject = useCallback(() => {
    goToProject((activeProject + 1) % projects.length);
  }, [activeProject, goToProject]);

  const prevProject = useCallback(() => {
    goToProject((activeProject - 1 + projects.length) % projects.length);
  }, [activeProject, goToProject]);

  const toggleAutoPlay = useCallback(() => {
    setIsAutoPlaying((prev) => {
      if (prev) {
        // Pausing — reset progress
        setAutoProgress(0);
      }
      return !prev;
    });
  }, []);

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowDown" || e.key === "ArrowRight") {
      e.preventDefault();
      nextProject();
    } else if (e.key === "ArrowUp" || e.key === "ArrowLeft") {
      e.preventDefault();
      prevProject();
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
            className="mb-2 border-primary/30 bg-primary/10 px-3 py-1 text-xs font-medium tracking-widest text-orange-500 md:mb-3"
          >
            OUR WORK
          </Badge>
          <h2 className="text-2xl font-bold tracking-tight sm:text-3xl md:text-4xl lg:text-5xl">
            Crafted with Purpose
          </h2>
        </div>
        <div className="flex items-center gap-2">
          {/* Auto-play toggle */}
          <button
            onClick={toggleAutoPlay}
            className="flex size-9 items-center justify-center rounded-full border border-border/40 text-muted-foreground transition-all duration-300 hover:border-primary/40 hover:text-orange-500 md:size-8"
            aria-label={isAutoPlaying ? "Pause auto-play" : "Resume auto-play"}
            title={isAutoPlaying ? "Pause" : "Auto-play"}
          >
            {isAutoPlaying ? (
              <Pause className="size-3.5" />
            ) : (
              <Play className="size-3.5" />
            )}
          </button>
          <Button
            asChild
            variant="ghost"
            className="hidden text-sm text-muted-foreground transition-all duration-300 hover:text-orange-500 md:inline-flex"
          >
            <Link href="/work">
              View All Work
              <ArrowRight className="ml-1 size-4" />
            </Link>
          </Button>
        </div>
      </div>

      {/* Mobile project selector pills */}
      <div className="mb-3 flex gap-2 overflow-x-auto pb-2 scrollbar-hide md:hidden">
        {projects.map((project, idx) => (
          <button
            key={project.name}
            onClick={() => goToProject(idx)}
            className={`shrink-0 rounded-full px-3 py-2 text-xs font-medium transition-all duration-300 min-h-[44px] ${
              activeProject === idx
                ? "bg-primary text-orange-500-foreground shadow-lg shadow-primary/25"
                : "border border-border text-muted-foreground hover:border-primary/40 hover:text-black"
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
                onClick={() => goToProject(idx)}
                className={`group/sidebar relative flex items-center gap-3 px-5 py-3.5 text-left transition-all duration-300 ${
                  activeProject === idx
                    ? "border-l-2 border-primary bg-primary/10"
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
                        ? "font-semibold text-orange-500"
                        : "text-muted-foreground/80 group-hover/sidebar:text-foreground"
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
            {/* Auto-play progress bar */}
            <div className="mb-2 h-0.5 w-full overflow-hidden rounded-full bg-border/30">
              {isAutoPlaying ? (
                <div
                  className="h-full rounded-full bg-primary transition-[width] duration-100 ease-linear"
                  style={{ width: `${autoProgress}%` }}
                />
              ) : (
                <motion.div
                  className="h-full rounded-full bg-primary/50"
                  initial={false}
                  animate={{
                    width: `${((activeProject + 1) / projects.length) * 100}%`,
                  }}
                  transition={{ duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] }}
                />
              )}
            </div>
            <div className="flex items-center justify-between">
              <div>
                <span
                  className="text-xs font-bold text-orange-500"
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
                  onClick={prevProject}
                  className="flex size-7 items-center justify-center rounded border border-border/40 text-muted-foreground transition-all duration-200 hover:border-primary/40 hover:text-orange-500"
                  aria-label="Previous project"
                >
                  <ChevronRight className="size-3.5 -rotate-90" />
                </button>
                <button
                  onClick={nextProject}
                  className="flex size-7 items-center justify-center rounded border border-border/40 text-muted-foreground transition-all duration-200 hover:border-primary/40 hover:text-orange-500"
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
                alt={projects[activeProject].name}
                fill
                className="object-cover"
              />
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
                <Badge className="border border-primary/30 bg-primary/15 px-2 py-0.5 text-[10px] font-medium text-orange-500 backdrop-blur-sm sm:px-3 sm:py-1 sm:text-[11px]">
                  {projects[activeProject].category}
                </Badge>
                <span className="text-[11px] text-black/40 sm:text-xs">
                  {projects[activeProject].year}
                </span>
              </div>
              <h3
                className="mb-2 text-xl font-bold tracking-tight sm:text-2xl md:mb-3 md:text-4xl lg:text-5xl"
                style={{ fontFamily: "var(--font-geist-mono)" }}
              >
                {projects[activeProject].name}
              </h3>
              <p className="mb-4 max-w-xl text-sm leading-relaxed ">
                {projects[activeProject].description}
              </p>
              <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:gap-4">
                <Button
                  asChild
                  className="min-h-[44px] bg-primary text-white transition-all duration-300 hover:bg-primary/90 hover:shadow-lg hover:shadow-primary/25 sm:ml-auto"
                >
                  <Link href={projects[activeProject].website} target="_blank">
                    Visit Website
                    <ArrowRight className="ml-2 size-4" />
                  </Link>
                </Button>
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Right-side dot navigation */}
          <div className="absolute bottom-6 right-6 z-10 hidden flex-col gap-1.5 md:flex">
            {projects.map((_, idx) => (
              <button
                key={idx}
                onClick={() => goToProject(idx)}
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

      {/* Mobile navigation arrows + auto-play progress */}
      <div className="mt-3 flex items-center justify-between md:hidden">
        <div className="flex items-center gap-2">
          <button
            onClick={toggleAutoPlay}
            className="flex size-8 items-center justify-center rounded-full border border-border/40 text-muted-foreground transition-all duration-300 hover:border-primary/40 hover:text-orange-500"
            aria-label={isAutoPlaying ? "Pause auto-play" : "Resume auto-play"}
          >
            {isAutoPlaying ? (
              <Pause className="size-3" />
            ) : (
              <Play className="size-3" />
            )}
          </button>
          <span
            className="text-xs font-bold text-orange-500"
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
        {/* Mobile progress bar */}
        <div className="mx-2 h-0.5 flex-1 overflow-hidden rounded-full bg-border/30">
          {isAutoPlaying && (
            <div
              className="h-full rounded-full bg-primary transition-[width] duration-100 ease-linear"
              style={{ width: `${autoProgress}%` }}
            />
          )}
        </div>
        <div className="flex gap-2">
          <button
            onClick={prevProject}
            className="flex size-9 items-center justify-center rounded border border-border/40 text-muted-foreground transition-all duration-200 hover:border-primary/40 hover:text-orange-500"
            aria-label="Previous project"
          >
            <ChevronRight className="size-4 -rotate-90" />
          </button>
          <button
            onClick={nextProject}
            className="flex size-9 items-center justify-center rounded border border-border/40 text-muted-foreground transition-all duration-200 hover:border-primary/40 hover:text-orange-500"
            aria-label="Next project"
          >
            <ChevronRight className="size-4 rotate-90" />
          </button>
        </div>
      </div>
    </section>
  );
}

/* ─────────────────────── How It Works / Process ─────────────────────── */
function HowItWorks() {
  return (
    <AnimatedSection id="process" className="px-4 py-16 md:py-20 lg:py-24">
      <div className="mx-auto max-w-7xl">
        <motion.div variants={fadeInUp} className="mb-10 text-center md:mb-14">
          <Badge
            variant="outline"
            className="mb-3 border-primary/30 bg-primary/10 px-3 py-1 text-xs font-medium tracking-widest text-orange-500"
          >
            OUR PROCESS
          </Badge>
          <h2 className="text-2xl font-bold tracking-tight sm:text-3xl md:text-4xl lg:text-5xl">
            How We <span className="text-orange-500">Work</span>
          </h2>
          <p className="mx-auto mt-3 max-w-xl text-sm text-muted-foreground sm:mt-4 sm:text-base">
            A proven four-step process that turns your global vision into
            reality.
          </p>
        </motion.div>

        <div className="relative">
          {/* Connecting line - desktop */}
          <div className="absolute left-0 right-0 top-[60px] hidden md:block">
            <motion.div
              variants={scrollLineVariant}
              className="h-0.5 w-full bg-gradient-to-r from-primary/20 via-primary to-primary/20"
            />
          </div>

          <div className="grid gap-6 sm:grid-cols-2 md:gap-8 lg:grid-cols-4">
            {processSteps.map((step, idx) => (
              <motion.div key={step.step} variants={fadeInUp}>
                <div className="group relative text-center">
                  {/* Step circle with icon */}
                  <div className="relative mx-auto mb-5 flex size-[120px] items-center justify-center">
                    <div className="absolute inset-0 rounded-full bg-primary/5 transition-all duration-300 group-hover:bg-primary/10 group-hover:shadow-lg group-hover:shadow-primary/10" />
                    <div className="relative flex size-16 items-center justify-center rounded-full border-2 border-primary/20 bg-background transition-all duration-300 group-hover:border-primary group-hover:shadow-md group-hover:shadow-primary/20">
                      <step.icon className="size-7 text-orange-500 transition-all duration-300 group-hover:scale-110" />
                    </div>
                    <span
                      className="absolute -right-1 -top-1 flex size-7 items-center justify-center rounded-full bg-primary text-[10px] font-bold text-orange-500-foreground shadow-sm"
                      style={{ fontFamily: "var(--font-geist-mono)" }}
                    >
                      {step.step}
                    </span>
                  </div>

                  <h3 className="mb-2 text-lg font-semibold md:text-xl">
                    {step.title}
                  </h3>
                  <p className="mx-auto max-w-[260px] text-sm leading-relaxed text-muted-foreground">
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

/* ─────────────────────── Listed On ─────────────────────── */
function ListedOn() {
  const platforms = [
    {
      name: "Clutch",
      image: "/images/listing/clutch.webp",
      href: "https://instagram.com/unnatvega",
    },
    {
      name: "Google My Business",
      image: "/images/listing/gmb.webp",
      href: "https://facebook.com/unnatvega",
    },
    {
      name: "The Mainfest",
      image: "/images/listing/manifest.webp",
      href: "https://t.me/unnatvega",
    },
    {
      name: "Good Firms",
      image: "/images/listing/goodfirms.jpeg",
      href: "https://www.goodfirms.co/company/unnat-vega",
    },
    {
      name: "Dribbble",
      image: "/images/listing/dribbble.webp",
      href: "https://dribbble.com/unnat-vega",
    },
  ];

  return (
    <AnimatedSection className="py-12 md:py-20 lg:py-24">
      <div className="mx-auto max-w-7xl">
        <motion.div variants={fadeInUp} className="mb-8 text-center md:mb-12">
          <Badge
            variant="outline"
            className="mb-3 border-primary/30 bg-primary/10 px-3 py-1 text-xs font-medium tracking-widest text-orange-500 md:mb-4"
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
                    className="transition-all duration-300 grayscale hover:grayscale-0 group-hover:scale-110"
                  />
                  <span className="text-xs font-medium text-muted-foreground transition-colors duration-300 group-hover:text-black sm:text-sm md:text-base">
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
  const [activeIndex, setActiveIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const itemsPerView =
    typeof window !== "undefined" && window.innerWidth >= 1024
      ? 3
      : typeof window !== "undefined" && window.innerWidth >= 640
        ? 2
        : 1;

  const maxIndex = Math.max(0, testimonials.length - itemsPerView);

  const startAutoRotation = useCallback(() => {
    if (timerRef.current) clearInterval(timerRef.current);
    timerRef.current = setInterval(() => {
      setActiveIndex((prev) => (prev >= maxIndex ? 0 : prev + 1));
    }, 5000);
  }, [maxIndex]);

  useEffect(() => {
    if (!isPaused) {
      startAutoRotation();
    }
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [isPaused, startAutoRotation]);

  return (
    <AnimatedSection className="px-4 py-16 md:py-20 lg:py-24">
      <div className="mx-auto max-w-7xl">
        <motion.div variants={fadeInUp} className="mb-10 text-center md:mb-14">
          <Badge
            variant="outline"
            className="mb-3 border-primary/30 bg-primary/10 px-3 py-1 text-xs font-medium tracking-widest text-orange-500 md:mb-4"
          >
            TESTIMONIALS
          </Badge>
          <h2 className="text-2xl font-bold tracking-tight sm:text-3xl md:text-4xl lg:text-5xl">
            What Our Clients Say
          </h2>
        </motion.div>

        <div
          className="overflow-hidden"
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
        >
          <motion.div
            className="flex gap-4 sm:gap-6"
            animate={{ x: `-${activeIndex * (100 / itemsPerView + 1.5)}%` }}
            transition={{ duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }}
          >
            {testimonials.map((t) => (
              <div
                key={t.name}
                className="w-full shrink-0 sm:w-[calc(50%-12px)] lg:w-[calc(33.333%-16px)]"
              >
                <Card className="glass h-full border-transparent transition-all duration-300 hover:-translate-y-1 hover:border-primary/40 hover:shadow-lg hover:shadow-primary/5">
                  <CardContent className="flex h-full flex-col p-4 sm:p-6">
                    <div className="mb-3 flex gap-1 sm:mb-4">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className="size-3.5 fill-primary text-orange-500 sm:size-4"
                        />
                      ))}
                    </div>
                    <p className="mb-4 flex-1 text-sm leading-relaxed text-muted-foreground sm:mb-6">
                      &ldquo;{t.quote}&rdquo;
                    </p>
                    <div className="flex items-center gap-3">
                      <div className="flex size-9 items-center justify-center rounded-full bg-primary/15 text-xs font-bold text-orange-500 sm:size-10 sm:text-sm">
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
              </div>
            ))}
          </motion.div>
        </div>

        {/* Dots navigation */}
        <div className="mt-6 flex items-center justify-center gap-2">
          {Array.from({ length: maxIndex + 1 }).map((_, idx) => (
            <button
              key={idx}
              onClick={() => setActiveIndex(idx)}
              className={`transition-all duration-300 ${
                activeIndex === idx
                  ? "h-2 w-6 rounded-full bg-primary shadow-sm shadow-primary/25"
                  : "h-2 w-2 rounded-full bg-border hover:bg-primary/40"
              }`}
              aria-label={`Go to testimonial group ${idx + 1}`}
            />
          ))}
        </div>
      </div>
    </AnimatedSection>
  );
}

/* ─────────────────────── Social Media ─────────────────────── */
function SocialMedia() {
  const [hoveredPost, setHoveredPost] = useState<number | null>(null);
  const [activePlatform, setActivePlatform] = useState<string | null>(null);

  const filteredPosts = activePlatform
    ? socialPosts.filter((p) => p.platform === activePlatform)
    : socialPosts;

  const socialStats = [
    { icon: Instagram, label: "Instagram", value: "500", color: "#E4405F" },
    { icon: Linkedin, label: "LinkedIn", value: "50", color: "#0A66C2" },
    { icon: Facebook, label: "Facebook", value: "22", color: "#1877F2" },
  ];

  return (
    <AnimatedSection className="px-4 py-16 md:py-20 lg:py-24 overflow-hidden">
      <div className="mx-auto max-w-7xl">
        {/* Header */}
        <motion.div variants={fadeInUp} className="mb-10 text-center md:mb-14">
          <Badge
            variant="outline"
            className="mb-3 border-primary/30 bg-primary/10 px-3 py-1 text-xs font-medium tracking-widest text-orange-500 md:mb-4"
          >
            SOCIAL FEED
          </Badge>
          <h2 className="text-2xl font-bold tracking-tight sm:text-3xl md:text-4xl lg:text-5xl">
            Follow Our <span className="text-orange-500">Journey</span>
          </h2>
          <p className="mx-auto mt-3 max-w-xl text-sm text-muted-foreground sm:mt-4 sm:text-base">
            Stay connected with us for the latest updates, trade insights, and
            behind-the-scenes moments from the world of international commerce.
          </p>
        </motion.div>

        {/* Social Stats Bar */}
        <motion.div
          variants={fadeInUp}
          className="mb-8 grid grid-cols-2 gap-3 sm:grid-cols-4 sm:gap-4 md:mb-10"
        >
          {socialStats.map((stat) => {
            const IconComp = stat.icon;
            return (
              <div
                key={stat.label}
                className="group relative overflow-hidden rounded-xl border border-border/40 bg-card/50 p-4 backdrop-blur-sm transition-all duration-300 hover:border-primary/30 hover:shadow-lg hover:shadow-primary/5"
              >
                <div
                  className="absolute -right-4 -top-4 size-16 rounded-full opacity-[0.06] transition-all duration-500 group-hover:opacity-[0.12] group-hover:scale-150"
                  style={{ background: stat.color }}
                />
                <div className="relative flex items-center gap-3">
                  <div
                    className="flex size-9 shrink-0 items-center justify-center rounded-lg transition-all duration-300 group-hover:scale-110"
                    style={{ backgroundColor: `${stat.color}15` }}
                  >
                    <IconComp
                      className="size-4"
                      style={{ color: stat.color }}
                    />
                  </div>
                  <div>
                    <div
                      className="text-lg font-bold tracking-tight"
                      style={{ fontFamily: "var(--font-geist-mono)" }}
                    >
                      {stat.value}
                    </div>
                    <div className="text-[10px] font-medium uppercase tracking-wider text-muted-foreground">
                      {stat.label}
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </motion.div>

        {/* Platform Filter */}
        <motion.div
          variants={fadeInUp}
          className="mb-6 flex flex-wrap items-center justify-center gap-2 md:mb-8"
        >
          <button
            onClick={() => setActivePlatform(null)}
            className={`rounded-full px-4 py-2 text-xs font-semibold uppercase tracking-wider transition-all duration-300 ${
              activePlatform === null
                ? "bg-primary text-primary-foreground shadow-lg shadow-primary/25"
                : "border border-border/60 text-muted-foreground hover:border-primary/40 hover:text-black"
            }`}
          >
            All Posts
          </button>
          {Object.entries(platformConfig).map(([key, config]) => {
            const IconComp = config.icon;
            return (
              <button
                key={key}
                onClick={() => setActivePlatform(key)}
                className={`group flex items-center gap-1.5 rounded-full px-3.5 py-2 text-xs font-semibold uppercase tracking-wider transition-all duration-300 ${
                  activePlatform === key
                    ? "bg-primary text-primary-foreground shadow-lg shadow-primary/25"
                    : "border border-border/60 text-muted-foreground hover:border-primary/40 hover:text-black"
                }`}
              >
                <IconComp
                  className="size-3.5 transition-transform duration-300 group-hover:scale-110"
                  style={
                    activePlatform !== key ? { color: config.color } : undefined
                  }
                />
                <span className="hidden sm:inline">{config.label}</span>
              </button>
            );
          })}
        </motion.div>

        {/* Masonry-style Posts Grid */}
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 sm:gap-5">
          {filteredPosts.map((post, idx) => {
            const config = platformConfig[post.platform];
            const IconComp = config.icon;
            const isHovered = hoveredPost === post.id;
            // Vary card heights for masonry effect
            const isLarge = idx % 5 === 0;

            return (
              <motion.div
                key={post.id}
                variants={fadeInUp}
                layout
                onMouseEnter={() => setHoveredPost(post.id)}
                onMouseLeave={() => setHoveredPost(null)}
                className={`${isLarge ? "sm:col-span-2 lg:col-span-1" : ""}`}
              >
                <div className="group h-full overflow-hidden rounded-2xl border border-border/40 bg-card/50 backdrop-blur-sm transition-all duration-500 hover:border-primary/30 hover:shadow-xl hover:shadow-primary/5 hover:-translate-y-1">
                  {/* Image */}
                  <div
                    className={`relative overflow-hidden ${isLarge ? "aspect-[4/3]" : "aspect-square"}`}
                  >
                    <Image
                      src={post.image}
                      alt={post.caption}
                      fill
                      className="object-cover transition-transform duration-700 group-hover:scale-110"
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    />
                    {/* Gradient overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/0 to-black/0" />

                    {/* Platform badge - always visible */}
                    <div className="absolute left-3 top-3 flex items-center gap-1.5 rounded-full bg-black/40 px-2.5 py-1 backdrop-blur-md">
                      <IconComp
                        className="size-3 text-white"
                        style={{ color: config.color }}
                      />
                      <span className="text-[10px] font-semibold text-white/90">
                        {config.label}
                      </span>
                    </div>

                    {/* Time badge */}
                    <div className="absolute right-3 top-3 rounded-full bg-black/30 px-2 py-0.5 backdrop-blur-md">
                      <span className="text-[9px] font-medium text-white/70">
                        {post.time}
                      </span>
                    </div>

                    {/* Hover overlay with stats */}
                    <div
                      className={`absolute inset-0 flex items-center justify-center gap-8 bg-black/40 backdrop-blur-[3px] transition-all duration-300 ${isHovered ? "opacity-100" : "opacity-0"}`}
                    >
                      <div className="flex flex-col items-center gap-1">
                        <Heart
                          className={`size-6 transition-all duration-300 ${isHovered ? "scale-110 fill-red-500 text-red-500" : "text-white"}`}
                        />
                        <span className="text-sm font-bold text-white">
                          {post.likes}
                        </span>
                      </div>
                      <div className="flex flex-col items-center gap-1">
                        <MessageCircle
                          className={`size-6 transition-all duration-300 ${isHovered ? "scale-110 text-blue-400" : "text-white"}`}
                        />
                        <span className="text-sm font-bold text-white">
                          {post.comments}
                        </span>
                      </div>
                    </div>

                    {/* Caption overlay at bottom of image */}
                    <div className="absolute bottom-0 left-0 right-0 p-3">
                      <p className="line-clamp-2 text-[11px] font-medium leading-snug text-white/90 sm:text-xs">
                        {post.caption}
                      </p>
                    </div>
                  </div>

                  {/* Content below image */}
                  <div className="p-3.5 sm:p-4">
                    <p className="mb-3 line-clamp-2 text-xs leading-relaxed text-muted-foreground sm:text-sm">
                      {post.caption}
                    </p>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3 text-[11px] text-muted-foreground/60">
                        <span className="flex items-center gap-1 transition-colors duration-300 hover:text-red-400">
                          <Heart className="size-3" />
                          {post.likes}
                        </span>
                        <span className="flex items-center gap-1 transition-colors duration-300 hover:text-blue-400">
                          <MessageCircle className="size-3" />
                          {post.comments}
                        </span>
                      </div>
                      <a
                        href="#"
                        className="flex items-center gap-1 text-[10px] font-medium text-muted-foreground/50 transition-colors duration-300 hover:text-orange-500"
                      >
                        <IconComp
                          className="size-3"
                          style={{ color: config.color }}
                        />
                        View
                      </a>
                    </div>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* CTA Section */}
        <motion.div variants={fadeInUp} className="mt-10 sm:mt-12">
          <div className="relative overflow-hidden rounded-2xl border border-border/40 bg-gradient-to-br from-orange-500/10 via-background to-orange-500/5 p-6 text-center sm:p-8 md:p-10">
            {/* Decorative elements */}
            <div className="pointer-events-none absolute -left-20 -top-20 size-60 rounded-full bg-orange-500/5 blur-[80px]" />
            <div className="pointer-events-none absolute -bottom-20 -right-20 size-60 rounded-full bg-orange-500/5 blur-[80px]" />

            <div className="relative">
              <h3 className="mb-2 text-xl font-bold tracking-tight sm:text-2xl md:text-3xl">
                Never Miss an <span className="text-orange-500">Update</span>
              </h3>
              <p className="mx-auto mb-6 max-w-md text-sm text-muted-foreground sm:text-base">
                Follow us across all platforms for trade insights, success
                stories, and exclusive behind-the-scenes content.
              </p>
              <div className="flex flex-wrap items-center justify-center gap-3">
                {socialStats.map((stat) => {
                  const IconComp = stat.icon;
                  return (
                    <a
                      key={stat.label}
                      href="#"
                      className="group/flex flex items-center gap-2 rounded-full border border-border/60 px-4 py-2.5 transition-all duration-300 hover:border-primary/40 hover:shadow-md hover:shadow-primary/5 hover:-translate-y-0.5"
                    >
                      <IconComp
                        className="size-4 transition-transform duration-300 group-hover/flex:scale-110"
                        style={{ color: stat.color }}
                      />
                      <span className="text-xs font-medium text-muted-foreground transition-colors group-hover/flex:text-black">
                        {stat.label}
                      </span>
                      <span className="text-[10px] font-bold text-black/50">
                        {stat.value}
                      </span>
                    </a>
                  );
                })}
              </div>
              <Button
                asChild
                size="lg"
                className="mt-6 min-h-[44px] bg-primary text-primary-foreground transition-all duration-300 hover:bg-primary/90 hover:shadow-lg hover:shadow-primary/20 hover:scale-105"
              >
                <a
                  href="https://instagram.com/unnatvega"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Instagram className="mr-2 size-4" />
                  Follow Us on Instagram
                </a>
              </Button>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatedSection>
  );
}

/* ─────────────────────── FAQ ─────────────────────── */
function FAQ() {
  return (
    <AnimatedSection id="faq" className="px-4 py-16 md:py-20 lg:py-24">
      <div className="mx-auto max-w-3xl">
        <motion.div variants={fadeInUp} className="mb-10 text-center md:mb-14">
          <Badge
            variant="outline"
            className="mb-3 border-primary/30 bg-primary/10 px-3 py-1 text-xs font-medium tracking-widest text-orange-500"
          >
            FAQ
          </Badge>
          <h2 className="text-2xl font-bold tracking-tight sm:text-3xl md:text-4xl lg:text-5xl">
            Frequently Asked <span className="text-orange-500">Questions</span>
          </h2>
          <p className="mx-auto mt-3 max-w-xl text-sm text-muted-foreground sm:mt-4 sm:text-base">
            Got questions? We&apos;ve got answers. Here are the most common
            things our clients ask.
          </p>
        </motion.div>

        <motion.div variants={fadeInUp}>
          <Card className="glass border-transparent p-4 sm:p-6 md:p-8">
            <Accordion type="single" collapsible className="w-full">
              {faqs.map((faq, idx) => (
                <AccordionItem
                  key={idx}
                  value={`item-${idx}`}
                  className="border-border/40"
                >
                  <AccordionTrigger className="text-left text-sm font-medium hover:no-underline sm:text-base">
                    {faq.question}
                  </AccordionTrigger>
                  <AccordionContent className="text-sm leading-relaxed text-muted-foreground">
                    {faq.answer}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </Card>
        </motion.div>
      </div>
    </AnimatedSection>
  );
}

/* ─────────────────────── CTA Banner ─────────────────────── */
function CTABanner() {
  return (
    <section className="px-4 py-16 md:py-20 lg:py-24">
      <div className="mx-auto max-w-7xl">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }}
          className="relative overflow-hidden rounded-2xl md:rounded-3xl"
        >
          {/* Gradient Background */}
          <div className="absolute inset-0 bg-gradient-to-r from-orange-500 to-orange-500/80" />
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-white/10 via-transparent to-transparent" />
          {/* Decorative elements */}
          <div className="pointer-events-none absolute -right-20 -top-20 size-80 rounded-full bg-white/5 blur-3xl" />
          <div className="pointer-events-none absolute -bottom-20 -left-20 size-60 rounded-full bg-white/5 blur-3xl" />

          <div className="relative px-6 py-12 sm:px-10 sm:py-16 md:px-16 md:py-20">
            <div className="mx-auto max-w-3xl text-center">
              <h2 className="text-2xl font-bold tracking-tight text-white sm:text-3xl md:text-4xl lg:text-5xl">
                Ready to Go Global?
              </h2>
              <p className="mx-auto mt-4 max-w-xl text-sm leading-relaxed text-white sm:mt-6 sm:text-base md:text-lg">
                Take the first step toward expanding your business worldwide.
                Let&apos;s build something extraordinary together.
              </p>
              <div className="mt-8 flex flex-col items-center gap-3 sm:mt-10 sm:flex-row sm:justify-center sm:gap-4">
                <Button
                  asChild
                  size="lg"
                  className="min-h-[44px] bg-primary-foreground text-orange-500 transition-all duration-300 hover:bg-primary-foreground/90 hover:shadow-lg hover:shadow-primary-foreground/20 hover:scale-105"
                >
                  <Link href="/contact">
                    Start a Project
                    <ArrowRight className="ml-2 size-4" />
                  </Link>
                </Button>
                <Button
                  asChild
                  size="lg"
                  variant="outline"
                  className="min-h-[44px] border-primary-foreground/30 bg-transparent text-orange-500-foreground transition-all duration-300 hover:border-primary-foreground/60 hover:bg-primary-foreground/10 hover:scale-105"
                >
                  <Link href="/contact" className="text-white">
                    <Phone className="mr-2 text-white size-4" />
                    Schedule a Call
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

/* ─────────────────────── Contact Form ─────────────────────── */
function ContactForm() {
  const [formState, setFormState] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    setFormState({ name: "", email: "", message: "" });
    setTimeout(() => setSubmitted(false), 4000);
  };

  return (
    <AnimatedSection id="contact" className="px-4 py-16 md:py-20 lg:py-24">
      <div className="mx-auto max-w-7xl">
        <motion.div variants={fadeInUp} className="mb-10 text-center md:mb-14">
          <Badge
            variant="outline"
            className="mb-3 border-primary/30 bg-primary/10 px-3 py-1 text-xs font-medium tracking-widest text-orange-500"
          >
            GET IN TOUCH
          </Badge>
          <h2 className="text-2xl font-bold tracking-tight sm:text-3xl md:text-4xl lg:text-5xl">
            Let&apos;s Start a{" "}
            <span className="text-orange-500">Conversation</span>
          </h2>
          <p className="mx-auto mt-3 max-w-xl text-sm text-muted-foreground sm:mt-4 sm:text-base">
            Have a project in mind? Drop us a message and we&apos;ll get back to
            you within 24 hours.
          </p>
        </motion.div>

        <motion.div variants={fadeInUp}>
          <Card className="glass mx-auto max-w-2xl border-transparent p-4 sm:p-6 md:p-8">
            {submitted ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="flex flex-col items-center py-8 text-center"
              >
                <div className="mb-4 flex size-14 items-center justify-center rounded-full bg-primary/10">
                  <CheckCircle2 className="size-7 text-orange-500" />
                </div>
                <h3 className="mb-2 text-lg font-semibold">Message Sent!</h3>
                <p className="text-sm text-muted-foreground">
                  Thank you for reaching out. We&apos;ll get back to you soon.
                </p>
              </motion.div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-5">
                <div className="grid gap-4 sm:grid-cols-2">
                  <div className="space-y-2">
                    <label
                      htmlFor="name"
                      className="text-xs font-medium uppercase tracking-wider text-muted-foreground"
                    >
                      Name
                    </label>
                    <Input
                      id="name"
                      placeholder="Your name"
                      value={formState.name}
                      onChange={(e) =>
                        setFormState((prev) => ({
                          ...prev,
                          name: e.target.value,
                        }))
                      }
                      required
                      className="min-h-[44px]"
                    />
                  </div>
                  <div className="space-y-2">
                    <label
                      htmlFor="email"
                      className="text-xs font-medium uppercase tracking-wider text-muted-foreground"
                    >
                      Email
                    </label>
                    <Input
                      id="email"
                      type="email"
                      placeholder="your@email.com"
                      value={formState.email}
                      onChange={(e) =>
                        setFormState((prev) => ({
                          ...prev,
                          email: e.target.value,
                        }))
                      }
                      required
                      className="min-h-[44px]"
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <label
                    htmlFor="message"
                    className="text-xs font-medium uppercase tracking-wider text-muted-foreground"
                  >
                    Message
                  </label>
                  <Textarea
                    id="message"
                    placeholder="Tell us about your project..."
                    rows={5}
                    value={formState.message}
                    onChange={(e) =>
                      setFormState((prev) => ({
                        ...prev,
                        message: e.target.value,
                      }))
                    }
                    required
                    className="min-h-[120px] resize-none"
                  />
                </div>
                <Button
                  type="submit"
                  size="lg"
                  className="min-h-[44px] w-full bg-primary text-orange-500-foreground transition-all duration-300 hover:bg-primary/90 hover:shadow-lg hover:shadow-primary/20 sm:w-auto"
                >
                  <Send className="mr-2 size-4" />
                  Send Message
                </Button>
              </form>
            )}
          </Card>
        </motion.div>
      </div>
    </AnimatedSection>
  );
}

function BeforeAfterComparison() {
  const [sliderPos, setSliderPos] = useState(50);
  const containerRef = useRef<HTMLDivElement>(null);
  const isDragging = useRef(false);
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" });

  const handleMove = useCallback((clientX: number) => {
    if (!containerRef.current || !isDragging.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = clientX - rect.left;
    const percent = Math.max(0, Math.min(100, (x / rect.width) * 100));
    setSliderPos(percent);
  }, []);

  const handleMouseDown = useCallback(() => {
    isDragging.current = true;
  }, []);

  const handleMouseUp = useCallback(() => {
    isDragging.current = false;
  }, []);

  useEffect(() => {
    const onMouseMove = (e: MouseEvent) => handleMove(e.clientX);
    const onMouseUp = () => {
      isDragging.current = false;
    };
    const onTouchMove = (e: TouchEvent) => handleMove(e.touches[0].clientX);
    const onTouchEnd = () => {
      isDragging.current = false;
    };

    window.addEventListener("mousemove", onMouseMove);
    window.addEventListener("mouseup", onMouseUp);
    window.addEventListener("touchmove", onTouchMove);
    window.addEventListener("touchend", onTouchEnd);

    return () => {
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("mouseup", onMouseUp);
      window.removeEventListener("touchmove", onTouchMove);
      window.removeEventListener("touchend", onTouchEnd);
    };
  }, [handleMove]);

  return (
    <section
      ref={sectionRef}
      className="relative w-full px-4 py-16 md:py-20 lg:py-24"
    >
      <div className="mx-auto max-w-7xl">
        <motion.div
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          variants={staggerContainer}
          className="mb-10 text-center md:mb-14"
        >
          <motion.div variants={fadeInUp}>
            <Badge
              variant="outline"
              className="mb-3 border-primary/30 bg-primary/10 px-3 py-1 text-xs font-medium tracking-widest text-orange-500 md:mb-4"
            >
              TRANSFORMATION
            </Badge>
          </motion.div>
          <motion.h2
            variants={fadeInUp}
            className="text-2xl font-bold tracking-tight sm:text-3xl md:text-4xl lg:text-5xl"
          >
            See the <span className="text-orange-500">Difference</span>
          </motion.h2>
          <motion.p
            variants={fadeInUp}
            className="mx-auto mt-3 max-w-xl text-sm text-muted-foreground sm:mt-4 sm:text-base"
          >
            Drag the slider to see how we transform outdated digital presences
            into premium, high-converting experiences.
          </motion.p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{
            duration: 0.7,
            delay: 0.2,
            ease: [0.25, 0.46, 0.45, 0.94],
          }}
          className="mx-auto"
          style={{ width: "80%", maxWidth: "1200px" }}
        >
          {/* Comparison container */}
          <div
            ref={containerRef}
            className="group relative h-[80vh] min-h-[400px] max-h-[900px] cursor-ew-resize select-none overflow-hidden rounded-2xl border border-border/40 shadow-2xl shadow-primary/5"
            onMouseDown={handleMouseDown}
            onTouchStart={handleMouseDown}
          >
            {/* AFTER image (full width, underneath) */}
            <Image
              src="/images/work/nirvatatva.webp"
              alt="After: Modern premium website design by Unnat Vega"
              fill
            />

            {/* BEFORE image (clipped by slider position using clipPath) */}
            <Image
              src="/images/work/nirvatatva_old.webp"
              alt="Before: Outdated website design"
              fill
              style={{ clipPath: `inset(0 ${100 - sliderPos}% 0 0)` }}
            />

            {/* Slider line */}
            <div
              className="absolute top-0 bottom-0 z-20 w-[3px] -translate-x-1/2 bg-white shadow-[0_0_12px_rgba(0,0,0,0.5)]"
              style={{ left: `${sliderPos}%` }}
            >
              {/* Slider handle */}
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex size-12 items-center justify-center rounded-full border-[3px] border-white bg-primary shadow-lg shadow-primary/40 transition-transform duration-150 group-hover:scale-110 sm:size-14">
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  className="text-white"
                  stroke="currentColor"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M8 4l-6 8 6 8" />
                  <path d="M16 4l6 8-6 8" />
                </svg>
              </div>
            </div>

            {/* Before label */}
            <div className="absolute top-4 left-4 z-10 rounded-full bg-black/60 px-3 py-1.5 text-xs font-semibold uppercase tracking-wider text-white backdrop-blur-sm sm:px-4 sm:py-2 sm:text-sm">
              Before
            </div>

            {/* After label */}
            <div className="absolute top-4 right-4 z-10 rounded-full bg-primary/80 px-3 py-1.5 text-xs font-semibold uppercase tracking-wider text-white backdrop-blur-sm sm:px-4 sm:py-2 sm:text-sm">
              After
            </div>

            {/* Subtle edge gradients */}
            <div
              className="pointer-events-none absolute top-0 bottom-0 z-10 w-8 bg-gradient-to-r from-black/20 to-transparent"
              style={{ left: `${sliderPos}%` }}
            />
          </div>

          {/* Instructions */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
            transition={{ delay: 0.8 }}
            className="mt-4 text-center text-xs text-muted-foreground/60 sm:text-sm"
          >
            ← Drag the slider to compare →
          </motion.p>
        </motion.div>
      </div>
    </section>
  );
}

export default function Home() {
  return (
    <main>
      <ScrollProgressBar />
      <Hero />
      <StatsCounter />
      <Services />
      <Portfolio />
      <BeforeAfterComparison />
      {/* <HowItWorks /> */}
      <ListedOn />
      <Testimonials />
      {/* <SocialMedia /> */}
      <FAQ />
      <CTABanner />
      <ContactForm />
    </main>
  );
}