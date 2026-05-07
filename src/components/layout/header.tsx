
'use client';

import Link from 'next/link';
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { Menu, X, TrendingUp } from 'lucide-react';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';

const navLinks = [
  { href: '/services', label: 'Services' },
  { href: '/portfolio', label: 'Portfolio' },
  { href: '/blog', label: 'Blog' },
  { href: '/contact', label: 'Contact' },
];

const calendlyLink = "https://calendly.com/nikhileshswain5/30min?back=1&month=2025-09";

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2">
          <TrendingUp className="h-7 w-7 text-primary" />
          <span className="font-headline text-xl font-bold">Growthincs</span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-6">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={cn(
                "text-sm font-medium transition-colors hover:text-primary",
                pathname.startsWith(link.href) ? "text-primary" : "text-muted-foreground"
              )}
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center space-x-2">
            {/* CTA Button */}
            <Button asChild className="hidden md:inline-flex rounded-full" size="sm">
                <Link href={calendlyLink} target="_blank" rel="noopener noreferrer">
                Book a Call
                </Link>
            </Button>

            {/* Mobile Menu Trigger */}
            <div className="md:hidden">
            <Sheet open={isOpen} onOpenChange={setIsOpen}>
                <SheetTrigger asChild>
                <Button variant="ghost" size="icon">
                    <Menu className="h-6 w-6" />
                    <span className="sr-only">Open menu</span>
                </Button>
                </SheetTrigger>
                <SheetContent side="right" className="w-[300px]">
                    <div className="p-4">
                        <div className="flex justify-between items-center">
                            <Link href="/" className="flex items-center gap-2" onClick={() => setIsOpen(false)}>
                                <TrendingUp className="h-7 w-7 text-primary" />
                                <span className="font-headline text-xl font-bold">Growthincs</span>
                            </Link>
                            <Button variant="ghost" size="icon" onClick={() => setIsOpen(false)}>
                                <X className="h-6 w-6" />
                                <span className="sr-only">Close menu</span>
                            </Button>
                        </div>
                        <nav className="mt-8 flex flex-col space-y-4">
                        {navLinks.map((link) => (
                            <Link
                                key={link.href}
                                href={link.href}
                                onClick={() => setIsOpen(false)}
                                className={cn(
                                    "text-lg font-medium transition-colors hover:text-primary",
                                    pathname.startsWith(link.href) ? "text-primary" : "text-foreground"
                                )}
                            >
                            {link.label}
                            </Link>
                        ))}
                        </nav>
                        <Button asChild className="mt-8 w-full rounded-full">
                            <Link href={calendlyLink} target="_blank" rel="noopener noreferrer">
                                Book a Call
                            </Link>
                        </Button>
                    </div>
                </SheetContent>
            </Sheet>
            </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
