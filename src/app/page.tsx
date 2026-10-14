'use client';

import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { services, testimonials, whoWeHelp, coreValues, metrics } from '@/lib/placeholder-data';
import { ArrowRight, ArrowUpRight, ChevronDown, CheckCircle2, Quote } from 'lucide-react';
import { LogoCarousel } from '@/components/ui/logo-carousel';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { motion, useInView, useScroll, useTransform } from 'framer-motion';
import { TestimonialCarousel } from '@/components/ui/testimonial-carousel';
import React, { useRef } from 'react';
import { AnimatedMetric } from '@/components/ui/animated-metric';
import { Badge } from '@/components/ui/badge';

const calendlyLink = 'https://calendly.com/nikhileshswain5/30min?back=1&month=2025-09';

const processSteps = [
  {
    number: '01',
    title: 'Discovery & Strategy',
    description:
      'We start with a deep dive into your business, goals, and target audience to build a custom marketing blueprint tailored to drive real growth.',
  },
  {
    number: '02',
    title: 'Campaign Launch',
    description:
      'Our expert team executes the strategy, launching targeted campaigns across the most effective channels for your audience.',
  },
  {
    number: '03',
    title: 'Optimization & Reporting',
    description:
      'We continuously monitor performance, using data to make real-time optimizations and provide transparent reports you can actually understand.',
  },
  {
    number: '04',
    title: 'Scaling for Growth',
    description:
      'Once we have a winning formula, we strategically scale your campaigns to accelerate growth and maximize market penetration.',
  },
];

const faqItems = [
  {
    question: 'What kind of results can I expect?',
    answer:
      "While results vary, our focus is always on delivering measurable ROI. We typically see significant improvements in key metrics like lead generation, conversion rates, and revenue growth within the first few months.",
  },
  {
    question: 'How long does it take to see results?',
    answer:
      "Some strategies, like paid advertising, can generate results almost immediately. Others, like SEO, are long-term strategies that build momentum over 3–6 months. We'll provide a realistic timeline based on your specific goals.",
  },
  {
    question: 'Do you require long-term contracts?',
    answer:
      "We offer flexible engagement models. While we recommend a minimum of 6 months for strategies like SEO, we also offer project-based work. Our goal is to build a partnership, and we're confident our results will make you want to stay.",
  },
  {
    question: 'How much do your services cost?',
    answer:
      "Our pricing is customized based on the scope of work and your business goals. We'll provide a detailed proposal after our initial discovery call. Contact us for a free consultation to get a tailored quote.",
  },
];

// ----- Animation Variants -----
const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] } },
};

const stagger = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.12 } },
};

const wordFade = {
  hidden: { opacity: 0, y: 20, filter: 'blur(6px)' },
  visible: { opacity: 1, y: 0, filter: 'blur(0px)', transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] } },
};

// ----- Sub-components -----

function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <Badge
      variant="outline"
      className="mb-4 inline-flex items-center gap-1.5 rounded-full border-primary/30 bg-primary/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-widest text-primary"
    >
      <span className="h-1.5 w-1.5 rounded-full bg-primary animate-pulse" />
      {children}
    </Badge>
  );
}

function GlowOrb({ className }: { className?: string }) {
  return (
    <div
      className={`pointer-events-none absolute rounded-full blur-[120px] opacity-20 ${className}`}
    />
  );
}

// ----- Main Page -----

