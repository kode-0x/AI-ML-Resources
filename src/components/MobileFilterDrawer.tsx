import { X, SlidersHorizontal } from 'lucide-react';
import { useEffect, useState } from 'react';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import { TagFilter } from './TagFilter';
import { useFilterStore } from '../store/useFilterStore';
import { fadeIn, slideUp, spring } from '../lib/animations';
import type { Resource } from '../types';

interface MobileFilterDrawerProps {
  resources: Resource[];
}

export function MobileFilterDrawer({ resources }: MobileFilterDrawerProps) {
  const [open, setOpen] = useState(false);
  const { hasActiveFilters } = useFilterStore();
  const active = hasActiveFilters();
  const reduced = useReducedMotion();

  useEffect(() => {
    if (!open) return;

    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setOpen(false);
    };

    document.addEventListener('keydown', closeOnEscape);
    return () => document.removeEventListener('keydown', closeOnEscape);
  }, [open]);

  return (
    <>
      <motion.button
        onClick={() => setOpen(true)}
        className={[
          'lg:hidden fixed bottom-5 right-5 z-40 flex items-center gap-2 px-3 py-2',
          'border rounded-sm text-xs font-mono shadow-sm transition-colors',
          active
            ? 'bg-neutral-900 dark:bg-neutral-100 text-white dark:text-neutral-900 border-neutral-900 dark:border-neutral-100'
            : 'bg-white dark:bg-neutral-900 text-neutral-600 dark:text-neutral-400 border-neutral-300 dark:border-neutral-700 hover:border-neutral-600 dark:hover:border-neutral-500',
          'focus:outline-none focus-visible:ring-2 focus-visible:ring-neutral-400 dark:focus-visible:ring-neutral-600',
        ].join(' ')}
        aria-label="Open filters"
        type="button"
        whileHover={reduced ? {} : { y: -2, boxShadow: '0 6px 20px rgba(0,0,0,0.12)' }}
        whileTap={reduced ? {} : { scale: 0.94 }}
        transition={spring.snappy}
      >
        <motion.span
          animate={reduced ? {} : { rotate: open ? 90 : 0 }}
          transition={spring.snappy}
          className="flex items-center"
        >
          <SlidersHorizontal size={13} strokeWidth={2} />
        </motion.span>
        {active ? 'filters active' : 'filter'}
      </motion.button>

      <AnimatePresence mode="wait">
        {open && (
          <>
            <motion.div
              className="lg:hidden fixed inset-0 z-40 bg-black/30 dark:bg-black/50 backdrop-blur-sm"
              onClick={() => setOpen(false)}
              aria-hidden
              variants={reduced ? {} : fadeIn}
              initial="hidden"
              animate="visible"
              exit="exit"
            />

            <motion.aside
              className={[
                'lg:hidden fixed bottom-0 left-0 right-0 z-50',
                'bg-white dark:bg-neutral-900 border-t border-neutral-200 dark:border-neutral-700 shadow-[0_-12px_40px_rgba(0,0,0,0.12)] dark:shadow-[0_-12px_40px_rgba(0,0,0,0.35)]',
                'rounded-t-lg p-5 max-h-[80vh] overflow-y-auto',
              ].join(' ')}
              aria-label="Filters drawer"
              variants={reduced ? {} : slideUp}
              initial="hidden"
              animate="visible"
              exit="exit"
            >
              <div className="flex items-center justify-between mb-4">
                <span className="text-xs font-mono tracking-widest uppercase text-neutral-500 dark:text-neutral-400">
                  Filters
                </span>
                <motion.button
                  onClick={() => setOpen(false)}
                  className="text-neutral-400 dark:text-neutral-500 hover:text-neutral-800 dark:hover:text-neutral-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-neutral-400 dark:focus-visible:ring-neutral-600 transition-colors"
                  aria-label="Close filters"
                  type="button"
                  whileHover={reduced ? {} : { rotate: 90 }}
                  whileTap={reduced ? {} : { scale: 0.88 }}
                  transition={spring.snappy}
                >
                  <X size={16} strokeWidth={2} />
                </motion.button>
              </div>
              <TagFilter resources={resources} />
            </motion.aside>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
