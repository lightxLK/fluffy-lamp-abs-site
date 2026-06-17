import Lenis from 'lenis';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { gsap } from 'gsap';

export function createLenis(): { lenis: Lenis; cleanup: () => void } {
  const lenis = new Lenis({ lerp: 0.1, smoothWheel: true });
  lenis.on('scroll', ScrollTrigger.update);
  const tickerCallback = (time: number) => lenis.raf(time * 1000);
  gsap.ticker.add(tickerCallback);
  gsap.ticker.lagSmoothing(0);
  return {
    lenis,
    cleanup: () => {
      lenis.destroy();
      gsap.ticker.remove(tickerCallback);
    },
  };
}