export default function Home() {
  const heroRef = useRef(null);
  const metricsRef = useRef(null);
  const metricsInView = useInView(metricsRef, { once: true, amount: 0.3 });

  // Hero headline words
  const line1Words = ['Partner', 'with', 'Growthincs'];
  const line2Words = ['to', 'Elevate', 'Your', 'Business'];

  return (
    <div className="flex flex-col bg-background text-foreground overflow-x-hidden">

      {/* ─── HERO ─── */}
      <motion.section
        ref={heroRef}
        initial="hidden"
        animate="visible"
        className="relative flex min-h-screen w-full flex-col items-center justify-center overflow-hidden px-4 py-32 text-center"
        style={{ backgroundColor: '#0a0f2c' }}
      >
        {/* Background grid pattern */}
        <div
          className="pointer-events-none absolute inset-0 opacity-[0.04]"
          style={{
            backgroundImage: `linear-gradient(rgba(255,255,255,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.5) 1px, transparent 1px)`,
            backgroundSize: '60px 60px',
          }}
        />

        {/* Glowing orbs */}
        <GlowOrb className="h-[500px] w-[700px] bg-blue-500 -top-20 -left-40" />
        <GlowOrb className="h-[400px] w-[600px] bg-purple-600 top-40 -right-32" />
        <GlowOrb className="h-[300px] w-[400px] bg-cyan-400 bottom-20 left-1/4" />

        <div className="relative z-10 flex flex-col items-center">
          {/* Badge */}
          <motion.div variants={fadeUp}>
            <Badge
              variant="outline"
              className="mb-8 inline-flex items-center gap-2 rounded-full border-blue-500/30 bg-blue-500/10 px-5 py-2 text-xs font-semibold tracking-widest text-blue-400 uppercase"
            >
              <span className="h-1.5 w-1.5 rounded-full bg-blue-400 animate-pulse" />
              India's #1 Growth & Digital Strategy Agency
            </Badge>
          </motion.div>

          {/* Headline */}
          <motion.h1
            variants={stagger}
            className="font-headline font-extrabold tracking-tight text-white text-5xl sm:text-6xl md:text-7xl lg:text-8xl leading-[1.05]"
          >
            <span className="flex flex-wrap justify-center gap-x-4 gap-y-1">
              {line1Words.map((word, i) => (
                <motion.span key={i} variants={wordFade} className={word === 'Growthincs' ? 'text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-400' : ''}>
                  {word}
                </motion.span>
              ))}
            </span>
            <span className="flex flex-wrap justify-center gap-x-4 gap-y-1 mt-2">
              {line2Words.map((word, i) => (
                <motion.span key={i} variants={wordFade}>
                  {word}
                </motion.span>
              ))}
            </span>
          </motion.h1>

          {/* Subtitle */}
          <motion.p
            variants={fadeUp}
            className="mx-auto mt-8 max-w-2xl text-base sm:text-lg md:text-xl text-blue-200/70 leading-relaxed"
          >
            We turn ambitious businesses into market leaders through data-driven digital strategy,
            performance marketing, and explosive growth campaigns.
          </motion.p>

          {/* CTAs */}
          <motion.div variants={fadeUp} className="mt-10 flex flex-wrap items-center justify-center gap-4">
            <motion.a
              href={calendlyLink}
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.97 }}
              className="relative inline-flex items-center gap-2 overflow-hidden rounded-full bg-gradient-to-r from-blue-600 to-cyan-500 px-8 py-4 text-sm font-bold text-white shadow-2xl shadow-blue-500/40 transition-all hover:shadow-blue-500/60"
            >
              Book a Free Strategy Call
              <ArrowUpRight className="h-4 w-4" />
              <motion.span
                className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -skew-x-12"
                initial={{ x: '-100%' }}
                animate={{ x: '200%' }}
                transition={{ duration: 2, repeat: Infinity, repeatDelay: 3, ease: 'linear' }}
              />
            </motion.a>
            <motion.div whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.97 }}>
              <Link
                href="/portfolio"
                className="inline-flex items-center gap-2 rounded-full border border-white/20 px-8 py-4 text-sm font-semibold text-white/80 backdrop-blur-sm hover:border-white/40 hover:text-white transition-all duration-200"
              >
                See Our Work
                <ArrowRight className="h-4 w-4" />
              </Link>
            </motion.div>
          </motion.div>

          {/* Social proof micro-row */}
          <motion.div variants={fadeUp} className="mt-12 flex items-center gap-3 text-blue-300/60 text-sm">
            <div className="flex -space-x-2">
              {[1, 2, 3, 4].map((i) => (
                <div key={i} className="h-7 w-7 rounded-full border-2 border-blue-900 bg-gradient-to-br from-blue-400 to-cyan-500 opacity-80" />
              ))}
            </div>
            <span>Trusted by <strong className="text-blue-300">50+ brands</strong> across India</span>
          </motion.div>
        </div>

        {/* Scroll indicator */}
        <motion.div
          variants={fadeUp}
          className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1 text-white/30"
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
        >
          <span className="text-xs tracking-widest uppercase">Scroll</span>
          <ChevronDown className="h-4 w-4" />
        </motion.div>
      </motion.section>

      {/* ─── LOGO CAROUSEL ─── */}
      <section className="w-full border-y border-white/5 bg-black/30 py-10">
        <div className="container mx-auto px-4 mb-6 text-center">
          <p className="text-sm text-muted-foreground uppercase tracking-widest font-medium">
            Trusted by India's fastest-growing companies
          </p>
        </div>
        <LogoCarousel />
      </section>

      {/* ─── METRICS ─── */}
      <motion.section
        ref={metricsRef}
        initial="hidden"
        animate={metricsInView ? 'visible' : 'hidden'}
        variants={stagger}
        className="w-full py-20 bg-background"
      >
        <div className="container mx-auto px-4">
          <motion.div variants={fadeUp} className="text-center mb-12">
            <SectionLabel>Our Track Record</SectionLabel>
            <h2 className="font-headline text-3xl font-bold md:text-4xl">
              Numbers that speak for themselves
            </h2>
          </motion.div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
            {metrics.map((metric, i) => {
              const Icon = metric.icon;
              return (
                <motion.div
                  key={i}
                  variants={fadeUp}
                  whileHover={{ scale: 1.03, y: -4 }}
                  className="group relative overflow-hidden rounded-2xl border border-white/5 bg-white/[0.03] p-6 text-center backdrop-blur-sm transition-all duration-300 hover:border-primary/30 hover:bg-white/[0.06]"
                >
                  {/* Glow on hover */}
                  <div className="pointer-events-none absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                    style={{ background: 'radial-gradient(circle at 50% 100%, hsl(217.2 91.2% 59.8% / 0.08), transparent 70%)' }} />
                  <div className="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-br from-primary/20 to-cyan-500/20 border border-primary/20">
                    <Icon className="h-5 w-5 text-primary" />
                  </div>
                  <div className="font-headline text-3xl font-extrabold text-white">
                    <AnimatedMetric
                      value={metric.value}
                      prefix={'prefix' in metric ? (metric as any).prefix : undefined}
                      suffix={metric.suffix}
                    />
                  </div>
                  <p className="mt-1 text-xs text-muted-foreground font-medium">{metric.label}</p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </motion.section>

      {/* ─── WHO WE HELP ─── */}
      <InViewSection className="py-20 bg-black/20">
        <div className="container mx-auto px-4">
          <motion.div variants={fadeUp} className="text-center mb-12">
            <SectionLabel>Who We Help</SectionLabel>
            <h2 className="font-headline text-3xl font-bold md:text-4xl">Built for ambitious businesses</h2>
            <p className="mt-3 text-muted-foreground max-w-xl mx-auto">
              Whether you're scaling a SaaS product or growing a service business, we have a proven playbook for you.
            </p>
          </motion.div>
          <motion.div variants={stagger} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {whoWeHelp.map((item, i) => {
              const Icon = item.icon;
              return (
                <motion.div
                  key={i}
                  variants={fadeUp}
                  whileHover={{ y: -6, scale: 1.02 }}
                  className="group relative overflow-hidden rounded-2xl border border-white/5 bg-white/[0.03] p-6 transition-all duration-300 hover:border-primary/30"
                >
                  <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-2xl"
                    style={{ background: 'radial-gradient(circle at 30% 20%, hsl(217.2 91.2% 59.8% / 0.07), transparent 60%)' }} />
                  <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-blue-500/20 to-cyan-500/20 border border-blue-500/20">
                    <Icon className="h-5 w-5 text-blue-400" />
                  </div>
                  <h3 className="font-headline text-base font-bold mb-1">{item.title}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">{item.description}</p>
                </motion.div>
              );
            })}
          </motion.div>
        </div>
      </InViewSection>

      {/* ─── HOW IT WORKS ─── */}
      <InViewSection className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <motion.div variants={fadeUp} className="text-center mb-16">
            <SectionLabel>Our Process</SectionLabel>
            <h2 className="font-headline text-3xl font-bold md:text-4xl">How we deliver results</h2>
            <p className="mt-3 text-muted-foreground max-w-xl mx-auto">
              A proven 4-step framework designed to take your business from where it is to where it needs to be.
            </p>
          </motion.div>
          <div className="relative">
            {/* Vertical line (desktop) */}
            <div className="absolute left-1/2 top-0 hidden h-full w-px -translate-x-1/2 md:block">
              <div className="h-full w-full bg-gradient-to-b from-transparent via-primary/30 to-transparent" />
            </div>

            <div className="flex flex-col gap-12 md:gap-0">
              {processSteps.map((step, i) => {
                const isEven = i % 2 === 0;
                return (
                  <motion.div
                    key={i}
                    variants={fadeUp}
                    className={`relative flex flex-col md:flex-row items-center gap-6 md:gap-0 ${isEven ? 'md:flex-row' : 'md:flex-row-reverse'}`}
                  >
                    {/* Content */}
                    <div className={`w-full md:w-[calc(50%-3rem)] ${isEven ? 'md:pr-12 md:text-right' : 'md:pl-12'}`}>
                      <motion.div
                        whileHover={{ scale: 1.02 }}
                        className="rounded-2xl border border-white/5 bg-white/[0.03] p-6 hover:border-primary/20 transition-all duration-300"
                      >
                        <p className="font-headline text-4xl font-black text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-cyan-400 mb-2 opacity-60">{step.number}</p>
                        <h3 className="font-headline text-xl font-bold mb-2">{step.title}</h3>
                        <p className="text-sm text-muted-foreground leading-relaxed">{step.description}</p>
                      </motion.div>
                    </div>

                    {/* Center dot */}
                    <div className="hidden md:flex absolute left-1/2 -translate-x-1/2 h-5 w-5 items-center justify-center rounded-full border-2 border-primary bg-background">
                      <div className="h-2 w-2 rounded-full bg-primary" />
                    </div>

                    {/* Spacer */}
                    <div className="hidden md:block w-[calc(50%-3rem)]" />
                  </motion.div>
                );
              })}
            </div>
          </div>
        </div>
      </InViewSection>

      {/* ─── OUR EXPERTISE (Bento Grid) ─── */}
      <InViewSection className="py-20 bg-black/20">
        <div className="container mx-auto px-4">
          <motion.div variants={fadeUp} className="flex flex-col md:flex-row items-start md:items-end justify-between mb-12 gap-4">
            <div>
              <SectionLabel>Our Expertise</SectionLabel>
              <h2 className="font-headline text-3xl font-bold md:text-4xl">Services that drive growth</h2>
            </div>
            <Link href="/services" className="inline-flex items-center gap-1.5 text-sm font-semibold text-primary hover:underline underline-offset-4 shrink-0">
              View all services <ArrowRight className="h-4 w-4" />
            </Link>
          </motion.div>

          {/* Bento Grid */}
          <motion.div variants={stagger} className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {/* Large card - first service */}
            {services.slice(0, 1).map((service) => {
              const Icon = service.icon;
              return (
                <motion.div
                  key={service.slug}
                  variants={fadeUp}
                  whileHover={{ scale: 1.01 }}
                  className="md:col-span-2 md:row-span-2 group relative overflow-hidden rounded-2xl border border-white/5 bg-gradient-to-br from-primary/10 via-blue-900/20 to-black/40 p-8 hover:border-primary/30 transition-all duration-300"
                >
                  <div className="absolute top-0 right-0 h-60 w-60 rounded-full bg-primary/10 blur-3xl opacity-40 group-hover:opacity-70 transition-opacity duration-500" />
                  <div className="relative z-10 flex flex-col h-full min-h-[220px]">
                    <div className="mb-4 inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-primary/20 border border-primary/30">
                      <Icon className="h-7 w-7 text-primary" />
                    </div>
                    <h3 className="font-headline text-2xl font-bold mb-3">{service.title}</h3>
                    <p className="text-muted-foreground text-sm leading-relaxed max-w-md mb-6">{service.longDescription}</p>
                    <div className="mt-auto">
                      {service.benefits.slice(0, 3).map((b, bi) => (
                        <div key={bi} className="flex items-center gap-2 text-sm text-muted-foreground mb-1.5">
                          <CheckCircle2 className="h-4 w-4 text-primary shrink-0" />
                          {b}
                        </div>
                      ))}
                    </div>
                    <Link href={`/services/${service.slug}`} className="mt-6 inline-flex items-center gap-1.5 text-sm font-semibold text-primary hover:gap-2.5 transition-all">
                      Learn more <ArrowRight className="h-4 w-4" />
                    </Link>
                  </div>
                </motion.div>
              );
            })}

            {/* Small cards */}
            {services.slice(1, 6).map((service, i) => {
              const Icon = service.icon;
              return (
                <motion.div
                  key={service.slug}
                  variants={fadeUp}
                  whileHover={{ y: -4, scale: 1.02 }}
                  className="group relative overflow-hidden rounded-2xl border border-white/5 bg-white/[0.03] p-6 hover:border-primary/30 hover:bg-white/[0.06] transition-all duration-300"
                >
                  <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-2xl"
                    style={{ background: 'radial-gradient(circle at 50% 0%, hsl(217.2 91.2% 59.8% / 0.08), transparent 60%)' }} />
                  <div className="relative z-10">
                    <div className="mb-3 inline-flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10 border border-primary/20">
                      <Icon className="h-5 w-5 text-primary" />
                    </div>
                    <h3 className="font-headline text-base font-bold mb-1.5">{service.title}</h3>
                    <p className="text-xs text-muted-foreground leading-relaxed line-clamp-2">{service.shortDescription}</p>
                    <Link
                      href={`/services/${service.slug}`}
                      className="mt-4 inline-flex items-center gap-1 text-xs font-semibold text-primary hover:gap-2 transition-all"
                    >
                      Learn more <ArrowRight className="h-3 w-3" />
                    </Link>
                  </div>
                </motion.div>
              );
            })}
          </motion.div>
        </div>
      </InViewSection>

      {/* ─── TESTIMONIALS ─── */}
      <InViewSection className="py-20 bg-background relative overflow-hidden">
        <div className="pointer-events-none absolute inset-0 opacity-30"
          style={{ background: 'radial-gradient(ellipse 60% 50% at 50% 50%, hsl(217.2 91.2% 59.8% / 0.06), transparent)' }} />
        <div className="container mx-auto px-4 relative z-10">
          <motion.div variants={fadeUp} className="text-center mb-12">
            <SectionLabel>Client Stories</SectionLabel>
            <div className="flex items-center justify-center gap-3 mb-2">
              <Quote className="h-8 w-8 text-primary/30 -scale-x-100" />
              <h2 className="font-headline text-3xl font-bold md:text-4xl">What our clients say</h2>
              <Quote className="h-8 w-8 text-primary/30" />
            </div>
            <p className="mt-2 text-muted-foreground max-w-xl mx-auto">
              Don't just take our word for it. Here's what our clients have to say about working with Growthincs.
            </p>
          </motion.div>
          <motion.div variants={fadeUp}>
            <TestimonialCarousel testimonials={testimonials} />
          </motion.div>
        </div>
      </InViewSection>

      {/* ─── FAQ ─── */}
      <InViewSection className="py-20 bg-black/20">
        <div className="container mx-auto px-4 max-w-3xl">
          <motion.div variants={fadeUp} className="text-center mb-12">
            <SectionLabel>FAQ</SectionLabel>
            <h2 className="font-headline text-3xl font-bold md:text-4xl">Frequently asked questions</h2>
          </motion.div>
          <motion.div variants={stagger}>
            <Accordion type="single" collapsible className="space-y-3">
              {faqItems.map((item, i) => (
                <motion.div key={i} variants={fadeUp}>
                  <AccordionItem
                    value={`item-${i}`}
                    className="rounded-2xl border border-white/5 bg-white/[0.03] px-6 overflow-hidden hover:border-white/10 transition-colors duration-200"
                  >
                    <AccordionTrigger className="text-left font-semibold text-base py-5 hover:no-underline hover:text-primary transition-colors [&[data-state=open]]:text-primary">
                      <span className="flex items-center gap-3">
                        <span className="font-headline text-sm text-primary/50 font-bold w-6 shrink-0">
                          {String(i + 1).padStart(2, '0')}
                        </span>
                        {item.question}
                      </span>
                    </AccordionTrigger>
                    <AccordionContent className="text-muted-foreground text-sm leading-relaxed pb-5 pl-9">
                      {item.answer}
                    </AccordionContent>
                  </AccordionItem>
                </motion.div>
              ))}
            </Accordion>
          </motion.div>
        </div>
      </InViewSection>

      {/* ─── FINAL CTA ─── */}
      <InViewSection className="py-24 bg-background">
        <div className="container mx-auto px-4">
          <motion.div
            variants={fadeUp}
            className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-blue-900/80 via-blue-800/60 to-cyan-900/40 border border-blue-500/20 p-10 md:p-16 text-center"
          >
            {/* Decorative orbs */}
            <div className="pointer-events-none absolute -top-20 -left-20 h-60 w-60 rounded-full bg-blue-500/20 blur-3xl" />
            <div className="pointer-events-none absolute -bottom-20 -right-20 h-60 w-60 rounded-full bg-cyan-500/20 blur-3xl" />

            <div className="relative z-10">
              <Badge variant="outline" className="mb-6 border-blue-400/30 bg-blue-400/10 text-blue-300 text-xs tracking-widest uppercase px-4 py-1.5">
                Start Growing Today
              </Badge>
              <h2 className="font-headline text-3xl font-extrabold md:text-5xl text-white mb-4 leading-tight">
                Ready to Grow Your Business?
              </h2>
              <p className="text-blue-200/70 text-base md:text-lg max-w-2xl mx-auto mb-10 leading-relaxed">
                Book a free 30-minute strategy call with our experts. No pressure. Just a honest conversation about how we can help your business grow.
              </p>
              <div className="flex flex-wrap items-center justify-center gap-4">
                <motion.a
                  href={calendlyLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.97 }}
                  className="relative inline-flex items-center gap-2 overflow-hidden rounded-full bg-white px-10 py-4 text-sm font-bold text-blue-900 shadow-2xl shadow-white/20 transition-all hover:shadow-white/30"
                >
                  Book Your Free Strategy Call
                  <ArrowUpRight className="h-4 w-4" />
                  <motion.span
                    className="absolute inset-0 bg-gradient-to-r from-transparent via-blue-100/40 to-transparent -skew-x-12"
                    initial={{ x: '-100%' }}
                    animate={{ x: '200%' }}
                    transition={{ duration: 2, repeat: Infinity, repeatDelay: 3, ease: 'linear' }}
                  />
                </motion.a>
                <Link
                  href="/contact"
                  className="inline-flex items-center gap-2 rounded-full border border-white/20 px-8 py-4 text-sm font-semibold text-white/80 hover:border-white/40 hover:text-white transition-all duration-200"
                >
                  Send us a message
                </Link>
              </div>

              {/* Trust signals */}
              <div className="mt-10 flex flex-wrap items-center justify-center gap-6 text-blue-300/60 text-xs">
                {['No commitment required', 'Response within 24 hours', 'Free consultation'].map((item, i) => (
                  <div key={i} className="flex items-center gap-1.5">
                    <CheckCircle2 className="h-3.5 w-3.5 text-blue-400" />
                    <span>{item}</span>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </InViewSection>

    </div>
  );
}

// Helper: section that animates when it enters the viewport
function InViewSection({ children, className }: { children: React.ReactNode; className?: string }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, amount: 0.1 });
  return (
    <motion.section
      ref={ref}
      initial="hidden"
      animate={inView ? 'visible' : 'hidden'}
      variants={stagger}
      className={className}
    >
      {children}
    </motion.section>
  );
}
