import { ExternalLink } from 'lucide-react';
import { motion, useReducedMotion } from 'framer-motion';
import type { Resource } from '../types';
import { TagBadge } from './TagBadge';
import { ResourceTypeBadge } from './ResourceTypeBadge';
import { PaidBadge } from './PaidBadge';
import { DifficultyDot } from './DifficultyDot';
import { useFilterStore } from '../store/useFilterStore';
import { fadeUp, spring } from '../lib/animations';

interface ResourceCardProps {
  resource: Resource;
}

export function ResourceCard({ resource }: ResourceCardProps) {
  const { activeTags, toggleTag } = useFilterStore();
  const reduced = useReducedMotion();

  return (
    <motion.article
      variants={reduced ? {} : fadeUp}
      className="group h-[280px] flex flex-col border border-neutral-200 dark:border-neutral-700 rounded-sm p-4 bg-white dark:bg-neutral-900 cursor-default transition-colors"
      whileHover={reduced ? {} : {
        y: -2,
        borderColor: '#737373',
        boxShadow: '0 8px 24px 0 rgba(0,0,0,0.16)',
      }}
      transition={spring.gentle}
    >
      <div className="flex items-center justify-between mb-2">
        <div className="flex items-center gap-1.5">
          <ResourceTypeBadge type={resource.type} />
          {resource.tags.includes('paid') && <PaidBadge />}
        </div>
        <DifficultyDot difficulty={resource.difficulty} showLabel />
      </div>

      <a
        href={resource.url}
        target="_blank"
        rel="noopener noreferrer"
        className="group/link inline-flex items-start gap-1.5 mb-1 min-h-[40px] rounded-sm focus:outline-none focus-visible:ring-2 focus-visible:ring-neutral-400 dark:focus-visible:ring-neutral-600"
        aria-label={`${resource.title} — opens in new tab`}
      >
        <span className="text-sm font-medium text-neutral-900 dark:text-neutral-100 leading-snug line-clamp-2 group-hover/link:underline underline-offset-2">
          {resource.title}
        </span>
        <ExternalLink
          size={12}
          strokeWidth={2}
          className="mt-0.5 shrink-0 text-neutral-400 dark:text-neutral-500 opacity-0 group-hover/link:opacity-100 transition-opacity"
        />
      </a>

      <p className="text-xs text-neutral-400 dark:text-neutral-500 font-mono mb-2 truncate">
        {resource.author}
      </p>

      <p className="text-xs text-neutral-600 dark:text-neutral-400 leading-relaxed mb-3 line-clamp-4 min-h-[64px]">
        {resource.description}
      </p>

      <div className="mt-auto max-h-[48px] overflow-hidden flex flex-wrap content-start gap-1">
        {resource.tags.filter((tag) => tag !== 'paid').map((tag) => (
          <TagBadge
            key={tag}
            tag={tag}
            active={activeTags.has(tag)}
            onClick={() => toggleTag(tag)}
          />
        ))}
      </div>
    </motion.article>
  );
}
