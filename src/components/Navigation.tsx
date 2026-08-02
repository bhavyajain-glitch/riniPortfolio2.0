import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';

interface NavigationProps {
  onNavigate?: (section: string) => void;
}

export default function Navigation({ onNavigate }: NavigationProps) {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const navRef = useRef<HTMLElement>(null);

  useEffect(() => {
    function handleScroll() {
      setScrolled(window.scrollY > 100);
    }
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNavClick = (section: string) => {
    setMenuOpen(false);
    onNavigate?.(section);
  };

  return (
    <>
      <nav
        ref={navRef}
        className="fixed top-0 left-0 w-full z-50 transition-all duration-400"
        style={{
          height: '64px',
          background: scrolled ? 'rgba(250, 249, 247, 0.92)' : 'rgba(250, 249, 247, 0.0)',
          backdropFilter: scrolled ? 'blur(12px)' : 'none',
          WebkitBackdropFilter: scrolled ? 'blur(12px)' : 'none',
        }}
      >
        <div className="flex items-center justify-between h-full px-6 md:px-20">
          <Link
            to="/"
            className="font-display text-2xl tracking-tight text-black hover:opacity-70 transition-opacity"
            style={{ letterSpacing: '-0.5px' }}
          >
            RJ
          </Link>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-10">
            {['Work', 'About', 'Contact'].map((item) => (
              <button
                key={item}
                onClick={() => handleNavClick(item.toLowerCase())}
                className="group relative font-body text-xs uppercase tracking-widest text-black"
                style={{ letterSpacing: '0.08em', fontWeight: 400 }}
              >
                {item}
                <span className="absolute -bottom-1 left-0 w-full h-px bg-black transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left" />
              </button>
            ))}
          </div>

          {/* Mobile Hamburger */}
          <button
            className="md:hidden flex flex-col gap-1.5"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Toggle menu"
          >
            <span
              className="block w-6 h-px bg-black transition-transform duration-300"
              style={{
                transform: menuOpen ? 'rotate(45deg) translateY(4px)' : 'none',
              }}
            />
            <span
              className="block w-6 h-px bg-black transition-transform duration-300"
              style={{
                transform: menuOpen ? 'rotate(-45deg) translateY(-4px)' : 'none',
              }}
            />
          </button>
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      {menuOpen && (
        <div
          className="fixed inset-0 z-40 flex flex-col items-center justify-center"
          style={{ background: '#FAF9F7' }}
        >
          {['Work', 'About', 'Contact'].map((item, i) => (
            <button
              key={item}
              onClick={() => handleNavClick(item.toLowerCase())}
              className="font-display text-4xl md:text-5xl text-black my-4 hover:opacity-60 transition-opacity"
              style={{
                animationDelay: `${i * 0.1}s`,
                animation: 'fadeSlideIn 0.5s cubic-bezier(0.16, 1, 0.3, 1) forwards',
                opacity: 0,
              }}
            >
              {item}
            </button>
          ))}
        </div>
      )}

      <style>{`
        @keyframes fadeSlideIn {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </>
  );
}
