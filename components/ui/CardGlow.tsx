import type { ReactNode } from 'react';
import BorderGlow from './BorderGlow';

interface CardGlowProps {
  children: ReactNode;
  className?: string;
}

export function CardGlow({ children, className = '' }: CardGlowProps) {
  return (
    <BorderGlow
      className={className}
      backgroundColor="#1d1d1d"
      borderRadius={0}
      glowColor="230 90 45"
      colors={['#0624CB', '#3B55E6', '#0419A0']}
      glowRadius={20}
      glowIntensity={0.9}
      edgeSensitivity={30}
    >
      {children}
    </BorderGlow>
  );
}
