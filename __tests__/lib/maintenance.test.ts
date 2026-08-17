import { LAUNCH_AT, getCountdown, isLaunched } from '@/lib/maintenance';

describe('isLaunched', () => {
  it('is false before the launch timestamp', () => {
    expect(isLaunched(new Date(LAUNCH_AT.getTime() - 1000))).toBe(false);
  });

  it('is true at and after the launch timestamp', () => {
    expect(isLaunched(new Date(LAUNCH_AT.getTime()))).toBe(true);
    expect(isLaunched(new Date(LAUNCH_AT.getTime() + 1000))).toBe(true);
  });
});

describe('getCountdown', () => {
  it('breaks down the remaining time into days/hours/minutes/seconds', () => {
    const oneDayTwoHoursThreeMinFourSecBefore = new Date(
      LAUNCH_AT.getTime() - ((1 * 24 + 2) * 3600 + 3 * 60 + 4) * 1000,
    );

    expect(getCountdown(oneDayTwoHoursThreeMinFourSecBefore)).toEqual({
      days: 1,
      hours: 2,
      minutes: 3,
      seconds: 4,
    });
  });

  it('clamps to zero once launch has passed', () => {
    expect(getCountdown(new Date(LAUNCH_AT.getTime() + 3600_000))).toEqual({
      days: 0,
      hours: 0,
      minutes: 0,
      seconds: 0,
    });
  });
});
