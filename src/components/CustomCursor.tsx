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

    let x = 0;
    let y = 0;
    let targetX = 0;
    let targetY = 0;
    let rafId: number;

    function handleMouseMove(e: MouseEvent) {
      targetX = e.clientX;
      targetY = e.clientY;
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

    function animate() {
      x += (targetX - x) * 0.15;
      y += (targetY - y) * 0.15;
      cursor!.style.transform = `translate(${x}px, ${y}px) translate(-50%, -50%)`;
      rafId = requestAnimationFrame(animate);
    }

    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseenter', handleMouseEnter);
    document.addEventListener('mouseleave', handleMouseLeave);
    document.addEventListener('mouseover', handleLinkHover);
    document.addEventListener('mouseout', handleLinkLeave);
    rafId = requestAnimationFrame(animate);

    return () => {
      cancelAnimationFrame(rafId);
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
        transition: 'opacity 0.3s ease, width 0.3s ease, height 0.3s ease, background 0.3s ease',
        width: showProjectBubble ? '80px' : isHoveringLink ? '40px' : '8px',
        height: showProjectBubble ? '80px' : isHoveringLink ? '40px' : '8px',
        borderRadius: '50%',
        background: showProjectBubble
          ? 'rgba(250, 249, 247, 0.15)'
          : isHoveringLink
          ? 'transparent'
          : '#1A1A1A',
        border: showProjectBubble
          ? '1px solid rgba(250, 249, 247, 0.3)'
          : isHoveringLink
          ? '1px solid #1A1A1A'
          : 'none',
        backdropFilter: showProjectBubble ? 'blur(4px)' : 'none',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      {showProjectBubble && (
        <span
          className="font-body text-[11px] uppercase tracking-wider text-white"
          style={{ fontWeight: 400 }}
        >
          View
        </span>
      )}
    </div>
  );
}
