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
      colors={['#0B3ECF', '#3667F4', '#0931A4']}
      glowRadius={20}
      glowIntensity={0.9}
      edgeSensitivity={30}
    >
      {children}
    </BorderGlow>
  );
}
