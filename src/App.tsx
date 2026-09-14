import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Header } from './components/Header';
import { MobileFilterDrawer } from './components/MobileFilterDrawer';
import { HomePage } from './pages/HomePage';
import { useThemeStore } from './store/useThemeStore';
import { motion, useReducedMotion } from 'framer-motion';
import { useEffect } from 'react';

export function App() {
  const { theme } = useThemeStore();
  const reduced = useReducedMotion();

  useEffect(() => {
    document.documentElement.classList.toggle('dark', theme === 'dark');
  }, [theme]);

  return (
    <BrowserRouter>
      <motion.div
        className={`${theme === 'dark' ? 'dark' : ''} min-h-screen bg-white dark:bg-neutral-950 text-neutral-900 dark:text-neutral-100 transition-colors duration-300`}
        animate={reduced ? {} : {
          backgroundColor: theme === 'dark' ? '#0a0a0a' : '#ffffff',
          color: theme === 'dark' ? '#f5f5f5' : '#171717',
        }}
        transition={{ duration: 0.25, ease: 'easeOut' }}
      >
        <Header />
        <Routes>
          <Route path="/" element={<HomePage />} />
        </Routes>
        <MobileFilterDrawer />
      </motion.div>
    </BrowserRouter>
  );
}
