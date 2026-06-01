'use client';

import { useState, useEffect, useCallback } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import {
  ArrowLeft,
  Plus,
  Pencil,
  Trash2,
  Eye,
  EyeOff,
  Save,
  Loader2,
  BookOpen,
  ExternalLink,
  FileText,
  CheckCircle2,
  CircleDot,
  GripVertical,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogClose,
} from '@/components/ui/dialog';
import TipTapEditor from '@/components/tiptap-editor';

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
    month: 'short',
    day: 'numeric',
  });
};

function generateSlug(title: string): string {
  return title
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .trim();
}

const emptyPost = {
  title: '',
  slug: '',
  excerpt: '',
  content: '',
  coverImage: '',
  author: 'Unnat Vega',
  tags: '',
  published: false,
};

/* ─────────────── Stats Card ─────────────── */
function StatCard({
  icon: Icon,
  label,
  value,
  color,
}: {
  icon: React.ComponentType<{ className?: string }>;
  label: string;
  value: number;
  color: string;
}) {
  return (
    <Card className="border-border/40 bg-card/50 backdrop-blur-sm">
      <CardContent className="flex items-center gap-3 p-4">
        <div className={`flex size-10 items-center justify-center rounded-xl ${color}`}>
          <Icon className="size-5" />
        </div>
        <div>
          <p className="text-2xl font-bold tracking-tight">{value}</p>
          <p className="text-[11px] text-muted-foreground">{label}</p>
        </div>
      </CardContent>
    </Card>
  );
}

