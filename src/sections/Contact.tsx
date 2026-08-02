import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import DotGrid from '@/components/DotGrid';

gsap.registerPlugin(ScrollTrigger);

export default function Contact() {
  const sectionRef = useRef<HTMLElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const detailsRef = useRef<HTMLDivElement>(null);
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        headingRef.current,
        { y: 40, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1.0,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: section,
            start: 'top 80%',
            once: true,
          },
        }
      );

      const detailItems = detailsRef.current?.querySelectorAll('.contact-item');
      if (detailItems) {
        gsap.fromTo(
          detailItems,
          { y: 20, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            stagger: 0.1,
            duration: 0.8,
            ease: 'power2.out',
            delay: 0.2,
            scrollTrigger: {
              trigger: section,
              start: 'top 80%',
              once: true,
            },
          }
        );
      }

      gsap.fromTo(
        bottomRef.current,
        { y: 20, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: bottomRef.current,
            start: 'top 95%',
            once: true,
          },
        }
      );
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="contact"
      ref={sectionRef}
      className="relative w-full overflow-hidden"
      style={{
        minHeight: '70vh',
        background: '#1A1A1A',
        padding: '120px 80px 80px',
      }}
    >
      {/* Dot Grid Background */}
      <div className="absolute inset-0" style={{ opacity: 0.15 }}>
        <DotGrid
          gridSize={30}
          dotRadius={1.5}
          dotColor="#FAF9F7"
          maxScale={3}
          influenceRadius={150}
        />
      </div>

      {/* Content */}
      <div className="relative z-10" style={{ maxWidth: '1400px', margin: '0 auto' }}>
        {/* Top Row */}
        <div className="flex flex-col lg:flex-row lg:justify-between lg:items-start gap-16">
          {/* Left - Heading */}
          <h2
            ref={headingRef}
            className="font-display font-light text-warm-white opacity-0"
            style={{
              fontSize: 'clamp(32px, 4vw, 56px)',
              lineHeight: '1.0',
              letterSpacing: '-1.5px',
              maxWidth: '600px',
            }}
          >
            Let's Create Something Meaningful
          </h2>

          {/* Right - Contact Details */}
          <div ref={detailsRef}>
            <h3
              className="font-display text-warm-white"
              style={{ fontSize: '24px', lineHeight: '1.17' }}
            >
              Get in Touch
            </h3>
            <div className="mt-4 space-y-3">
              <a
                href="mailto:ar.rinishajain@gmail.com"
                className="contact-item font-body block transition-colors duration-300 hover:text-warm-white"
                style={{ fontSize: '16px', fontWeight: 300, color: '#B5AFA6' }}
              >
                ar.rinishajain@gmail.com
              </a>
              <a
                href="tel:+919669432681"
                className="contact-item font-body block transition-colors duration-300 hover:text-warm-white"
                style={{ fontSize: '16px', fontWeight: 300, color: '#B5AFA6' }}
              >
                +91 9669432681
              </a>
              <p
                className="contact-item font-body"
                style={{ fontSize: '16px', fontWeight: 300, color: '#B5AFA6' }}
              >
                Indore, Madhya Pradesh
              </p>
            </div>
          </div>
        </div>

        {/* Bottom Row */}
        <div
          ref={bottomRef}
          className="mt-28 flex flex-col md:flex-row md:justify-between md:items-end gap-8 opacity-0"
        >
          {/* Left */}
          <div>
            <span
              className="font-display text-warm-white block"
              style={{ fontSize: '32px', lineHeight: '1.0' }}
            >
              Ar. Rinisha Jain
            </span>
            <span
              className="font-body uppercase text-medium-gray mt-2 block"
              style={{ fontSize: '12px', letterSpacing: '0.08em', fontWeight: 400 }}
            >
              Architect &amp; Spatial Designer
            </span>
          </div>

          {/* Center */}
          <span
            className="font-body text-dark-gray"
            style={{ fontSize: '12px', fontWeight: 400 }}
          >
            &copy; 2024
          </span>

          {/* Right */}
          <span
            className="font-body text-dark-gray"
            style={{ fontSize: '12px', fontWeight: 400 }}
          >
            All projects and images are property of Ar. Rinisha Jain.
          </span>
        </div>
      </div>
    </section>
  );
}
