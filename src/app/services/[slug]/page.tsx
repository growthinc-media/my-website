
'use client';

import { notFound, useParams } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { services, testimonials, coreValues } from '@/lib/placeholder-data';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { CheckCircle, Star } from 'lucide-react';
import { motion } from 'framer-motion';
import { useMemo } from 'react';
import { ContactForm } from '@/components/contact-form';

const calendlyLink = "https://calendly.com/nikhileshswain5/30min?back=1&month=2025-09";

export default function ServicePage() {
  const params = useParams();
  const slug = params.slug as string;

  const service = useMemo(() => services.find((s) => s.slug === slug), [slug]);

  if (!service) {
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
        staggerChildren: 0.1
      }
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: { opacity: 1, y: 0 },
  };

  const relevantTestimonials = testimonials.slice(0, 2);

  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={sectionVariants}
    >
      <motion.section 
        className="relative w-full overflow-hidden py-20 md:py-24 text-primary-foreground"
        style={{ backgroundColor: '#0a0f2c' }}
        variants={sectionVariants}
      >
        <div className="container relative z-10 mx-auto px-4 text-center">
          <div className="mb-4 inline-flex h-16 w-16 items-center justify-center rounded-full bg-primary-foreground/20 text-primary-foreground md:h-20 md:w-20">
            <service.icon className="h-8 w-8 md:h-10 md:w-10" />
          </div>
          <h1 className="font-headline text-4xl font-bold md:text-5xl">{service.title}</h1>
          <p className="mx-auto mt-4 max-w-3xl text-base opacity-90 md:text-lg">{service.shortDescription}</p>
        </div>
      </motion.section>

      <motion.section className="py-16 md:py-24" variants={sectionVariants}>
        <div className="container mx-auto max-w-5xl px-4">
          <div className="text-center">
             <h2 className="font-headline text-3xl font-bold">What This Service Includes</h2>
             <p className="mx-auto mt-4 max-w-3xl text-base text-muted-foreground md:text-lg">A complete solution to achieve your marketing objectives.</p>
          </div>
          <div className="mt-12 grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
            {service.includes.map((item, index) => (
              <motion.div key={index} variants={itemVariants}>
                <Card className="h-full text-center">
                  <CardHeader>
                    <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-primary/10 text-primary">
                      <item.icon className="h-6 w-6" />
                    </div>
                  </CardHeader>
                  <CardContent>
                    <h3 className="font-semibold text-lg">{item.title}</h3>
                    <p className="mt-2 text-sm text-muted-foreground">{item.description}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.section>

       <motion.section className="bg-secondary py-16 md:py-24" variants={sectionVariants}>
        <div className="container mx-auto grid grid-cols-1 items-center gap-12 px-4 lg:grid-cols-2">
            <div>
                <h2 className="font-headline text-3xl font-bold">Why Choose Growthincs?</h2>
                <p className="mt-4 text-muted-foreground md:text-lg">We are more than just a service provider; we are your growth partner.</p>
                <ul className="mt-8 space-y-6">
                    {coreValues.map((value) => (
                        <motion.li key={value.title} className="flex items-start" variants={itemVariants}>
                             <div className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full bg-primary text-primary-foreground mr-4">
                                <value.icon className="h-5 w-5" />
                            </div>
                            <div>
                                <h3 className="font-semibold text-lg">{value.title}</h3>
                                <p className="text-muted-foreground">{value.description}</p>
                            </div>
                        </motion.li>
                    ))}
                </ul>
            </div>
            <div className="relative h-80 w-full lg:h-full min-h-[300px]">
                 <Image
                    src="https://images.unsplash.com/photo-1556740738-b6a63e27c4df?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3NDE5ODJ8MHwxfHNlYXJjaHwxfHxidXNpbmVzcyUyMHBhcnRuZXJzaGlwfGVufDB8fHx8MTc1ODMzOTIzOXww&ixlib=rb-4.1.0&q=80&w=1080"
                    alt="Why Choose Us"
                    data-ai-hint="business partnership"
                    fill
                    className="object-cover rounded-lg"
                    />
            </div>
        </div>
      </motion.section>

      {service.faqs && service.faqs.length > 0 && (
        <motion.section 
          id="faq" 
          className="py-16 md:py-24 bg-background"
          variants={sectionVariants}
        >
          <div className="container mx-auto max-w-4xl px-4">
            <div className="text-center">
              <h2 className="font-headline text-3xl font-bold md:text-4xl">Frequently Asked Questions</h2>
              <p className="mx-auto mt-4 max-w-3xl text-base text-muted-foreground md:text-lg">
                Answers to common questions about our {service.title} service.
              </p>
            </div>
            <div className="mt-12">
              <Accordion type="single" collapsible className="w-full">
                {service.faqs.map((item, index) => (
                  <AccordionItem key={index} value={`item-${index}`} className="bg-secondary/50 rounded-lg px-4 md:px-6 mb-4 border shadow-sm">
                    <AccordionTrigger className="text-left text-base font-semibold md:text-lg hover:no-underline">{item.question}</AccordionTrigger>
                    <AccordionContent className="text-base text-muted-foreground">
                      {item.answer}
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </div>
          </div>
        </motion.section>
      )}

      {relevantTestimonials.length > 0 && (
         <motion.section 
            id="testimonials" 
            className="bg-secondary py-16 md:py-24"
            variants={sectionVariants}
          >
            <div className="container mx-auto max-w-5xl px-4">
              <div className="text-center">
                <h2 className="font-headline text-3xl font-bold md:text-4xl">What Our Clients Say</h2>
              </div>
              <div className="mt-12 grid grid-cols-1 gap-8 md:grid-cols-2">
                {relevantTestimonials.map((testimonial) => (
                  <Card key={testimonial.id} className="bg-background">
                    <CardContent className="p-6">
                        <div className="mb-4 flex items-center text-yellow-400">
                          {[...Array(5)].map((_, i) => (
                            <Star key={i} className="h-5 w-5 fill-current" />
                          ))}
                        </div>
                        <blockquote className="text-base text-foreground italic">
                          "{testimonial.quote}"
                        </blockquote>
                        <div className="mt-6">
                          <p className="font-semibold">{testimonial.name}</p>
                          <p className="text-sm text-muted-foreground">{testimonial.title}</p>
                        </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
         </motion.section>
      )}

      <motion.section 
        className="py-16 md:py-24 bg-background"
        variants={sectionVariants}
      >
        <div className="container mx-auto max-w-4xl px-4">
          <Card className="shadow-lg bg-secondary/50">
            <CardHeader className="text-center">
              <CardTitle className="font-headline text-3xl">Get a Custom Quote</CardTitle>
              <p className="text-muted-foreground">Fill out the form below to get a personalized quote for our {service.title} service.</p>
            </CardHeader>
            <CardContent>
              <ContactForm defaultService={service.title} />
            </CardContent>
          </Card>
        </div>
      </motion.section>
    </motion.div>
  );
}
