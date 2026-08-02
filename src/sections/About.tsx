import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const stats = [
  { number: '5+', label: 'Years Experience' },
  { number: '2+', label: 'Design Awards' },
  { number: '15+', label: 'Projects Completed' },
];

const skills = [
  'AutoCAD', 'SketchUp', 'Revit', 'Rhino 3D', 'Photoshop', 'V-Ray', 'Twinmotion', 'Grasshopper',
];

export default function About() {
  const sectionRef = useRef<HTMLElement>(null);
  const leftColRef = useRef<HTMLDivElement>(null);
  const rightColRef = useRef<HTMLDivElement>(null);
  const statsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const ctx = gsap.context(() => {
      // Left column stagger
      const leftElements = leftColRef.current?.querySelectorAll('.animate-in');
      if (leftElements) {
        gsap.fromTo(
          leftElements,
          { y: 50, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            stagger: 0.12,
            duration: 0.9,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: section,
              start: 'top 80%',
              once: true,
            },
          }
        );
      }

      // Right column
      gsap.fromTo(
        rightColRef.current,
        { y: 30, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1.0,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: section,
            start: 'top 80%',
            once: true,
          },
        }
      );

      // Stats counter
      const statNumbers = statsRef.current?.querySelectorAll('.stat-number');
      if (statNumbers) {
        gsap.fromTo(
          statNumbers,
          { opacity: 0, y: 20 },
          {
            opacity: 1,
            y: 0,
            stagger: 0.15,
            duration: 0.8,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: statsRef.current,
              start: 'top 85%',
              once: true,
            },
          }
        );
      }

      // Parallax on portrait
      const portraitImg = rightColRef.current?.querySelector('img');
      if (portraitImg) {
        gsap.to(portraitImg, {
        y: -30,
        ease: 'none',
          scrollTrigger: {
            trigger: section,
            start: 'top bottom',
            end: 'bottom top',
            scrub: 1,
          },
        });
      }
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="about"
      ref={sectionRef}
      className="relative w-full"
      style={{
        minHeight: '100vh',
        background: '#F5F3EF',
        paddingTop: '160px',
        paddingBottom: '160px',
      }}
    >
      <div
        className="mx-auto flex flex-col lg:flex-row"
        style={{ maxWidth: '1400px', padding: '0 80px', gap: '60px' }}
      >
        {/* Left Column */}
        <div ref={leftColRef} className="lg:w-[55%]">
          <div className="animate-in">
            <span
              className="font-body uppercase text-medium-gray"
              style={{ fontSize: '12px', letterSpacing: '0.1em', fontWeight: 400 }}
            >
              About
            </span>
            <div className="mt-3" style={{ width: '60px', height: '1px', background: '#E5DED3' }} />
          </div>

          <h2
            className="animate-in font-display font-light text-black mt-10"
            style={{
              fontSize: 'clamp(32px, 4vw, 56px)',
              lineHeight: '1.0',
              letterSpacing: '-1.5px',
              maxWidth: '600px',
            }}
          >
            Designing spaces that honor context, craft, and the human experience
          </h2>

          <p
            className="animate-in font-body text-dark-gray mt-8"
            style={{
              fontSize: '18px',
              lineHeight: '1.67',
              letterSpacing: '-0.2px',
              maxWidth: '540px',
              fontWeight: 300,
            }}
          >
            I am an Architect with experience in high-end residential and interior architecture, 
            managing projects from concept design through construction documentation and site execution. 
            At Span Architects, I led residential projects while coordinating structural, MEP, landscape, 
            and lighting consultants. My practice is rooted in contextual sensitivity and technical rigor.
          </p>

          <p
            className="animate-in font-body text-dark-gray mt-6"
            style={{
              fontSize: '18px',
              lineHeight: '1.67',
              letterSpacing: '-0.2px',
              maxWidth: '540px',
              fontWeight: 300,
            }}
          >
            I am eager to contribute to meaningful projects while continuing to learn and grow 
            in a dynamic professional environment. This portfolio showcases selected works that 
            represent my journey, design sensibility, and experience in architectural practice.
          </p>

          {/* Pull Quote */}
          <blockquote
            className="animate-in font-accent italic text-black mt-12"
            style={{
              fontSize: 'clamp(24px, 3vw, 48px)',
              lineHeight: '1.08',
              letterSpacing: '-0.5px',
              paddingLeft: '32px',
              borderLeft: '2px solid #E5DED3',
              maxWidth: '540px',
            }}
          >
            Architecture is not just about buildings. It's about creating environments where people feel connected, inspired, and at home.
          </blockquote>

          {/* Stats */}
          <div
            ref={statsRef}
            className="animate-in flex flex-wrap gap-16 mt-16"
          >
            {stats.map((stat) => (
              <div key={stat.label}>
                <span
                  className="stat-number font-display text-black block"
                  style={{ fontSize: '42px', lineHeight: '1.0' }}
                >
                  {stat.number}
                </span>
                <span
                  className="font-body uppercase text-medium-gray mt-2 block"
                  style={{ fontSize: '12px', letterSpacing: '0.08em', fontWeight: 400 }}
                >
                  {stat.label}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Right Column */}
        <div ref={rightColRef} className="lg:w-[45%]">
          {/* Portrait */}
          <div className="overflow-hidden" style={{ aspectRatio: '3/4' }}>
            <img
              src="/images/about-portrait.jpg"
              alt="Rinisha Jain — Architect"
              className="w-full h-full object-cover"
              style={{ willChange: 'transform' }}
            />
          </div>

          {/* Experience */}
          <div className="mt-12">
            <h3
              className="font-display text-black"
              style={{ fontSize: '24px', lineHeight: '1.17' }}
            >
              Experience
            </h3>
            <div className="mt-6 space-y-5">
              <div>
                <p className="font-body text-black" style={{ fontSize: '16px', fontWeight: 400 }}>
                  Senior Architect — Span Architects, Indore
                </p>
                <p className="font-body text-medium-gray mt-1" style={{ fontSize: '14px', fontWeight: 300 }}>
                  2 Years 4 Months | 2022–2024
                </p>
              </div>
              <div>
                <p className="font-body text-black" style={{ fontSize: '16px', fontWeight: 400 }}>
                  Intern Architect — Thirdspace Architecture Studio, Belgaum
                </p>
                <p className="font-body text-medium-gray mt-1" style={{ fontSize: '14px', fontWeight: 300 }}>
                  6 Months | 2021
                </p>
              </div>
            </div>
          </div>

          {/* Education */}
          <div className="mt-10">
            <h3
              className="font-display text-black"
              style={{ fontSize: '24px', lineHeight: '1.17' }}
            >
              Education
            </h3>
            <div className="mt-4">
              <p className="font-body text-black" style={{ fontSize: '16px', fontWeight: 400 }}>
                Bachelor of Architecture — Nirma University, Ahmedabad
              </p>
              <p className="font-body text-medium-gray mt-1" style={{ fontSize: '14px', fontWeight: 300 }}>
                2018 – 2023
              </p>
            </div>
          </div>

          {/* Skills */}
          <div className="mt-10">
            <h3
              className="font-display text-black mb-4"
              style={{ fontSize: '24px', lineHeight: '1.17' }}
            >
              Skills
            </h3>
            <div className="flex flex-wrap gap-2">
              {skills.map((skill) => (
                <span
                  key={skill}
                  className="font-body text-dark-gray"
                  style={{
                    fontSize: '14px',
                    fontWeight: 300,
                    padding: '6px 16px',
                    border: '1px solid #E5DED3',
                  }}
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
