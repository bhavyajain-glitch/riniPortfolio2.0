import { useEffect, useRef } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { projects } from '@/data/projects';

gsap.registerPlugin(ScrollTrigger);

export default function ProjectDetail() {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  
  // Flexible case-insensitive project lookup with fallback
  const normalizedId = id ? id.toLowerCase().trim() : '';
  const project = projects.find((p) => p.id.toLowerCase() === normalizedId) || projects[0];
  const heroRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [id]);

  useEffect(() => {
    if (!contentRef.current || !project) return;

    const ctx = gsap.context(() => {
      // Animate content blocks
      const blocks = contentRef.current?.querySelectorAll('.content-block');
      if (blocks && blocks.length > 0) {
        blocks.forEach((block) => {
          gsap.fromTo(
            block,
            { y: 30, opacity: 0 },
            {
              y: 0,
              opacity: 1,
              duration: 0.7,
              ease: 'power3.out',
              scrollTrigger: {
                trigger: block,
                start: 'top 85%',
                once: true,
              },
            }
          );
        });
      }

      // Animate images
      const images = contentRef.current?.querySelectorAll('.content-image');
      if (images && images.length > 0) {
        images.forEach((img) => {
          gsap.fromTo(
            img,
            { y: 20, opacity: 0, scale: 1.02 },
            {
              y: 0,
              opacity: 1,
              scale: 1,
              duration: 1.0,
              ease: 'power2.out',
              scrollTrigger: {
                trigger: img,
                start: 'top 80%',
                once: true,
              },
            }
          );
        });
      }
    }, contentRef);

    return () => ctx.revert();
  }, [id, project]);

  // Find next project
  const currentIndex = projects.findIndex((p) => p.id === id);
  const nextProject = projects[(currentIndex + 1) % projects.length];

  const navItems = [
    { key: 'concept', label: 'Concept' },
    { key: 'process', label: 'Design Process' },
    { key: 'drawings', label: 'Technical Drawings' },
    { key: 'execution', label: 'Execution' },
    { key: 'reflection', label: 'Reflection' },
  ];

  const handleBack = () => {
    if (window.history.length > 2) {
      navigate(-1);
    } else {
      navigate('/');
    }
  };

  const scrollToSection = (sectionId: string) => {
    const el = document.getElementById(sectionId);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="bg-warm-white min-h-screen">
      {/* Hero */}
      <div
        ref={heroRef}
        className="relative w-full overflow-hidden"
        style={{ height: '85vh' }}
      >
        <img
          src={project.heroImage}
          alt={project.title}
          className="w-full h-full object-cover"
        />
        {/* Gradient Overlay */}
        <div
          className="absolute bottom-0 left-0 w-full"
          style={{
            height: '60%',
            background: 'linear-gradient(transparent 40%, rgba(26,26,26,0.6) 100%)',
          }}
        />

        {/* Back Button */}
        <button
          onClick={handleBack}
          aria-label="Go Back"
          className="absolute top-8 left-8 md:top-10 md:left-12 z-30 flex items-center gap-2.5 px-4.5 py-2.5 rounded-full bg-black/70 hover:bg-black text-white backdrop-blur-md border border-white/30 shadow-xl transition-all duration-300 group cursor-pointer"
        >
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none" className="transition-transform duration-300 group-hover:-translate-x-1">
            <path
              d="M13 8H3M3 8L7 4M3 8L7 12"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
          <span className="font-body text-xs uppercase tracking-widest font-medium text-white">Back</span>
        </button>

        {/* Project Info */}
        <div className="absolute bottom-0 left-0 p-12" style={{ paddingLeft: '80px', paddingBottom: '60px' }}>
          <h1
            className="font-display font-light text-warm-white"
            style={{
              fontSize: 'clamp(36px, 5vw, 72px)',
              lineHeight: '0.94',
              letterSpacing: '-2px',
            }}
          >
            {project.title}
          </h1>
          <p
            className="font-body uppercase text-warm-white/70 mt-3"
            style={{ fontSize: '12px', letterSpacing: '0.08em', fontWeight: 400 }}
          >
            {project.location} · {project.year} · {project.category}
          </p>
        </div>
      </div>

      {/* Content */}
      <div
        ref={contentRef}
        className="mx-auto flex flex-col lg:flex-row"
        style={{ maxWidth: '1400px', padding: '120px 80px', gap: '80px' }}
      >
        {/* Sticky Nav */}
        <div className="hidden lg:block lg:w-[35%]">
          <div className="sticky" style={{ top: '120px' }}>
            <span
              className="font-body uppercase text-medium-gray block mb-6"
              style={{ fontSize: '12px', letterSpacing: '0.1em', fontWeight: 400 }}
            >
              Project Story
            </span>
            <nav className="space-y-3">
              {navItems.map((item) => (
                <button
                  key={item.key}
                  onClick={() => scrollToSection(item.key)}
                  className="font-body block text-left transition-colors duration-300 hover:text-black"
                  style={{
                    fontSize: '14px',
                    fontWeight: 300,
                    color: '#8A8A8A',
                    paddingLeft: '16px',
                    borderLeft: '2px solid #E5DED3',
                  }}
                >
                  {item.label}
                </button>
              ))}
            </nav>

            {/* Project Meta */}
            <div className="mt-12 pt-8" style={{ borderTop: '1px solid #E5DED3' }}>
              <div className="space-y-4">
                <div>
                  <span className="font-body uppercase text-medium-gray block" style={{ fontSize: '11px', letterSpacing: '0.08em', fontWeight: 400 }}>Location</span>
                  <span className="font-body text-black mt-1 block" style={{ fontSize: '14px', fontWeight: 300 }}>{project.location}</span>
                </div>
                <div>
                  <span className="font-body uppercase text-medium-gray block" style={{ fontSize: '11px', letterSpacing: '0.08em', fontWeight: 400 }}>Year</span>
                  <span className="font-body text-black mt-1 block" style={{ fontSize: '14px', fontWeight: 300 }}>{project.year}</span>
                </div>
                <div>
                  <span className="font-body uppercase text-medium-gray block" style={{ fontSize: '11px', letterSpacing: '0.08em', fontWeight: 400 }}>Role</span>
                  <span className="font-body text-black mt-1 block" style={{ fontSize: '14px', fontWeight: 300 }}>{project.role}</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right Content */}
        <div className="lg:w-[65%] space-y-24">
          {/* Description */}
          <div className="content-block">
            <p
              className="font-body text-dark-gray"
              style={{ fontSize: '18px', lineHeight: '1.67', fontWeight: 300 }}
            >
              {project.description}
            </p>
          </div>

          {/* Concept */}
          {project.concept && (
            <div id="concept" className="content-block">
              <h2
                className="font-display text-black"
                style={{ fontSize: '42px', lineHeight: '1.1', letterSpacing: '-1px' }}
              >
                Concept
              </h2>
              <p
                className="font-body text-dark-gray mt-6"
                style={{ fontSize: '18px', lineHeight: '1.67', fontWeight: 300 }}
              >
                {project.concept}
              </p>
              {project.images.length > 0 && (
                <div className="content-image mt-10 overflow-hidden" style={{ border: '1px solid #E5DED3' }}>
                  <img
                    src={project.images[0]}
                    alt={`${project.title} - Concept`}
                    className="w-full object-cover"
                    style={{ aspectRatio: '4/3' }}
                  />
                </div>
              )}
            </div>
          )}

          {/* Design Process */}
          {project.process && (
            <div id="process" className="content-block">
              <h2
                className="font-display text-black"
                style={{ fontSize: '42px', lineHeight: '1.1', letterSpacing: '-1px' }}
              >
                Design Process
              </h2>
              <p
                className="font-body text-dark-gray mt-6"
                style={{ fontSize: '18px', lineHeight: '1.67', fontWeight: 300 }}
              >
                {project.process}
              </p>
              {/* Process Images Grid */}
              <div className="grid grid-cols-2 gap-6 mt-10">
                <div className="content-image overflow-hidden" style={{ border: '1px solid #E5DED3' }}>
                  <img
                    src="/images/process-sketch-1.jpg"
                    alt="Design process sketches"
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="content-image overflow-hidden" style={{ border: '1px solid #E5DED3' }}>
                  <img
                    src="/images/process-sketch-2.jpg"
                    alt="Design process elevation"
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
            </div>
          )}

          {/* Technical Drawings */}
          {project.drawings && (
            <div id="drawings" className="content-block">
              <h2
                className="font-display text-black"
                style={{ fontSize: '42px', lineHeight: '1.1', letterSpacing: '-1px' }}
              >
                Technical Drawings
              </h2>
              <p
                className="font-body text-dark-gray mt-6"
                style={{ fontSize: '18px', lineHeight: '1.67', fontWeight: 300 }}
              >
                {project.drawings}
              </p>
              {project.images.length > 1 && (
                <div className="content-image mt-10 overflow-hidden" style={{ border: '1px solid #E5DED3' }}>
                  <img
                    src={project.images[1]}
                    alt={`${project.title} - Technical Drawings`}
                    className="w-full object-cover"
                  />
                </div>
              )}
            </div>
          )}

          {/* Execution */}
          {project.execution && (
            <div id="execution" className="content-block">
              <h2
                className="font-display text-black"
                style={{ fontSize: '42px', lineHeight: '1.1', letterSpacing: '-1px' }}
              >
                Execution
              </h2>
              <p
                className="font-body text-dark-gray mt-6"
                style={{ fontSize: '18px', lineHeight: '1.67', fontWeight: 300 }}
              >
                {project.execution}
              </p>
              <div className="content-image mt-10 overflow-hidden" style={{ border: '1px solid #E5DED3' }}>
                <img
                  src={project.heroImage}
                  alt={`${project.title} - Execution`}
                  className="w-full object-cover"
                />
              </div>
            </div>
          )}

          {/* Reflection */}
          {project.reflection && (
            <div id="reflection" className="content-block">
              <h2
                className="font-display text-black"
                style={{ fontSize: '42px', lineHeight: '1.1', letterSpacing: '-1px' }}
              >
                Reflection
              </h2>
              <p
                className="font-body text-dark-gray mt-6"
                style={{ fontSize: '18px', lineHeight: '1.67', fontWeight: 300 }}
              >
                {project.reflection}
              </p>
              <blockquote
                className="font-accent italic text-black mt-10"
                style={{
                  fontSize: '28px',
                  lineHeight: '1.2',
                  paddingLeft: '32px',
                  borderLeft: '2px solid #E5DED3',
                }}
              >
                {project.reflection}
              </blockquote>
            </div>
          )}
        </div>
      </div>

      {/* Next Project */}
      <div className="w-full" style={{ borderTop: '1px solid #E5DED3' }}>
        <Link
          to={`/project/${nextProject.id}`}
          className="block mx-auto group"
          style={{ maxWidth: '1400px', padding: '80px' }}
        >
          <span
            className="font-body uppercase text-medium-gray block"
            style={{ fontSize: '12px', letterSpacing: '0.1em', fontWeight: 400 }}
          >
            Next Project
          </span>
          <div className="flex items-center justify-between mt-4">
            <h3
              className="font-display font-light text-black group-hover:opacity-60 transition-opacity"
              style={{ fontSize: 'clamp(32px, 4vw, 56px)', lineHeight: '1.0', letterSpacing: '-1.5px' }}
            >
              {nextProject.title}
            </h3>
            <svg
              width="32"
              height="32"
              viewBox="0 0 32 32"
              fill="none"
              className="text-black group-hover:translate-x-2 transition-transform"
            >
              <path d="M6 16H26M26 16L18 8M26 16L18 24" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </div>
        </Link>
      </div>
    </div>
  );
}
