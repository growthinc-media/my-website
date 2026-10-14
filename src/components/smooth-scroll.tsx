'use client';

import { useEffect, useRef } from 'react';

/**
 * SmoothScroll — Lenis-based smooth scrolling with device-adaptive intensity.
 *
 * Intensity (lerp):
 *  - Desktop  : 0.08  → buttery smooth
 *  - Tablet   : 0.12  → slightly snappier
 *  - Mobile   : native momentum scroll (Lenis disabled — iOS/Android already have smooth inertia)
 */
export function SmoothScroll({ children }: { children: React.ReactNode }) {
  const lenisRef = useRef<any>(null);

  useEffect(() => {
    // Detect touch devices (mobile/tablet)
    const isTouchDevice = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
    const isSmallTablet = window.innerWidth < 1024;

    // On mobile, let native scroll handle it (iOS momentum is already great)
    if (isTouchDevice && window.innerWidth < 768) {
      // Apply CSS smooth-scroll for anchor links on mobile
      document.documentElement.style.scrollBehavior = 'smooth';
      return;
    }

    // Dynamic import so it's only loaded client-side
    import('lenis').then(({ default: Lenis }) => {
      const lerp = isTouchDevice && isSmallTablet ? 0.12 : 0.08;

      const lenis = new Lenis({
        lerp,
        smoothWheel: true,
        wheelMultiplier: 1.0,
        touchMultiplier: isTouchDevice ? 1.8 : 1.0,
        infinite: false,
        autoRaf: false,
      });

      lenisRef.current = lenis;

      // Expose lenis instance globally for Framer Motion scroll sync
      (window as any).__lenis = lenis;

      let rafId: number;
      function raf(time: number) {
        lenis.raf(time);
        rafId = requestAnimationFrame(raf);
      }
      rafId = requestAnimationFrame(raf);

      // Handle anchor links
      document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
        anchor.addEventListener('click', (e) => {
          e.preventDefault();
          const target = document.querySelector((anchor as HTMLAnchorElement).getAttribute('href') || '');
          if (target) lenis.scrollTo(target as HTMLElement, { offset: -80 });
        });
      });

      return () => {
        cancelAnimationFrame(rafId);
        lenis.destroy();
        lenisRef.current = null;
        delete (window as any).__lenis;
      };
    });
  }, []);

  return <>{children}</>;
}
