import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function Philosophy() {
  const sectionRef = useRef<HTMLElement>(null);
  const eyebrowRef = useRef<HTMLSpanElement>(null);
  const statementRef = useRef<HTMLParagraphElement>(null);
  const signatureRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const ctx = gsap.context(() => {
      const elements = [eyebrowRef.current, statementRef.current, signatureRef.current];
      gsap.fromTo(
        elements,
        { y: 40, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          stagger: 0.1,
          duration: 0.8,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: section,
            start: 'top 75%',
            once: true,
          },
        }
      );
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative w-full flex items-center justify-center"
      style={{
        minHeight: '60vh',
        background: '#FAF9F7',
        padding: '160px 80px',
      }}
    >
      <div className="text-center" style={{ maxWidth: '900px' }}>
        <span
          ref={eyebrowRef}
          className="font-body uppercase text-medium-gray block opacity-0"
          style={{ fontSize: '12px', letterSpacing: '0.1em', fontWeight: 400 }}
        >
          Philosophy
        </span>

        <p
          ref={statementRef}
          className="font-display font-light text-black mt-6 opacity-0"
          style={{
            fontSize: 'clamp(28px, 4vw, 56px)',
            lineHeight: '1.15',
            letterSpacing: '-1.5px',
          }}
        >
          I believe that great architecture emerges from a deep understanding of context — the land, 
          the climate, the culture, and the people who will inhabit the space. Every project is an 
          opportunity to create something meaningful, something that will age gracefully and serve 
          its community for generations.
        </p>

        <span
          ref={signatureRef}
          className="font-accent italic text-dark-gray block mt-10 opacity-0"
          style={{ fontSize: '28px', lineHeight: '1.2' }}
        >
          — Rinisha Jain
        </span>
      </div>
    </section>
  );
}
