'use client';

import { useState, useRef } from 'react';
import Link from 'next/link';
import { motion, useInView, AnimatePresence } from 'framer-motion';
import {
  Mail,
  Phone,
  MapPin,
  Twitter,
  Linkedin,
  Instagram,
  Facebook,
  Send,
  ArrowRight,
  Clock,
  ChevronDown,
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
import { useToast } from '@/hooks/use-toast';

import {
  fadeInUp,
  staggerContainer,
  slideInLeft,
  slideInRight,
} from '@/lib/animations';

/* ─────────────────────── Data ─────────────────────── */

const socialLinks = [
  { icon: Twitter, label: 'Twitter', href: 'https://twitter.com/unnatvega' },
  { icon: Linkedin, label: 'LinkedIn', href: 'https://linkedin.com/company/unnatvega' },
  { icon: Instagram, label: 'Instagram', href: 'https://instagram.com/unnatvega' },
  { icon: Facebook, label: 'Facebook', href: 'https://facebook.com/unnatvega' },
];

const contactInfo = [
  {
    icon: Phone,
    label: 'Phone',
    value: '+91 98765 43210',
    href: 'tel:+919876543210',
  },
  {
    icon: Mail,
    label: 'Email',
    value: 'info@unnatvega.com',
    href: 'mailto:info@unnatvega.com',
  },
  {
    icon: MapPin,
    label: 'Address',
    value: 'Mumbai, Maharashtra, India',
    href: undefined,
  },
];

const officeHours = [
  { day: 'Monday – Friday', time: '9:00 AM – 6:00 PM IST' },
  { day: 'Saturday', time: '10:00 AM – 2:00 PM IST' },
  { day: 'Sunday', time: 'Closed' },
];

const faqs = [
  {
    question: 'How quickly can I expect a response after submitting the form?',
    answer:
      'We aim to respond to all inquiries within 24 business hours. For urgent requests, feel free to call us directly at +91 98765 43210 for immediate assistance.',
  },
  {
    question: 'What services does Unnat Vega offer?',
    answer:
      'We offer end-to-end export and import management, digital presence solutions (websites, apps, platforms), brand identity design, and trade compliance consulting. Our goal is to help Indian businesses expand globally with confidence.',
  },
  {
    question: 'Do you work with businesses outside of India?',
    answer:
      'While our primary focus is empowering Indian exporters and importers, we also partner with international buyers and businesses looking to source from or sell to the Indian market. Contact us to discuss your specific needs.',
  },
  {
    question: 'What is the typical budget range for a project?',
    answer:
      'Our projects typically range from $10,000 to $100,000+ depending on scope, complexity, and timeline. We provide detailed proposals after understanding your requirements during an initial consultation.',
  },
  {
    question: 'Can I schedule a consultation before committing to a project?',
    answer:
      'Absolutely! We offer a free 30-minute discovery call where we learn about your business, discuss your goals, and outline how we can help. There\'s no obligation — we believe in building relationships based on trust first.',
  },
];

/* ─────────────────────── Animated Section ─────────────────────── */
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

/* ─────────────────────── FAQ Item ─────────────────────── */
function FAQItem({ question, answer, index }: { question: string; answer: string; index: number }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <motion.div variants={fadeInUp}>
      <Card className="glass border-transparent transition-all duration-300 hover:border-primary/30 hover:shadow-lg hover:shadow-primary/5">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="flex w-full items-center justify-between p-5 text-left md:p-6"
          aria-expanded={isOpen}
        >
          <div className="flex items-center gap-3 pr-4">
            <span className="flex size-8 shrink-0 items-center justify-center rounded-full bg-primary/10 text-xs font-bold text-primary" style={{ fontFamily: 'var(--font-geist-mono)' }}>
              {String(index + 1).padStart(2, '0')}
            </span>
            <span className="text-sm font-semibold md:text-base">{question}</span>
          </div>
          <ChevronDown
            className={`size-5 shrink-0 text-muted-foreground transition-transform duration-300 ${isOpen ? 'rotate-180 text-primary' : ''}`}
          />
        </button>
        <AnimatePresence initial={false}>
          {isOpen && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.3, ease: [0.25, 0.46, 0.45, 0.94] }}
            >
              <div className="border-t border-border/40 px-5 pb-5 pt-4 md:px-6 md:pb-6">
                <p className="pl-11 text-sm leading-relaxed text-muted-foreground">{answer}</p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </Card>
    </motion.div>
  );
}

