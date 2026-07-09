import Lenis from 'lenis';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { gsap } from 'gsap';

let activeLenis: Lenis | null = null;

/** The page's active Lenis instance, if the provider has mounted one. */
export function getLenis(): Lenis | null {
  return activeLenis;
}

export function createLenis(): { lenis: Lenis; cleanup: () => void } {
  const lenis = new Lenis({ lerp: 0.1, smoothWheel: true });
  activeLenis = lenis;
  lenis.on('scroll', ScrollTrigger.update);
  const tickerCallback = (time: number) => lenis.raf(time * 1000);
  gsap.ticker.add(tickerCallback);
  gsap.ticker.lagSmoothing(0);
  return {
    lenis,
    cleanup: () => {
      lenis.destroy();
      if (activeLenis === lenis) activeLenis = null;
      gsap.ticker.remove(tickerCallback);
    },
  };
}
