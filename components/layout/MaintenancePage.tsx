'use client';

import { useEffect, useState } from 'react';
import Counter from '@/components/ui/Counter';
import SplitText from '@/components/ui/SplitText';
import { getCountdown, isLaunched, type Countdown } from '@/lib/maintenance';
import { HERO_QUOTES, shuffleHeroQuoteOrder } from '@/lib/heroQuotes';

// Deliberately deeper than the --color-abs-blue token — a one-off backdrop
// for this page rather than a reusable brand color.
const MAINTENANCE_BG = '#011152';

const QUOTE_INTERVAL_MS = 4500;

interface QuoteSession {
  order: number[];
  pos: number;
}

// Cycles through a freshly shuffled order each lap, so every quote appears
// once before any repeat, instead of independent random picks that can
// repeat back-to-back.
function useRotatingHeroQuote(): string {
  const [session, setSession] = useState<QuoteSession>(() => ({
    order: shuffleHeroQuoteOrder(),
    pos: 0,
  }));

  useEffect(() => {
    const interval = setInterval(() => {
      setSession((prev) => {
        const nextPos = prev.pos + 1;
        if (nextPos >= prev.order.length) {
          return { order: shuffleHeroQuoteOrder(), pos: 0 };
        }
        return { order: prev.order, pos: nextPos };
      });
    }, QUOTE_INTERVAL_MS);

    return () => clearInterval(interval);
  }, []);

  return HERO_QUOTES[session.order[session.pos]];
}

const UNITS: { key: keyof Countdown; singular: string; plural: string }[] = [
  { key: 'days', singular: 'Day', plural: 'Days' },
  { key: 'hours', singular: 'Hour', plural: 'Hours' },
  { key: 'minutes', singular: 'Minute', plural: 'Minutes' },
  { key: 'seconds', singular: 'Second', plural: 'Seconds' },
];

// Once Launch is clicked, the real countdown is abandoned in favor of a
// fixed final countdown — a predictable, short beat before the shutter
// plays, regardless of how much real time is actually left.
const LAUNCH_COUNTDOWN_SECONDS = 10;

// Letters that must all be held down together with Alt (Windows) / Option
// (macOS — reported as the same `altKey` flag by the DOM) to toggle the
// Launch button's visibility. A held-keys set means order doesn't matter,
// only that all three are down at once.
const HIDE_BUTTON_COMBO = ['a', 'b', 's'];

export function MaintenancePage({ onLaunch }: { onLaunch: () => void }) {
  const [countdown, setCountdown] = useState<Countdown>(() => getCountdown());
  const [launching, setLaunching] = useState(false);
  const [launchSecondsLeft, setLaunchSecondsLeft] = useState(LAUNCH_COUNTDOWN_SECONDS);
  // Hidden by default on both dev and prod — Alt/Option+A+B+S reveals it.
  const [buttonHidden, setButtonHidden] = useState(true);
  const quote = useRotatingHeroQuote();

  useEffect(() => {
    if (launching) return;
    const interval = setInterval(() => setCountdown(getCountdown()), 1000);
    return () => clearInterval(interval);
  }, [launching]);

  useEffect(() => {
    const heldKeys = new Set<string>();

    const handleKeyDown = (event: KeyboardEvent) => {
      if (!event.altKey) {
        heldKeys.clear();
        return;
      }
      const key = event.key.toLowerCase();
      if (HIDE_BUTTON_COMBO.includes(key)) heldKeys.add(key);

      if (HIDE_BUTTON_COMBO.every((k) => heldKeys.has(k))) {
        event.preventDefault();
        setButtonHidden((prev) => !prev);
        heldKeys.clear();
      }
    };

    const handleKeyUp = (event: KeyboardEvent) => {
      heldKeys.delete(event.key.toLowerCase());
      if (!event.altKey) heldKeys.clear();
    };

    const clearHeld = () => heldKeys.clear();

    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('keyup', handleKeyUp);
    window.addEventListener('blur', clearHeld);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('keyup', handleKeyUp);
      window.removeEventListener('blur', clearHeld);
    };
  }, []);

  useEffect(() => {
    if (!launching) return;
    if (launchSecondsLeft <= 0) {
      onLaunch();
      return;
    }
    const timeout = setTimeout(() => setLaunchSecondsLeft((s) => s - 1), 1000);
    return () => clearTimeout(timeout);
  }, [launching, launchSecondsLeft, onLaunch]);

  const displayedCountdown: Countdown = launching
    ? { days: 0, hours: 0, minutes: 0, seconds: launchSecondsLeft }
    : countdown;

  // Real launch instant has already passed but this page is still showing
  // (dev toggled back via the Alt/Option+W preview combo) — the countdown
  // would just read all-zero, so swap the label for a live-state message.
  const launched = !launching && isLaunched();

  return (
    <main
      className="relative flex min-h-dvh flex-col items-center justify-center overflow-hidden px-6 py-16 text-white"
      style={{ background: MAINTENANCE_BG }}
    >
      <div aria-hidden className="maintenance-glow pointer-events-none absolute inset-0 z-0" />

      <div className="relative z-10 flex flex-col items-center">
        <img
          src="/abs-nav-footer-full-color.webp"
          alt="Anil Balaji Steel"
          width={642}
          height={464}
          className="h-20 w-auto md:h-24"
        />

        <p className="mt-10 text-xs font-semibold uppercase tracking-[0.3rem] text-white/70">
          {launched ? 'Project Is Now Live' : 'Under Maintenance'}
        </p>

        <SplitText
          key={quote}
          text={quote}
          tag="h1"
          className="mt-4 min-h-[1.3em] max-w-[92vw] whitespace-nowrap! text-[clamp(1.15rem,3.6vw,2.5rem)] font-medium leading-[1.15]"
          splitType="words"
          from={{ opacity: 0, y: 24 }}
          to={{ opacity: 1, y: 0 }}
          duration={1.1}
          delay={70}
          ease="power3.out"
          textAlign="center"
        />

        {!launched && (
          <>
            <div className="mt-12 flex items-start gap-3 md:gap-6">
              {UNITS.map((unit, i) => (
                <div key={unit.key} className="flex items-start gap-3 md:gap-6">
                  <div className="flex flex-col items-center">
                    <Counter
                      value={displayedCountdown[unit.key]}
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
                      {displayedCountdown[unit.key] === 1 ? unit.singular : unit.plural}
                    </span>
                  </div>
                  {i < UNITS.length - 1 && (
                    <span className="pt-1 text-2xl font-bold text-white/40 md:text-4xl">:</span>
                  )}
                </div>
              ))}
            </div>

            <p className="mt-12 text-sm text-white/60">21 August 2026</p>
          </>
        )}

        {/* Hidden by default on both dev and prod — Alt+A+B+S
            (Option+A+B+S on macOS) reveals it, so it's never visible to an
            ordinary visitor and only shows up for whoever holds the combo. */}
        {!buttonHidden && (
          <button
            type="button"
            onClick={() => setLaunching(true)}
            disabled={launching}
            className="mt-10 rounded-full border border-white/30 bg-white/10 px-8 py-3 text-sm font-semibold uppercase tracking-[0.2rem] text-white transition hover:bg-white/20 disabled:cursor-not-allowed disabled:opacity-60"
          >
            {launching ? 'Launching…' : 'Launch'}
          </button>
        )}
      </div>
    </main>
  );
}
