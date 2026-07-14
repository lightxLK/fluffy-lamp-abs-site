import type { ReactNode } from 'react';
import BorderGlow from './BorderGlow';

interface CardGlowProps {
  children: ReactNode;
  className?: string;
  borderRadius?: number;
}

export function CardGlow({ children, className = '', borderRadius = 10 }: CardGlowProps) {
  return (
    <BorderGlow
      className={className}
      backgroundColor="var(--abs-bg-card)"
      borderRadius={borderRadius}
      glowColor="230 90 45"
      colors={['#0B3ECF', '#3667F4', '#0931A4']}
      glowRadius={45}
      glowIntensity={1.3}
      edgeSensitivity={30}
    >
      {children}
    </BorderGlow>
  );
}
