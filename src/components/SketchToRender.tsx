import { useEffect, useRef } from 'react';

interface SketchToRenderProps {
  sketchSrc: string;
  renderSrc: string;
}

export default function SketchToRender({ sketchSrc, renderSrc }: SketchToRenderProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    const canvas = canvasRef.current;
    if (!container || !canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let revealX = 0;
    let smoothRevealX = 0;
    let targetRevealX = 0;
    let sketchImg: HTMLImageElement | null = null;
    let renderImg: HTMLImageElement | null = null;
    let running = true;
    let rafId: number;

    function loadImage(src: string): Promise<HTMLImageElement> {
      return new Promise((resolve, reject) => {
        const img = new Image();
        img.crossOrigin = 'anonymous';
        img.onload = () => resolve(img);
        img.onerror = reject;
        img.src = src;
      });
    }

    function resize() {
      const rect = container!.getBoundingClientRect();
      canvas!.width = rect.width;
      canvas!.height = rect.height;
    }

    function draw() {
      if (!ctx || !sketchImg || !renderImg) return;
      const w = canvas!.width;
      const h = canvas!.height;

      ctx.clearRect(0, 0, w, h);
      ctx.drawImage(sketchImg, 0, 0, w, h);

      if (revealX > 0) {
        ctx.save();
        ctx.beginPath();
        ctx.rect(0, 0, w * revealX, h);
        ctx.clip();
        ctx.drawImage(renderImg, 0, 0, w, h);
        ctx.restore();

        // Divider line
        ctx.strokeStyle = 'rgba(26, 26, 26, 0.3)';
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.moveTo(w * revealX, 0);
        ctx.lineTo(w * revealX, h);
        ctx.stroke();
      }
    }

    function animate() {
      if (!running) return;
      smoothRevealX += (targetRevealX - smoothRevealX) * 0.08;
      revealX = smoothRevealX;
      draw();
      rafId = requestAnimationFrame(animate);
    }

    function handleMouseMove(e: MouseEvent) {
      const rect = canvas!.getBoundingClientRect();
      targetRevealX = Math.max(0, Math.min(1, (e.clientX - rect.left) / rect.width));
    }

    function handleTouchMove(e: TouchEvent) {
      e.preventDefault();
      const rect = canvas!.getBoundingClientRect();
      targetRevealX = Math.max(0, Math.min(1, (e.touches[0].clientX - rect.left) / rect.width));
    }

    resize();
    window.addEventListener('resize', resize);
    canvas.addEventListener('mousemove', handleMouseMove);
    canvas.addEventListener('touchmove', handleTouchMove, { passive: false });

    Promise.all([loadImage(sketchSrc), loadImage(renderSrc)])
      .then(([sketch, render]) => {
        sketchImg = sketch;
        renderImg = render;
        targetRevealX = 0.5;
        animate();
      })
      .catch(console.error);

    return () => {
      running = false;
      cancelAnimationFrame(rafId);
      window.removeEventListener('resize', resize);
      canvas.removeEventListener('mousemove', handleMouseMove);
      canvas.removeEventListener('touchmove', handleTouchMove);
    };
  }, [sketchSrc, renderSrc]);

  return (
    <div
      ref={containerRef}
      style={{
        position: 'absolute',
        right: 0,
        top: 0,
        width: '55%',
        height: '100%',
        boxShadow: '-20px 0 60px rgba(0,0,0,0.08)',
      }}
    >
      <canvas
        ref={canvasRef}
        style={{
          display: 'block',
          width: '100%',
          height: '100%',
          cursor: 'ew-resize',
          touchAction: 'none',
        }}
      />
    </div>
  );
}
