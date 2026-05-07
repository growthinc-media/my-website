
'use client';

import { useMemo, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { portfolioItems } from '@/lib/placeholder-data';
import { ArrowRight } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';
import { motion } from 'framer-motion';

export default function PortfolioPage() {
  const [activeFilter, setActiveFilter] = useState('All');
  const categories = useMemo(() => ['All', ...new Set(portfolioItems.map((item) => item.category))], []);

  const filteredItems = useMemo(() => 
    activeFilter === 'All'
      ? portfolioItems
      : portfolioItems.filter((item) => item.category === activeFilter),
    [activeFilter]
  );

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
          <h1 className="font-headline text-4xl font-bold md:text-5xl">Our Work</h1>
          <p className="mx-auto mt-4 max-w-3xl text-base text-muted-foreground md:text-lg">
            We take pride in the results we deliver. Explore our case studies to see how we've helped
            clients overcome challenges and achieve remarkable growth.
          </p>
        </motion.div>

        <motion.div 
          className="my-12 flex flex-wrap items-center justify-center gap-2 md:gap-4"
          variants={itemVariants}
        >
          {categories.map((category) => (
            <Button
              key={category}
              variant={activeFilter === category ? 'default' : 'outline'}
              onClick={() => setActiveFilter(category)}
              className="rounded-full px-4 py-2 text-xs font-semibold transition-colors duration-300 md:px-6 md:text-sm"
            >
              {category}
            </Button>
          ))}
        </motion.div>

        <motion.div 
          className="mt-12 md:mt-16 grid grid-cols-1 gap-10 md:grid-cols-2 lg:grid-cols-3"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
        >
          {filteredItems.map((item, index) => (
            <motion.div 
              key={item.id} 
              variants={itemVariants}
              className="group flex flex-col overflow-hidden rounded-lg bg-card shadow-lg transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl"
            >
              <Link href={`/portfolio/${item.id}`} className="block">
                <div className="relative h-52 md:h-60 w-full overflow-hidden">
                  <Image
                    src={item.imageUrl}
                    alt={item.title}
                    data-ai-hint={item.aiHint}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-110"
                    priority={index < 3}
                  />
                </div>
              </Link>
              <div className="flex flex-grow flex-col p-6">
                <div className="flex-grow">
                  <Badge variant="secondary">{item.category}</Badge>
                  <h3 className="font-headline mt-4 text-xl font-bold md:text-2xl">
                    <Link href={`/portfolio/${item.id}`} className="hover:text-primary">
                      {item.title}
                    </Link>
                  </h3>
                  <p className="mt-3 text-sm text-muted-foreground line-clamp-3">{item.challenge}</p>
                </div>
                <div className="mt-6">
                  <Button asChild variant="link" className="p-0 font-semibold text-primary">
                    <Link href={`/portfolio/${item.id}`}>
                      Read Case Study <ArrowRight className="ml-2 h-5 w-5" />
                    </Link>
                  </Button>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </motion.div>
  );
}
