import { SlidersHorizontal } from 'lucide-react';
import { motion, useReducedMotion } from 'framer-motion';
import { useFilterStore } from '../store/useFilterStore';
import { fadeUp, spring } from '../lib/animations';

interface EmptyStateProps {
  sectionTitle: string;
}

export function EmptyState({ sectionTitle }: EmptyStateProps) {
  const { clearAllFilters } = useFilterStore();
  const reduced = useReducedMotion();

  return (
    <motion.div
      className="py-10 flex flex-col items-center gap-3 text-center"
      variants={reduced ? {} : fadeUp}
      initial="hidden"
      animate="visible"
    >
      <motion.div
        animate={reduced ? {} : { rotate: [0, -10, 10, -6, 6, 0] }}
        transition={{ duration: 0.55, delay: 0.15, ease: 'easeInOut' }}
      >
        <SlidersHorizontal size={20} strokeWidth={1.5} className="text-neutral-300 dark:text-neutral-700" />
      </motion.div>
      <p className="text-sm text-neutral-400 dark:text-neutral-500">
        No resources match the current filters in{' '}
        <span className="text-neutral-600 dark:text-neutral-300 font-medium">{sectionTitle}</span>.
      </p>
      <motion.button
        onClick={clearAllFilters}
        className="text-xs font-mono text-neutral-400 dark:text-neutral-500 hover:text-neutral-800 dark:hover:text-neutral-200 underline underline-offset-2 transition-colors"
        type="button"
        whileHover={reduced ? {} : { y: -1 }}
        whileTap={reduced ? {} : { scale: 0.94 }}
        transition={spring.tight}
      >
        clear filters
      </motion.button>
    </motion.div>
  );
}
