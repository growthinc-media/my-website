
'use client';

import { notFound, useParams } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { blogPosts } from '@/lib/placeholder-data';
import { Calendar, User, ArrowRight } from 'lucide-react';
import { Separator } from '@/components/ui/separator';
import { Badge } from '@/components/ui/badge';
import ReactMarkdown from 'react-markdown';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { TableOfContents } from '@/components/ui/table-of-contents';
import { motion } from 'framer-motion';
import { useMemo } from 'react';


export default function BlogPostPage() {
  const params = useParams();
  const slug = params.slug as string;
  
  const post = useMemo(() => blogPosts.find((p) => p.slug === slug), [slug]);

  if (!post) {
    notFound();
  }

  const sectionVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.4, ease: 'easeOut' } },
  };

  return (
    <motion.article 
      className="bg-secondary/50"
      initial="hidden"
      animate="visible"
      variants={sectionVariants}
    >
      <div className="relative h-[40vh] min-h-[300px] w-full">
        <Image
          src={post.imageUrl}
          alt={post.title}
          data-ai-hint={post.aiHint}
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/50 to-transparent" />
        <div className="absolute bottom-0 z-10 w-full">
            <div className="container mx-auto max-w-5xl px-4 pb-8 md:pb-12">
                <Badge variant="secondary" className="mb-2 bg-black/20 text-white backdrop-blur-sm">{post.category}</Badge>
                <h1 className="font-headline text-3xl font-bold text-white md:text-5xl">{post.title}</h1>
                <div className="mt-4 flex flex-wrap items-center gap-y-2 gap-x-4 text-sm text-white/80">
                    <div className="flex items-center">
                    <User className="mr-2 h-4 w-4" />
                    <span>{post.author}</span>
                    </div>
                    <Separator orientation="vertical" className="h-4 bg-white/50 hidden sm:block" />
                    <div className="flex items-center">
                    <Calendar className="mr-2 h-4 w-4" />
                    <time dateTime={post.date}>
                        {new Date(post.date).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
                    </time>
                    </div>
                </div>
            </div>
        </div>
      </div>

      <div className="container mx-auto max-w-5xl px-4 py-12">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-3">
          <div className="prose max-w-none text-foreground prose-headings:font-headline prose-headings:text-foreground prose-a:text-primary hover:prose-a:text-accent prose-headings:font-bold prose-h2:text-2xl prose-h3:text-xl prose-h4:text-lg lg:col-span-2">
            <p className="lead text-lg text-muted-foreground">{post.excerpt}</p>
            <ReactMarkdown>{post.content}</ReactMarkdown>
          </div>

          <aside className="lg:col-span-1">
            <div className="sticky top-24 space-y-8">
              {post.toc && post.toc.length > 0 && (
                <Card>
                  <CardHeader>
                    <CardTitle className="font-headline text-xl">Table of Contents</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <TableOfContents items={post.toc} />
                  </CardContent>
                </Card>
              )}

              <Card className="bg-primary text-primary-foreground">
                <CardHeader>
                  <CardTitle className="font-headline text-xl">Ready to Grow?</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="opacity-90 text-sm">
                    Let us help you achieve your marketing goals. Get in touch for a free consultation.
                  </p>
                  <Button asChild className="mt-6 w-full bg-accent text-accent-foreground hover:bg-accent/90">
                    <Link href="/contact">
                      Book a Strategy Call <ArrowRight className="ml-2 h-4 w-4" />
                    </Link>
                  </Button>
                </CardContent>
              </Card>
            </div>
          </aside>
        </div>
      </div>
    </motion.article>
  );
}
