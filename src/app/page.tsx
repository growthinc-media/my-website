
'use client';

import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { services, testimonials, whoWeHelp, coreValues, metrics } from '@/lib/placeholder-data';
import { ArrowRight } from 'lucide-react';
import { LogoCarousel } from '@/components/ui/logo-carousel';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import { motion } from 'framer-motion';
import { TestimonialCarousel } from '@/components/ui/testimonial-carousel';
import React from 'react';
import { AnimatedMetric } from '@/components/ui/animated-metric';


const calendlyLink = "https://calendly.com/nikhileshswain5/30min?back=1&month=2025-09";

const processSteps = [
  {
    number: '01',
    title: 'Discovery & Strategy',
    description: 'We start with a deep dive into your business, goals, and target audience to build a custom marketing blueprint.',
  },
  {
    number: '02',
    title: 'Campaign Launch',
    description: 'Our expert team executes the strategy, launching targeted campaigns across the most effective channels.',
  },
  {
    number: '03',
    title: 'Optimization & Reporting',
    description: 'We continuously monitor performance, using data to make real-time optimizations and provide transparent reports.',
  },
  {
    number: '04',
    title: 'Scaling for Growth',
    description: 'Once we have a winning formula, we strategically scale your campaigns to accelerate growth and maximize market penetration.',
  },
];

const faqItems = [
    {
      question: "What kind of results can I expect?",
      answer: "While results vary, our focus is always on delivering measurable ROI. We typically see significant improvements in key metrics like lead generation, conversion rates, and revenue growth within the first few months."
    },
    {
      question: "How long does it take to see results?",
      answer: "Some strategies, like paid advertising, can generate results almost immediately. Others, like SEO, are long-term strategies that build momentum over 3-6 months. We'll provide a realistic timeline based on your specific goals."
    },
    {
      question: "Do you require long-term contracts?",
      answer: "We offer flexible engagement models. While we recommend a minimum of 6 months for strategies like SEO, we also offer project-based work. Our goal is to build a partnership, and we're confident our results will make you want to stay."
    },
    {
      question: "How much do your services cost?",
      answer: "Our pricing is customized based on the scope of work and your business goals. We'll provide a detailed proposal after our initial discovery call. Contact us for a free consultation to get a tailored quote."
    }
  ];

