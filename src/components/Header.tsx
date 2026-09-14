import { Github, Moon, Sun } from 'lucide-react';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import { TOTAL_COUNT } from '../data';
import { useThemeStore } from '../store/useThemeStore';
import { iconSwap, spring } from '../lib/animations';

export function Header() {
  const { theme, toggleTheme } = useThemeStore();
  const isDark = theme === 'dark';
  const reduced = useReducedMotion();

  return (
    <header className="border-b border-neutral-200/80 dark:border-neutral-800/80 bg-white/95 dark:bg-neutral-950/95 backdrop-blur-sm sticky top-0 z-30 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 h-12 flex items-center justify-between gap-4">

        <motion.div
          className="flex items-center gap-3"
          initial={reduced ? false : { opacity: 0, x: -8 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.25, ease: 'easeOut' }}
        >
          <span className="font-mono text-sm font-medium tracking-tight text-neutral-900 dark:text-neutral-100">
            AI/ML Resources
          </span>
          <span className="hidden sm:inline text-[11px] font-mono text-neutral-400 dark:text-neutral-500 border border-neutral-200 dark:border-neutral-700 rounded-sm px-1.5 py-0.5">
            {TOTAL_COUNT} Resources
          </span>
        </motion.div>

        <motion.div
          className="flex items-center gap-2"
          initial={reduced ? false : { opacity: 0, x: 8 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.25, ease: 'easeOut' }}
        >
          <motion.button
            onClick={toggleTheme}
            aria-label={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
            type="button"
            className="relative flex items-center justify-center w-7 h-7 rounded-sm text-neutral-500 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-neutral-100 hover:bg-neutral-100 dark:hover:bg-neutral-800 focus:outline-none focus-visible:ring-2 focus-visible:ring-neutral-400 dark:focus-visible:ring-neutral-600 transition-colors overflow-hidden"
            whileHover={reduced ? {} : { scale: 1.1 }}
            whileTap={reduced ? {} : { scale: 0.88 }}
            transition={spring.snappy}
          >
            <AnimatePresence mode="wait" initial={false}>
              {isDark ? (
                <motion.span
                  key="sun"
                  variants={reduced ? {} : iconSwap}
                  initial="initial"
                  animate="animate"
                  exit="exit"
                  className="absolute inset-0 flex items-center justify-center"
                >
                  <Sun size={15} strokeWidth={1.75} />
                </motion.span>
              ) : (
                <motion.span
                  key="moon"
                  variants={reduced ? {} : iconSwap}
                  initial="initial"
                  animate="animate"
                  exit="exit"
                  className="absolute inset-0 flex items-center justify-center"
                >
                  <Moon size={15} strokeWidth={1.75} />
                </motion.span>
              )}
            </AnimatePresence>
          </motion.button>

          <motion.a
            href="https://github.com"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="GitHub"
            className="flex items-center justify-center w-7 h-7 rounded-sm text-neutral-500 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-neutral-100 hover:bg-neutral-100 dark:hover:bg-neutral-800 focus:outline-none focus-visible:ring-2 focus-visible:ring-neutral-400 dark:focus-visible:ring-neutral-600 transition-colors"
            whileHover={reduced ? {} : { scale: 1.1 }}
            whileTap={reduced ? {} : { scale: 0.88 }}
            transition={spring.snappy}
          >
            <Github size={15} strokeWidth={1.5} />
          </motion.a>
        </motion.div>
      </div>
    </header>
  );
}
