import { useEffect, useRef } from 'react';
import gsap from 'gsap';

export default function Hero() {
  const nameRef = useRef<HTMLHeadingElement>(null);
  const titleRef = useRef<HTMLParagraphElement>(null);
  const taglineRef = useRef<HTMLParagraphElement>(null);
  const scrollIndicatorRef = useRef<HTMLDivElement>(null);
  const imageContainerRef = useRef<HTMLDivElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });

    // Image reveal
    if (imageContainerRef.current) {
      tl.fromTo(
        imageContainerRef.current,
        { opacity: 0, scale: 0.95, x: -40 },
        { opacity: 1, scale: 1, x: 0, duration: 1.3, delay: 0.2 }
      );
    }

    // Name words animation
    const nameWords = nameRef.current?.querySelectorAll('.name-word');
    if (nameWords) {
      tl.fromTo(
        nameWords,
        { y: 30, opacity: 0 },
        { y: 0, opacity: 1, stagger: 0.15, duration: 0.9 },
        '-=0.8'
      );
    }

    // Title fade in
    if (titleRef.current) {
      tl.fromTo(titleRef.current, { opacity: 0, y: 15 }, { opacity: 1, y: 0, duration: 0.7 }, '-=0.5');
    }

    // Tagline fade in
    if (taglineRef.current) {
      tl.fromTo(
        taglineRef.current,
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.8 },
        '-=0.4'
      );
    }

    // CTA buttons
    if (ctaRef.current) {
      tl.fromTo(ctaRef.current, { opacity: 0, y: 15 }, { opacity: 1, y: 0, duration: 0.6 }, '-=0.4');
    }

    // Scroll indicator
    if (scrollIndicatorRef.current) {
      tl.fromTo(
        scrollIndicatorRef.current,
        { opacity: 0 },
        { opacity: 1, duration: 0.6 },
        '-=0.2'
      );
    }

    return () => {
      tl.kill();
    };
  }, []);

  const handleScrollToWork = () => {
    const el = document.getElementById('work');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleScrollToContact = () => {
    const el = document.getElementById('contact');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section
      id="hero"
      className="relative w-full min-h-screen flex items-center justify-center overflow-hidden"
      style={{
        background: '#FAF9F7',
        backgroundImage: 'radial-gradient(circle at 30% 50%, rgba(255, 255, 255, 0.98) 0%, rgba(250, 249, 247, 1) 75%)',
      }}
    >
      {/* Background Soft Ambient Light */}
      <div
        className="absolute inset-0 pointer-events-none opacity-30"
        style={{
          background: 'radial-gradient(circle at 75% 35%, rgba(230, 222, 210, 0.5) 0%, transparent 65%)',
        }}
      />

      <div
        className="relative z-10 w-full max-w-[1550px] mx-auto px-6 md:px-10 py-12 md:py-0 flex flex-col md:flex-row items-center justify-between"
        style={{ minHeight: '100vh' }}
      >
        {/* Left Side: Grand Cinematic Architectural Plan Presentation */}
        <div
          ref={imageContainerRef}
          className="w-full md:w-[58%] lg:w-[60%] flex items-center justify-center opacity-0 mt-8 md:mt-0"
        >
          <div className="relative w-full max-w-[840px] lg:max-w-[940px] group">
            {/* Corner Drafting Marks for Aesthetic Architectural Vibe */}
            <div className="absolute -top-3 -left-3 text-black/30 text-xs font-mono select-none">+</div>
            <div className="absolute -top-3 -right-3 text-black/30 text-xs font-mono select-none">+</div>
            <div className="absolute -bottom-3 -left-3 text-black/30 text-xs font-mono select-none">+</div>
            <div className="absolute -bottom-3 -right-3 text-black/30 text-xs font-mono select-none">+</div>

            {/* Frameless Large Majestic Architectural Artwork Container */}
            <div
              className="relative w-full overflow-hidden transition-transform duration-700 ease-out group-hover:scale-[1.01]"
              style={{
                height: '82vh',
                maxHeight: '840px',
                minHeight: '520px',
                filter: 'drop-shadow(0 30px 60px rgba(0, 0, 0, 0.08))',
              }}
            >
              <img
                src="/images/hero-landing.png"
                alt="Ar. Rinisha Jain Architectural Design & Plan"
                className="w-full h-full object-contain mix-blend-multiply"
                style={{
                  objectPosition: 'center center',
                }}
              />
              
              {/* Soft Radial Canvas Feathering */}
              <div
                className="absolute inset-0 pointer-events-none"
                style={{
                  background: 'radial-gradient(ellipse at center, transparent 72%, rgba(250, 249, 247, 0.45) 100%)',
                }}
              />
            </div>
            
            {/* Architectural Technical Detail & Scale Legend */}
            <div className="mt-3 px-2 flex items-center justify-between font-body text-xs text-medium-gray tracking-widest uppercase opacity-80 border-t border-neutral-300/50 pt-2.5">
              <div className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-black/60"></span>
                <span>Scale 1:50 · Hand Sketch &amp; Plan Study</span>
              </div>
              <span className="font-mono text-[11px] tracking-wider text-black/50">ARCHITECTURAL EXPLORATION</span>
            </div>
          </div>
        </div>

        {/* Right Side: Ar. Rinisha Jain Typography */}
        <div className="w-full md:w-[42%] lg:w-[40%] md:pl-8 lg:pl-14 text-left mt-10 md:mt-0 flex flex-col justify-center">
          <div className="inline-block mb-4">
            <span
              className="font-body uppercase text-medium-gray text-xs tracking-widest px-3.5 py-1.5 rounded-full border border-neutral-300/60 inline-block"
              style={{ background: 'rgba(255, 255, 255, 0.75)' }}
            >
              Portfolio &amp; Selected Works
            </span>
          </div>

          <h1
            ref={nameRef}
            className="font-display font-light text-black tracking-tight"
            style={{
              fontSize: 'clamp(44px, 5.2vw, 84px)',
              lineHeight: '0.94',
              letterSpacing: '-2px',
            }}
          >
            <span className="name-word inline-block opacity-0 font-light">Ar. Rinisha</span>{' '}
            <span className="name-word inline-block opacity-0 font-normal">Jain</span>
          </h1>

          <p
            ref={titleRef}
            className="font-body uppercase text-dark-gray opacity-0 mt-4 tracking-widest"
            style={{
              fontSize: '13px',
              letterSpacing: '0.18em',
              fontWeight: 400,
            }}
          >
            Architect &amp; Spatial Designer
          </p>

          <p
            ref={taglineRef}
            className="font-accent italic text-dark-gray opacity-0 mt-6"
            style={{
              fontSize: 'clamp(24px, 3.2vw, 44px)',
              lineHeight: '1.1',
              letterSpacing: '-0.5px',
              maxWidth: '540px',
            }}
          >
            Spaces and Stories
          </p>

          {/* CTA Buttons */}
          <div
            ref={ctaRef}
            className="flex items-center gap-5 mt-10 opacity-0"
          >
            <button
              onClick={handleScrollToWork}
              className="group relative px-8 py-3.5 bg-black text-warm-white font-body text-xs uppercase tracking-widest rounded-full transition-all duration-300 hover:bg-neutral-800 shadow-md hover:shadow-lg flex items-center gap-3"
            >
              <span>Explore Works</span>
              <svg width="14" height="14" viewBox="0 0 16 16" fill="none" className="transition-transform duration-300 group-hover:translate-x-1">
                <path d="M3 8H13M13 8L9 4M13 8L9 12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>

            <button
              onClick={handleScrollToContact}
              className="px-7 py-3.5 border border-black/30 text-black font-body text-xs uppercase tracking-widest rounded-full transition-all duration-300 hover:border-black hover:bg-black/5"
            >
              Contact Me
            </button>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div
        ref={scrollIndicatorRef}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center opacity-0 pointer-events-none"
      >
        <div className="relative" style={{ width: '1px', height: '36px' }}>
          <div
            className="absolute w-1.5 h-1.5 rounded-full bg-black"
            style={{
              left: '-2.5px',
              opacity: 0.4,
              animation: 'scrollBounce 1.8s ease-in-out infinite',
            }}
          />
        </div>
        <span
          className="font-body text-medium-gray mt-2"
          style={{ fontSize: '10px', letterSpacing: '0.1em', fontWeight: 400 }}
        >
          SCROLL
        </span>
      </div>

      <style>{`
        @keyframes scrollBounce {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(28px); }
        }
      `}</style>
    </section>
  );
}
