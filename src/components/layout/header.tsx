'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { Menu, X, ArrowUpRight } from 'lucide-react';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';
import { motion, AnimatePresence } from 'framer-motion';

const navLinks = [
  { href: '/services', label: 'Services' },
  { href: '/portfolio', label: 'Portfolio' },
  { href: '/blog', label: 'Blog' },
  { href: '/contact', label: 'Contact' },
];

const calendlyLink = 'https://calendly.com/nikhileshswain5/30min?back=1&month=2025-09';

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header
      className={cn(
        'sticky top-0 z-50 w-full transition-all duration-300',
        scrolled
          ? 'border-b border-white/10 bg-background/80 backdrop-blur-xl shadow-lg shadow-black/20'
          : 'border-b border-transparent bg-background/40 backdrop-blur-md'
      )}
    >
      <div className="container mx-auto flex h-16 items-center justify-between px-4">

        {/* Logo */}
        <Link href="/" className="flex items-center gap-3 group">
          {/* White container so logo is always visible on dark bg */}
          <div className="relative flex-shrink-0 rounded-lg bg-white p-1.5 shadow-md shadow-black/30 transition-transform duration-300 group-hover:scale-105">
            <Image
              src="/GrothincsNewUpdatedlogosmall.png"
              alt="Growthincs Logo"
              width={32}
              height={32}
              className="h-8 w-8 object-contain"
              priority
            />
          </div>
          <span className="font-headline text-lg font-bold text-foreground hidden sm:block">
            Growthincs
          </span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-1">
          {navLinks.map((link) => {
            const isActive = pathname === link.href || pathname.startsWith(link.href + '/');
            return (
              <Link
                key={link.href}
                href={link.href}
                className={cn(
                  'relative px-4 py-2 text-sm font-medium rounded-md transition-colors duration-200 group',
                  isActive
                    ? 'text-primary'
                    : 'text-muted-foreground hover:text-foreground'
                )}
              >
                {link.label}
                <span
                  className={cn(
                    'absolute bottom-0.5 left-1/2 -translate-x-1/2 h-0.5 rounded-full bg-primary transition-all duration-300',
                    isActive ? 'w-4/5 opacity-100' : 'w-0 opacity-0 group-hover:w-4/5 group-hover:opacity-100'
                  )}
                />
              </Link>
            );
          })}
        </nav>

        {/* Desktop CTA */}
        <div className="hidden md:flex items-center gap-3">
          <motion.a
            href={calendlyLink}
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            className={cn(
              'inline-flex items-center gap-1.5 px-5 py-2 rounded-full text-sm font-semibold',
              'bg-primary text-primary-foreground',
              'shadow-lg shadow-primary/25 hover:shadow-primary/40',
              'transition-all duration-300 hover:brightness-110',
              'relative overflow-hidden'
            )}
          >
            <span>Book a Call</span>
            <ArrowUpRight className="h-3.5 w-3.5" />
            <motion.span
              className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -skew-x-12"
              initial={{ x: '-100%' }}
              animate={{ x: '200%' }}
              transition={{ duration: 2, repeat: Infinity, repeatDelay: 3, ease: 'linear' }}
            />
          </motion.a>
        </div>

        {/* Mobile Menu */}
        <Sheet open={isOpen} onOpenChange={setIsOpen}>
          <SheetTrigger asChild className="md:hidden">
            <Button variant="ghost" size="icon" className="h-9 w-9">
              <AnimatePresence mode="wait" initial={false}>
                {isOpen ? (
                  <motion.div key="close" initial={{ rotate: -90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: 90, opacity: 0 }} transition={{ duration: 0.15 }}>
                    <X className="h-5 w-5" />
                  </motion.div>
                ) : (
                  <motion.div key="menu" initial={{ rotate: 90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: -90, opacity: 0 }} transition={{ duration: 0.15 }}>
                    <Menu className="h-5 w-5" />
                  </motion.div>
                )}
              </AnimatePresence>
            </Button>
          </SheetTrigger>
          <SheetContent side="right" className="w-full max-w-xs border-l border-white/10 bg-background/95 backdrop-blur-xl p-0">
            <div className="flex flex-col h-full p-6">
              {/* Mobile Logo */}
              <Link href="/" onClick={() => setIsOpen(false)} className="flex items-center gap-3 mb-10">
                <div className="rounded-lg bg-white p-1.5 shadow-md">
                  <Image src="/GrothincsNewUpdatedlogosmall.png" alt="Growthincs" width={28} height={28} className="h-7 w-7 object-contain" />
                </div>
                <span className="font-headline text-lg font-bold">Growthincs</span>
              </Link>

              {/* Mobile Nav Links */}
              <nav className="flex flex-col gap-1">
                {navLinks.map((link, i) => {
                  const isActive = pathname === link.href;
                  return (
                    <motion.div
                      key={link.href}
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: i * 0.07, duration: 0.3 }}
                    >
                      <Link
                        href={link.href}
                        onClick={() => setIsOpen(false)}
                        className={cn(
                          'flex items-center justify-between px-4 py-3 rounded-xl text-base font-medium transition-all duration-200',
                          isActive
                            ? 'bg-primary/10 text-primary'
                            : 'text-muted-foreground hover:bg-white/5 hover:text-foreground'
                        )}
                      >
                        {link.label}
                        <ArrowUpRight className="h-4 w-4 opacity-50" />
                      </Link>
                    </motion.div>
                  );
                })}
              </nav>

              {/* Mobile CTA */}
              <div className="mt-auto">
                <a
                  href={calendlyLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => setIsOpen(false)}
                  className="flex items-center justify-center gap-2 w-full px-5 py-3 rounded-full bg-primary text-primary-foreground font-semibold shadow-lg shadow-primary/30 hover:brightness-110 transition-all duration-200"
                >
                  Book a Free Call
                  <ArrowUpRight className="h-4 w-4" />
                </a>
              </div>
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </header>
  );
};

export default Header;
