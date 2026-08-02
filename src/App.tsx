import { Routes, Route, useLocation } from 'react-router-dom';
import { useCallback, useEffect } from 'react';
import useSmoothScroll from '@/hooks/useSmoothScroll';
import Navigation from '@/components/Navigation';
import CustomCursor from '@/components/CustomCursor';
import Home from '@/pages/Home';
import ProjectDetail from '@/pages/ProjectDetail';
import ResidentialPage from '@/pages/ResidentialPage';
import TrainingPage from '@/pages/TrainingPage';

export default function App() {
  const location = useLocation();
  useSmoothScroll();

  // Scroll to top on route change
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);

  const handleNavigate = useCallback((section: string) => {
    const el = document.getElementById(section);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  }, []);

  return (
    <>
      <CustomCursor />
      <Navigation onNavigate={handleNavigate} />
      <Routes>
        <Route path="/" element={<Home onNavigate={handleNavigate} />} />
        <Route path="/residential" element={<ResidentialPage />} />
        <Route path="/training" element={<TrainingPage />} />
        <Route path="/project/:id" element={<ProjectDetail />} />
        {/* Fallback route */}
        <Route path="*" element={<Home onNavigate={handleNavigate} />} />
      </Routes>
    </>
  );
}
