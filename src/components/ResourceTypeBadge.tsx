import type { ResourceType } from '../types';

const TYPE_LABELS: Record<ResourceType, string> = {
  book: 'book',
  course: 'course',
  video: 'video',
  article: 'article',
  documentation: 'docs',
  paper: 'paper',
  tool: 'tool',
};

interface ResourceTypeBadgeProps {
  type: ResourceType;
}

export function ResourceTypeBadge({ type }: ResourceTypeBadgeProps) {
  return (
    <span className="inline-block px-1.5 py-0.5 text-[10px] font-mono tracking-widest uppercase border border-neutral-300 dark:border-neutral-700 text-neutral-400 dark:text-neutral-500 rounded-sm select-none">
      {TYPE_LABELS[type]}
    </span>
  );
}
