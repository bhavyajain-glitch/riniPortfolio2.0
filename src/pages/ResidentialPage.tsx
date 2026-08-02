import { useEffect, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import gsap from 'gsap';

interface ResidentialItem {
  id: string;
  title: string;
  location: string;
  year: string;
  image: string;
  isColored: boolean;
  projectId?: string;
  subtitle?: string;
  aspect: string;
  tag?: string;
  coords?: string;
}

export default function ResidentialPage() {
  const navigate = useNavigate();
  const gridRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    if (!gridRef.current) return;
    const cards = gridRef.current.querySelectorAll('.creative-card');

    gsap.fromTo(
      cards,
      { opacity: 0, y: 35, scale: 0.98 },
      {
        opacity: 1,
        y: 0,
        scale: 1,
        stagger: 0.08,
        duration: 0.8,
        ease: 'power3.out',
      }
    );
  }, []);

  // 8 Abstract Creative Cards in a 4-Column x 2-Row Layout Matrix
  const residentialItems: ResidentialItem[] = [
    // Column 1 (Tall Feature 1 - COLORED)
    {
      id: 'res-col1-1',
      title: 'Residence at Whitefield Society',
      location: 'Indore, MP',
      year: '2023',
      image: '/images/project-whitefield-hero.jpg',
      isColored: true,
      projectId: 'whitefield-society',
      subtitle: 'Double-Height Living & Luxury Light',
      aspect: 'aspect-[3/4]',
      tag: 'Featured Case Study 01',
      coords: '22.7196° N · 75.8577° E',
    },

    // Column 2, Upper (Wide Landscape - Monochrome)
    {
      id: 'res-col2-1',
      title: 'Skyline Villa',
      location: 'Bangalore, KA',
      year: '2023',
      image: '/images/project-whitefield-1.jpg',
      isColored: false,
      subtitle: 'Terrace & Duplex Volumetric Study',
      aspect: 'aspect-[16/10]',
      coords: '12.9716° N · 77.5946° E',
    },

    // Column 2, Lower (Square Sketch - Monochrome)
    {
      id: 'res-col2-2',
      title: 'Anandam Courtyard Home',
      location: 'Indore, MP',
      year: '2022',
      image: '/images/project-whitefield-2.jpg',
      isColored: false,
      subtitle: 'Central Air Well & Passive Cooling',
      aspect: 'aspect-square',
      coords: '22.7196° N · 75.8577° E',
    },

    // Column 3, Upper (Wide Feature 2 - COLORED)
    {
      id: 'res-col3-1',
      title: 'Residence at Ratlam Kothi',
      location: 'Indore, MP',
      year: '2023',
      image: '/images/project-ratlam-hero.jpg',
      isColored: true,
      projectId: 'ratlam-kothi',
      subtitle: 'Interior Architecture & Spatial Renovation',
      aspect: 'aspect-[16/10]',
      tag: 'Featured Case Study 02',
      coords: '22.7196° N · 75.8577° E',
    },

    // Column 3, Lower (Archival Detail - Monochrome)
    {
      id: 'res-col3-2',
      title: 'The Teak House',
      location: 'Mysuru, KA',
      year: '2022',
      image: '/images/project-ratlam-1.jpg',
      isColored: false,
      subtitle: 'Custom Joinery & Warm Timber Textures',
      aspect: 'aspect-[4/3]',
      coords: '12.2958° N · 76.6394° E',
    },

    // Column 4, Upper (Panoramic Elevation - Monochrome)
    {
      id: 'res-col4-1',
      title: 'Minimalist Duplex',
      location: 'Ahmedabad, GJ',
      year: '2021',
      image: '/images/process-sketch-2.jpg',
      isColored: false,
      subtitle: 'Linear Facade & Geometric Apertures',
      aspect: 'aspect-[16/9]',
      coords: '23.0225° N · 72.5714° E',
    },

    // Column 4, Lower (Tall Archival Rendering - Monochrome)
    {
      id: 'res-col4-2',
      title: 'Urban Haven Penthouse',
      location: 'Mumbai, MH',
      year: '2021',
      image: '/images/hero-render.jpg',
      isColored: false,
      subtitle: 'High-Density Structural Framing',
      aspect: 'aspect-[4/3]',
      coords: '19.0760° N · 72.8777° E',
    },

    // Extra Floating Abstract Card
    {
      id: 'res-col4-3',
      title: 'Solitude Estate',
      location: 'Coorg, KA',
      year: '2021',
      image: '/images/project-sanika-hero.jpg',
      isColored: false,
      subtitle: 'Contoured Hillside Placement',
      aspect: 'aspect-[16/9]',
      coords: '12.3375° N · 75.8069° E',
    },
  ];

  const handleCardClick = (item: ResidentialItem) => {
    if (item.isColored && item.projectId) {
      navigate(`/project/${item.projectId}`);
    }
  };

  return (
    <div className="min-h-screen pt-24 pb-24 px-6 md:px-16 overflow-hidden" style={{ background: '#FAF9F7' }}>
      <div className="max-w-[1450px] mx-auto">
        {/* Header */}
        <div className="mb-14 flex flex-col lg:flex-row lg:items-end justify-between border-b border-neutral-300/80 pb-8">
          <div>
            <div className="flex items-center gap-3 mb-4">
              <Link
                to="/"
                className="inline-flex items-center justify-center w-10 h-10 rounded-full border border-black/20 text-black hover:bg-black hover:text-white transition-all duration-300"
              >
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                  <path d="M13 8H3M3 8L7 4M3 8L7 12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </Link>
              <span className="font-body text-xs uppercase tracking-widest text-medium-gray">
                Professional Work / Residential Architecture
              </span>
            </div>

            <h1
              className="font-display font-light text-black tracking-tight"
              style={{ fontSize: 'clamp(38px, 5vw, 68px)', lineHeight: '0.94' }}
            >
              Residential Works
            </h1>
            <p className="font-body text-dark-gray text-sm mt-3 max-w-2xl font-light leading-relaxed">
              An abstract, non-uniform 4×2 creative grid showcasing residential architectural projects. Explore the featured full-color case studies with complete documentation.
            </p>
          </div>

          <div className="mt-8 lg:mt-0 flex items-center gap-6 text-xs font-body uppercase tracking-widest text-medium-gray">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-600"></span>
              <span className="text-black font-medium">2 Featured (Colored)</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-neutral-400"></span>
              <span>Monochrome Archival</span>
            </div>
          </div>
        </div>

        {/* 4x2 Abstract Creative Grid Container */}
        <div
          ref={gridRef}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-7 items-start"
        >
          {residentialItems.map((item, index) => (
            <div
              key={item.id}
              onClick={() => handleCardClick(item)}
              className={`creative-card group relative rounded-xl overflow-hidden border transition-all duration-700 bg-white ${
                item.isColored
                  ? 'cursor-pointer border-emerald-600/40 shadow-md hover:shadow-2xl ring-2 ring-emerald-500/20 hover:border-black'
                  : 'cursor-default border-neutral-200/90 shadow-sm hover:shadow-md'
              }`}
              style={{
                marginTop: index % 2 === 1 ? '32px' : '0px', // Abstract vertical offset staggering
              }}
            >
              {/* Image Box */}
              <div className={`relative w-full ${item.aspect} overflow-hidden bg-neutral-100`}>
                <img
                  src={item.image}
                  alt={item.title}
                  className={`w-full h-full object-cover transition-transform duration-800 ease-out group-hover:scale-105 ${
                    !item.isColored ? 'filter grayscale contrast-110' : ''
                  }`}
                />

                {/* Badge for Colored Items */}
                {item.isColored && (
                  <div className="absolute top-4 left-4 z-10 bg-black/85 backdrop-blur-md text-white text-[10px] uppercase font-body tracking-widest px-3 py-1 rounded-full flex items-center gap-2 shadow-md">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
                    <span>{item.tag || 'Featured Project'}</span>
                  </div>
                )}

                {!item.isColored && (
                  <div className="absolute top-4 left-4 z-10 bg-white/90 backdrop-blur-sm text-neutral-600 text-[9px] uppercase font-body tracking-widest px-2.5 py-1 rounded border border-neutral-200">
                    Archival
                  </div>
                )}

                {/* Top-Right Index */}
                <div className="absolute top-4 right-4 z-10 font-display text-xs text-black/50 font-light tracking-widest bg-white/70 px-2 py-0.5 rounded backdrop-blur-sm">
                  {String(index + 1).padStart(2, '0')}
                </div>
              </div>

              {/* Card Footer */}
              <div className="p-5 flex flex-col justify-between">
                <div>
                  <div className="text-[11px] font-body uppercase tracking-wider text-medium-gray flex items-center justify-between">
                    <span>{item.location}</span>
                    <span>{item.year}</span>
                  </div>

                  <h3
                    className={`font-display text-xl leading-tight mt-1.5 ${
                      item.isColored ? 'text-black font-normal group-hover:text-emerald-950 transition-colors' : 'text-neutral-800 font-light'
                    }`}
                  >
                    {item.title}
                  </h3>

                  <p className="font-body text-xs text-medium-gray mt-1 font-light">
                    {item.subtitle}
                  </p>
                </div>

                {item.isColored ? (
                  <div className="mt-4 pt-3 border-t border-neutral-100 flex items-center justify-between text-xs font-body uppercase tracking-wider text-black group-hover:translate-x-1 transition-transform">
                    <span className="font-medium text-emerald-950">View Detailed Case Study</span>
                    <div className="w-6 h-6 rounded-full bg-black text-white flex items-center justify-center">
                      <svg width="12" height="12" viewBox="0 0 16 16" fill="none">
                        <path d="M3 8H13M13 8L9 4M13 8L9 12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    </div>
                  </div>
                ) : (
                  <div className="mt-3 pt-2 border-t border-neutral-100 text-[10px] font-body text-neutral-400 tracking-wider flex items-center justify-between">
                    <span>Architectural Study</span>
                    <span>{item.coords}</span>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
