import { ChevronRight } from 'lucide-react';
import { motion, useReducedMotion } from 'framer-motion';
import type { SectionId } from '../types';
import { useFilterStore } from '../store/useFilterStore';
import { spring } from '../lib/animations';

interface SectionHeaderProps {
  id: SectionId;
  title: string;
  description: string;
}

export function SectionHeader({
  id,
  title,
  description,
}: SectionHeaderProps) {
  const { openSections, toggleSection } = useFilterStore();
  const isOpen = openSections.has(id);
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
      <div className="flex-1 min-w-0">
        <div>
          <h2 className="text-base font-semibold text-neutral-900 dark:text-neutral-100 tracking-tight">
            {title}
          </h2>
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
