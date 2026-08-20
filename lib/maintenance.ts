// Launch target: 21 Aug 2026, 19:00 IST (UTC+5:30). ISO offset makes this
// timezone-correct regardless of the visitor's or server's local timezone.
export const LAUNCH_AT = new Date('2026-08-21T19:00:00+05:30');

export function isLaunched(now: Date = new Date()): boolean {
  return now.getTime() >= LAUNCH_AT.getTime();
}

export interface Countdown {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

export function getCountdown(now: Date = new Date()): Countdown {
  const diffMs = Math.max(0, LAUNCH_AT.getTime() - now.getTime());
  const totalSeconds = Math.floor(diffMs / 1000);

  return {
    days: Math.floor(totalSeconds / 86400),
    hours: Math.floor((totalSeconds % 86400) / 3600),
    minutes: Math.floor((totalSeconds % 3600) / 60),
    seconds: totalSeconds % 60,
  };
}
