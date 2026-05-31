'use client';

import { useRef } from 'react';
import Link from 'next/link';
import { motion, useInView } from 'framer-motion';
import {
  ArrowRight,
  Globe,
  Users,
  Award,
  Building2,
  Heart,
  Lightbulb,
  Handshake,
  Sparkles,
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

const stats = [
  { icon: Globe, value: '25+', label: 'Countries Served' },
  { icon: Users, value: '500+', label: 'Happy Clients' },
  { icon: Award, value: '8+', label: 'Years Experience' },
  { icon: Building2, value: '100%', label: 'Compliance Rate' },
];

const values = [
  {
    icon: Heart,
    title: 'Integrity',
    description: 'Transparent and honest business practices that build trust and long-term credibility with every stakeholder.',
  },
  {
    icon: Sparkles,
    title: 'Excellence',
    description: 'Delivering world-class solutions every time, with meticulous attention to detail and uncompromising quality standards.',
  },
  {
    icon: Lightbulb,
    title: 'Innovation',
    description: 'Leveraging technology to simplify trade, automate compliance, and unlock new opportunities for global commerce.',
  },
  {
    icon: Handshake,
    title: 'Partnership',
    description: 'Building lasting relationships with clients through collaborative problem-solving and shared commitment to success.',
  },
];

const team = [
  {
    name: 'Rajesh Sharma',
    role: 'Founder & CEO',
    initials: 'RS',
    bio: 'Visionary leader with 15+ years in international trade, driving Unnat Vega\'s mission to empower Indian businesses globally.',
  },
  {
    name: 'Priya Patel',
    role: 'COO',
    initials: 'PP',
    bio: 'Operations expert streamlining trade workflows and ensuring every project delivers measurable impact for our clients.',
  },
  {
    name: 'Amit Verma',
    role: 'Head of Trade',
    initials: 'AV',
    bio: 'Trade compliance specialist with deep knowledge of export-import regulations across 25+ countries.',
  },
  {
    name: 'Neha Gupta',
    role: 'Creative Director',
    initials: 'NG',
    bio: 'Award-winning designer crafting premium brand identities and digital experiences for trade businesses worldwide.',
  },
];

/* ─────────────────────── AnimatedSection ─────────────────────── */
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

  return (
    <section className="relative flex min-h-[70vh] items-center justify-center overflow-hidden px-4 pt-28 pb-16 md:pt-36 md:pb-20 lg:pt-40 lg:pb-24">
      {/* Background decorative elements */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute -left-32 top-1/4 size-96 rounded-full bg-primary/10 blur-[120px]" />
        <div className="absolute -right-32 bottom-1/4 size-64 rounded-full bg-primary/8 blur-[100px]" />
        <div className="absolute left-1/2 top-1/2 size-64 -translate-x-1/2 -translate-y-1/2 rounded-full bg-primary/5 blur-[100px]" />
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
        ref={ref}
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
            ABOUT US
          </Badge>
        </motion.div>

        <motion.h1
          variants={fadeInUp}
          className="text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl lg:text-7xl"
          style={{ fontFamily: 'var(--font-geist-mono)' }}
        >
          <span className="block">About</span>
          <span className="gradient-text block">Unnat Vega</span>
        </motion.h1>

        <motion.p
          variants={fadeInUp}
          className="mx-auto mt-8 max-w-2xl text-base text-muted-foreground md:text-lg"
        >
          Your trusted partner in international trade and digital excellence.
          We bridge the gap between Indian businesses and global opportunities.
        </motion.p>
      </motion.div>
    </section>
  );
}

/* ─────────────────────── Our Story ─────────────────────── */
function OurStory() {
  return (
    <AnimatedSection className="px-4 py-20 md:py-28 lg:py-32">
      <div className="mx-auto max-w-7xl">
        <motion.div variants={fadeInUp} className="mb-12 text-center md:mb-16">
          <Badge
            variant="outline"
            className="mb-4 border-primary/30 bg-primary/10 px-3 py-1 text-xs font-medium tracking-widest text-primary"
          >
            OUR STORY
          </Badge>
          <h2 className="text-3xl font-bold tracking-tight md:text-4xl lg:text-5xl">
            Bridging India to the <span className="gradient-text">World</span>
          </h2>
        </motion.div>

        <div className="grid gap-12 lg:grid-cols-2 lg:gap-16">
          {/* Story text */}
          <motion.div variants={slideInLeft} className="flex flex-col justify-center">
            <h3 className="mb-4 text-2xl font-bold tracking-tight md:text-3xl">
              Empowering Indian Businesses on the <span className="gradient-text">Global Stage</span>
            </h3>
            <p className="mb-4 text-sm leading-relaxed text-muted-foreground md:text-base">
              Unnat Vega is a premier trade and digital agency dedicated to empowering Indian exporters, importers, and businesses with the tools, strategy, and digital presence they need to compete and thrive on the global stage.
            </p>
            <p className="mb-6 text-sm leading-relaxed text-muted-foreground md:text-base">
              Founded with a vision to simplify international trade, we combine deep industry expertise with cutting-edge digital solutions. From export compliance and import facilitation to building world-class websites and brand identities — we are the trusted partner for businesses that want to go global with confidence.
            </p>
            <div className="flex flex-col gap-3">
              {[
                'End-to-end export & import management',
                'Digital platforms built for global trade',
                'Compliance-first approach with 100% track record',
                'Dedicated support from strategy to execution',
              ].map((item) => (
                <div key={item} className="flex items-center gap-3">
                  <div className="flex size-5 shrink-0 items-center justify-center rounded-full bg-primary/10">
                    <ArrowRight className="size-3 text-primary" />
                  </div>
                  <span className="text-sm text-muted-foreground">{item}</span>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Stats */}
          <motion.div variants={slideInRight}>
            <div className="grid grid-cols-2 gap-4 md:gap-6">
              {stats.map((stat) => (
                <Card
                  key={stat.label}
                  className="glass group border-transparent transition-all duration-300 hover:-translate-y-1 hover:border-primary/40 hover:shadow-lg hover:shadow-primary/5"
                >
                  <CardContent className="flex flex-col items-center p-6 text-center md:p-8">
                    <div className="mb-3 flex size-12 items-center justify-center rounded-full bg-primary/10 transition-all duration-300 group-hover:bg-primary/20">
                      <stat.icon className="size-5 text-primary transition-transform duration-300 group-hover:scale-110" />
                    </div>
                    <span
                      className="mb-1 text-3xl font-bold text-primary md:text-4xl"
                      style={{ fontFamily: 'var(--font-geist-mono)' }}
                    >
                      {stat.value}
                    </span>
                    <span className="text-xs text-muted-foreground md:text-sm">{stat.label}</span>
                  </CardContent>
                </Card>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </AnimatedSection>
  );
}

/* ─────────────────────── Our Values ─────────────────────── */
function OurValues() {
  return (
    <AnimatedSection className="px-4 py-20 md:py-28 lg:py-32">
      <div className="mx-auto max-w-7xl">
        <motion.div variants={fadeInUp} className="mb-12 text-center md:mb-16">
          <Badge
            variant="outline"
            className="mb-4 border-primary/30 bg-primary/10 px-3 py-1 text-xs font-medium tracking-widest text-primary"
          >
            OUR VALUES
          </Badge>
          <h2 className="text-3xl font-bold tracking-tight md:text-4xl lg:text-5xl">
            What <span className="gradient-text">Drives</span> Us
          </h2>
        </motion.div>

        <div className="grid gap-6 sm:grid-cols-2 lg:gap-8">
          {values.map((value) => (
            <motion.div key={value.title} variants={fadeInUp}>
              <Card className="group glass h-full border-transparent transition-all duration-300 hover:-translate-y-1 hover:border-primary/40 hover:shadow-lg hover:shadow-primary/5">
                <CardContent className="p-6 md:p-8">
                  <div className="mb-4 flex size-12 items-center justify-center rounded-full bg-primary/10 transition-all duration-300 group-hover:bg-primary/20">
                    <value.icon className="size-6 text-primary transition-transform duration-300 group-hover:scale-110" />
                  </div>
                  <h3 className="mb-2 text-xl font-semibold">{value.title}</h3>
                  <p className="text-sm leading-relaxed text-muted-foreground">
                    {value.description}
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

/* ─────────────────────── Our Team ─────────────────────── */
function OurTeam() {
  return (
    <AnimatedSection className="px-4 py-20 md:py-28 lg:py-32">
      <div className="mx-auto max-w-7xl">
        <motion.div variants={fadeInUp} className="mb-12 text-center md:mb-16">
          <Badge
            variant="outline"
            className="mb-4 border-primary/30 bg-primary/10 px-3 py-1 text-xs font-medium tracking-widest text-primary"
          >
            OUR TEAM
          </Badge>
          <h2 className="text-3xl font-bold tracking-tight md:text-4xl lg:text-5xl">
            Meet the <span className="gradient-text">People</span> Behind Unnat Vega
          </h2>
        </motion.div>

        <div className="grid gap-6 sm:grid-cols-2 lg:gap-8">
          {team.map((member) => (
            <motion.div key={member.name} variants={fadeInUp}>
              <Card className="group glass h-full border-transparent transition-all duration-300 hover:-translate-y-1 hover:border-primary/40 hover:shadow-lg hover:shadow-primary/5">
                <CardContent className="p-6 md:p-8">
                  <div className="mb-5 flex items-center gap-4">
                    <div className="flex size-14 items-center justify-center rounded-full bg-primary/15 text-lg font-bold text-primary transition-all duration-300 group-hover:bg-primary/25 group-hover:scale-105">
                      {member.initials}
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold">{member.name}</h3>
                      <p className="text-sm text-primary">{member.role}</p>
                    </div>
                  </div>
                  <p className="text-sm leading-relaxed text-muted-foreground">
                    {member.bio}
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

/* ─────────────────────── CTA ─────────────────────── */
function CTA() {
  return (
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
            <Link href="/contact">
              Get in Touch
              <ArrowRight className="ml-2 size-4" />
            </Link>
          </Button>
          <Button
            asChild
            size="lg"
            variant="outline"
            className="border-primary-foreground/30 bg-transparent text-primary-foreground transition-all duration-300 hover:bg-primary-foreground/10 hover:border-primary-foreground/50"
          >
            <Link href="/work">
              View Our Work
              <Sparkles className="ml-2 size-4" />
            </Link>
          </Button>
        </motion.div>
      </motion.div>
    </section>
  );
}

/* ─────────────────────── About Page ─────────────────────── */
export default function AboutPage() {
  return (
    <>
      <Hero />
      <OurStory />
      <OurValues />
      <OurTeam />
      <CTA />

    </>
  );
}
