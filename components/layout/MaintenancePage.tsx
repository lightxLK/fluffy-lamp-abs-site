'use client';

import { useEffect, useState } from 'react';
import Counter from '@/components/ui/Counter';
import LightRays from '@/components/ui/LightRays';
import { getCountdown, type Countdown } from '@/lib/maintenance';

// Deliberately deeper than the --color-abs-blue token — a one-off backdrop
// for this page rather than a reusable brand color.
const MAINTENANCE_BG = '#011152';

const UNITS: { key: keyof Countdown; label: string }[] = [
  { key: 'days', label: 'Days' },
  { key: 'hours', label: 'Hours' },
  { key: 'minutes', label: 'Minutes' },
  { key: 'seconds', label: 'Seconds' },
];

export function MaintenancePage() {
  const [countdown, setCountdown] = useState<Countdown>(() => getCountdown());

  useEffect(() => {
    const interval = setInterval(() => setCountdown(getCountdown()), 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <main
      className="relative flex min-h-dvh flex-col items-center justify-center overflow-hidden px-6 py-16 text-white"
      style={{ background: MAINTENANCE_BG }}
    >
      <div aria-hidden className="absolute inset-0 z-0">
        <LightRays
          raysOrigin="top-center"
          raysColor="#3667f4"
          raysSpeed={0.8}
          lightSpread={0.65}
          rayLength={1.4}
          fadeDistance={0.9}
          saturation={0.7}
          followMouse
          mouseInfluence={0.12}
          noiseAmount={0.06}
          distortion={0.03}
        />
      </div>

      <div className="relative z-10 flex flex-col items-center">
        <img
          src="/abs-nav-footer-full-color.png"
          alt="Anil Balaji Steel"
          width={642}
          height={464}
          className="h-20 w-auto md:h-24"
        />

        <p className="mt-10 text-xs font-semibold uppercase tracking-[0.3rem] text-white/70">
          Under Maintenance
        </p>

        <h1 className="mt-4 max-w-2xl text-center text-[clamp(1.75rem,5vw,3.25rem)] font-bold leading-[1.15]">
          Something big is coming.
        </h1>

        <div className="mt-12 flex items-start gap-3 md:gap-6">
          {UNITS.map((unit, i) => (
            <div key={unit.key} className="flex items-start gap-3 md:gap-6">
              <div className="flex flex-col items-center">
                <Counter
                  value={countdown[unit.key]}
                  places={[10, 1]}
                  fontSize={40}
                  gap={2}
                  horizontalPadding={0}
                  textColor="#ffffff"
                  fontWeight={700}
                  gradientHeight={10}
                  gradientFrom="rgba(1,17,82,0.5)"
                  gradientTo="rgba(1,17,82,0)"
                  containerStyle={{ fontVariantNumeric: 'tabular-nums' }}
                />
                <span className="mt-2 text-[0.65rem] font-semibold uppercase tracking-[0.2rem] text-white/60 md:text-xs">
                  {unit.label}
                </span>
              </div>
              {i < UNITS.length - 1 && (
                <span className="pt-1 text-2xl font-bold text-white/40 md:text-4xl">:</span>
              )}
            </div>
          ))}
        </div>

        <p className="mt-12 text-sm text-white/60">21 August 2026, 7:30 PM IST</p>
      </div>
    </main>
  );
}
