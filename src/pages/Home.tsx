import { useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import Hero from '@/sections/Hero';
import HorizontalGallery from '@/sections/HorizontalGallery';
import About from '@/sections/About';
import Philosophy from '@/sections/Philosophy';
import WorkCategories from '@/sections/WorkCategories';
import Process from '@/sections/Process';
import Contact from '@/sections/Contact';

interface HomeProps {
  onNavigate?: (section: string) => void;
}

export default function Home(_props: HomeProps) {
  const navigate = useNavigate();

  const handleProjectClick = useCallback(
    (projectId: string) => {
      navigate(`/project/${projectId}`);
    },
    [navigate]
  );

  return (
    <main>
      <Hero />
      <HorizontalGallery onProjectClick={handleProjectClick} />
      <About />
      <Philosophy />
      <WorkCategories onProjectClick={handleProjectClick} />
      <Process />
      <Contact />
    </main>
  );
}
