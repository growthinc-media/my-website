'use client';

import Link from 'next/link';
import Image from 'next/image';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Twitter, Linkedin, Instagram, Facebook, Mail, MapPin, Loader2, CheckCircle2 } from 'lucide-react';
import { useState, useRef } from 'react';
import { handleNewsletterSubscribe } from '@/app/newsletter/actions';

const Footer = () => {
  const currentYear = new Date().getFullYear();
  const [subState, setSubState] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [subMsg, setSubMsg] = useState('');
  const formRef = useRef<HTMLFormElement>(null);

  async function onSubscribe(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setSubState('loading');
    setSubMsg('');
    const formData = new FormData(e.currentTarget);
    const result = await handleNewsletterSubscribe(formData);
    if (result.success) {
      setSubState('success');
      setSubMsg(result.message);
      formRef.current?.reset();
    } else {
      setSubState('error');
      setSubMsg(result.message);
    }
  }

  const navLinks = [
    { href: '/services', label: 'Services' },
    { href: '/portfolio', label: 'Portfolio' },
    { href: '/blog', label: 'Blog' },
    { href: '/contact', label: 'Contact' },
  ];

  const legalLinks = [
    { href: '/privacy-policy', label: 'Privacy Policy' },
    { href: '/terms-of-service', label: 'Terms of Service' },
    { href: '/service-agreement', label: 'Service Agreement' },
  ];

  const socialLinks = [
    { href: '#', icon: Twitter, label: 'Twitter' },
    { href: '#', icon: Linkedin, label: 'LinkedIn' },
    { href: '#', icon: Instagram, label: 'Instagram' },
    { href: '#', icon: Facebook, label: 'Facebook' },
  ];

  return (
    <footer className="bg-white border-t border-gray-100">
      <div className="container mx-auto px-4 py-12 md:py-16">
        <div className="grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-12">

          {/* Brand â€” Logo + tagline + newsletter */}
          <div className="lg:col-span-4">
            {/* Same logo as header */}
            <Link href="/" className="inline-block mb-4">
              <Image
                src="/GrothincsNewUpdatedlogosmall.png"
                alt="Growthincs"
                width={140}
                height={44}
                className="h-11 w-auto object-contain"
              />
            </Link>
            <p className="text-sm text-gray-500 leading-relaxed max-w-xs">
              Your partner in digital growth. We deliver results, not just reports.
            </p>

            {/* Contact info */}
            <div className="mt-5 space-y-2">
              <a href="mailto:contact@growthincs.in" className="flex items-center gap-2 text-sm text-gray-500 hover:text-blue-600 transition-colors">
                <Mail className="h-4 w-4 shrink-0 text-blue-500" />
                contact@growthincs.in
              </a>
              <div className="flex items-center gap-2 text-sm text-gray-500">
                <MapPin className="h-4 w-4 shrink-0 text-blue-500" />
                Bhubaneswar, Odisha, India
              </div>
            </div>

            {/* Newsletter */}
            <div className="mt-6">
              <p className="text-sm font-semibold text-gray-700 mb-2">Stay updated with our insights</p>

              {subState === 'success' ? (
                <div className="flex items-center gap-2 text-sm text-green-600 font-medium">
                  <CheckCircle2 className="h-4 w-4" />
                  {subMsg}
                </div>
              ) : (
                <form ref={formRef} onSubmit={onSubscribe} className="flex w-full max-w-xs items-center gap-2">
                  <Input
                    type="email"
                    name="email"
                    placeholder="Your email"
                    required
                    disabled={subState === 'loading'}
                    className="flex-1 h-9 text-sm border-gray-200 bg-gray-50 focus:border-blue-400 focus:ring-blue-400/20"
                  />
                  <Button
                    type="submit"
                    size="sm"
                    disabled={subState === 'loading'}
                    className="h-9 bg-blue-600 hover:bg-blue-700 text-white text-xs px-3 shrink-0"
                  >
                    {subState === 'loading' ? (
                      <Loader2 className="h-3.5 w-3.5 animate-spin" />
                    ) : (
                      'Subscribe'
                    )}
                  </Button>
                </form>
              )}

              {subState === 'error' && (
                <p className="mt-1.5 text-xs text-red-500">{subMsg}</p>
              )}
            </div>
          </div>

          {/* Navigation */}
          <div className="lg:col-span-2 lg:col-start-6">
            <h4 className="text-sm font-semibold text-gray-900 uppercase tracking-wider mb-4">Navigation</h4>
            <ul className="space-y-2.5">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-gray-500 hover:text-blue-600 transition-colors duration-200"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal */}
          <div className="lg:col-span-3">
            <h4 className="text-sm font-semibold text-gray-900 uppercase tracking-wider mb-4">Legal</h4>
            <ul className="space-y-2.5">
              {legalLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-gray-500 hover:text-blue-600 transition-colors duration-200"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Social */}
          <div className="lg:col-span-2">
            <h4 className="text-sm font-semibold text-gray-900 uppercase tracking-wider mb-4">Follow Us</h4>
            <div className="flex flex-wrap gap-3">
              {socialLinks.map(({ href, icon: Icon, label }) => (
                <a
                  key={label}
                  href={href}
                  aria-label={label}
                  className="flex h-9 w-9 items-center justify-center rounded-full border border-gray-200 text-gray-400 hover:border-blue-500 hover:text-blue-600 hover:bg-blue-50 transition-all duration-200"
                >
                  <Icon className="h-4 w-4" />
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-12 pt-6 border-t border-gray-100 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-xs text-gray-400">
            &copy; {currentYear} Growthincs. All rights reserved.
          </p>
          <p className="text-xs text-gray-400">
            India&apos;s Leading Marketing Company
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
