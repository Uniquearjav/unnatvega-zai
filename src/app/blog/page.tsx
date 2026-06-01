'use client';

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { motion, useInView } from 'framer-motion';
import {
  Calendar,
  Clock,
  ArrowRight,
  BookOpen,
  Search,
  Tag,
  User,
  PenTool,
  Sparkles,
  TrendingUp,
  Globe,
  Zap,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';

interface BlogPost {
  id: string;
  title: string;
  slug: string;
  excerpt: string | null;
  coverImage: string | null;
  author: string;
  tags: string | null;
  published: boolean;
  createdAt: string;
  updatedAt: string;
}

const formatDate = (dateStr: string) => {
  const date = new Date(dateStr);
  return date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  });
};

const getReadTime = (excerpt: string | null) => {
  const words = excerpt?.split(' ').length || 0;
  return Math.max(3, Math.ceil(words / 200) + 4);
};

/* ─────────────── Animated Section Wrapper ─────────────── */
function AnimatedSection({
  children,
  className = '',
}: {
  children: React.ReactNode;
  className?: string;
}) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-60px' });

  return (
    <motion.section
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
      transition={{ duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }}
      className={className}
    >
      {children}
    </motion.section>
  );
}

/* ─────────────── Cover Placeholder ─────────────── */
function CoverPlaceholder({ isFeatured = false }: { isFeatured?: boolean }) {
  const icons = [TrendingUp, Globe, Zap, BookOpen];
  const Icon = icons[Math.floor(Math.random() * icons.length)];

  return (
    <div className={`relative flex size-full items-center justify-center bg-gradient-to-br from-primary/15 via-primary/5 to-transparent ${isFeatured ? '' : ''}`}>
      <div className="absolute inset-0 opacity-20" style={{
        backgroundImage: 'radial-gradient(circle at 25% 25%, var(--primary) 1px, transparent 1px)',
        backgroundSize: '20px 20px',
      }} />
      <div className={`rounded-2xl border border-primary/10 bg-primary/5 p-3 ${isFeatured ? 'p-5' : ''}`}>
        <Icon className={`text-primary/30 ${isFeatured ? 'size-10' : 'size-7'}`} />
      </div>
    </div>
  );
}

