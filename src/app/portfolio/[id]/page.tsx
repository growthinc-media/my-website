
'use client';

import { notFound, useParams } from 'next/navigation';
import Image from 'next/image';
import { portfolioItems } from '@/lib/placeholder-data';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { CheckCircle, Target, Zap, User, Briefcase, Calendar } from 'lucide-react';
import { motion } from 'framer-motion';
import { useMemo } from 'react';

export default function PortfolioItemPage() {
  const params = useParams();
  const id = params.id as string;
  
  const item = useMemo(() => portfolioItems.find((p) => String(p.id) === id), [id]);

  if (!item) {
    notFound();
  }
  
  const sectionVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: {
        duration: 0.4,
        ease: "easeOut",
      }
    },
  };

  return (
    <motion.article 
      className="bg-background"
      initial="hidden"
      animate="visible"
      variants={sectionVariants}
      viewport={{ once: true }}
    >
      {/* Hero Section */}
      <section className="relative h-[40vh] min-h-[300px] w-full md:h-[50vh]">
        <Image
          src={item.imageUrl}
          alt={item.title}
          data-ai-hint={item.aiHint}
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />
        <div className="absolute bottom-0 z-10 w-full">
          <div className="container mx-auto max-w-5xl px-4 pb-12 text-white">
            <Badge variant="secondary" className="mb-2 bg-black/20 text-white backdrop-blur-sm">
              {item.category}
            </Badge>
            <h1 className="font-headline text-3xl font-bold md:text-5xl">{item.title}</h1>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-16 md:py-24">
        <div className="container mx-auto grid max-w-5xl grid-cols-1 gap-12 px-4 lg:grid-cols-3">
          {/* Left Column - Details */}
          <aside className="lg:col-span-1">
            <Card className="sticky top-24 shadow-lg">
              <CardHeader>
                <CardTitle className="font-headline text-2xl">Project Details</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4 text-muted-foreground">
                <div className="flex items-start">
                  <User className="mr-3 mt-1 h-5 w-5 flex-shrink-0 text-primary" />
                  <div>
                    <span className="font-semibold text-foreground">Client</span>
                    <p>{item.company}</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <Briefcase className="mr-3 mt-1 h-5 w-5 flex-shrink-0 text-primary" />
                  <div>
                    <span className="font-semibold text-foreground">Services</span>
                    <p>{item.category}</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <Calendar className="mr-3 mt-1 h-5 w-5 flex-shrink-0 text-primary" />
                  <div>
                    <span className="font-semibold text-foreground">Timeline</span>
                    <p>6 Months</p> {/* Example timeline */}
                  </div>
                </div>
              </CardContent>
            </Card>
          </aside>

          {/* Right Column - Narrative */}
          <div className="prose prose-lg max-w-none text-foreground prose-headings:font-headline prose-headings:text-foreground prose-a:text-primary hover:prose-a:text-accent lg:col-span-2">
            <h2 className="font-headline">Project Overview</h2>
            <p className="text-muted-foreground">{item.overview}</p>

            <div className="mt-12 space-y-12">
              <div className="flex items-start">
                <div className="mr-6 flex-shrink-0">
                  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10 text-primary">
                    <Target className="h-7 w-7" />
                  </div>
                </div>
                <div>
                  <h3 className="font-headline text-2xl">The Challenge</h3>
                  <p className="mt-2 text-muted-foreground">{item.challenge}</p>
                </div>
              </div>

              <div className="flex items-start">
                <div className="mr-6 flex-shrink-0">
                  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10 text-primary">
                    <Zap className="h-7 w-7" />
                  </div>
                </div>
                <div>
                  <h3 className="font-headline text-2xl">Our Solution</h3>
                  <p className="mt-2 text-muted-foreground">{item.solution}</p>
                  <ul className="mt-4">
                    {item.keyStrategies.map((strategy, index) => (
                      <li key={index} className="text-muted-foreground">{strategy}</li>
                    ))}
                  </ul>
                </div>
              </div>

              <div className="flex items-start">
                <div className="mr-6 flex-shrink-0">
                  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10 text-primary">
                    <CheckCircle className="h-7 w-7" />
                  </div>
                </div>
                <div>
                  <h3 className="font-headline text-2xl">The Results</h3>
                  <p className="mt-2 text-muted-foreground">{item.result}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </motion.article>
  );
}
