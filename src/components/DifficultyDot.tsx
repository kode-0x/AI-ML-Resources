import type { Difficulty } from '../types';

const DIFFICULTY_CONFIG: Record<Difficulty, { label: string; dots: number }> = {
  beginner: { label: 'beginner', dots: 1 },
  intermediate: { label: 'intermediate', dots: 2 },
  advanced: { label: 'advanced', dots: 3 },
};

interface DifficultyDotProps {
  difficulty: Difficulty;
  showLabel?: boolean;
}

export function DifficultyDot({ difficulty, showLabel = false }: DifficultyDotProps) {
  const config = DIFFICULTY_CONFIG[difficulty];

  return (
    <span className="inline-flex items-center gap-1" title={config.label}>
      <span className="inline-flex gap-0.5">
        {[1, 2, 3].map((n) => (
          <span
            key={n}
            className={[
              'block w-1.5 h-1.5 rounded-full border border-neutral-400 dark:border-neutral-600',
              n <= config.dots
                ? 'bg-neutral-700 dark:bg-neutral-300'
                : 'bg-transparent',
            ].join(' ')}
          />
        ))}
      </span>
      {showLabel && (
        <span className="text-[10px] font-mono text-neutral-400 dark:text-neutral-500 tracking-wide">
          {config.label}
        </span>
      )}
    </span>
  );
}
