'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useParams } from 'next/navigation';
import { motion, useScroll, useSpring } from 'framer-motion';
import {
  ArrowLeft,
  Calendar,
  Clock,
  User,
  Tag,
  BookOpen,
  ChevronRight,
  Twitter,
  Linkedin,
  Link as LinkIcon,
  Check,
  ArrowRight,
  TrendingUp,
  Globe,
  Zap,
  Flame,
  Newspaper,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

interface BlogPost {
  id: string;
  title: string;
  slug: string;
  excerpt: string | null;
  content: string;
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
    month: 'long',
    day: 'numeric',
  });
};

const getReadTime = (content: string) => {
  const text = content.replace(/<[^>]*>/g, '');
  const words = text.split(/\s+/).length;
  return Math.max(3, Math.ceil(words / 200));
};

const coverIcons = [TrendingUp, Globe, Zap, BookOpen, Flame, Newspaper];

export default function BlogPostPage() {
  const params = useParams();
  const slug = params.slug as string;
  const [blog, setBlog] = useState<BlogPost | null>(null);
  const [relatedPosts, setRelatedPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [copied, setCopied] = useState(false);

  // Reading progress bar
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });

  useEffect(() => {
    async function fetchBlog() {
      try {
        const res = await fetch(`/api/blog/${slug}`);
        if (!res.ok) throw new Error('Blog not found');
        const data = await res.json();
        setBlog(data);

        // Fetch related posts
        const allRes = await fetch('/api/blog');
        if (allRes.ok) {
          const allPosts: BlogPost[] = await allRes.json();
          const related = allPosts
            .filter((p) => p.slug !== data.slug && p.published)
            .slice(0, 2);
          setRelatedPosts(related);
        }
      } catch (err) {
        console.error('Error fetching blog:', err);
      } finally {
        setLoading(false);
      }
    }
    if (slug) fetchBlog();
  }, [slug]);

  const handleShare = async (platform?: string) => {
    const url = window.location.href;
    const title = blog?.title || 'Unnat Vega Blog';

    if (platform === 'copy' || !platform) {
      try {
        await navigator.clipboard.writeText(url);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      } catch {
        // Fallback
      }
      return;
    }

    const shareUrls: Record<string, string> = {
      twitter: `https://twitter.com/intent/tweet?url=${encodeURIComponent(url)}&text=${encodeURIComponent(title)}`,
      linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`,
    };

    if (shareUrls[platform]) {
      window.open(shareUrls[platform], '_blank', 'width=600,height=400');
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen pt-16">
        <div className="mx-auto max-w-3xl px-4 py-12">
          <div className="animate-pulse space-y-5">
            <div className="flex gap-2">
              <div className="h-6 w-16 rounded-full bg-muted/50" />
              <div className="h-6 w-20 rounded-full bg-muted/50" />
              <div className="h-6 w-14 rounded-full bg-muted/50" />
            </div>
            <div className="h-8 w-3/4 rounded-lg bg-muted/50 sm:h-10" />
            <div className="h-5 w-full rounded bg-muted/30" />
            <div className="h-5 w-5/6 rounded bg-muted/30" />
            <div className="flex gap-4 pt-2">
              <div className="h-4 w-24 rounded bg-muted/30" />
              <div className="h-4 w-20 rounded bg-muted/30" />
              <div className="h-4 w-24 rounded bg-muted/30" />
            </div>
            <div className="mt-8 space-y-3">
              {[1, 2, 3, 4, 5].map((i) => (
                <div key={i} className="h-4 rounded bg-muted/30" style={{ width: `${60 + Math.random() * 40}%` }} />
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (!blog) {
    return (
      <div className="min-h-screen pt-16">
        <div className="mx-auto max-w-3xl px-4 py-24 text-center">
          <div className="mx-auto mb-5 flex size-20 items-center justify-center rounded-2xl border border-border/40 bg-muted/20">
            <BookOpen className="size-8 text-muted-foreground/25" />
          </div>
          <h1 className="mb-3 text-2xl font-bold">Post Not Found</h1>
          <p className="mb-8 text-muted-foreground">
            The blog post you&apos;re looking for doesn&apos;t exist or may have been removed.
          </p>
          <Button asChild className="gap-2 bg-primary text-primary-foreground">
            <Link href="/blog">
              <ArrowLeft className="size-4" />
              Back to Blog
            </Link>
          </Button>
        </div>
      </div>
    );
  }

  const tags = blog.tags?.split(',').map((t) => t.trim()) || [];
  const iconIndex = parseInt(blog.id, 10) % coverIcons.length;

  return (
    <div className="min-h-screen pt-16">
      {/* Reading Progress Bar */}
      <motion.div
        className="fixed left-0 right-0 top-0 z-[60] h-[3px] origin-left bg-primary"
        style={{ scaleX }}
      />

      <article className="mx-auto max-w-4xl px-4 py-8 sm:py-12">
        {/* Breadcrumb */}
        <motion.nav
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="mb-6 flex items-center gap-1.5 text-xs text-muted-foreground sm:text-sm"
        >
          <Link href="/" className="transition-colors hover:text-foreground">
            Home
          </Link>
          <ChevronRight className="size-3" />
          <Link href="/blog" className="transition-colors hover:text-foreground">
            Blog
          </Link>
          <ChevronRight className="size-3" />
          <span className="truncate text-foreground/70">{blog.title}</span>
        </motion.nav>

        {/* Header */}
        <motion.header
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] }}
          className="mb-8 sm:mb-10"
        >
          {/* Tags */}
          {tags.length > 0 && (
            <div className="mb-4 flex flex-wrap gap-1.5">
              {tags.map((tag) => (
                <Badge
                  key={tag}
                  variant="outline"
                  className="border-primary/15 bg-primary/5 px-2.5 py-0.5 text-[11px] font-medium text-primary"
                >
                  <Tag className="mr-1 size-2.5" />
                  {tag}
                </Badge>
              ))}
            </div>
          )}

          {/* Title */}
          <h1
            className="mb-5 text-2xl font-bold tracking-tight leading-snug sm:text-3xl md:text-4xl lg:text-[2.75rem] lg:leading-[1.2]"
            style={{ fontFamily: 'var(--font-geist-mono)' }}
          >
            {blog.title}
          </h1>

          {/* Excerpt */}
          {blog.excerpt && (
            <p className="mb-6 border-l-2 border-primary/30 pl-4 text-base text-muted-foreground sm:text-lg md:text-xl">
              {blog.excerpt}
            </p>
          )}

          {/* Cover Image or Placeholder */}
          {(blog.coverImage || true) && (
            <div className="mb-6 overflow-hidden rounded-2xl border border-border/30 sm:mb-8">
              {blog.coverImage ? (
                <Image
                  src={blog.coverImage}
                  alt={blog.title}
                  width={900}
                  height={400}
                  className="w-full object-cover"
                />
              ) : (
                <div className="relative flex h-48 items-center justify-center overflow-hidden bg-gradient-to-br from-primary/15 via-primary/5 to-transparent sm:h-64 md:h-72">
                  <div className="absolute inset-0 opacity-10" style={{
                    backgroundImage: 'radial-gradient(circle at 1px 1px, var(--primary) 1px, transparent 0)',
                    backgroundSize: '24px 24px',
                  }} />
                  <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 size-40 rounded-full bg-primary/10 blur-3xl" />
                  <div className="relative rounded-2xl border border-primary/15 bg-primary/8 p-5">
                    {iconIndex === 0 && <TrendingUp className="size-12 text-primary/40" />}
                    {iconIndex === 1 && <Globe className="size-12 text-primary/40" />}
                    {iconIndex === 2 && <Zap className="size-12 text-primary/40" />}
                    {iconIndex === 3 && <BookOpen className="size-12 text-primary/40" />}
                    {iconIndex === 4 && <Flame className="size-12 text-primary/40" />}
                    {iconIndex === 5 && <Newspaper className="size-12 text-primary/40" />}
                  </div>
                </div>
              )}
            </div>
          )}

          {/* Author + Meta bar */}
          <div className="flex flex-col gap-4 rounded-xl border border-border/30 bg-card/50 p-4 backdrop-blur-sm sm:flex-row sm:items-center sm:justify-between sm:p-5">
            <div className="flex items-center gap-3">
              {/* Author avatar */}
              <div className="flex size-11 items-center justify-center rounded-full bg-primary/10 text-sm font-bold text-primary">
                {blog.author
                  .split(' ')
                  .map((n) => n[0])
                  .join('')
                  .slice(0, 2)}
              </div>
              <div>
                <p className="text-sm font-semibold">{blog.author}</p>
                <div className="flex items-center gap-2 text-xs text-muted-foreground">
                  <span className="flex items-center gap-1">
                    <Calendar className="size-3" />
                    {formatDate(blog.createdAt)}
                  </span>
                  <span className="size-1 rounded-full bg-border" />
                  <span className="flex items-center gap-1">
                    <Clock className="size-3" />
                    {getReadTime(blog.content)} min read
                  </span>
                </div>
              </div>
            </div>

            {/* Share buttons */}
            <div className="flex items-center gap-1">
              <span className="mr-1 text-[10px] font-medium uppercase tracking-wider text-muted-foreground/50">
                Share
              </span>
              <Button
                variant="ghost"
                size="icon"
                className="h-8 w-8 rounded-full"
                onClick={() => handleShare('twitter')}
                title="Share on Twitter"
              >
                <Twitter className="size-3.5" />
              </Button>
              <Button
                variant="ghost"
                size="icon"
                className="h-8 w-8 rounded-full"
                onClick={() => handleShare('linkedin')}
                title="Share on LinkedIn"
              >
                <Linkedin className="size-3.5" />
              </Button>
              <Button
                variant="ghost"
                size="icon"
                className="h-8 w-8 rounded-full"
                onClick={() => handleShare('copy')}
                title="Copy link"
              >
                {copied ? (
                  <Check className="size-3.5 text-green-500" />
                ) : (
                  <LinkIcon className="size-3.5" />
                )}
              </Button>
            </div>
          </div>
        </motion.header>

        {/* Divider */}
        <div className="mb-8 h-px bg-gradient-to-r from-transparent via-border to-transparent sm:mb-10" />

        {/* Content */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.15 }}
          className="prose-container max-w-none"
          dangerouslySetInnerHTML={{ __html: blog.content }}
        />

        {/* Bottom divider */}
        <div className="my-10 h-px bg-gradient-to-r from-transparent via-border to-transparent sm:my-12" />

        {/* Author card */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="mb-10 rounded-2xl border border-border/40 bg-gradient-to-br from-primary/5 via-card/50 to-card/50 p-5 backdrop-blur-sm sm:p-6"
        >
          <div className="flex items-start gap-4">
            <div className="flex size-14 shrink-0 items-center justify-center rounded-full bg-primary/10 text-lg font-bold text-primary">
              {blog.author
                .split(' ')
                .map((n) => n[0])
                .join('')
                .slice(0, 2)}
            </div>
            <div>
              <p className="mb-0.5 text-sm font-semibold">{blog.author}</p>
              <p className="text-xs text-muted-foreground">
                Helping exporters, importers, and businesses build powerful digital presence and streamline international trade operations.
              </p>
            </div>
          </div>
        </motion.div>

        {/* Related Posts */}
        {relatedPosts.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.25 }}
            className="mb-10"
          >
            <h3
              className="mb-4 text-lg font-bold tracking-tight sm:text-xl"
              style={{ fontFamily: 'var(--font-geist-mono)' }}
            >
              Related <span className="gradient-text">Articles</span>
            </h3>
            <div className="grid gap-4 sm:grid-cols-2">
              {relatedPosts.map((post) => (
                <Link key={post.id} href={`/blog/${post.slug}`} className="group">
                  <div className="overflow-hidden rounded-xl border border-border/40 bg-card/50 p-4 transition-all duration-300 hover:border-primary/30 hover:shadow-lg hover:shadow-primary/5">
                    <div className="mb-2 flex flex-wrap gap-1">
                      {post.tags?.split(',').slice(0, 2).map((tag) => (
                        <span
                          key={tag.trim()}
                          className="rounded-full bg-primary/5 px-2 py-0.5 text-[10px] font-medium text-primary/70"
                        >
                          {tag.trim()}
                        </span>
                      ))}
                    </div>
                    <h4 className="mb-1.5 text-sm font-bold leading-snug transition-colors group-hover:text-primary">
                      {post.title}
                    </h4>
                    <p className="line-clamp-2 text-xs text-muted-foreground">
                      {post.excerpt}
                    </p>
                    <div className="mt-3 flex items-center gap-1.5 text-xs font-semibold text-primary transition-all group-hover:gap-2.5">
                      Read
                      <ArrowRight className="size-3 transition-transform group-hover:translate-x-0.5" />
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </motion.div>
        )}

        {/* Bottom navigation */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between"
        >
          <Button asChild variant="outline" className="gap-2">
            <Link href="/blog">
              <ArrowLeft className="size-4" />
              Back to Blog
            </Link>
          </Button>

          <Button asChild className="gap-2 bg-primary text-primary-foreground shadow-lg shadow-primary/15">
            <Link href="/contact">
              Get in Touch
              <ArrowRight className="size-4" />
            </Link>
          </Button>
        </motion.div>
      </article>

      {/* Prose Styles for rendered HTML content */}
      <style jsx global>{`
        .prose-container h1 {
          font-size: 1.75rem;
          font-weight: 700;
          margin-top: 2.5rem;
          margin-bottom: 0.75rem;
          line-height: 1.25;
          color: var(--foreground);
          font-family: var(--font-geist-mono);
          letter-spacing: -0.01em;
        }
        .prose-container h2 {
          font-size: 1.5rem;
          font-weight: 700;
          margin-top: 2rem;
          margin-bottom: 0.75rem;
          line-height: 1.3;
          color: var(--foreground);
          font-family: var(--font-geist-mono);
          letter-spacing: -0.01em;
          padding-bottom: 0.5rem;
          border-bottom: 1px solid color-mix(in srgb, var(--border) 50%, transparent);
        }
        .prose-container h3 {
          font-size: 1.2rem;
          font-weight: 600;
          margin-top: 1.75rem;
          margin-bottom: 0.5rem;
          line-height: 1.4;
          color: var(--foreground);
        }
        .prose-container h4 {
          font-size: 1.05rem;
          font-weight: 600;
          margin-top: 1.5rem;
          margin-bottom: 0.5rem;
          line-height: 1.4;
          color: var(--foreground);
        }
        .prose-container p {
          margin-bottom: 1.1rem;
          line-height: 1.85;
          color: color-mix(in srgb, var(--foreground) 75%, transparent);
          font-size: 0.9375rem;
        }
        .prose-container ul,
        .prose-container ol {
          padding-left: 1.5rem;
          margin-bottom: 1.1rem;
          margin-top: 0.5rem;
        }
        .prose-container ul {
          list-style-type: none;
        }
        .prose-container ul li {
          position: relative;
          padding-left: 0;
        }
        .prose-container ul li::before {
          content: '';
          position: absolute;
          left: -1rem;
          top: 0.55em;
          width: 5px;
          height: 5px;
          border-radius: 50%;
          background: var(--primary);
          opacity: 0.6;
        }
        .prose-container ol {
          list-style-type: decimal;
          counter-reset: item;
        }
        .prose-container ol li {
          position: relative;
          padding-left: 0.25rem;
        }
        .prose-container li {
          margin-bottom: 0.4rem;
          line-height: 1.8;
          color: color-mix(in srgb, var(--foreground) 70%, transparent);
          font-size: 0.9375rem;
        }
        .prose-container li strong {
          color: var(--foreground);
          font-weight: 600;
        }
        .prose-container blockquote {
          border-left: 3px solid var(--primary);
          padding: 0.75rem 1rem;
          margin: 1.5rem 0;
          border-radius: 0 0.5rem 0.5rem 0;
          background: color-mix(in srgb, var(--primary) 5%, transparent);
          font-style: italic;
          color: var(--muted-foreground);
        }
        .prose-container blockquote p {
          margin-bottom: 0;
        }
        .prose-container hr {
          border: none;
          border-top: 1px solid var(--border);
          margin: 2.5rem 0;
        }
        .prose-container code {
          background: color-mix(in srgb, var(--muted) 80%, transparent);
          border: 1px solid var(--border);
          border-radius: 0.3rem;
          padding: 0.1rem 0.4rem;
          font-size: 0.85em;
          font-family: var(--font-geist-mono), monospace;
        }
        .prose-container a {
          color: var(--primary);
          text-decoration: underline;
          text-underline-offset: 3px;
          text-decoration-color: color-mix(in srgb, var(--primary) 40%, transparent);
          transition: text-decoration-color 0.2s;
        }
        .prose-container a:hover {
          text-decoration-color: var(--primary);
        }
        .prose-container img {
          max-width: 100%;
          height: auto;
          border-radius: 0.75rem;
          margin: 2rem 0;
          border: 1px solid var(--border);
        }
        .prose-container strong {
          color: var(--foreground);
          font-weight: 600;
        }
        .prose-container em {
          font-style: italic;
        }
        .prose-container mark {
          background-color: color-mix(in srgb, var(--primary) 25%, transparent);
          border-radius: 0.2rem;
          padding: 0.1rem 0.15rem;
        }
      `}</style>
    </div>
  );
}