/* ─────────────── Main Component ─────────────── */
export default function BlogAdminPage() {
  const [blogs, setBlogs] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [editingPost, setEditingPost] = useState<BlogPost | null>(null);
  const [formData, setFormData] = useState(emptyPost);
  const [saving, setSaving] = useState(false);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [deletingSlug, setDeletingSlug] = useState<string | null>(null);
  const [showEditor, setShowEditor] = useState(false);

  const fetchBlogs = useCallback(async () => {
    try {
      const res = await fetch('/api/blog?all=true');
      if (!res.ok) throw new Error('Failed to fetch');
      const data = await res.json();
      setBlogs(data);
    } catch (err) {
      console.error('Error fetching blogs:', err);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchBlogs();
  }, [fetchBlogs]);

  const handleNewPost = () => {
    setEditingPost(null);
    setFormData(emptyPost);
    setShowEditor(true);
  };

  const handleEditPost = (post: BlogPost) => {
    setEditingPost(post);
    setFormData({
      title: post.title,
      slug: post.slug,
      excerpt: post.excerpt || '',
      content: post.content,
      coverImage: post.coverImage || '',
      author: post.author,
      tags: post.tags || '',
      published: post.published,
    });
    setShowEditor(true);
  };

  const handleSave = async () => {
    if (!formData.title || !formData.content) return;

    setSaving(true);
    try {
      const payload = {
        ...formData,
        slug: formData.slug || generateSlug(formData.title),
        excerpt: formData.excerpt || null,
        coverImage: formData.coverImage || null,
        tags: formData.tags || null,
      };

      if (editingPost) {
        const res = await fetch(`/api/blog/${editingPost.slug}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload),
        });
        if (!res.ok) throw new Error('Failed to update');
      } else {
        const res = await fetch('/api/blog', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload),
        });
        if (!res.ok) throw new Error('Failed to create');
      }

      setShowEditor(false);
      setEditingPost(null);
      setFormData(emptyPost);
      fetchBlogs();
    } catch (err) {
      console.error('Error saving blog:', err);
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async () => {
    if (!deletingSlug) return;

    try {
      const res = await fetch(`/api/blog/${deletingSlug}`, {
        method: 'DELETE',
      });
      if (!res.ok) throw new Error('Failed to delete');
      fetchBlogs();
    } catch (err) {
      console.error('Error deleting blog:', err);
    } finally {
      setDeletingSlug(null);
      setDeleteDialogOpen(false);
    }
  };

  const handleTogglePublish = async (post: BlogPost) => {
    try {
      const res = await fetch(`/api/blog/${post.slug}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ published: !post.published }),
      });
      if (!res.ok) throw new Error('Failed to update');
      fetchBlogs();
    } catch (err) {
      console.error('Error toggling publish:', err);
    }
  };

  const publishedCount = blogs.filter((b) => b.published).length;
  const draftCount = blogs.filter((b) => !b.published).length;

  // ─── Editor View ───
  if (showEditor) {
    return (
      <div className="min-h-screen pt-16">
        <div className="mx-auto max-w-4xl px-4 py-6 sm:py-8">
          {/* Editor Header */}
          <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <Button
              variant="ghost"
              className="w-fit gap-2 text-muted-foreground"
              onClick={() => {
                setShowEditor(false);
                setEditingPost(null);
                setFormData(emptyPost);
              }}
            >
              <ArrowLeft className="size-4" />
              Back to Posts
            </Button>
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-2 rounded-full border border-border/50 bg-muted/30 px-3 py-1.5">
                <Switch
                  checked={formData.published}
                  onCheckedChange={(checked) =>
                    setFormData({ ...formData, published: checked })
                  }
                  className="scale-75"
                />
                <Label className="cursor-pointer text-xs font-medium">
                  {formData.published ? 'Published' : 'Draft'}
                </Label>
              </div>
              <Button
                onClick={handleSave}
                disabled={saving || !formData.title || !formData.content}
                className="gap-2 bg-primary text-primary-foreground shadow-lg shadow-primary/15"
              >
                {saving ? (
                  <Loader2 className="size-4 animate-spin" />
                ) : (
                  <Save className="size-4" />
                )}
                {editingPost ? 'Update Post' : 'Publish Post'}
              </Button>
            </div>
          </div>

          {/* Editor Form */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className="space-y-5"
          >
            {/* Title Input */}
            <div className="rounded-xl border border-border/40 bg-card/50 p-1 backdrop-blur-sm">
              <Input
                placeholder="Your blog post title..."
                value={formData.title}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    title: e.target.value,
                    slug: editingPost ? formData.slug : generateSlug(e.target.value),
                  })
                }
                className="h-14 border-0 bg-transparent px-4 text-lg font-bold shadow-none placeholder:text-muted-foreground/30 placeholder:font-normal focus-visible:ring-0"
              />
            </div>

            {/* Slug */}
            <div className="flex items-center gap-2 px-1">
              <Label className="text-[10px] font-medium uppercase tracking-wider text-muted-foreground/60">Slug</Label>
              <Input
                placeholder="post-url-slug"
                value={formData.slug}
                onChange={(e) =>
                  setFormData({ ...formData, slug: e.target.value })
                }
                className="h-7 border-0 bg-muted/30 px-2.5 text-xs font-mono shadow-none focus-visible:ring-1 focus-visible:ring-primary"
              />
            </div>

            {/* Meta row */}
            <div className="grid gap-4 sm:grid-cols-2">
              <div>
                <Label className="mb-1.5 block text-[10px] font-medium uppercase tracking-wider text-muted-foreground/60">
                  Excerpt
                </Label>
                <Textarea
                  placeholder="Brief description of the article..."
                  value={formData.excerpt}
                  onChange={(e) =>
                    setFormData({ ...formData, excerpt: e.target.value })
                  }
                  rows={3}
                  className="resize-none border-border/40 bg-muted/20 text-sm focus-visible:ring-1 focus-visible:ring-primary"
                />
              </div>
              <div className="space-y-4">
                <div>
                  <Label className="mb-1.5 block text-[10px] font-medium uppercase tracking-wider text-muted-foreground/60">
                    Cover Image URL
                  </Label>
                  <Input
                    placeholder="https://example.com/image.jpg"
                    value={formData.coverImage}
                    onChange={(e) =>
                      setFormData({ ...formData, coverImage: e.target.value })
                    }
                    className="h-9 border-border/40 bg-muted/20 text-xs focus-visible:ring-1 focus-visible:ring-primary"
                  />
                </div>
                <div>
                  <Label className="mb-1.5 block text-[10px] font-medium uppercase tracking-wider text-muted-foreground/60">
                    Author
                  </Label>
                  <Input
                    placeholder="Author name"
                    value={formData.author}
                    onChange={(e) =>
                      setFormData({ ...formData, author: e.target.value })
                    }
                    className="h-9 border-border/40 bg-muted/20 text-xs focus-visible:ring-1 focus-visible:ring-primary"
                  />
                </div>
              </div>
            </div>

            {/* Tags */}
            <div>
              <Label className="mb-1.5 block text-[10px] font-medium uppercase tracking-wider text-muted-foreground/60">
                Tags (comma-separated)
              </Label>
              <Input
                placeholder="export, import, trade, compliance"
                value={formData.tags}
                onChange={(e) =>
                  setFormData({ ...formData, tags: e.target.value })
                }
                className="h-9 border-border/40 bg-muted/20 text-xs focus-visible:ring-1 focus-visible:ring-primary"
              />
            </div>

            {/* TipTap Editor */}
            <div>
              <Label className="mb-2 block text-[10px] font-medium uppercase tracking-wider text-muted-foreground/60">
                Content
              </Label>
              <TipTapEditor
                content={formData.content}
                onChange={(html) => setFormData({ ...formData, content: html })}
                placeholder="Start writing your blog post..."
              />
            </div>
          </motion.div>
        </div>
      </div>
    );
  }

  // ─── List View ───
  return (
    <div className="min-h-screen pt-16">
      <div className="mx-auto max-w-5xl px-4 py-8 sm:py-12">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between"
        >
          <div>
            <h1
              className="text-2xl font-bold tracking-tight sm:text-3xl"
              style={{ fontFamily: 'var(--font-geist-mono)' }}
            >
              Blog <span className="gradient-text">Admin</span>
            </h1>
            <p className="mt-1 text-sm text-muted-foreground">
              Create, edit, and manage your blog posts
            </p>
          </div>
          <div className="flex items-center gap-2">
            <Button asChild variant="outline" className="gap-1.5 text-xs">
              <Link href="/blog">
                <ExternalLink className="size-3.5" />
                View Blog
              </Link>
            </Button>
            <Button
              onClick={handleNewPost}
              className="gap-1.5 bg-primary text-primary-foreground shadow-lg shadow-primary/15"
            >
              <Plus className="size-4" />
              New Post
            </Button>
          </div>
        </motion.div>

        {/* Stats */}
        {!loading && blogs.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.1 }}
            className="mb-6 grid grid-cols-3 gap-3 sm:gap-4"
          >
            <StatCard
              icon={FileText}
              label="Total Posts"
              value={blogs.length}
              color="bg-primary/10 text-primary"
            />
            <StatCard
              icon={CheckCircle2}
              label="Published"
              value={publishedCount}
              color="bg-green-500/10 text-green-600 dark:text-green-400"
            />
            <StatCard
              icon={CircleDot}
              label="Drafts"
              value={draftCount}
              color="bg-yellow-500/10 text-yellow-600 dark:text-yellow-400"
            />
          </motion.div>
        )}

        {/* Posts List */}
        {loading ? (
          <div className="space-y-3">
            {[1, 2, 3].map((i) => (
              <Card key={i} className="animate-pulse border-border/40">
                <CardContent className="p-4">
                  <div className="flex items-center gap-4">
                    <div className="h-10 w-10 rounded-xl bg-muted/50" />
                    <div className="flex-1 space-y-2">
                      <div className="h-4 w-1/2 rounded bg-muted/50" />
                      <div className="h-3 w-1/4 rounded bg-muted/30" />
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        ) : blogs.length === 0 ? (
          <div className="py-24 text-center">
            <div className="mx-auto mb-5 flex size-16 items-center justify-center rounded-2xl border border-border/40 bg-muted/20">
              <BookOpen className="size-7 text-muted-foreground/25" />
            </div>
            <h3 className="mb-2 text-lg font-semibold">No blog posts yet</h3>
            <p className="mb-6 text-sm text-muted-foreground">
              Create your first blog post to get started.
            </p>
            <Button onClick={handleNewPost} className="gap-2 bg-primary text-primary-foreground shadow-lg shadow-primary/15">
              <Plus className="size-4" />
              Create First Post
            </Button>
          </div>
        ) : (
          <div className="space-y-2.5">
            {blogs.map((blog, index) => (
              <motion.div
                key={blog.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: index * 0.04 }}
              >
                <Card className="border-border/40 bg-card/50 backdrop-blur-sm transition-all duration-200 hover:border-primary/15 hover:shadow-sm">
                  <CardContent className="p-3.5 sm:p-4">
                    <div className="flex items-center gap-3 sm:gap-4">
                      {/* Status indicator */}
                      <div className="flex flex-col items-center gap-1.5">
                        <div
                          className={`size-2.5 rounded-full transition-colors ${
                            blog.published
                              ? 'bg-green-500 shadow-sm shadow-green-500/30'
                              : 'bg-yellow-500 shadow-sm shadow-yellow-500/30'
                          }`}
                          title={blog.published ? 'Published' : 'Draft'}
                        />
                      </div>

                      {/* Content */}
                      <div className="min-w-0 flex-1">
                        <div className="flex items-start justify-between gap-3">
                          <div className="min-w-0 flex-1">
                            <h3 className="truncate text-sm font-semibold">
                              {blog.title}
                            </h3>
                            <div className="mt-0.5 flex flex-wrap items-center gap-1.5 text-[11px] text-muted-foreground">
                              <span className="font-mono text-muted-foreground/50">/{blog.slug.slice(0, 30)}{blog.slug.length > 30 ? '...' : ''}</span>
                              <span className="text-muted-foreground/30">·</span>
                              <span>{formatDate(blog.createdAt)}</span>
                            </div>
                            {blog.tags && (
                              <div className="mt-1.5 flex flex-wrap gap-1">
                                {blog.tags.split(',').slice(0, 3).map((tag) => (
                                  <span
                                    key={tag.trim()}
                                    className="rounded-full bg-primary/5 px-1.5 py-0.5 text-[9px] font-medium text-primary/70"
                                  >
                                    {tag.trim()}
                                  </span>
                                ))}
                              </div>
                            )}
                          </div>

                          {/* Actions */}
                          <div className="flex shrink-0 items-center gap-0.5">
                            <Button
                              variant="ghost"
                              size="icon"
                              className="h-8 w-8"
                              onClick={() => handleTogglePublish(blog)}
                              title={blog.published ? 'Unpublish' : 'Publish'}
                            >
                              {blog.published ? (
                                <Eye className="size-3.5 text-green-500" />
                              ) : (
                                <EyeOff className="size-3.5 text-yellow-500" />
                              )}
                            </Button>
                            <Button
                              variant="ghost"
                              size="icon"
                              className="h-8 w-8"
                              onClick={() => handleEditPost(blog)}
                              title="Edit"
                            >
                              <Pencil className="size-3.5" />
                            </Button>
                            {blog.published && (
                              <Button
                                variant="ghost"
                                size="icon"
                                className="h-8 w-8"
                                asChild
                                title="View post"
                              >
                                <Link href={`/blog/${blog.slug}`}>
                                  <ExternalLink className="size-3.5" />
                                </Link>
                              </Button>
                            )}
                            <Button
                              variant="ghost"
                              size="icon"
                              className="h-8 w-8 text-destructive/60 hover:text-destructive"
                              onClick={() => {
                                setDeletingSlug(blog.slug);
                                setDeleteDialogOpen(true);
                              }}
                              title="Delete"
                            >
                              <Trash2 className="size-3.5" />
                            </Button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        )}
      </div>

      {/* Delete Confirmation Dialog */}
      <Dialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Delete Blog Post</DialogTitle>
          </DialogHeader>
          <p className="text-sm text-muted-foreground">
            Are you sure you want to delete this blog post? This action cannot be undone.
          </p>
          <DialogFooter className="gap-2">
            <DialogClose asChild>
              <Button variant="outline">Cancel</Button>
            </DialogClose>
            <Button variant="destructive" onClick={handleDelete}>
              Delete
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
