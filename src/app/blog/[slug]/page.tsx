'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import { motion } from 'framer-motion';
import {
  ArrowLeft,
  Calendar,
  Clock,
  User,
  Tag,
  Share2,
  BookOpen,
  ChevronRight,
  Facebook,
  Twitter,
  Linkedin,
  Link as LinkIcon,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { fadeInUp, staggerContainer } from '@/lib/animations';

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
  // Strip HTML tags for word count
  const text = content.replace(/<[^>]*>/g, '');
  const words = text.split(/\s+/).length;
  return Math.max(3, Math.ceil(words / 200));
};

export default function BlogPostPage() {
  const params = useParams();
  const slug = params.slug as string;
  const [blog, setBlog] = useState<BlogPost | null>(null);
  const [loading, setLoading] = useState(true);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    async function fetchBlog() {
      try {
        const res = await fetch(`/api/blog/${slug}`);
        if (!res.ok) throw new Error('Blog not found');
        const data = await res.json();
        setBlog(data);
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
      facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`,
      linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`,
    };

    if (shareUrls[platform]) {
      window.open(shareUrls[platform], '_blank', 'width=600,height=400');
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen pt-20">
        <div className="mx-auto max-w-3xl px-4 py-12">
          <div className="animate-pulse space-y-4">
            <div className="h-6 w-32 rounded bg-muted" />
            <div className="h-10 w-3/4 rounded bg-muted" />
            <div className="flex gap-3">
              <div className="h-4 w-24 rounded bg-muted" />
              <div className="h-4 w-20 rounded bg-muted" />
              <div className="h-4 w-24 rounded bg-muted" />
            </div>
            <div className="mt-8 space-y-3">
              <div className="h-4 w-full rounded bg-muted" />
              <div className="h-4 w-full rounded bg-muted" />
              <div className="h-4 w-2/3 rounded bg-muted" />
              <div className="h-4 w-full rounded bg-muted" />
              <div className="h-4 w-5/6 rounded bg-muted" />
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (!blog) {
    return (
      <div className="min-h-screen pt-20">
        <div className="mx-auto max-w-3xl px-4 py-20 text-center">
          <BookOpen className="mx-auto mb-4 size-16 text-muted-foreground/30" />
          <h1 className="mb-3 text-2xl font-bold">Post Not Found</h1>
          <p className="mb-6 text-muted-foreground">
            The blog post you&apos;re looking for doesn&apos;t exist or may have been removed.
          </p>
          <Button asChild>
            <Link href="/blog">
              <ArrowLeft className="mr-2 size-4" />
              Back to Blog
            </Link>
          </Button>
        </div>
      </div>
    );
  }

  const tags = blog.tags?.split(',').map((t) => t.trim()) || [];

  return (
    <div className="min-h-screen pt-20">
      <motion.article
        initial="hidden"
        animate="visible"
        variants={staggerContainer}
        className="mx-auto max-w-3xl px-4 py-8 sm:py-12"
      >
        {/* Breadcrumb */}
        <motion.nav variants={fadeInUp} className="mb-6 flex items-center gap-1.5 text-sm text-muted-foreground">
          <Link href="/" className="transition-colors hover:text-foreground">
            Home
          </Link>
          <ChevronRight className="size-3.5" />
          <Link href="/blog" className="transition-colors hover:text-foreground">
            Blog
          </Link>
          <ChevronRight className="size-3.5" />
          <span className="truncate text-foreground">{blog.title}</span>
        </motion.nav>

        {/* Header */}
        <motion.header variants={fadeInUp} className="mb-8">
          {/* Tags */}
          {tags.length > 0 && (
            <div className="mb-4 flex flex-wrap gap-2">
              {tags.map((tag) => (
                <Badge
                  key={tag}
                  variant="outline"
                  className="border-primary/20 bg-primary/5 text-xs text-primary"
                >
                  <Tag className="mr-1 size-3" />
                  {tag}
                </Badge>
              ))}
            </div>
          )}

          {/* Title */}
          <h1
            className="mb-4 text-2xl font-bold tracking-tight sm:text-3xl md:text-4xl lg:text-5xl"
            style={{ fontFamily: 'var(--font-geist-mono)' }}
          >
            {blog.title}
          </h1>

          {/* Excerpt */}
          {blog.excerpt && (
            <p className="mb-5 text-base text-muted-foreground sm:text-lg md:text-xl">
              {blog.excerpt}
            </p>
          )}

          {/* Meta row */}
          <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
            <span className="flex items-center gap-1.5">
              <User className="size-4" />
              {blog.author}
            </span>
            <span className="flex items-center gap-1.5">
              <Calendar className="size-4" />
              {formatDate(blog.createdAt)}
            </span>
            <span className="flex items-center gap-1.5">
              <Clock className="size-4" />
              {getReadTime(blog.content)} min read
            </span>
          </div>
        </motion.header>

        {/* Share Bar */}
        <motion.div
          variants={fadeInUp}
          className="mb-8 flex items-center gap-2 border-b border-border pb-4"
        >
          <Share2 className="size-4 text-muted-foreground" />
          <span className="text-xs font-medium text-muted-foreground">Share:</span>
          <Button
            variant="ghost"
            size="icon"
            className="h-8 w-8"
            onClick={() => handleShare('twitter')}
            title="Share on Twitter"
          >
            <Twitter className="size-4" />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            className="h-8 w-8"
            onClick={() => handleShare('facebook')}
            title="Share on Facebook"
          >
            <Facebook className="size-4" />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            className="h-8 w-8"
            onClick={() => handleShare('linkedin')}
            title="Share on LinkedIn"
          >
            <Linkedin className="size-4" />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            className="h-8 w-8"
            onClick={() => handleShare('copy')}
            title="Copy link"
          >
            <LinkIcon className="size-4" />
            {copied && (
              <span className="ml-1 text-xs text-primary">Copied!</span>
            )}
          </Button>
        </motion.div>

        {/* Content */}
        <motion.div
          variants={fadeInUp}
          className="prose-container max-w-none text-foreground/90"
          dangerouslySetInnerHTML={{ __html: blog.content }}
        />

        {/* Bottom navigation */}
        <motion.div
          variants={fadeInUp}
          className="mt-12 flex items-center justify-between border-t border-border pt-6"
        >
          <Button asChild variant="outline" className="gap-2">
            <Link href="/blog">
              <ArrowLeft className="size-4" />
              Back to Blog
            </Link>
          </Button>

          <Button asChild className="gap-2">
            <Link href="/contact">
              Get in Touch
            </Link>
          </Button>
        </motion.div>
      </motion.article>

      {/* Prose Styles for rendered HTML content */}
      <style jsx global>{`
        .prose-container h1 {
          font-size: 1.75rem;
          font-weight: 700;
          margin-top: 2rem;
          margin-bottom: 0.75rem;
          line-height: 1.3;
          color: var(--foreground);
          font-family: var(--font-geist-mono);
        }
        .prose-container h2 {
          font-size: 1.5rem;
          font-weight: 600;
          margin-top: 1.75rem;
          margin-bottom: 0.75rem;
          line-height: 1.35;
          color: var(--foreground);
          font-family: var(--font-geist-mono);
        }
        .prose-container h3 {
          font-size: 1.25rem;
          font-weight: 600;
          margin-top: 1.5rem;
          margin-bottom: 0.5rem;
          line-height: 1.4;
          color: var(--foreground);
        }
        .prose-container h4 {
          font-size: 1.1rem;
          font-weight: 600;
          margin-top: 1.25rem;
          margin-bottom: 0.5rem;
          line-height: 1.4;
          color: var(--foreground);
        }
        .prose-container p {
          margin-bottom: 1rem;
          line-height: 1.8;
          color: var(--muted-foreground);
          font-size: 0.9375rem;
        }
        .prose-container ul,
        .prose-container ol {
          padding-left: 1.5rem;
          margin-bottom: 1rem;
        }
        .prose-container ul {
          list-style-type: disc;
        }
        .prose-container ol {
          list-style-type: decimal;
        }
        .prose-container li {
          margin-bottom: 0.35rem;
          line-height: 1.75;
          color: var(--muted-foreground);
          font-size: 0.9375rem;
        }
        .prose-container li strong {
          color: var(--foreground);
        }
        .prose-container blockquote {
          border-left: 3px solid var(--primary);
          padding-left: 1rem;
          margin: 1.25rem 0;
          font-style: italic;
          color: var(--muted-foreground);
        }
        .prose-container hr {
          border-top: 1px solid var(--border);
          margin: 2rem 0;
        }
        .prose-container code {
          background: var(--muted);
          border-radius: 0.25rem;
          padding: 0.15rem 0.4rem;
          font-size: 0.85em;
        }
        .prose-container a {
          color: var(--primary);
          text-decoration: underline;
          text-underline-offset: 2px;
        }
        .prose-container a:hover {
          opacity: 0.8;
        }
        .prose-container img {
          max-width: 100%;
          height: auto;
          border-radius: 0.5rem;
          margin: 1.5rem 0;
        }
        .prose-container strong {
          color: var(--foreground);
          font-weight: 600;
        }
        .prose-container em {
          font-style: italic;
        }
        .prose-container mark {
          background-color: color-mix(in srgb, var(--primary) 30%, transparent);
          border-radius: 0.15rem;
          padding: 0.05rem 0;
        }
      `}</style>
    </div>
  );
}
