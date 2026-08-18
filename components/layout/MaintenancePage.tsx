'use client';

import { useEffect, useState } from 'react';
import Counter from '@/components/ui/Counter';
import { getCountdown, type Countdown } from '@/lib/maintenance';

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
    <main className="relative flex min-h-dvh flex-col items-center justify-center overflow-hidden bg-abs-blue px-6 py-16 text-white">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(255,255,255,0.12),transparent_60%)]"
      />

      <img
        src="/abs-nav-footer-light.webp"
        alt="Anil Balaji Steel"
        width={320}
        height={226}
        className="relative h-16 w-auto md:h-20"
      />

      <p className="relative mt-10 text-xs font-semibold uppercase tracking-[0.3rem] text-white/70">
        Under Maintenance
      </p>

      <h1 className="relative mt-4 max-w-2xl text-center text-[clamp(1.75rem,5vw,3.25rem)] font-bold leading-[1.15]">
        Something big is coming.
      </h1>

      <p className="relative mt-4 max-w-md text-center text-base text-white/80 md:text-lg">
        We&apos;re rebuilding the Anil Balaji Steel experience. Back online soon.
      </p>

      <div className="relative mt-12 flex items-start gap-3 md:gap-6">
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
                gradientHeight={0}
                gradientFrom="rgba(11,62,207,1)"
                gradientTo="rgba(11,62,207,0)"
                containerStyle={{ fontVariantNumeric: 'tabular-nums' }}
                counterStyle={{
                  background: 'rgba(255,255,255,0.08)',
                  border: '1px solid rgba(255,255,255,0.16)',
                  borderRadius: 12,
                  paddingTop: 12,
                  paddingBottom: 12,
                }}
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

      <p className="relative mt-12 text-sm text-white/60">Launching 21 August 2026</p>
    </main>
  );
}
