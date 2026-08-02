import { useEffect, useRef } from 'react';

interface DotGridOptions {
  gridSize?: number;
  dotRadius?: number;
  dotColor?: string;
  maxScale?: number;
  influenceRadius?: number;
}

export default function DotGrid({
  gridSize = 30,
  dotRadius = 1.5,
  dotColor = '#FAF9F7',
  maxScale = 3,
  influenceRadius = 150,
}: DotGridOptions) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const isTouchDevice = window.matchMedia('(hover: none)').matches;

    const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
    svg.style.position = 'absolute';
    svg.style.inset = '0';

    const rect = container.getBoundingClientRect();
    const cols = Math.ceil(rect.width / gridSize);
    const rows = Math.ceil(rect.height / gridSize);
    svg.setAttribute('width', String(rect.width));
    svg.setAttribute('height', String(rect.height));

    const dots: SVGCircleElement[] = [];

    for (let y = 0; y <= rows; y++) {
      for (let x = 0; x <= cols; x++) {
        const cx = x * gridSize + gridSize / 2;
        const cy = y * gridSize + gridSize / 2;
        const circle = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
        circle.setAttribute('cx', String(cx));
        circle.setAttribute('cy', String(cy));
        circle.setAttribute('r', String(dotRadius));
        circle.setAttribute('fill', dotColor);
        circle.setAttribute('opacity', '0.3');
        svg.appendChild(circle);
        dots.push(circle);
      }
    }

    container.appendChild(svg);

    if (isTouchDevice) {
      return () => {
        container.removeChild(svg);
      };
    }

    const mouse = { x: -1000, y: -1000 };

    function handleMouseMove(e: MouseEvent) {
      if (!container) return;
      const containerRect = container.getBoundingClientRect();
      mouse.x = e.clientX - containerRect.left;
      mouse.y = e.clientY - containerRect.top;
    }

    let running = true;
    let rafId: number;

    function animate() {
      if (!running) return;
      dots.forEach((dot) => {
        const cx = parseFloat(dot.getAttribute('cx')!);
        const cy = parseFloat(dot.getAttribute('cy')!);
        const dx = cx - mouse.x;
        const dy = cy - mouse.y;
        const dist = Math.sqrt(dx * dx + dy * dy);

        let scale: number;
        let opacity: number;

        if (dist < influenceRadius) {
          const force = 1 - dist / influenceRadius;
          scale = 1 + (maxScale - 1) * force * force;
          opacity = 0.3 + 0.7 * force;
        } else {
          scale = 1;
          opacity = 0.3;
        }

        const transform = `translate(${cx}px, ${cy}px) scale(${scale}) translate(-${cx}px, -${cy}px)`;
        dot.style.transform = transform;
        dot.setAttribute('opacity', String(opacity));
      });
      rafId = requestAnimationFrame(animate);
    }

    if (container) {
      window.addEventListener('mousemove', handleMouseMove);
    }
    rafId = requestAnimationFrame(animate);

    return () => {
      running = false;
      cancelAnimationFrame(rafId);
      window.removeEventListener('mousemove', handleMouseMove);
      if (container && container.contains(svg)) {
        container.removeChild(svg);
      }
    };
  }, [gridSize, dotRadius, dotColor, maxScale, influenceRadius]);

  return (
    <div
      ref={containerRef}
      style={{
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        overflow: 'hidden',
        zIndex: 0,
      }}
    />
  );
}
