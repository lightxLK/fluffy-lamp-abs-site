import { render } from '@testing-library/react';
import { FurnaceScene } from '@/components/svg/scenes/FurnaceScene';
import { RollingMillScene } from '@/components/svg/scenes/RollingMillScene';
import { ShutterProfileScene } from '@/components/svg/scenes/ShutterProfileScene';
import { CoilUnrollScene } from '@/components/svg/scenes/CoilUnrollScene';
import { FactoryFloorScene } from '@/components/svg/scenes/FactoryFloorScene';
import { GatePergolaScene } from '@/components/svg/scenes/GatePergolaScene';
import { EastIndiaMapScene } from '@/components/svg/scenes/EastIndiaMapScene';
import { ABSLogoOutlineScene } from '@/components/svg/scenes/ABSLogoOutlineScene';

const SCENES = [
  ['FurnaceScene', FurnaceScene],
  ['RollingMillScene', RollingMillScene],
  ['ShutterProfileScene', ShutterProfileScene],
  ['CoilUnrollScene', CoilUnrollScene],
  ['FactoryFloorScene', FactoryFloorScene],
  ['GatePergolaScene', GatePergolaScene],
  ['EastIndiaMapScene', EastIndiaMapScene],
  ['ABSLogoOutlineScene', ABSLogoOutlineScene],
] as const;

describe('SVG Scenes', () => {
  SCENES.forEach(([name, Scene]) => {
    it(`${name} renders an accessible SVG`, () => {
      const { container } = render(<Scene />);
      const svg = container.querySelector('svg');
      expect(svg).toBeInTheDocument();
      expect(svg).toHaveAttribute('aria-hidden', 'true');
    });

    it(`${name} contains .abs-path elements`, () => {
      const { container } = render(<Scene />);
      expect(container.querySelectorAll('.abs-path').length).toBeGreaterThan(0);
    });

    it(`${name} contains no <text> elements`, () => {
      const { container } = render(<Scene />);
      expect(container.querySelectorAll('text').length).toBe(0);
    });
  });
});
