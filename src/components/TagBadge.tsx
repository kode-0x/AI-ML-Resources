import { X } from 'lucide-react';
import { motion, useReducedMotion } from 'framer-motion';
import { spring } from '../lib/animations';

interface TagBadgeProps {
  tag: string;
  active?: boolean;
  removable?: boolean;
  onClick?: () => void;
}

export function TagBadge({ tag, active = false, removable = false, onClick }: TagBadgeProps) {
  const reduced = useReducedMotion();

  return (
    <motion.button
      onClick={onClick}
      layout
      className={[
        'inline-flex items-center gap-1 px-2 py-0.5 text-xs font-mono tracking-wide',
        'border rounded-sm transition-colors duration-100',
        active
          ? 'bg-neutral-900 dark:bg-neutral-100 text-white dark:text-neutral-900 border-neutral-900 dark:border-neutral-100'
          : 'bg-transparent text-neutral-500 dark:text-neutral-400 border-neutral-300 dark:border-neutral-700 hover:border-neutral-600 dark:hover:border-neutral-500 hover:text-neutral-800 dark:hover:text-neutral-200',
        onClick ? 'cursor-pointer' : 'cursor-default',
        onClick ? 'focus:outline-none focus-visible:ring-2 focus-visible:ring-neutral-400 dark:focus-visible:ring-neutral-600' : '',
      ].join(' ')}
      type="button"
      aria-pressed={active}
      whileHover={reduced ? {} : { y: -1, scale: 1.03 }}
      whileTap={reduced ? {} : { scale: 0.93 }}
      transition={spring.tight}
    >
      {tag}
      {removable && active && <X size={10} strokeWidth={2.5} />}
    </motion.button>
  );
}
