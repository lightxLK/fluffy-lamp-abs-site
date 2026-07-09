'use client';

import Link, { type LinkProps } from 'next/link';
import type { AnchorHTMLAttributes, ReactNode, MouseEvent } from 'react';
import { markHomeSectionExit } from '@/lib/homeReturn';

interface HomeExitLinkProps
  extends LinkProps, Omit<AnchorHTMLAttributes<HTMLAnchorElement>, keyof LinkProps | 'href'> {
  /** The home page section id this CTA lives in, e.g. "products". */
  sectionId: string;
  children: ReactNode;
}

/**
 * A next/link that remembers which home page section it was clicked from,
 * so returning to "/" can scroll back to that section instead of the top.
 */
export function HomeExitLink({ sectionId, onClick, children, ...props }: HomeExitLinkProps) {
  return (
    <Link
      {...props}
      onClick={(event: MouseEvent<HTMLAnchorElement>) => {
        markHomeSectionExit(sectionId);
        onClick?.(event);
      }}
    >
      {children}
    </Link>
  );
}
