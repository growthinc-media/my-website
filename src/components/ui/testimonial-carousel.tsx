
'use client';

import * as React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel';
import { Star } from 'lucide-react';

type Testimonial = {
  id: number;
  name: string;
  title: string;
  quote: string;
};

type TestimonialCarouselProps = {
  testimonials: Testimonial[];
};

export function TestimonialCarousel({ testimonials }: TestimonialCarouselProps) {
  return (
    <div className="text-center">
      <h2 className="font-headline text-3xl font-bold md:text-4xl">Loved by Our Clients</h2>
      <p className="mx-auto mt-4 max-w-3xl text-base md:text-lg text-muted-foreground">
        Don't just take our word for it. Here's what our clients have to say about what it's like to
        partner with Growthincs and how we helped elevate their business.
      </p>
      <Carousel
        className="mx-auto mt-12 w-full max-w-xs sm:max-w-xl md:max-w-4xl lg:max-w-6xl"
        opts={{
          loop: true,
          align: 'start',
        }}
      >
        <CarouselContent className="-ml-4">
          {testimonials.map((testimonial) => (
            <CarouselItem key={testimonial.id} className="pl-4 sm:basis-1/2 lg:basis-1/3">
              <div className="p-1 h-full">
                <Card className="flex h-full flex-col justify-between rounded-lg bg-card p-6 text-left shadow-md">
                  <div>
                    <div className="mb-4 flex items-center text-yellow-400">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className="h-5 w-5 fill-current" />
                      ))}
                    </div>
                    <blockquote className="text-base text-foreground">
                      "{testimonial.quote}"
                    </blockquote>
                  </div>
                  <div className="mt-6">
                    <p className="font-semibold">{testimonial.name}</p>
                    <p className="text-sm text-muted-foreground">{testimonial.title}</p>
                  </div>
                </Card>
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious className="absolute -left-4 top-1/2 -translate-y-1/2 rounded-full bg-card shadow-md sm:-left-12 hidden md:inline-flex" />
        <CarouselNext className="absolute -right-4 top-1/2 -translate-y-1/2 rounded-full bg-card shadow-md sm:-right-12 hidden md:inline-flex" />
      </Carousel>
    </div>
  );
}