/* ─────────────────────── Contact Page ─────────────────────── */
export default function ContactPage() {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    budget: '',
    message: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const heroRef = useRef(null);
  const heroInView = useInView(heroRef, { once: true });

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
    <>

      {/* ─────────────── Hero Section ─────────────── */}
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
            ref={heroRef}
            initial="hidden"
            animate={heroInView ? 'visible' : 'hidden'}
            variants={staggerContainer}
            className="text-center"
          >
            <motion.div variants={fadeInUp}>
              <Badge
                variant="outline"
                className="mb-6 border-primary/30 bg-primary/10 px-4 py-1.5 text-xs font-medium tracking-widest text-primary"
              >
                CONTACT US
              </Badge>
            </motion.div>

            <motion.h1
              variants={fadeInUp}
              className="mb-6 text-4xl font-bold tracking-tight md:text-5xl lg:text-7xl"
              style={{ fontFamily: 'var(--font-geist-mono)' }}
            >
              Get In <span className="gradient-text">Touch</span>
            </motion.h1>

            <motion.p
              variants={fadeInUp}
              className="mx-auto max-w-2xl text-base text-muted-foreground md:text-lg"
            >
              Let&apos;s Grow Your Business Globally. Whether you&apos;re looking to expand
              into new markets, build a digital presence, or streamline your trade
              operations — we&apos;re here to help.
            </motion.p>

            <motion.div
              variants={fadeInUp}
              className="mt-8 flex flex-wrap items-center justify-center gap-6 text-sm text-muted-foreground"
            >
              {contactInfo.map((info) => (
                <div key={info.label} className="flex items-center gap-2">
                  <info.icon className="size-4 text-primary" />
                  {info.href ? (
                    <a
                      href={info.href}
                      className="transition-all duration-300 hover:text-primary"
                    >
                      {info.value}
                    </a>
                  ) : (
                    <span>{info.value}</span>
                  )}
                </div>
              ))}
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* ─────────────── Contact Form + Info Section ─────────────── */}
      <AnimatedSection
        id="contact-form"
        className="px-4 py-16 md:py-20 lg:py-24"
      >
        <div className="mx-auto max-w-7xl">
          <div className="grid gap-12 lg:grid-cols-2 lg:gap-16">
            {/* Left: Contact Form */}
            <motion.div variants={slideInLeft}>
              <Card className="glass border-border/50">
                <CardContent className="p-6 md:p-8">
                  <h3 className="mb-1 text-xl font-bold tracking-tight md:text-2xl">
                    Send Us a Message
                  </h3>
                  <p className="mb-6 text-sm text-muted-foreground">
                    Fill out the form below and we&apos;ll get back to you within 24 hours.
                  </p>
                  <form onSubmit={handleSubmit} className="space-y-5">
                    <div className="grid gap-5 md:grid-cols-2">
                      <div>
                        <label
                          htmlFor="name"
                          className="mb-1.5 block text-sm font-medium"
                        >
                          Name <span className="text-primary">*</span>
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
                          Email <span className="text-primary">*</span>
                        </label>
                        <Input
                          id="email"
                          name="email"
                          type="email"
                          placeholder="your@email.com"
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
                          placeholder="Your company name"
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
                          <SelectTrigger className="bg-input/30 transition-all duration-300 focus:bg-input/50">
                            <SelectValue placeholder="Select budget range" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="$10k-$25k">$10k – $25k</SelectItem>
                            <SelectItem value="$25k-$50k">$25k – $50k</SelectItem>
                            <SelectItem value="$50k-$100k">$50k – $100k</SelectItem>
                            <SelectItem value="$100k+">$100k+</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>

                    <div>
                      <label
                        htmlFor="message"
                        className="mb-1.5 block text-sm font-medium"
                      >
                        Message <span className="text-primary">*</span>
                      </label>
                      <Textarea
                        id="message"
                        name="message"
                        placeholder="Tell us about your project or inquiry..."
                        required
                        rows={5}
                        value={formData.message}
                        onChange={handleChange}
                        className="resize-none bg-input/30 transition-all duration-300 focus:bg-input/50"
                      />
                    </div>

                    <Button
                      type="submit"
                      size="lg"
                      disabled={isSubmitting}
                      className="w-full bg-primary text-primary-foreground transition-all duration-300 hover:bg-primary/90 hover:shadow-lg hover:shadow-primary/20 disabled:opacity-60"
                    >
                      {isSubmitting ? (
                        <span className="flex items-center gap-2">
                          <svg className="size-4 animate-spin" viewBox="0 0 24 24" fill="none">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                          </svg>
                          Sending...
                        </span>
                      ) : (
                        <span className="flex items-center gap-2">
                          Send Message
                          <Send className="size-4" />
                        </span>
                      )}
                    </Button>
                  </form>
                </CardContent>
              </Card>
            </motion.div>

            {/* Right: Contact Info */}
            <motion.div variants={slideInRight} className="flex flex-col gap-6">
              {/* Contact details card */}
              <Card className="glass border-transparent transition-all duration-300 hover:border-primary/30 hover:shadow-lg hover:shadow-primary/5">
                <CardContent className="p-6 md:p-8">
                  <h3 className="mb-6 text-xl font-bold tracking-tight md:text-2xl">
                    Contact Information
                  </h3>
                  <div className="space-y-5">
                    {contactInfo.map((info) => (
                      <div key={info.label} className="flex items-start gap-4">
                        <div className="flex size-10 shrink-0 items-center justify-center rounded-full bg-primary/10 transition-all duration-300 group-hover:bg-primary/20">
                          <info.icon className="size-5 text-primary" />
                        </div>
                        <div>
                          <p className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
                            {info.label}
                          </p>
                          {info.href ? (
                            <a
                              href={info.href}
                              className="text-sm font-medium transition-all duration-300 hover:text-primary md:text-base"
                            >
                              {info.value}
                            </a>
                          ) : (
                            <p className="text-sm font-medium md:text-base">{info.value}</p>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Divider */}
                  <div className="my-6 border-t border-border/40" />

                  {/* Follow Us */}
                  <div>
                    <p className="mb-3 text-xs font-medium uppercase tracking-wider text-muted-foreground">
                      Follow Us
                    </p>
                    <div className="flex gap-2.5">
                      {socialLinks.map((social) => (
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
                </CardContent>
              </Card>

              {/* Decorative CTA card */}
              <Card className="relative overflow-hidden border-primary/20 bg-gradient-to-br from-primary/10 via-primary/5 to-transparent transition-all duration-300 hover:border-primary/40 hover:shadow-xl hover:shadow-primary/10">
                <div className="pointer-events-none absolute -right-8 -top-8 size-32 rounded-full bg-primary/10 blur-[60px]" />
                <div className="pointer-events-none absolute -bottom-8 -left-8 size-24 rounded-full bg-primary/15 blur-[50px]" />
                <CardContent className="relative p-6 md:p-8">
                  <Badge
                    variant="outline"
                    className="mb-4 border-primary/30 bg-primary/15 px-3 py-1 text-xs font-medium tracking-widest text-primary"
                  >
                    GO GLOBAL
                  </Badge>
                  <h4 className="mb-2 text-xl font-bold tracking-tight md:text-2xl">
                    Ready to expand <span className="gradient-text">globally</span>?
                  </h4>
                  <p className="mb-5 text-sm leading-relaxed text-muted-foreground">
                    Join 500+ businesses that trust Unnat Vega to power their international growth and digital transformation.
                  </p>
                  <Button
                    asChild
                    className="bg-primary text-primary-foreground transition-all duration-300 hover:bg-primary/90 hover:shadow-lg hover:shadow-primary/20"
                  >
                    <a href="#contact-form">
                      Get Started
                      <ArrowRight className="ml-2 size-4" />
                    </a>
                  </Button>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </div>
      </AnimatedSection>

      {/* ─────────────── Map / Office Section ─────────────── */}
      <AnimatedSection className="px-4 py-16 md:py-20 lg:py-24">
        <div className="mx-auto max-w-7xl">
          <motion.div variants={fadeInUp} className="mb-10 text-center md:mb-12">
            <Badge
              variant="outline"
              className="mb-4 border-primary/30 bg-primary/10 px-3 py-1 text-xs font-medium tracking-widest text-primary"
            >
              OUR OFFICE
            </Badge>
            <h2 className="text-3xl font-bold tracking-tight md:text-4xl lg:text-5xl">
              Visit Us
            </h2>
          </motion.div>

          <div className="grid gap-6 lg:grid-cols-3">
            {/* Map placeholder card */}
            <motion.div variants={fadeInUp} className="lg:col-span-2">
              <Card className="glass h-full border-transparent transition-all duration-300 hover:border-primary/30 hover:shadow-lg hover:shadow-primary/5">
                <CardContent className="p-0">
                  <div className="relative flex min-h-[300px] items-center justify-center overflow-hidden rounded-t-xl bg-gradient-to-br from-primary/5 via-primary/10 to-primary/5 md:min-h-[360px]">
                    {/* Decorative map pattern */}
                    <div className="pointer-events-none absolute inset-0 opacity-[0.06]"
                      style={{
                        backgroundImage:
                          'linear-gradient(var(--border) 1px, transparent 1px), linear-gradient(90deg, var(--border) 1px, transparent 1px)',
                        backgroundSize: '40px 40px',
                      }}
                    />
                    <div className="pointer-events-none absolute -left-16 top-1/4 size-48 rounded-full bg-primary/15 blur-[80px]" />
                    <div className="pointer-events-none absolute -bottom-16 right-1/4 size-48 rounded-full bg-primary/10 blur-[80px]" />

                    {/* Location pin */}
                    <div className="relative flex flex-col items-center gap-3">
                      <div className="flex size-16 items-center justify-center rounded-full bg-primary/20 backdrop-blur-sm">
                        <MapPin className="size-7 text-primary" />
                      </div>
                      <div className="rounded-xl bg-background/80 px-5 py-3 text-center backdrop-blur-md">
                        <p className="text-sm font-semibold">Mumbai, Maharashtra</p>
                        <p className="text-xs text-muted-foreground">India</p>
                      </div>
                    </div>
                  </div>

                  <div className="p-5 md:p-6">
                    <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                      <div>
                        <h3 className="text-lg font-bold tracking-tight">Unnat Vega Headquarters</h3>
                        <p className="text-sm text-muted-foreground">Mumbai, Maharashtra, India</p>
                      </div>
                      <a
                        href="https://maps.google.com/?q=Mumbai+Maharashtra+India"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <Button variant="outline" className="border-primary/30 transition-all duration-300 hover:border-primary hover:shadow-md hover:shadow-primary/10">
                          Open in Maps
                          <ArrowRight className="ml-2 size-4" />
                        </Button>
                      </a>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            {/* Office details card */}
            <motion.div variants={fadeInUp} className="flex flex-col gap-6">
              <Card className="glass border-transparent transition-all duration-300 hover:border-primary/30 hover:shadow-lg hover:shadow-primary/5">
                <CardContent className="p-5 md:p-6">
                  <div className="mb-4 flex items-center gap-3">
                    <div className="flex size-10 items-center justify-center rounded-full bg-primary/10">
                      <Clock className="size-5 text-primary" />
                    </div>
                    <h4 className="font-bold tracking-tight">Office Hours</h4>
                  </div>
                  <div className="space-y-3">
                    {officeHours.map((item) => (
                      <div key={item.day} className="flex items-center justify-between">
                        <span className="text-sm text-muted-foreground">{item.day}</span>
                        <span className={`text-sm font-medium ${item.time === 'Closed' ? 'text-destructive' : 'text-foreground'}`}>
                          {item.time}
                        </span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card className="glass border-transparent transition-all duration-300 hover:border-primary/30 hover:shadow-lg hover:shadow-primary/5">
                <CardContent className="p-5 md:p-6">
                  <div className="mb-4 flex items-center gap-3">
                    <div className="flex size-10 items-center justify-center rounded-full bg-primary/10">
                      <Mail className="size-5 text-primary" />
                    </div>
                    <h4 className="font-bold tracking-tight">Quick Contact</h4>
                  </div>
                  <div className="space-y-3">
                    <a
                      href="tel:+919876543210"
                      className="flex items-center gap-3 text-sm text-muted-foreground transition-all duration-300 hover:text-primary"
                    >
                      <Phone className="size-4 shrink-0 text-primary" />
                      +91 98765 43210
                    </a>
                    <a
                      href="mailto:info@unnatvega.com"
                      className="flex items-center gap-3 text-sm text-muted-foreground transition-all duration-300 hover:text-primary"
                    >
                      <Mail className="size-4 shrink-0 text-primary" />
                      info@unnatvega.com
                    </a>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </div>
      </AnimatedSection>

      {/* ─────────────── FAQ Section ─────────────── */}
      <AnimatedSection className="px-4 py-16 md:py-20 lg:py-24">
        <div className="mx-auto max-w-3xl">
          <motion.div variants={fadeInUp} className="mb-10 text-center md:mb-12">
            <Badge
              variant="outline"
              className="mb-4 border-primary/30 bg-primary/10 px-3 py-1 text-xs font-medium tracking-widest text-primary"
            >
              FAQ
            </Badge>
            <h2 className="text-3xl font-bold tracking-tight md:text-4xl lg:text-5xl">
              Frequently Asked Questions
            </h2>
            <p className="mx-auto mt-4 max-w-xl text-sm text-muted-foreground md:text-base">
              Got questions? We&apos;ve got answers. If you can&apos;t find what you&apos;re looking for, feel free to reach out directly.
            </p>
          </motion.div>

          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <FAQItem
                key={faq.question}
                question={faq.question}
                answer={faq.answer}
                index={index}
              />
            ))}
          </div>
        </div>
      </AnimatedSection>

      {/* ─────────────── CTA Section ─────────────── */}
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
              <a href="#contact-form">
                Start a Project
                <ArrowRight className="ml-2 size-4" />
              </a>
            </Button>
            <Button
              asChild
              size="lg"
              variant="outline"
              className="border-primary-foreground/30 bg-transparent text-primary-foreground transition-all duration-300 hover:bg-primary-foreground/10 hover:border-primary-foreground/50"
            >
              <Link href="/">
                Back to Home
              </Link>
            </Button>
          </motion.div>
        </motion.div>
      </section>

    </>
  );
}
