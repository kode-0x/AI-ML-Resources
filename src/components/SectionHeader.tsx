import { ChevronRight } from 'lucide-react';
import { motion, useReducedMotion } from 'framer-motion';
import type { SectionId } from '../types';
import { useFilterStore } from '../store/useFilterStore';
import { spring } from '../lib/animations';

interface SectionHeaderProps {
  id: SectionId;
  title: string;
  description: string;
  order: number;
  totalCount: number;
  visibleCount: number;
}

export function SectionHeader({
  id,
  title,
  description,
  order,
  totalCount,
  visibleCount,
}: SectionHeaderProps) {
  const { openSections, toggleSection } = useFilterStore();
  const isOpen = openSections.has(id);
  const isFiltered = visibleCount < totalCount;
  const reduced = useReducedMotion();

  return (
    <motion.button
      onClick={() => toggleSection(id)}
      className="w-full flex items-start gap-4 py-4 text-left group rounded-sm hover:bg-neutral-50 dark:hover:bg-neutral-800/50 focus:outline-none focus-visible:ring-2 focus-visible:ring-neutral-400 dark:focus-visible:ring-neutral-600 transition-colors"
      aria-expanded={isOpen}
      aria-controls={`section-${id}`}
      type="button"
      whileTap={reduced ? {} : { scale: 0.99 }}
      transition={spring.tight}
    >
      <span className="shrink-0 mt-0.5 w-6 h-6 flex items-center justify-center border border-neutral-300 dark:border-neutral-700 rounded-sm text-[11px] font-mono text-neutral-400 dark:text-neutral-500 group-hover:border-neutral-500 dark:group-hover:border-neutral-500 transition-colors">
        {order}
      </span>

      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2 flex-wrap">
          <h2 className="text-base font-semibold text-neutral-900 dark:text-neutral-100 tracking-tight">
            {title}
          </h2>
          <span className="text-xs font-mono text-neutral-400 dark:text-neutral-500">
            {isFiltered ? (
              <>
                <span className="text-neutral-700 dark:text-neutral-300">{visibleCount}</span>
                <span>/{totalCount}</span>
              </>
            ) : (
              totalCount
            )}
          </span>
        </div>
        <p className="text-xs text-neutral-500 dark:text-neutral-400 mt-0.5 leading-relaxed">
          {description}
        </p>
      </div>

      <motion.span
        className="shrink-0 mt-1 text-neutral-400 dark:text-neutral-500 group-hover:text-neutral-700 dark:group-hover:text-neutral-300 transition-colors"
        animate={reduced ? {} : { rotate: isOpen ? 90 : 0 }}
        transition={spring.snappy}
      >
        <ChevronRight size={16} strokeWidth={2} />
      </motion.span>
    </motion.button>
  );
}
