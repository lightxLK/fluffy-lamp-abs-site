import type { ReactNode } from 'react';
import { ForceDarkTheme } from '@/components/layout/ForceDarkTheme';

export default function FabricaExperienceLayout({ children }: { children: ReactNode }) {
  return (
    <>
      {/* Blocking script: runs before this route's content paints, so a
          direct/hard load never flashes the site-wide light theme before
          ForceDarkTheme's effect can remove it. */}
      <script
        dangerouslySetInnerHTML={{ __html: `document.documentElement.classList.remove('light');` }}
      />
      <ForceDarkTheme />
      {children}
    </>
  );
}