/* ─────────────── Blog Card ─────────────── */
function BlogCard({ blog, isFeatured = false, index = 0 }: { blog: BlogPost; isFeatured?: boolean; index?: number }) {
  const tags = blog.tags?.split(',').map((t) => t.trim()) || [];

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.08, ease: [0.25, 0.46, 0.45, 0.94] }}
      className={isFeatured ? 'sm:col-span-2 lg:col-span-2' : ''}
    >
      <Link href={`/blog/${blog.slug}`} className="group block h-full">
        <Card className="h-full overflow-hidden border-border/40 bg-card/50 backdrop-blur-sm transition-all duration-500 hover:-translate-y-1 hover:border-primary/30 hover:shadow-xl hover:shadow-primary/5">
          {/* Cover */}
          <div className={`relative overflow-hidden ${isFeatured ? 'h-52 sm:h-64 md:h-72' : 'h-40 sm:h-44'}`}>
            <CoverPlaceholder isFeatured={isFeatured} />

            {/* Bottom gradient for text readability */}
            <div className="absolute inset-0 bg-gradient-to-t from-card via-card/20 to-transparent" />

            {/* Featured badge */}
            {isFeatured && (
              <div className="absolute left-3 top-3 flex items-center gap-1.5 rounded-full bg-primary/90 px-2.5 py-1 backdrop-blur-sm">
                <Sparkles className="size-3 text-primary-foreground" />
                <span className="text-[10px] font-bold uppercase tracking-wider text-primary-foreground">Featured</span>
              </div>
            )}

            {/* Tags overlay */}
            <div className="absolute bottom-3 left-3 flex flex-wrap gap-1">
              {tags.slice(0, isFeatured ? 4 : 2).map((tag) => (
                <span
                  key={tag}
                  className="rounded-full bg-background/80 px-2 py-0.5 text-[10px] font-medium text-foreground/70 backdrop-blur-sm"
                >
                  {tag}
                </span>
              ))}
            </div>

            {/* Read time badge */}
            <div className="absolute right-3 top-3 flex items-center gap-1 rounded-full bg-background/80 px-2 py-0.5 text-[10px] font-medium text-muted-foreground backdrop-blur-sm">
              <Clock className="size-3" />
              {getReadTime(blog.excerpt)} min
            </div>
          </div>

          <CardContent className={`${isFeatured ? 'p-5 sm:p-6' : 'p-4 sm:p-5'}`}>
            {/* Meta */}
            <div className="mb-2 flex items-center gap-2.5 text-[11px] text-muted-foreground">
              <span className="flex items-center gap-1">
                <Calendar className="size-3" />
                {formatDate(blog.createdAt)}
              </span>
              <span className="size-1 rounded-full bg-border" />
              <span className="flex items-center gap-1">
                <User className="size-3" />
                {blog.author}
              </span>
            </div>

            {/* Title */}
            <h3
              className={`mb-2 font-bold tracking-tight leading-snug transition-colors duration-300 group-hover:text-primary ${
                isFeatured
                  ? 'text-lg sm:text-xl md:text-2xl'
                  : 'text-sm sm:text-base'
              }`}
            >
              {blog.title}
            </h3>

            {/* Excerpt */}
            <p className={`mb-4 text-muted-foreground leading-relaxed ${isFeatured ? 'line-clamp-3 text-sm' : 'line-clamp-2 text-xs sm:text-sm'}`}>
              {blog.excerpt}
            </p>

            {/* Read more */}
            <div className="flex items-center justify-between">
              <span className="flex items-center gap-1.5 text-xs font-semibold text-primary transition-all duration-300 group-hover:gap-2.5">
                Read Article
                <ArrowRight className="size-3.5 transition-transform duration-300 group-hover:translate-x-0.5" />
              </span>
            </div>
          </CardContent>
        </Card>
      </Link>
    </motion.div>
  );
}

