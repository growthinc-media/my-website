'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import * as z from 'zod';
import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';
import { services } from '@/lib/placeholder-data';
import { Loader2, CheckCircle2, Send } from 'lucide-react';
import { handleContactForm } from '@/app/contact/actions';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '@/lib/utils';

const formSchema = z.object({
  name: z.string().min(2, { message: 'Name must be at least 2 characters.' }),
  email: z.string().email({ message: 'Please enter a valid email address.' }),
  phone: z.string().optional(),
  service: z.string().min(1, { message: 'Please select a service of interest.' }),
  budget: z.string().optional(),
  message: z.string().min(10, { message: 'Message must be at least 10 characters.' }),
});

const budgetOptions = [
  { value: 'under-25k', label: 'Under ₹25K/mo' },
  { value: '25k-50k', label: '₹25K – ₹50K/mo' },
  { value: '50k-1l', label: '₹50K – ₹1L/mo' },
  { value: '1l-plus', label: '₹1L+/mo' },
];

type ContactFormProps = {
  defaultService?: string;
};

export function ContactForm({ defaultService }: ContactFormProps) {
  const { toast } = useToast();
  const [isSuccess, setIsSuccess] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: '',
      email: '',
      phone: '',
      service: defaultService || '',
      budget: '',
      message: '',
    },
  });

  const { isSubmitting } = form.formState;

  async function onSubmit(values: z.infer<typeof formSchema>) {
    const result = await handleContactForm(values);

    if (result.success) {
      setIsSuccess(true);
      form.reset();
    } else {
      toast({
        variant: 'destructive',
        title: 'Something went wrong',
        description: result.message,
      });
    }
  }

  if (isSuccess) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5, ease: 'easeOut' }}
        className="flex flex-col items-center justify-center gap-5 py-16 text-center"
      >
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: 'spring', stiffness: 200, damping: 15, delay: 0.1 }}
          className="flex items-center justify-center w-20 h-20 rounded-full bg-green-500/15 border border-green-500/30"
        >
          <CheckCircle2 className="w-10 h-10 text-green-400" />
        </motion.div>
        <div>
          <h3 className="font-headline text-2xl font-bold mb-2">Message Sent!</h3>
          <p className="text-muted-foreground max-w-sm">
            Thanks for reaching out. We'll review your message and get back to you within 24 hours.
          </p>
        </div>
        <Button
          variant="outline"
          onClick={() => setIsSuccess(false)}
          className="mt-2 border-white/10 hover:bg-white/5"
        >
          Send another message
        </Button>
      </motion.div>
    );
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
        {/* Row: Name + Email */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-sm font-medium text-muted-foreground">Full Name *</FormLabel>
                <FormControl>
                  <Input
                    placeholder="John Smith"
                    {...field}
                    className={cn(
                      'bg-white/5 border-white/10 placeholder:text-muted-foreground/50',
                      'focus:border-primary/60 focus:ring-primary/20 transition-all duration-200',
                      'rounded-xl h-11'
                    )}
                  />
                </FormControl>
                <AnimatePresence>
                  {form.formState.errors.name && (
                    <motion.div initial={{ opacity: 0, y: -4 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -4 }}>
                      <FormMessage />
                    </motion.div>
                  )}
                </AnimatePresence>
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-sm font-medium text-muted-foreground">Email Address *</FormLabel>
                <FormControl>
                  <Input
                    type="email"
                    placeholder="john@company.com"
                    {...field}
                    className={cn(
                      'bg-white/5 border-white/10 placeholder:text-muted-foreground/50',
                      'focus:border-primary/60 focus:ring-primary/20 transition-all duration-200',
                      'rounded-xl h-11'
                    )}
                  />
                </FormControl>
                <AnimatePresence>
                  {form.formState.errors.email && (
                    <motion.div initial={{ opacity: 0, y: -4 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -4 }}>
                      <FormMessage />
                    </motion.div>
                  )}
                </AnimatePresence>
              </FormItem>
            )}
          />
        </div>

        {/* Row: Phone + Budget */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          <FormField
            control={form.control}
            name="phone"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-sm font-medium text-muted-foreground">Phone <span className="text-muted-foreground/50">(optional)</span></FormLabel>
                <FormControl>
                  <Input
                    type="tel"
                    placeholder="+91 98765 43210"
                    {...field}
                    className={cn(
                      'bg-white/5 border-white/10 placeholder:text-muted-foreground/50',
                      'focus:border-primary/60 focus:ring-primary/20 transition-all duration-200',
                      'rounded-xl h-11'
                    )}
                  />
                </FormControl>
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="budget"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-sm font-medium text-muted-foreground">Monthly Budget <span className="text-muted-foreground/50">(optional)</span></FormLabel>
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                  <FormControl>
                    <SelectTrigger
                      className={cn(
                        'bg-white/5 border-white/10',
                        'focus:border-primary/60 focus:ring-primary/20 transition-all duration-200',
                        'rounded-xl h-11'
                      )}
                    >
                      <SelectValue placeholder="Select budget range" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent className="bg-card border-white/10">
                    {budgetOptions.map((opt) => (
                      <SelectItem key={opt.value} value={opt.value}>{opt.label}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </FormItem>
            )}
          />
        </div>

        {/* Service */}
        <FormField
          control={form.control}
          name="service"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-sm font-medium text-muted-foreground">Service of Interest *</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger
                    className={cn(
                      'bg-white/5 border-white/10',
                      'focus:border-primary/60 focus:ring-primary/20 transition-all duration-200',
                      'rounded-xl h-11'
                    )}
                  >
                    <SelectValue placeholder="What can we help you with?" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent className="bg-card border-white/10">
                  {services.map((s) => (
                    <SelectItem key={s.slug} value={s.title}>{s.title}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <AnimatePresence>
                {form.formState.errors.service && (
                  <motion.div initial={{ opacity: 0, y: -4 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -4 }}>
                    <FormMessage />
                  </motion.div>
                )}
              </AnimatePresence>
            </FormItem>
          )}
        />

        {/* Message */}
        <FormField
          control={form.control}
          name="message"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-sm font-medium text-muted-foreground">Your Message *</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="Tell us about your business goals, challenges, and what success looks like for you..."
                  rows={5}
                  {...field}
                  className={cn(
                    'bg-white/5 border-white/10 placeholder:text-muted-foreground/50',
                    'focus:border-primary/60 focus:ring-primary/20 transition-all duration-200',
                    'rounded-xl resize-none'
                  )}
                />
              </FormControl>
              <AnimatePresence>
                {form.formState.errors.message && (
                  <motion.div initial={{ opacity: 0, y: -4 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -4 }}>
                    <FormMessage />
                  </motion.div>
                )}
              </AnimatePresence>
            </FormItem>
          )}
        />

        {/* Submit */}
        <motion.div whileHover={{ scale: 1.01 }} whileTap={{ scale: 0.99 }}>
          <Button
            type="submit"
            disabled={isSubmitting}
            className={cn(
              'w-full h-12 rounded-xl font-semibold text-base relative overflow-hidden',
              'bg-primary hover:bg-primary/90',
              'shadow-lg shadow-primary/25 hover:shadow-primary/40',
              'transition-all duration-300'
            )}
          >
            <AnimatePresence mode="wait">
              {isSubmitting ? (
                <motion.span
                  key="loading"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="flex items-center gap-2"
                >
                  <Loader2 className="h-4 w-4 animate-spin" />
                  Sending your message...
                </motion.span>
              ) : (
                <motion.span
                  key="send"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="flex items-center gap-2"
                >
                  <Send className="h-4 w-4" />
                  Send Message
                </motion.span>
              )}
            </AnimatePresence>
            {/* Shimmer */}
            {!isSubmitting && (
              <motion.span
                className="absolute inset-0 bg-gradient-to-r from-transparent via-white/15 to-transparent -skew-x-12"
                initial={{ x: '-100%' }}
                animate={{ x: '200%' }}
                transition={{ duration: 2.5, repeat: Infinity, repeatDelay: 2, ease: 'linear' }}
              />
            )}
          </Button>
        </motion.div>

        <p className="text-center text-xs text-muted-foreground/60 pt-1">
          We typically respond within 24 hours. Your data is kept private.
        </p>
      </form>
    </Form>
  );
}
