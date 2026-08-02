import { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { projects, categories, type Category } from '@/data/projects';

gsap.registerPlugin(ScrollTrigger);

interface WorkCategoriesProps {
  onProjectClick?: (projectId: string) => void;
}

export default function WorkCategories({ onProjectClick }: WorkCategoriesProps) {
  const [activeCategory, setActiveCategory] = useState<Category>('All');
  const navigate = useNavigate();
  const sectionRef = useRef<HTMLElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);
  const indicatorRef = useRef<HTMLDivElement>(null);
  const tabsRef = useRef<HTMLDivElement>(null);

  // Additional project items for general categories
  const additionalProjects = [
    {
      id: 'lic-colony',
      title: 'LIC Colony Elevation Design',
      location: 'Ajmer, Rajasthan',
      year: '2021',
      category: 'Other Works' as const,
      heroImage: '/images/project-sanika-hero.jpg',
    },
    {
      id: 'pujya-park',
      title: 'Pujya Park Residential Interiors',
      location: 'Vadodara, Gujarat',
      year: '2021',
      category: 'Other Works' as const,
      heroImage: '/images/project-ratlam-hero.jpg',
    },
  ];

  const displayProjects = [...projects, ...additionalProjects].filter((p) =>
    activeCategory === 'All' ? true : p.category === activeCategory
  );

  useEffect(() => {
    const grid = gridRef.current;
    if (!grid) return;

    const cards = grid.querySelectorAll('.project-card');

    const ctx = gsap.context(() => {
      gsap.fromTo(
        cards,
        { y: 30, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          stagger: 0.08,
          duration: 0.7,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: grid,
            start: 'top 85%',
            once: true,
          },
        }
      );
    });

    return () => ctx.revert();
  }, [activeCategory]);

  const handleTabClick = (cat: Category, e: React.MouseEvent<HTMLButtonElement>) => {
    setActiveCategory(cat);

    if (indicatorRef.current && tabsRef.current) {
      const tab = e.currentTarget;
      const tabsRect = tabsRef.current.getBoundingClientRect();
      const tabRect = tab.getBoundingClientRect();
      indicatorRef.current.style.transform = `translateX(${tabRect.left - tabsRect.left}px)`;
      indicatorRef.current.style.width = `${tabRect.width}px`;
    }
  };

  return (
    <section
      id="work"
      ref={sectionRef}
      className="relative w-full"
      style={{
        background: '#F5F3EF',
        padding: '120px 60px',
      }}
    >
      <div style={{ maxWidth: '1400px', margin: '0 auto' }}>
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-baseline md:justify-between border-b border-neutral-300/60 pb-8">
          <div>
            <span className="font-body uppercase text-medium-gray text-xs tracking-widest block mb-2">
              Portfolio Categories
            </span>
            <h2
              className="font-display font-light text-black"
              style={{
                fontSize: 'clamp(40px, 5vw, 68px)',
                lineHeight: '0.94',
                letterSpacing: '-2px',
              }}
            >
              All Works
            </h2>
          </div>

          {/* Filter Tabs */}
          <div ref={tabsRef} className="relative flex flex-wrap gap-6 md:gap-8 mt-6 md:mt-0">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={(e) => handleTabClick(cat, e)}
                className="font-body transition-colors duration-300 relative pb-2 text-sm uppercase tracking-wider"
                style={{
                  fontWeight: activeCategory === cat ? 500 : 300,
                  color: activeCategory === cat ? '#1A1A1A' : '#8A8A8A',
                }}
              >
                {cat}
              </button>
            ))}
            {/* Active Indicator */}
            <div
              ref={indicatorRef}
              className="absolute bottom-0 h-0.5 bg-black transition-all duration-300"
              style={{
                width: '32px',
                transform: 'translateX(0)',
              }}
            />
          </div>
        </div>

        {/* Special Sub-Category Cards when "Professional" or "All" is active */}
        {(activeCategory === 'Professional' || activeCategory === 'All') && (
          <div className="mt-12 mb-16">
            <div className="flex items-center justify-between mb-6">
              <h3 className="font-display text-2xl font-light text-black">
                Professional Work Sub-Categories
              </h3>
              <span className="font-body text-xs uppercase text-medium-gray tracking-wider">
                Residential &amp; Training (Merged)
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* 1. Residential Sub-category Card */}
              <div
                onClick={() => navigate('/residential')}
                className="group relative rounded-xl overflow-hidden border border-neutral-300/80 bg-white p-8 cursor-pointer shadow-sm hover:shadow-xl transition-all duration-500 flex flex-col justify-between"
                style={{ minHeight: '340px' }}
              >
                <div>
                  <div className="flex items-center justify-between">
                    <span className="font-body text-xs uppercase tracking-widest text-emerald-800 bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200">
                      Sub-Category 01
                    </span>
                    <span className="font-body text-xs text-medium-gray uppercase tracking-wider">
                      4×2 Abstract Cinematic Grid (2 Colored)
                    </span>
                  </div>

                  <h4 className="font-display text-3xl font-light text-black mt-4 group-hover:text-emerald-950 transition-colors">
                    1. Residential Architecture
                  </h4>
                  <p className="font-body text-sm text-dark-gray mt-2 font-light leading-relaxed">
                    Cinematic 4×2 abstract grid featuring residential projects. 2 highlighted color case studies (Whitefield Society &amp; Ratlam Kothi) open detailed project pages.
                  </p>

                  {/* Visual Grid Mini Preview */}
                  <div className="grid grid-cols-8 gap-1.5 mt-6">
                    <div className="h-10 rounded bg-emerald-700/80 border border-emerald-800" title="Whitefield Society (Colored)"></div>
                    <div className="h-10 rounded bg-neutral-300 filter grayscale"></div>
                    <div className="h-10 rounded bg-neutral-300 filter grayscale"></div>
                    <div className="h-10 rounded bg-neutral-300 filter grayscale"></div>
                    <div className="h-10 rounded bg-neutral-300 filter grayscale"></div>
                    <div className="h-10 rounded bg-neutral-300 filter grayscale"></div>
                    <div className="h-10 rounded bg-neutral-300 filter grayscale"></div>
                    <div className="h-10 rounded bg-neutral-300 filter grayscale"></div>
                    <div className="h-10 rounded bg-emerald-700/80 border border-emerald-800" title="Ratlam Kothi (Colored)"></div>
                    <div className="h-10 rounded bg-neutral-300 filter grayscale"></div>
                    <div className="h-10 rounded bg-neutral-300 filter grayscale"></div>
                    <div className="h-10 rounded bg-neutral-300 filter grayscale"></div>
                    <div className="h-10 rounded bg-neutral-300 filter grayscale"></div>
                    <div className="h-10 rounded bg-neutral-300 filter grayscale"></div>
                    <div className="h-10 rounded bg-neutral-300 filter grayscale"></div>
                    <div className="h-10 rounded bg-neutral-300 filter grayscale"></div>
                  </div>
                </div>

                <div className="mt-6 pt-4 border-t border-neutral-100 flex items-center justify-between text-xs font-body uppercase tracking-widest text-black group-hover:translate-x-1 transition-transform">
                  <span className="font-normal text-emerald-950">Open 2×8 Residential Grid</span>
                  <div className="w-8 h-8 rounded-full bg-black text-white flex items-center justify-center">
                    <svg width="14" height="14" viewBox="0 0 16 16" fill="none">
                      <path d="M3 8H13M13 8L9 4M13 8L9 12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </div>
                </div>
              </div>

              {/* 2. Training Sub-category Card */}
              <div
                onClick={() => navigate('/training')}
                className="group relative rounded-xl overflow-hidden border border-neutral-300/80 bg-white p-8 cursor-pointer shadow-sm hover:shadow-xl transition-all duration-500 flex flex-col justify-between"
                style={{ minHeight: '340px' }}
              >
                <div>
                  <div className="flex items-center justify-between">
                    <span className="font-body text-xs uppercase tracking-widest text-indigo-800 bg-indigo-50 px-3 py-1 rounded-full border border-indigo-200">
                      Sub-Category 02 (Merged)
                    </span>
                    <span className="font-body text-xs text-medium-gray uppercase tracking-wider">
                      4-Image Aesthetic Grid
                    </span>
                  </div>

                  <h4 className="font-display text-3xl font-light text-black mt-4 group-hover:text-indigo-950 transition-colors">
                    2. Professional Training
                  </h4>
                  <p className="font-body text-sm text-dark-gray mt-2 font-light leading-relaxed">
                    Merged category showcasing internship practice at Thirdspace Architecture Studio. Features 4 images in an aesthetic grid with 1 colored project for Sanika Developers.
                  </p>

                  {/* Visual 4-Grid Mini Preview */}
                  <div className="grid grid-cols-2 gap-2 mt-6">
                    <div className="h-10 rounded bg-indigo-700/80 border border-indigo-800 flex items-center justify-center text-[10px] text-white font-body tracking-wider" title="Sanika Developers (Colored)">
                      Sanika (Colored)
                    </div>
                    <div className="h-10 rounded bg-neutral-300 filter grayscale"></div>
                    <div className="h-10 rounded bg-neutral-300 filter grayscale"></div>
                    <div className="h-10 rounded bg-neutral-300 filter grayscale"></div>
                  </div>
                </div>

                <div className="mt-6 pt-4 border-t border-neutral-100 flex items-center justify-between text-xs font-body uppercase tracking-widest text-black group-hover:translate-x-1 transition-transform">
                  <span className="font-normal text-indigo-950">Open Training Page (4 Grid)</span>
                  <div className="w-8 h-8 rounded-full bg-black text-white flex items-center justify-center">
                    <svg width="14" height="14" viewBox="0 0 16 16" fill="none">
                      <path d="M3 8H13M13 8L9 4M13 8L9 12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Project Grid */}
        <div
          ref={gridRef}
          className="grid grid-cols-1 md:grid-cols-2 mt-12"
          style={{ gap: '40px' }}
        >
          {displayProjects.map((project) => (
            <div
              key={project.id}
              className="project-card group cursor-pointer"
              onClick={() => {
                if (project.id === 'sanika-apartments') {
                  navigate('/training');
                } else if (project.id === 'whitefield-society' || project.id === 'ratlam-kothi') {
                  navigate('/residential');
                } else {
                  onProjectClick?.(project.id);
                }
              }}
              data-project-item
            >
              {/* Image */}
              <div className="relative overflow-hidden rounded-lg bg-neutral-100" style={{ aspectRatio: '4/3' }}>
                <img
                  src={project.heroImage}
                  alt={project.title}
                  className="w-full h-full object-cover transition-transform duration-600"
                  style={{ transitionTimingFunction: 'cubic-bezier(0.16, 1, 0.3, 1)' }}
                  loading="lazy"
                  onMouseEnter={(e) => {
                    (e.currentTarget as HTMLElement).style.transform = 'scale(1.04)';
                  }}
                  onMouseLeave={(e) => {
                    (e.currentTarget as HTMLElement).style.transform = 'scale(1)';
                  }}
                />
                <div
                  className="absolute inset-0 transition-opacity duration-300 opacity-0 group-hover:opacity-100"
                  style={{ background: 'rgba(26,26,26,0.03)' }}
                />
              </div>

              {/* Info */}
              <div className="mt-4">
                <h3
                  className="font-display text-black font-light"
                  style={{ fontSize: '24px', lineHeight: '1.17' }}
                >
                  {project.title}
                </h3>
                <p
                  className="font-body uppercase text-medium-gray mt-1"
                  style={{ fontSize: '12px', letterSpacing: '0.06em', fontWeight: 400 }}
                >
                  {project.location} · {project.year}
                </p>
                <p
                  className="font-body uppercase text-warm-gray mt-1 flex items-center gap-2"
                  style={{ fontSize: '12px', letterSpacing: '0.06em', fontWeight: 400 }}
                >
                  <span>{project.category}</span>
                  {project.subCategory && (
                    <span className="text-black/60 font-normal">({project.subCategory})</span>
                  )}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