/* ─────────────── Main Page ─────────────── */
export default function BlogPage() {
  const [blogs, setBlogs] = useState<BlogPost[]>([]);
  const [filteredBlogs, setFilteredBlogs] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedTag, setSelectedTag] = useState<string | null>(null);

  useEffect(() => {
    async function fetchBlogs() {
      try {
        const res = await fetch('/api/blog');
        if (!res.ok) throw new Error('Failed to fetch');
        const data = await res.json();
        setBlogs(data);
        setFilteredBlogs(data);
      } catch (err) {
        console.error('Error fetching blogs:', err);
      } finally {
        setLoading(false);
      }
    }
    fetchBlogs();
  }, []);

  useEffect(() => {
    let result = blogs;

    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      result = result.filter(
        (blog) =>
          blog.title.toLowerCase().includes(query) ||
          blog.excerpt?.toLowerCase().includes(query) ||
          blog.tags?.toLowerCase().includes(query)
      );
    }

    if (selectedTag) {
      result = result.filter(
        (blog) => blog.tags?.toLowerCase().includes(selectedTag.toLowerCase())
      );
    }

    setFilteredBlogs(result);
  }, [searchQuery, selectedTag, blogs]);

  // Extract all unique tags
  const allTags = Array.from(
    new Set(
      blogs
        .flatMap((blog) => blog.tags?.split(',').map((t) => t.trim()) || [])
        .filter(Boolean)
    )
  ).slice(0, 10);

  const featuredPost = filteredBlogs[0];
  const otherPosts = filteredBlogs.slice(1);

  return (
    <div className="min-h-screen pt-16">
      {/* ─────── Hero Section ─────── */}
      <section className="relative overflow-hidden px-4 pt-12 pb-10 sm:pt-16 sm:pb-14 md:pt-20 md:pb-18">
        {/* Background decorations */}
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute -left-40 top-1/4 size-[500px] rounded-full bg-primary/6 blur-[180px]" />
          <div className="absolute -right-40 bottom-1/4 size-[400px] rounded-full bg-primary/4 blur-[150px]" />
          {/* Grid pattern */}
          <div
            className="absolute inset-0 opacity-[0.015]"
            style={{
              backgroundImage: 'linear-gradient(var(--border) 1px, transparent 1px), linear-gradient(90deg, var(--border) 1px, transparent 1px)',
              backgroundSize: '60px 60px',
            }}
          />
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }}
          className="relative mx-auto max-w-4xl text-center"
        >
          {/* Badge */}
          <div className="mb-5 flex items-center justify-center gap-2 sm:mb-6">
            <div className="flex items-center gap-2 rounded-full border border-primary/20 bg-primary/5 px-4 py-1.5 backdrop-blur-sm">
              <BookOpen className="size-3.5 text-primary" />
              <span className="text-xs font-medium text-primary sm:text-sm">Our Blog</span>
            </div>
          </div>

          {/* Title */}
          <h1
            className="text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl lg:text-6xl"
            style={{ fontFamily: 'var(--font-geist-mono)' }}
          >
            Insights &{' '}
            <span className="gradient-text">Resources</span>
          </h1>

          {/* Subtitle */}
          <p className="mx-auto mt-4 max-w-2xl text-sm text-muted-foreground sm:mt-5 sm:text-base md:text-lg">
            Expert insights, compliance guides, and digital strategy tips to help your business thrive in international trade.
          </p>

          {/* Search Bar */}
          <div className="mx-auto mt-6 max-w-lg sm:mt-8">
            <div className="glass relative flex items-center rounded-xl border border-border/50">
              <Search className="ml-3.5 size-4 shrink-0 text-muted-foreground/60 sm:size-5" />
              <Input
                type="text"
                placeholder="Search articles, topics, tags..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="h-11 border-0 bg-transparent pl-2.5 pr-4 text-sm shadow-none placeholder:text-muted-foreground/40 focus-visible:ring-0 sm:h-12 sm:text-base"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="mr-3 text-xs text-muted-foreground transition-colors hover:text-foreground"
                >
                  Clear
                </button>
              )}
            </div>
          </div>
        </motion.div>
      </section>

      {/* ─────── Tags Filter ─────── */}
      {allTags.length > 0 && (
        <AnimatedSection className="px-4 pb-6 sm:pb-8">
          <div className="mx-auto max-w-6xl">
            <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-hide">
              <Tag className="size-3.5 shrink-0 text-muted-foreground/50" />
              <button
                onClick={() => setSelectedTag(null)}
                className={`shrink-0 rounded-full px-3 py-1.5 text-xs font-medium transition-all duration-200 ${
                  !selectedTag
                    ? 'bg-primary text-primary-foreground shadow-sm shadow-primary/20'
                    : 'border border-border/60 text-muted-foreground hover:border-primary/30 hover:text-foreground'
                }`}
              >
                All Posts
              </button>
              {allTags.map((tag) => (
                <button
                  key={tag}
                  onClick={() =>
                    setSelectedTag(selectedTag === tag ? null : tag)
                  }
                  className={`shrink-0 rounded-full px-3 py-1.5 text-xs font-medium transition-all duration-200 ${
                    selectedTag === tag
                      ? 'bg-primary text-primary-foreground shadow-sm shadow-primary/20'
                      : 'border border-border/60 text-muted-foreground hover:border-primary/30 hover:text-foreground'
                  }`}
                >
                  {tag}
                </button>
              ))}
            </div>
          </div>
        </AnimatedSection>
      )}

      {/* ─────── Blog Grid ─────── */}
      <section className="px-4 pb-16 md:pb-20">
        <div className="mx-auto max-w-6xl">
          {loading ? (
            <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {[1, 2, 3].map((i) => (
                <Card key={i} className="animate-pulse border-border/40">
                  <div className="h-44 rounded-t-lg bg-muted/50" />
                  <CardContent className="p-5">
                    <div className="mb-3 h-3 w-1/3 rounded-full bg-muted/70" />
                    <div className="mb-2 h-5 w-full rounded bg-muted/70" />
                    <div className="mb-1 h-4 w-5/6 rounded bg-muted/50" />
                    <div className="mb-4 h-4 w-2/3 rounded bg-muted/50" />
                    <div className="h-3 w-20 rounded-full bg-muted/70" />
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : filteredBlogs.length === 0 ? (
            <div className="py-24 text-center">
              <div className="mx-auto mb-5 flex size-16 items-center justify-center rounded-2xl border border-border/40 bg-muted/30">
                <BookOpen className="size-7 text-muted-foreground/30" />
              </div>
              <h3 className="mb-2 text-lg font-semibold">No articles found</h3>
              <p className="mb-6 text-sm text-muted-foreground">
                {searchQuery || selectedTag
                  ? 'Try adjusting your search or filter criteria.'
                  : 'Check back soon for new articles.'}
              </p>
              {(searchQuery || selectedTag) && (
                <Button
                  variant="outline"
                  className="gap-2"
                  onClick={() => {
                    setSearchQuery('');
                    setSelectedTag(null);
                  }}
                >
                  Clear All Filters
                </Button>
              )}
            </div>
          ) : (
            <>
              {/* Featured post + first row */}
              <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
                {featuredPost && !searchQuery && !selectedTag && (
                  <BlogCard blog={featuredPost} isFeatured index={0} />
                )}
                {(searchQuery || selectedTag ? filteredBlogs : otherPosts).map((blog, i) => {
                  const cardIndex = (searchQuery || selectedTag) ? i : i + 1;
                  return <BlogCard key={blog.id} blog={blog} index={cardIndex} />;
                })}
              </div>

              {/* Results count */}
              {(searchQuery || selectedTag) && filteredBlogs.length > 0 && (
                <p className="mt-6 text-center text-xs text-muted-foreground">
                  {filteredBlogs.length} article{filteredBlogs.length !== 1 ? 's' : ''} found
                </p>
              )}
            </>
          )}
        </div>
      </section>

      {/* ─────── Newsletter CTA ─────── */}
      <AnimatedSection className="px-4 pb-16 md:pb-20">
        <div className="mx-auto max-w-4xl">
          <div className="relative overflow-hidden rounded-2xl border border-primary/15 bg-gradient-to-br from-primary/8 via-primary/3 to-transparent p-6 backdrop-blur-sm sm:p-8 md:rounded-3xl md:p-12">
            {/* Decorative elements */}
            <div className="pointer-events-none absolute -right-20 -top-20 size-60 rounded-full bg-primary/10 blur-[100px]" />
            <div className="pointer-events-none absolute -bottom-20 -left-20 size-48 rounded-full bg-primary/5 blur-[80px]" />

            <div className="relative z-10 text-center">
              <Badge
                variant="outline"
                className="mb-4 border-primary/25 bg-primary/10 px-3 py-1 text-xs font-medium text-primary sm:mb-5"
              >
                STAY UPDATED
              </Badge>
              <h2
                className="mb-2 text-xl font-bold tracking-tight sm:text-2xl md:text-3xl"
                style={{ fontFamily: 'var(--font-geist-mono)' }}
              >
                Never Miss an{' '}
                <span className="gradient-text">Insight</span>
              </h2>
              <p className="mx-auto mb-6 max-w-md text-sm text-muted-foreground sm:mb-8 sm:text-base">
                Subscribe to get the latest trade insights, compliance updates, and digital strategies delivered to your inbox.
              </p>
              <div className="mx-auto flex max-w-md gap-2 sm:gap-3">
                <Input
                  type="email"
                  placeholder="your@email.com"
                  className="h-11 flex-1 border-border/50 bg-background/50 text-sm backdrop-blur-sm sm:h-12"
                />
                <Button className="h-11 gap-2 bg-primary px-5 text-primary-foreground shadow-lg shadow-primary/15 sm:h-12">
                  Subscribe
                  <ArrowRight className="size-4" />
                </Button>
              </div>
            </div>
          </div>
        </div>
      </AnimatedSection>

      {/* ─────── Admin Link (subtle) ─────── */}
      <div className="px-4 pb-12">
        <div className="mx-auto max-w-6xl text-center">
          <Link href="/blog/admin">
            <Button variant="ghost" className="gap-1.5 text-xs text-muted-foreground/50 hover:text-muted-foreground">
              <PenTool className="size-3" />
              Manage Posts
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
