
'use client';

import { useEffect, useRef } from 'react';
import { useInView, useMotionValue, useSpring } from 'framer-motion';
import { cn } from '@/lib/utils';

type AnimatedMetricProps = {
  value: number;
  prefix?: string;
  suffix?: string;
  className?: string;
};

export function AnimatedMetric({ value, prefix = '', suffix = '', className }: AnimatedMetricProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const motionValue = useMotionValue(0);
  const springValue = useSpring(motionValue, {
    damping: 100,
    stiffness: 100,
  });
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  useEffect(() => {
    if (isInView) {
      motionValue.set(value);
    }
  }, [motionValue, isInView, value]);

  useEffect(() => {
    const unsubscribe = springValue.on('change', (latest) => {
      if (ref.current) {
        // Handle floating point numbers by rounding to a reasonable precision
        const formattedValue =
          value % 1 !== 0 ? latest.toFixed(1) : Math.round(latest).toLocaleString();
        ref.current.textContent = `${prefix}${formattedValue}${suffix}`;
      }
    });
    return unsubscribe;
  }, [springValue, prefix, suffix, value]);

  return <span ref={ref} className={cn(className)} />;
}