export default function Home() {

  const sectionVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, ease: "easeOut", staggerChildren: 0.2 }
    }
  };
  
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0, scale: 0.95 },
    visible: {
      y: 0,
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.5,
        ease: 'easeOut'
      }
    },
  };

  const headlineLines = ["Partner with Growthincs", "to elevate your business"];

  const headlineVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.2, // Time between each line animating
      },
    },
  };

  const lineVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.6,
        ease: [0.2, 0.65, 0.3, 0.9],
      },
    },
  };


  return (
    <motion.div 
      className="flex flex-col text-foreground bg-background"
      initial="hidden"
      animate="visible"
      variants={containerVariants}
    >
      <motion.section 
        id="hero" 
        className="relative w-full text-center py-24 md:py-32 overflow-hidden aurora-bg"
        style={{ backgroundColor: '#0a0f2c' }}
        variants={sectionVariants}
        initial="hidden"
        animate="visible"
        viewport={{ amount: 0.2 }}
      >
        <div className="container relative z-10 mx-auto flex h-full flex-col items-center justify-center px-4">
        <motion.h1
            variants={headlineVariants}
            initial="visible"   // ❗ mobile LCP fix
            animate="visible"
            className="
              font-headline font-extrabold tracking-tight text-white
              text-4xl leading-tight
              sm:text-5xl
              md:text-6xl
              lg:text-7xl
            "
          >
            {headlineLines.map((line, lineIndex) => (
              <motion.span
                key={lineIndex}
                className="block"
                variants={lineVariants}
              >
                {line}
              </motion.span>
            ))}
          </motion.h1>

          <motion.p 
            variants={itemVariants}
            className="mt-6 max-w-2xl text-base text-white/80 md:text-xl"
          >
            We are committed to delivering the best services to help you grow and succeed in the digital marketplace.
          </motion.p>
          <motion.div
            variants={itemVariants}
            className="mt-8"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Button asChild size="lg" className="rounded-full bg-primary font-bold text-primary-foreground shadow-lg shadow-primary/20 transition-all hover:bg-primary/90">
              <Link href={calendlyLink} target="_blank" rel="noopener noreferrer">Get Started</Link>
            </Button>
          </motion.div>
        </div>
      </motion.section>

      <motion.section 
        className="py-12 md:py-16 bg-background"
        variants={sectionVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
      >
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-7xl">
            <LogoCarousel />
          </div>
        </div>
      </motion.section>
      
      <motion.section 
        className="pb-16 pt-0 md:pb-24 bg-background"
        variants={sectionVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
      >
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-7xl">
            <motion.div variants={containerVariants} className="rounded-xl bg-secondary p-6 border border-border">
                <div className="grid grid-cols-2 gap-6 md:grid-cols-4">
                    {metrics.map((metric, index) => (
                        <motion.div variants={itemVariants} key={index} className="text-center">
                            <metric.icon className="mx-auto h-8 w-8 text-primary" />
                            <AnimatedMetric
                              value={metric.value}
                              prefix={metric.prefix}
                              suffix={metric.suffix}
                              className="mt-3 text-3xl font-bold sm:text-4xl"
                            />
                            <p className="mt-1 text-xs text-muted-foreground sm:text-sm">{metric.label}</p>
                        </motion.div>
                    ))}
                </div>
            </motion.div>
          </div>
        </div>
      </motion.section>

      <motion.section 
        id="about"
        className="bg-background py-16 md:py-24"
        variants={sectionVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
      >
        <div className="container mx-auto max-w-5xl px-4 text-center">
          <h2 className="text-sm font-semibold uppercase tracking-wider text-primary">About Us</h2>
          <p className="mt-3 font-headline text-3xl font-bold md:text-4xl">
            A results-driven digital marketing company.
          </p>
          <p className="mx-auto mt-4 max-w-3xl text-base text-muted-foreground md:text-lg">
            We craft data-driven strategies to deliver measurable growth and a tangible return on your investment. We believe in building partnerships, not just campaigns, to ensure your long-term success.
          </p>

          <motion.div 
            className="mt-12 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4"
            variants={containerVariants}
          >
            {coreValues.map((value) => (
              <motion.div key={value.title} variants={itemVariants} className="text-center">
                <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-primary/10 text-primary">
                  <value.icon className="h-6 w-6" />
                </div>
                <h3 className="mt-5 font-headline text-lg font-bold">{value.title}</h3>
                <p className="mt-2 text-sm text-muted-foreground">{value.description}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </motion.section>

      <motion.section 
        id="who-we-help" 
        className="bg-secondary py-16 md:py-24"
        variants={sectionVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
      >
        <div className="container mx-auto px-4 text-center">
          <h2 className="font-headline text-3xl font-bold md:text-4xl">Who We Help</h2>
          <p 
            className="mx-auto mt-4 max-w-3xl text-base text-muted-foreground md:text-lg"
          >
            We partner with ambitious companies across various sectors who are ready to scale their revenue and market presence.
          </p>
          <motion.div variants={containerVariants} className="mx-auto mt-12 grid max-w-7xl grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {whoWeHelp.map((item, index) => (
               <motion.div
                 key={item.title}
                 variants={itemVariants}
               >
                 <Card className="flex h-full w-full flex-col text-left transition-shadow duration-300 bg-background border border-border hover:shadow-lg hover:border-primary/50">
                   <CardHeader className="flex flex-row items-center gap-4 pb-4">
                     <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary">
                       <item.icon className="h-6 w-6" />
                     </div>
                     <CardTitle className="font-headline text-lg font-bold leading-tight">{item.title}</CardTitle>
                   </CardHeader>
                   <CardContent className="flex-grow">
                     <p className="text-sm text-muted-foreground">{item.description}</p>
                   </CardContent>
                 </Card>
               </motion.div>
            ))}
          </motion.div>
        </div>
      </motion.section>
      
      <motion.section 
        id="process" 
        className="bg-background py-16 md:py-24"
        variants={sectionVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
      >
        <div className="container mx-auto max-w-5xl px-4">
          <div className="text-center">
            <h2 className="font-headline text-3xl font-bold md:text-4xl text-foreground">Our Proven Process</h2>
            <p 
              className="mx-auto mt-4 max-w-3xl text-base text-muted-foreground md:text-lg"
            >
              Our transparent and results-driven approach is designed to systematically scale your business and deliver predictable outcomes.
            </p>
          </div>
          <div className="relative mt-16">
            {/* The vertical line in the middle, hidden on mobile */}
            <div className="absolute left-1/2 top-0 -ml-px h-full w-0.5 bg-border hidden md:block" aria-hidden="true"></div>
            
            <div className="space-y-12 md:space-y-0 md:grid md:grid-cols-2 md:gap-x-8 md:gap-y-16">
              {processSteps.map((step, index) => {
                const isEven = index % 2 === 0;
                const cardVariants = {
                  hidden: { opacity: 0, x: isEven ? -50 : 50 },
                  visible: {
                    opacity: 1,
                    x: 0,
                    transition: { duration: 0.6, ease: 'easeOut' }
                  }
                };

                return (
                  <motion.div
                    key={step.number}
                    className={`relative ${isEven ? 'md:pr-4' : 'md:pl-4'} ${index % 2 !== 0 ? 'md:flex md:flex-row-reverse' : ''}`}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, amount: 0.5 }}
                    variants={cardVariants}
                  >
                     <div className="md:hidden absolute left-0 top-0 -translate-x-1/2 h-full w-0.5 bg-border" aria-hidden="true" style={{left: '2rem'}}></div>
                     <div className="flex items-start gap-4">
                        <div className="z-10 flex-shrink-0 flex h-16 w-16 items-center justify-center rounded-full border-2 border-background bg-primary transition-transform duration-300 group-hover:scale-110">
                            <span className="font-bold text-primary-foreground text-xl">{step.number}</span>
                        </div>
                        <div className="flex-grow pt-2">
                           <div className="p-6 bg-secondary/60 rounded-lg border border-border shadow-sm">
                             <h3 className="font-headline text-xl font-bold text-foreground">{step.title}</h3>
                             <p className="mt-2 text-muted-foreground">{step.description}</p>
                           </div>
                        </div>
                      </div>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </div>
      </motion.section>

      <motion.section
        id="services"
        className="bg-secondary py-16 md:py-24"
        variants={sectionVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
      >
        <div className="container mx-auto max-w-6xl px-4 text-center">
          <h2 className="font-headline text-3xl font-bold md:text-4xl">Our Expertise</h2>
          <p 
            className="mx-auto mt-4 max-w-3xl text-base text-muted-foreground md:text-lg"
          >
            From igniting lead pipelines to crafting stunning visuals, our services are the engine of your growth.
          </p>
          <motion.div variants={containerVariants} className="mx-auto mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {services.slice(0, 6).map((service) => (
              <motion.div
                key={service.slug}
                variants={itemVariants}
              >
                <Link href={`/services/${service.slug}`} className="group block h-full">
                  <Card className="relative flex h-full transform flex-col rounded-xl border border-border bg-background p-6 text-left transition-all duration-300 hover:shadow-2xl hover:-translate-y-2">
                    <div className="flex h-full flex-col items-start justify-between">
                      <div>
                        <div className="mb-4 flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary">
                          <service.icon className="h-7 w-7" />
                        </div>
                        <h3 className="font-headline text-xl font-bold leading-tight">{service.title}</h3>
                        <p className="mt-2 text-sm text-muted-foreground">{service.shortDescription}</p>
                      </div>
                      <span className="mt-6 font-semibold text-primary inline-flex items-center">
                        Learn More <ArrowRight className="ml-2 h-4 w-4" />
                      </span>
                    </div>
                  </Card>
                </Link>
              </motion.div>
            ))}
          </motion.div>
          <motion.div className="mt-12" variants={sectionVariants}>
            <Button asChild size="lg" variant="outline" className="rounded-full font-semibold text-primary border-primary hover:bg-primary hover:text-primary-foreground">
              <Link href="/services">
                View All Services <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
          </motion.div>
        </div>
      </motion.section>

      <motion.section 
        id="testimonials" 
        className="bg-background text-foreground py-16 md:py-24"
        variants={sectionVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
      >
        <div className="container mx-auto px-4">
          <TestimonialCarousel testimonials={testimonials} />
        </div>
      </motion.section>

      <motion.section 
        id="faq" 
        className="py-16 md:py-24 bg-secondary"
        variants={sectionVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
      >
        <div className="container mx-auto max-w-4xl px-4">
          <div className="text-center">
            <h2 className="font-headline text-3xl font-bold md:text-4xl">Frequently Asked Questions</h2>
            <p className="mx-auto mt-4 max-w-3xl text-base text-muted-foreground md:text-lg">
              Have questions? We've got answers. Here are some common questions we receive.
            </p>
          </div>
          <div className="mt-12">
            <Accordion type="single" collapsible className="w-full">
              {faqItems.map((item, index) => (
                <AccordionItem key={index} value={`item-${index}`} className="bg-background rounded-lg px-4 mb-3 border shadow-sm">
                  <AccordionTrigger className="text-left text-base font-semibold hover:no-underline">{item.question}</AccordionTrigger>
                  <AccordionContent className="text-sm text-muted-foreground">
                    {item.answer}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </div>
      </motion.section>

      <motion.section 
        id="cta-grow" 
        className="relative w-full overflow-hidden py-16 md:py-24 bg-background"
        variants={sectionVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
      >
        <div className="container mx-auto px-4">
          <div className="relative z-10 rounded-2xl p-8 text-center text-primary-foreground md:p-12 border border-border" style={{ backgroundColor: '#0a0f2c' }}>
            <h2 className="font-headline text-3xl font-bold tracking-tight md:text-4xl">
              Ready to Grow?
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-base text-primary-foreground/80 md:text-lg">
              Let's have a chat about your goals. We'll help you build a roadmap to success. No pressure, just a friendly conversation to see if we're the right partner.
            </p>
            <div className="mt-8">
              <Button asChild size="lg" className="rounded-full bg-accent font-bold text-accent-foreground shadow-lg shadow-accent/20 transition-all hover:bg-accent/90">
                <Link href={calendlyLink} target="_blank" rel="noopener noreferrer">Book Your Free Strategy Call</Link>
              </Button>
            </div>
          </div>
        </div>
      </motion.section>

    </motion.div>
  );
}

    