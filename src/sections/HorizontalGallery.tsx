import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { projects } from '@/data/projects';

gsap.registerPlugin(ScrollTrigger);

interface HorizontalGalleryProps {
  onProjectClick?: (projectId: string) => void;
}

export default function HorizontalGallery({ onProjectClick }: HorizontalGalleryProps) {
  const sectionRef = useRef<HTMLDivElement>(null);
  const galleryRef = useRef<HTMLDivElement>(null);
  const progressRef = useRef<HTMLDivElement>(null);
  const counterRef = useRef<HTMLSpanElement>(null);

  const galleryProjects = projects.slice(0, 6);

  useEffect(() => {
    const section = sectionRef.current;
    const gallery = galleryRef.current;
    const progress = progressRef.current;
    if (!section || !gallery || !progress) return;

    const totalWidth = gallery.scrollWidth - window.innerWidth;

    const ctx = gsap.context(() => {
      gsap.to(gallery, {
        x: -totalWidth,
        ease: 'none',
        scrollTrigger: {
          trigger: section,
          start: 'top top',
          end: () => `+=${totalWidth}`,
          pin: true,
          scrub: 1,
          anticipatePin: 1,
          onUpdate: (self) => {
            const progress = self.progress;
            const idx = Math.min(5, Math.floor(progress * 6));
            if (counterRef.current) {
              counterRef.current.textContent = `${String(idx + 1).padStart(2, '0')} / 06`;
            }
          },
        },
      });

      gsap.to(progress, {
        scaleX: 1,
        ease: 'none',
        scrollTrigger: {
          trigger: section,
          start: 'top top',
          end: () => `+=${totalWidth}`,
          scrub: 1,
        },
      });
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="work"
      ref={sectionRef}
      className="relative w-full overflow-hidden"
      style={{ height: '100vh', background: '#FAF9F7' }}
    >
      {/* Section Label */}
      <div
        className="absolute z-10"
        style={{ top: '40px', left: '80px' }}
      >
        <span
          className="font-body uppercase text-medium-gray"
          style={{ fontSize: '12px', letterSpacing: '0.1em', fontWeight: 400 }}
        >
          Selected Work
        </span>
        <div className="mt-2" style={{ width: '40px', height: '1px', background: '#E5DED3' }} />
      </div>

      {/* Gallery Container */}
      <div
        ref={galleryRef}
        className="absolute flex items-center gap-[60px]"
        style={{
          top: '50%',
          transform: 'translateY(-50%)',
          height: '70vh',
          paddingLeft: '80px',
          paddingRight: '80px',
        }}
      >
        {galleryProjects.map((project, index) => (
          <div
            key={project.id}
            data-project-item
            className="relative flex-shrink-0 cursor-pointer group"
            style={{ width: '45vw', height: '100%' }}
            onClick={() => onProjectClick?.(project.id)}
          >
            {/* Image */}
            <div className="relative w-full h-full overflow-hidden">
              <img
                src={project.heroImage}
                alt={project.title}
                className="w-full h-full object-cover transition-transform duration-600"
                style={{ transitionTimingFunction: 'cubic-bezier(0.16, 1, 0.3, 1)' }}
                onMouseEnter={(e) => {
                  (e.currentTarget as HTMLElement).style.transform = 'scale(1.03)';
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLElement).style.transform = 'scale(1)';
                }}
              />
              {/* Gradient Overlay */}
              <div
                className="absolute bottom-0 left-0 w-full"
                style={{
                  height: '50%',
                  background: 'linear-gradient(transparent 0%, rgba(26,26,26,0.7) 100%)',
                }}
              />
            </div>

            {/* Project Number */}
            <span
              className="absolute font-display text-warm-white"
              style={{
                top: '16px',
                left: '16px',
                fontSize: 'clamp(24px, 3vw, 42px)',
                opacity: 0.6,
              }}
            >
              {String(index + 1).padStart(2, '0')}
            </span>

            {/* Project Info */}
            <div className="absolute bottom-0 left-0 p-8">
              <h3
                className="font-display font-light text-warm-white"
                style={{
                  fontSize: 'clamp(24px, 3vw, 56px)',
                  lineHeight: '1.0',
                  letterSpacing: '-1.5px',
                }}
              >
                {project.title}
              </h3>
              <p
                className="font-body uppercase text-warm-white mt-2"
                style={{
                  fontSize: '12px',
                  letterSpacing: '0.08em',
                  opacity: 0.7,
                  fontWeight: 400,
                }}
              >
                {project.category}
              </p>
            </div>

            {/* Arrow */}
            <div
              className="absolute bottom-8 right-8 flex items-center justify-center rounded-full transition-all duration-300 group-hover:border-opacity-80"
              style={{
                width: '48px',
                height: '48px',
                border: '1px solid rgba(250, 249, 247, 0.4)',
              }}
            >
              <svg
                width="16"
                height="16"
                viewBox="0 0 16 16"
                fill="none"
                className="text-warm-white transition-transform duration-300 group-hover:translate-x-1"
              >
                <path
                  d="M3 8H13M13 8L9 4M13 8L9 12"
                  stroke="currentColor"
                  strokeWidth="1"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </div>
          </div>
        ))}
      </div>

      {/* Progress Bar */}
      <div
        className="absolute bottom-12 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center"
      >
        <div
          className="relative overflow-hidden"
          style={{ width: '200px', height: '2px', background: '#E5DED3' }}
        >
          <div
            ref={progressRef}
            className="absolute top-0 left-0 h-full bg-black origin-left"
            style={{ transform: 'scaleX(0)', width: '100%' }}
          />
        </div>
        <span
          ref={counterRef}
          className="font-body text-medium-gray mt-3"
          style={{ fontSize: '12px', letterSpacing: '0.05em', fontWeight: 400 }}
        >
          01 / 06
        </span>
      </div>
    </section>
  );
}
