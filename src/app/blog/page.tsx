'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import {
  Calendar,
  Clock,
  ArrowRight,
  BookOpen,
  Search,
  Tag,
  User,
  PenTool,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import {
  fadeInUp,
  staggerContainer,
} from '@/lib/animations';

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
    month: 'long',
    day: 'numeric',
  });
};

const getReadTime = (excerpt: string | null) => {
  const words = excerpt?.split(' ').length || 0;
  return Math.max(3, Math.ceil(words / 200) + 4);
};

const tagColors: Record<string, string> = {
  export: 'bg-green-500/10 text-green-600 dark:text-green-400',
  'india trade': 'bg-orange-500/10 text-orange-600 dark:text-orange-400',
  'international business': 'bg-blue-500/10 text-blue-600 dark:text-blue-400',
  compliance: 'bg-red-500/10 text-red-600 dark:text-red-400',
  'digital presence': 'bg-purple-500/10 text-purple-600 dark:text-purple-400',
  'digital transformation': 'bg-violet-500/10 text-violet-600 dark:text-violet-400',
  technology: 'bg-cyan-500/10 text-cyan-600 dark:text-cyan-400',
  AI: 'bg-pink-500/10 text-pink-600 dark:text-pink-400',
  blockchain: 'bg-indigo-500/10 text-indigo-600 dark:text-indigo-400',
  'trade analytics': 'bg-teal-500/10 text-teal-600 dark:text-teal-400',
  'import export': 'bg-amber-500/10 text-amber-600 dark:text-amber-400',
  'HS codes': 'bg-lime-500/10 text-lime-600 dark:text-lime-400',
  documentation: 'bg-sky-500/10 text-sky-600 dark:text-sky-400',
  FTAs: 'bg-rose-500/10 text-rose-600 dark:text-rose-400',
  'trade regulations': 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400',
};

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
  ).slice(0, 8);

  return (
    <div className="min-h-screen pt-20">
      {/* Hero Header */}
      <section className="relative overflow-hidden px-4 py-16 sm:py-20 md:py-28">
        {/* Background decorations */}
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute -left-32 top-1/4 size-[400px] rounded-full bg-primary/8 blur-[150px]" />
          <div className="absolute -right-32 bottom-1/4 size-[300px] rounded-full bg-primary/6 blur-[120px]" />
        </div>

        <motion.div
          initial="hidden"
          animate="visible"
          variants={staggerContainer}
          className="relative mx-auto max-w-4xl text-center"
        >
          <motion.div variants={fadeInUp} className="mb-4 flex items-center justify-center gap-2">
            <div className="flex items-center gap-2 rounded-full border border-primary/20 bg-primary/5 px-4 py-1.5">
              <BookOpen className="size-4 text-primary" />
              <span className="text-xs font-medium text-primary sm:text-sm">Our Blog</span>
            </div>
          </motion.div>

          <motion.h1
            variants={fadeInUp}
            className="text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl lg:text-6xl"
            style={{ fontFamily: 'var(--font-geist-mono)' }}
          >
            Insights &{' '}
            <span className="gradient-text">Resources</span>
          </motion.h1>

          <motion.p
            variants={fadeInUp}
            className="mx-auto mt-4 max-w-2xl text-sm text-muted-foreground sm:mt-6 sm:text-base md:text-lg"
          >
            Stay ahead in international trade with expert insights, compliance guides,
            and digital strategy tips from the Unnat Vega team.
          </motion.p>

          {/* Search Bar */}
          <motion.div variants={fadeInUp} className="mx-auto mt-6 max-w-xl sm:mt-8">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                type="text"
                placeholder="Search articles..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="h-11 pl-10 pr-4 text-sm sm:h-12 sm:text-base"
              />
            </div>
          </motion.div>
        </motion.div>
      </section>

      {/* Tags Filter */}
      {allTags.length > 0 && (
        <section className="px-4 pb-8">
          <div className="mx-auto max-w-6xl">
            <div className="flex flex-wrap items-center gap-2">
              <Tag className="size-4 text-muted-foreground" />
              <button
                onClick={() => setSelectedTag(null)}
                className={`rounded-full px-3 py-1 text-xs font-medium transition-all duration-200 ${
                  !selectedTag
                    ? 'bg-primary text-primary-foreground'
                    : 'border border-border text-muted-foreground hover:border-primary/40 hover:text-foreground'
                }`}
              >
                All
              </button>
              {allTags.map((tag) => (
                <button
                  key={tag}
                  onClick={() =>
                    setSelectedTag(selectedTag === tag ? null : tag)
                  }
                  className={`rounded-full px-3 py-1 text-xs font-medium transition-all duration-200 ${
                    selectedTag === tag
                      ? 'bg-primary text-primary-foreground'
                      : 'border border-border text-muted-foreground hover:border-primary/40 hover:text-foreground'
                  }`}
                >
                  {tag}
                </button>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Blog Grid */}
      <section className="px-4 pb-16 md:pb-20">
        <div className="mx-auto max-w-6xl">
          {loading ? (
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {[1, 2, 3].map((i) => (
                <Card key={i} className="animate-pulse border-transparent">
                  <div className="h-48 rounded-t-lg bg-muted" />
                  <CardContent className="p-5">
                    <div className="mb-3 h-4 w-1/3 rounded bg-muted" />
                    <div className="mb-2 h-6 w-full rounded bg-muted" />
                    <div className="mb-1 h-4 w-full rounded bg-muted" />
                    <div className="mb-4 h-4 w-2/3 rounded bg-muted" />
                    <div className="h-8 w-28 rounded bg-muted" />
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : filteredBlogs.length === 0 ? (
            <div className="py-20 text-center">
              <BookOpen className="mx-auto mb-4 size-12 text-muted-foreground/40" />
              <h3 className="mb-2 text-lg font-semibold">No articles found</h3>
              <p className="text-sm text-muted-foreground">
                {searchQuery || selectedTag
                  ? 'Try adjusting your search or filter criteria.'
                  : 'Check back soon for new articles.'}
              </p>
              {(searchQuery || selectedTag) && (
                <Button
                  variant="outline"
                  className="mt-4"
                  onClick={() => {
                    setSearchQuery('');
                    setSelectedTag(null);
                  }}
                >
                  Clear Filters
                </Button>
              )}
            </div>
          ) : (
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {filteredBlogs.map((blog, index) => {
                const tags = blog.tags?.split(',').map((t) => t.trim()) || [];
                const isFeatured = index === 0 && !searchQuery && !selectedTag;

                return (
                  <motion.div
                    key={blog.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4, delay: index * 0.1 }}
                    className={isFeatured ? 'sm:col-span-2 lg:col-span-2' : ''}
                  >
                    <Link href={`/blog/${blog.slug}`} className="group block h-full">
                      <Card className="glass h-full overflow-hidden border-transparent transition-all duration-300 hover:-translate-y-1 hover:border-primary/40 hover:shadow-lg hover:shadow-primary/5">
                        {/* Cover Image */}
                        <div className={`relative overflow-hidden ${isFeatured ? 'h-56 sm:h-64' : 'h-44 sm:h-48'}`}>
                          <div className="absolute inset-0 bg-gradient-to-br from-primary/20 via-primary/5 to-transparent" />
                          <div className="flex size-full items-center justify-center bg-muted/50">
                            <BookOpen className="size-12 text-muted-foreground/20" />
                          </div>
                          {/* Gradient overlay at bottom */}
                          <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-transparent to-transparent" />
                          {/* Tags overlay */}
                          <div className="absolute bottom-3 left-3 flex flex-wrap gap-1">
                            {tags.slice(0, 3).map((tag) => (
                              <span
                                key={tag}
                                className={`rounded-full px-2 py-0.5 text-[10px] font-medium backdrop-blur-sm ${
                                  tagColors[tag] || 'bg-primary/10 text-primary'
                                }`}
                              >
                                {tag}
                              </span>
                            ))}
                          </div>
                        </div>

                        <CardContent className="p-4 sm:p-5">
                          {/* Meta info */}
                          <div className="mb-2 flex items-center gap-3 text-xs text-muted-foreground">
                            <span className="flex items-center gap-1">
                              <Calendar className="size-3" />
                              {formatDate(blog.createdAt)}
                            </span>
                            <span className="flex items-center gap-1">
                              <Clock className="size-3" />
                              {getReadTime(blog.excerpt)} min read
                            </span>
                          </div>

                          {/* Title */}
                          <h3
                            className={`mb-2 font-bold tracking-tight transition-colors duration-300 group-hover:text-primary ${
                              isFeatured
                                ? 'text-xl sm:text-2xl'
                                : 'text-base sm:text-lg'
                            }`}
                          >
                            {blog.title}
                          </h3>

                          {/* Excerpt */}
                          <p className="mb-4 line-clamp-2 text-sm text-muted-foreground">
                            {blog.excerpt}
                          </p>

                          {/* Footer */}
                          <div className="flex items-center justify-between">
                            <span className="flex items-center gap-1.5 text-xs text-muted-foreground">
                              <User className="size-3" />
                              {blog.author}
                            </span>
                            <span className="flex items-center gap-1 text-xs font-medium text-primary transition-all duration-300 group-hover:gap-2">
                              Read More
                              <ArrowRight className="size-3" />
                            </span>
                          </div>
                        </CardContent>
                      </Card>
                    </Link>
                  </motion.div>
                );
              })}
            </div>
          )}
        </div>
      </section>

      {/* Admin Link */}
      <div className="px-4 pb-12">
        <div className="mx-auto max-w-6xl text-center">
          <Link href="/blog/admin">
            <Button variant="outline" className="gap-2">
              <PenTool className="size-4" />
              Manage Blog Posts
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
