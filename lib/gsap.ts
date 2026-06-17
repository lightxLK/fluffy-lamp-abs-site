import { gsap } from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { DrawSVGPlugin } from 'gsap/DrawSVGPlugin';
import { SplitText } from 'gsap/SplitText';
import { Observer } from 'gsap/Observer';
import { CustomEase } from 'gsap/CustomEase';

export function registerGSAP() {
  gsap.registerPlugin(useGSAP, ScrollTrigger, DrawSVGPlugin, SplitText, Observer, CustomEase);
}

export { gsap, useGSAP, ScrollTrigger, DrawSVGPlugin, SplitText, Observer, CustomEase };
