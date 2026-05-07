
'use client';

import type { TocItem } from '@/lib/placeholder-data';
import { cn } from '@/lib/utils';
import Link from 'next/link';

type TableOfContentsProps = {
  items: TocItem[];
};

export function TableOfContents({ items }: TableOfContentsProps) {
  return (
    <nav>
      <ul className="space-y-2">
        {items.map((item, index) => (
          <li
            key={index}
            className={cn(
              'text-sm text-muted-foreground transition-colors hover:text-primary',
              {
                'pl-4': item.level === 3,
                'pl-8': item.level === 4,
              }
            )}
          >
            <Link href={item.url}>{item.title}</Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}
