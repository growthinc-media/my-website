
'use client';

import Link from 'next/link';
import { services } from '@/lib/placeholder-data';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';

export default function ServicesPage() {

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
          <h1 className="font-headline text-4xl font-bold md:text-5xl">Our Services</h1>
          <p className="mx-auto mt-4 max-w-2xl text-base text-muted-foreground md:text-lg">
            We provide a comprehensive suite of digital marketing services designed to drive growth, engagement, and a significant return on your investment.
          </p>
        </motion.div>

        <motion.div 
          className="mt-12 md:mt-16 grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
        >
          {services.map((service) => (
            <motion.div key={service.slug} variants={itemVariants} className="block h-full">
              <Link href={`/services/${service.slug}`} className="block h-full">
                <Card className="group flex h-full transform flex-col text-left transition-all duration-300 hover:-translate-y-2 hover:shadow-xl bg-card">
                  <CardHeader className="flex flex-row items-center space-x-4 p-6">
                    <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary">
                      <service.icon className="h-6 w-6" />
                    </div>
                    <CardTitle className="font-headline text-xl font-bold leading-tight">{service.title}</CardTitle>
                  </CardHeader>
                  <CardContent className="flex flex-grow flex-col justify-between p-6 pt-0">
                    <p className="text-muted-foreground">{service.shortDescription}</p>
                    <div className="mt-4 flex items-center font-semibold text-primary opacity-0 transition-all duration-300 group-hover:opacity-100">
                      Learn More <ArrowRight className="ml-2 h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
                    </div>
                  </CardContent>
                </Card>
              </Link>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </motion.div>
  );
}
