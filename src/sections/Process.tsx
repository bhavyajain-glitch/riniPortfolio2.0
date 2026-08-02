import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const steps = [
  {
    number: '01',
    title: 'Discover',
    description: 'Understanding the site, context, client needs, and aspirations through research, analysis, and dialogue.',
  },
  {
    number: '02',
    title: 'Conceptualize',
    description: 'Exploring ideas through sketches, diagrams, and study models to develop a clear design direction.',
  },
  {
    number: '03',
    title: 'Detail',
    description: 'Developing working drawings, material specifications, and coordination with consultants for precision.',
  },
  {
    number: '04',
    title: 'Deliver',
    description: 'Managing site execution, quality control, and final styling to bring the vision to reality.',
  },
];

export default function Process() {
  const sectionRef = useRef<HTMLElement>(null);
  const stepsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const ctx = gsap.context(() => {
      const stepElements = stepsRef.current?.querySelectorAll('.process-step');
      if (stepElements) {
        gsap.fromTo(
          stepElements,
          { y: 30, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            stagger: 0.15,
            duration: 0.8,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: stepsRef.current,
              start: 'top 80%',
              once: true,
            },
          }
        );
      }
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative w-full"
      style={{
        background: '#FAF9F7',
        padding: '160px 80px',
      }}
    >
      <div style={{ maxWidth: '1400px', margin: '0 auto' }}>
        {/* Header */}
        <div className="text-center mb-20">
          <span
            className="font-body uppercase text-medium-gray"
            style={{ fontSize: '12px', letterSpacing: '0.1em', fontWeight: 400 }}
          >
            Process
          </span>
          <h2
            className="font-display font-light text-black mt-4"
            style={{
              fontSize: 'clamp(32px, 4vw, 56px)',
              lineHeight: '1.0',
              letterSpacing: '-1.5px',
            }}
          >
            From concept to completion
          </h2>
        </div>

        {/* Steps */}
        <div
          ref={stepsRef}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4"
          style={{ gap: '40px' }}
        >
          {steps.map((step, index) => (
            <div
              key={step.number}
              className="process-step relative"
              style={{
                paddingRight: index < steps.length - 1 ? '40px' : '0',
              }}
            >
              {/* Vertical Divider */}
              {index < steps.length - 1 && (
                <div
                  className="hidden lg:block absolute right-0 top-0 h-full"
                  style={{ width: '1px', background: '#E5DED3' }}
                />
              )}

              <span
                className="font-display text-light-sand block"
                style={{ fontSize: 'clamp(48px, 5vw, 72px)', lineHeight: '1.0' }}
              >
                {step.number}
              </span>
              <h3
                className="font-display text-black mt-4"
                style={{ fontSize: '24px', lineHeight: '1.17' }}
              >
                {step.title}
              </h3>
              <p
                className="font-body text-medium-gray mt-3"
                style={{
                  fontSize: '14px',
                  lineHeight: '1.57',
                  fontWeight: 300,
                  maxWidth: '280px',
                }}
              >
                {step.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
