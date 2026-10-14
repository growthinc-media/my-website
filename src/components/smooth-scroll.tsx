'use client';

import { useEffect } from 'react';

/**
 * SmoothScroll — Lenis-based smooth scrolling.
 * - Always active in all directions, at all scroll positions
 * - Desktop: lerp 0.08 (buttery smooth)
 * - Tablet:  lerp 0.12 (slightly snappier)
 * - Mobile:  lerp 0.15 (responsive but still smooth)
 */
export function SmoothScroll({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    let lenis: any = null;

    import('lenis').then(({ default: Lenis }) => {
      const isMobile = window.innerWidth < 768;
      const isTablet = window.innerWidth >= 768 && window.innerWidth < 1024;

      const lerp = isMobile ? 0.15 : isTablet ? 0.12 : 0.08;

      lenis = new Lenis({
        lerp,
        // Let Lenis manage its own RAF loop — most reliable
        autoRaf: true,
        // Smooth wheel on all devices
        smoothWheel: true,
        // Touch multiplier for mobile/tablet feel
        touchMultiplier: isMobile ? 2 : 1.5,
        // No limit — works in both directions always
        infinite: false,
        // Sync with framer-motion scroll
        syncTouch: isMobile,
      });

      // Make globally accessible for debugging
      (window as any).__lenis = lenis;

      // Handle anchor links
      const handleAnchorClick = (e: Event) => {
        const anchor = (e.currentTarget as HTMLAnchorElement);
        const href = anchor.getAttribute('href');
        if (href?.startsWith('#')) {
          e.preventDefault();
          const target = document.querySelector(href);
          if (target) lenis.scrollTo(target, { offset: -80, duration: 1.2 });
        }
      };

      document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
        anchor.addEventListener('click', handleAnchorClick);
      });

      return () => {
        document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
          anchor.removeEventListener('click', handleAnchorClick);
        });
      };
    });

    return () => {
      if (lenis) {
        lenis.destroy();
        lenis = null;
        delete (window as any).__lenis;
      }
    };
  }, []);

  return <>{children}</>;
}
