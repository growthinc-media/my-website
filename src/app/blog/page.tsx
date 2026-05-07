
'use client';

import Link from 'next/link';
import Image from 'next/image';
import { blogPosts } from '@/lib/placeholder-data';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ArrowRight, Calendar, Tag } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { motion } from 'framer-motion';

export default function BlogPage() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.08,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 10, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.4,
        ease: 'easeOut'
      }
    },
  };

  return (
    <motion.div 
      className="bg-background"
      initial="hidden"
      animate="visible"
      variants={containerVariants}
    >
      <div className="container mx-auto px-4 py-16 md:py-24">
        <motion.div className="text-center" variants={itemVariants}>
          <h1 className="font-headline text-4xl font-bold md:text-5xl">Growthincs Blog</h1>
          <p className="mx-auto mt-4 max-w-2xl text-base text-muted-foreground md:text-lg">
            Insights, strategies, and tips on digital marketing, growth, and technology.
          </p>
        </motion.div>

        <motion.div 
          className="mt-12 md:mt-16 grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
        >
          {blogPosts.map((post, index) => (
            <motion.div key={post.id} variants={itemVariants}>
              <Card className="group flex h-full flex-col overflow-hidden rounded-lg shadow-md transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl">
                <Link href={`/blog/${post.slug}`} className="block">
                  <div className="relative h-52 w-full overflow-hidden">
                    <Image
                      src={post.imageUrl}
                      alt={post.title}
                      data-ai-hint={post.aiHint}
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-110"
                      priority={index < 3}
                    />
                  </div>
                </Link>
                <CardHeader>
                  <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-sm text-muted-foreground">
                      <Badge variant="secondary" className="font-semibold">{post.category}</Badge>
                      <div className="flex items-center">
                          <Calendar className="mr-1.5 h-4 w-4" />
                          <time dateTime={post.date}>
                              {new Date(post.date).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
                          </time>
                      </div>
                  </div>
                  <CardTitle className="font-headline pt-2 text-xl">
                    <Link href={`/blog/${post.slug}`} className="hover:text-primary">
                      {post.title}
                    </Link>
                  </CardTitle>
                </CardHeader>
                <CardContent className="flex-grow">
                  <p className="text-muted-foreground line-clamp-3">{post.excerpt}</p>
                </CardContent>
                <CardFooter>
                  <Button asChild variant="link" className="p-0 font-semibold text-primary">
                    <Link href={`/blog/${post.slug}`}>
                      Read More <ArrowRight className="ml-2 h-4 w-4" />
                    </Link>
                  </Button>
                </CardFooter>
              </Card>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </motion.div>
  );
}
