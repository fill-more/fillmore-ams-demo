import { useEffect, useRef } from 'react';
import styled from '@emotion/styled';

const Canvas = styled.canvas`
  position: fixed;
  inset: 0;
  width: 100vw;
  height: 100vh;
  pointer-events: none;
  z-index: 0; /* Below headers; above background */
`;

type Particle = {
  x: number;
  y: number;
  r: number;
  vx: number;
  vy: number;
  blur: number; // base blur
  phase: number; // phase offset for subtle osc
};

function ParticlesOverlay() {
  const ref = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = ref.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const dpr = Math.max(1, Math.min(2, window.devicePixelRatio || 1));

    let width = 0;
    let height = 0;
    let rafId = 0;
    let particles: Particle[] = [];
    // no per-particle lifetime needed; we animate using absolute time

    const resize = () => {
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = Math.floor(width * dpr);
      canvas.height = Math.floor(height * dpr);
      canvas.style.width = width + 'px';
      canvas.style.height = height + 'px';
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

      // Recreate a soft count of particles based on area
      const PARTICLE_COUNT = 18;
      particles = Array.from({ length: PARTICLE_COUNT }).map(() =>
        makeParticle(width, height)
      );
    };

    const makeParticle = (w: number, h: number): Particle => {
      const r = rand(1, 3);
      return {
        x: Math.random() * w,
        y: Math.random() * h,
        r,
        vx: rand(-1.15, 1.15),
        vy: rand(0.02, 1.12), // mostly downward, slow
        blur: rand(0, 6),
        phase: rand(0, Math.PI * 2),
      };
    };

    const rand = (min: number, max: number) =>
      Math.random() * (max - min) + min;

    const step = () => {
      const now = performance.now();
      ctx.clearRect(0, 0, width, height);
      for (const p of particles) {
        p.x += p.vx;
        p.y += p.vy;

        // wrap around edges softly
        if (p.x < -10) p.x = width + 10;
        if (p.x > width + 10) p.x = -10;
        if (p.y > height + 10) p.y = -10;

        // Gentle persistent oscillation for alpha and blur
        const osc = 0.7 + 0.3 * Math.sin(p.phase + now * 0.0008); // 0.4..1 range after scaling
        const alpha = 0.5 * osc; // constant base alpha, oscillated
        const blur = Math.max(
          0,
          p.blur * (0.6 + 0.4 * osc) + 2 * Math.sin(p.phase + now * 0.001)
        );

        ctx.save();
        ctx.globalAlpha = alpha;
        ctx.fillStyle = '#ffffff';
        ctx.filter = `blur(${blur}px)`;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();
      }
      rafId = requestAnimationFrame(step);
    };

    resize();
    step();
    window.addEventListener('resize', resize);
    return () => {
      window.removeEventListener('resize', resize);
      cancelAnimationFrame(rafId);
    };
  }, []);

  return <Canvas ref={ref} aria-hidden="true" />;
}

export default ParticlesOverlay;
