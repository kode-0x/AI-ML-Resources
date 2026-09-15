import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import { Header } from './components/Header';
import { HomePage } from './pages/HomePage';
import { ALL_SECTIONS } from './data';
import { useThemeStore } from './store/useThemeStore';
import { motion, useReducedMotion } from 'framer-motion';
import { useEffect } from 'react';

const sectionsFor = (ids: string[]) =>
  ids.flatMap((id) => ALL_SECTIONS.filter((section) => section.id === id));

const PAGE_CONFIG = {
  mathematics: {
    title: 'Mathematics',
    description: 'Build the linear algebra, calculus, probability, and statistics foundations for ML.',
    sectionIds: ['mathematics'],
  },
  resources: {
    title: 'Resources',
    description: 'Follow a structured path from mathematical foundations through machine learning, deep learning, and advanced topics.',
    sectionIds: [
      'mathematics',
      'machine-learning',
      'deep-learning',
      'ai-agents',
      'reinforcement-learning',
      'gpu',
    ],
  },
  'research-papers': {
    title: 'Research Papers',
    description: 'Study foundational and advanced research papers after building the core ML and deep learning concepts.',
    sectionIds: ['essential-papers'],
  },
  blogs: {
    title: 'Blogs',
    description: 'Follow experienced researchers and practitioners as you deepen your understanding.',
    sectionIds: ['blogs'],
  },
  communities: {
    title: 'Communities',
    description: 'Find places to ask questions, compare approaches, and learn with other practitioners.',
    sectionIds: ['communities'],
  },
} as const;

function ResourceRoute({ page }: { page: keyof typeof PAGE_CONFIG }) {
  const config = PAGE_CONFIG[page];
  return (
    <HomePage
      title={config.title}
      description={config.description}
      sections={sectionsFor([...config.sectionIds])}
      collapsibleSections={page === 'resources'}
    />
  );
}

export function App() {
  const { theme } = useThemeStore();
  const reduced = useReducedMotion();

  useEffect(() => {
    document.documentElement.classList.toggle('dark', theme === 'dark');
  }, [theme]);

  return (
    <BrowserRouter>
      <motion.div
        className={`${theme === 'dark' ? 'dark' : ''} theme-transition min-h-screen bg-white dark:bg-neutral-950 text-neutral-900 dark:text-neutral-100 transition-colors duration-300`}
        animate={reduced ? {} : {
          backgroundColor: theme === 'dark' ? '#0a0a0a' : '#ffffff',
          color: theme === 'dark' ? '#f5f5f5' : '#171717',
        }}
        transition={{ duration: 0.25, ease: 'easeOut' }}
      >
        <Header />
        <Routes>
          <Route path="/" element={<Navigate to="/resources" replace />} />
          <Route path="/mathematics" element={<ResourceRoute page="mathematics" />} />
          <Route path="/resources" element={<ResourceRoute page="resources" />} />
          <Route path="/research-papers" element={<ResourceRoute page="research-papers" />} />
          <Route path="/blogs" element={<ResourceRoute page="blogs" />} />
          <Route path="/communities" element={<ResourceRoute page="communities" />} />
          <Route path="*" element={<Navigate to="/mathematics" replace />} />
        </Routes>
      </motion.div>
    </BrowserRouter>
  );
}
