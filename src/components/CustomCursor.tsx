import { useEffect, useRef, useState } from 'react';
import { useLocation } from 'react-router-dom';

export default function CustomCursor() {
  const cursorRef = useRef<HTMLDivElement>(null);
  const [isHoveringLink, setIsHoveringLink] = useState(false);
  const [isHoveringProject, setIsHoveringProject] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const location = useLocation();

  const isProjectPage = location.pathname.startsWith('/project/');

  useEffect(() => {
    const isTouchDevice = window.matchMedia('(hover: none)').matches;
    if (isTouchDevice) return;

    const cursor = cursorRef.current;
    if (!cursor) return;

    function handleMouseMove(e: MouseEvent) {
      if (cursorRef.current) {
        cursorRef.current.style.transform = `translate3d(${e.clientX}px, ${e.clientY}px, 0) translate(-50%, -50%)`;
      }
      setIsVisible(true);
    }

    function handleMouseEnter() {
      setIsVisible(true);
    }

    function handleMouseLeave() {
      setIsVisible(false);
    }

    function handleLinkHover(e: MouseEvent) {
      const target = e.target as HTMLElement;

      // On project description pages, do NOT show the VIEW bubble cursor
      if (window.location.pathname.startsWith('/project/')) {
        setIsHoveringProject(false);
        if (target.closest('a, button, [role="button"]')) {
          setIsHoveringLink(true);
        } else {
          setIsHoveringLink(false);
        }
        return;
      }

      if (target.closest('a, button, [role="button"]')) {
        setIsHoveringLink(true);
      } else if (target.closest('[data-project-item]')) {
        setIsHoveringProject(true);
      }
    }

    function handleLinkLeave(e: MouseEvent) {
      const target = e.target as HTMLElement;
      if (target.closest('a, button, [role="button"]')) {
        setIsHoveringLink(false);
      } else if (target.closest('[data-project-item]')) {
        setIsHoveringProject(false);
      }
    }

    document.addEventListener('mousemove', handleMouseMove, { passive: true });
    document.addEventListener('mouseenter', handleMouseEnter);
    document.addEventListener('mouseleave', handleMouseLeave);
    document.addEventListener('mouseover', handleLinkHover);
    document.addEventListener('mouseout', handleLinkLeave);

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseenter', handleMouseEnter);
      document.removeEventListener('mouseleave', handleMouseLeave);
      document.removeEventListener('mouseover', handleLinkHover);
      document.removeEventListener('mouseout', handleLinkLeave);
    };
  }, [location.pathname]);

  if (typeof window !== 'undefined' && window.matchMedia('(hover: none)').matches) {
    return null;
  }

  const showProjectBubble = isHoveringProject && !isProjectPage;

  return (
    <div
      ref={cursorRef}
      className="fixed top-0 left-0 pointer-events-none z-[9999]"
      style={{
        opacity: isVisible ? 1 : 0,
        transition: 'opacity 0.2s ease, width 0.25s cubic-bezier(0.16, 1, 0.3, 1), height 0.25s cubic-bezier(0.16, 1, 0.3, 1), background 0.25s ease, border 0.25s ease',
        width: showProjectBubble ? '80px' : isHoveringLink ? '42px' : '9px',
        height: showProjectBubble ? '80px' : isHoveringLink ? '42px' : '9px',
        borderRadius: '50%',
        background: showProjectBubble
          ? 'rgba(250, 249, 247, 0.18)'
          : isHoveringLink
          ? 'transparent'
          : '#1A1A1A',
        border: showProjectBubble
          ? '1px solid rgba(250, 249, 247, 0.35)'
          : isHoveringLink
          ? '1.5px solid #1A1A1A'
          : 'none',
        backdropFilter: showProjectBubble ? 'blur(4px)' : 'none',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        willChange: 'transform',
      }}
    >
      {showProjectBubble && (
        <span
          className="font-body text-[11px] uppercase tracking-wider text-white select-none"
          style={{ fontWeight: 400 }}
        >
          View
        </span>
      )}
    </div>
  );
}
