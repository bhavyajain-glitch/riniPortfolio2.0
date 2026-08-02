import { useEffect, useRef } from 'react';
import { Link, useNavigate } from 'react-router';
import gsap from 'gsap';

interface TrainingGridItem {
  id: string;
  title: string;
  subtitle: string;
  year: string;
  image: string;
  isColored: boolean;
  projectId?: string;
  description: string;
}

export default function TrainingPage() {
  const navigate = useNavigate();
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    if (!containerRef.current) return;
    const cards = containerRef.current.querySelectorAll('.training-card');

    gsap.fromTo(
      cards,
      { opacity: 0, y: 30 },
      {
        opacity: 1,
        y: 0,
        stagger: 0.1,
        duration: 0.8,
        ease: 'power3.out',
      }
    );
  }, []);

  const items: TrainingGridItem[] = [
    {
      id: 'train-1',
      title: 'Apartments for Sanika Developers',
      subtitle: 'Residential Complex Elevation & Documentation',
      year: '2021',
      image: '/images/project-sanika-hero.jpg',
      isColored: true,
      projectId: 'sanika-apartments',
      description: 'Featured internship project at Thirdspace Architecture Studio. Innovative circular pattern façade systems, Twinmotion 3D visualizations, and municipal sanction drawings.',
    },
    {
      id: 'train-2',
      title: 'Facade Pattern & Sunshade Engineering',
      subtitle: 'Technical Elevation Iterations',
      year: '2021',
      image: '/images/project-sanika-1.jpg',
      isColored: false,
      description: 'Parametric circle opening variation study to optimize solar heat gain and natural light distribution across 19,000 sq ft.',
    },
    {
      id: 'train-3',
      title: 'Municipal Sanction & Approval Drawings',
      subtitle: 'Regulatory Compliance & Layouts',
      year: '2021',
      image: '/images/process-sketch-1.jpg',
      isColored: false,
      description: 'Development of 2D AutoCAD sanction sets, FAR calculations, setbacks, and structural grid alignment for municipal authorities.',
    },
    {
      id: 'train-4',
      title: 'Structural Framing & Joinery Modules',
      subtitle: 'Execution & Working Detail Set',
      year: '2021',
      image: '/images/process-sketch-2.jpg',
      isColored: false,
      description: 'Column grid placement, beam framing layouts, and custom wall panelling junction details created during studio internship.',
    },
  ];

  const handleCardClick = (item: TrainingGridItem) => {
    if (item.isColored && item.projectId) {
      navigate(`/project/${item.projectId}`);
    }
  };

  return (
    <div className="bg-warm-white min-h-screen pt-24 pb-24 px-6 md:px-16" style={{ background: '#FAF9F7' }}>
      <div className="max-w-[1300px] mx-auto">
        {/* Header */}
        <div className="mb-14 border-b border-neutral-300/60 pb-8 flex flex-col md:flex-row md:items-end justify-between">
          <div>
            <div className="flex items-center gap-3 mb-4">
              <Link
                to="/"
                className="inline-flex items-center justify-center w-10 h-10 rounded-full border border-black/20 hover:bg-black hover:text-white transition-all duration-300"
              >
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                  <path d="M13 8H3M3 8L7 4M3 8L7 12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </Link>
              <span className="font-body text-xs uppercase tracking-widest text-medium-gray">
                Professional Work / Training
              </span>
            </div>

            <h1
              className="font-display font-light text-black tracking-tight"
              style={{ fontSize: 'clamp(36px, 5vw, 64px)', lineHeight: '0.96' }}
            >
              Professional Training &amp; Practice
            </h1>
            <p className="font-body text-medium-gray text-sm mt-3 max-w-2xl font-light">
              Internship work &amp; technical documentation at Thirdspace Architecture Studio. Click the featured colored card to explore the full project case study for Apartments for Sanika Developers.
            </p>
          </div>

          <div className="mt-6 md:mt-0 flex items-center gap-4 text-xs font-body uppercase tracking-wider text-medium-gray">
            <div className="flex items-center gap-2">
              <span className="w-3 h-3 rounded-full bg-indigo-600 inline-block"></span>
              <span>1 Featured (Colored)</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="w-3 h-3 rounded-full bg-neutral-400 inline-block"></span>
              <span>3 Technical Sketches</span>
            </div>
          </div>
        </div>

        {/* 4 Image Aesthetic Grid */}
        <div
          ref={containerRef}
          className="grid grid-cols-1 md:grid-cols-2 gap-8"
        >
          {items.map((item) => (
            <div
              key={item.id}
              onClick={() => handleCardClick(item)}
              className={`training-card group relative rounded-xl overflow-hidden border transition-all duration-500 flex flex-col justify-between ${
                item.isColored
                  ? 'cursor-pointer border-indigo-700/40 hover:border-black shadow-lg hover:shadow-2xl ring-2 ring-indigo-500/20'
                  : 'cursor-default border-neutral-200 opacity-85 hover:opacity-100'
              }`}
              style={{ background: '#FFFFFF' }}
            >
              {/* Image Container */}
              <div className="relative w-full h-[320px] overflow-hidden bg-neutral-100">
                <img
                  src={item.image}
                  alt={item.title}
                  className={`w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105 ${
                    !item.isColored ? 'filter grayscale contrast-110' : ''
                  }`}
                />

                {/* Badge */}
                {item.isColored ? (
                  <div className="absolute top-4 left-4 bg-black/80 backdrop-blur-md text-white text-xs uppercase font-body tracking-widest px-3 py-1.5 rounded-full flex items-center gap-2 shadow-md">
                    <span className="w-2 h-2 rounded-full bg-indigo-400 animate-pulse"></span>
                    <span>Featured Training Project</span>
                  </div>
                ) : (
                  <div className="absolute top-4 left-4 bg-neutral-900/60 backdrop-blur-sm text-neutral-300 text-[10px] uppercase font-body tracking-widest px-2.5 py-1 rounded">
                    Technical Archive
                  </div>
                )}
              </div>

              {/* Info Details */}
              <div className="p-6 flex flex-col justify-between flex-grow">
                <div>
                  <div className="flex items-center justify-between text-xs font-body text-medium-gray mb-1 uppercase tracking-wider">
                    <span>{item.subtitle}</span>
                    <span>{item.year}</span>
                  </div>

                  <h3
                    className={`font-display text-2xl leading-tight mt-1 ${
                      item.isColored ? 'text-black font-normal group-hover:text-indigo-950' : 'text-neutral-800 font-light'
                    }`}
                  >
                    {item.title}
                  </h3>

                  <p className="font-body text-sm text-dark-gray mt-3 font-light leading-relaxed">
                    {item.description}
                  </p>
                </div>

                {item.isColored ? (
                  <div className="mt-6 pt-4 border-t border-neutral-100 flex items-center justify-between font-body text-xs uppercase tracking-widest text-black group-hover:translate-x-1 transition-transform">
                    <span className="font-normal text-indigo-900">Open Detailed Project Page</span>
                    <div className="w-8 h-8 rounded-full bg-black text-white flex items-center justify-center">
                      <svg width="14" height="14" viewBox="0 0 16 16" fill="none">
                        <path d="M3 8H13M13 8L9 4M13 8L9 12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    </div>
                  </div>
                ) : (
                  <div className="mt-4 pt-3 border-t border-neutral-100 text-[11px] font-body text-neutral-400 italic">
                    Studio Technical Documentation
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
