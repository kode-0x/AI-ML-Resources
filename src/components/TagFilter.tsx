import { ChevronDown, ChevronUp, Filter, X } from 'lucide-react';
import { useState } from 'react';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import { ALL_TAGS, ALL_TYPES } from '../data';
import { useFilterStore } from '../store/useFilterStore';
import { TagBadge } from './TagBadge';
import { fadeIn, spring } from '../lib/animations';
import type { Difficulty, ResourceType } from '../types';

const DIFFICULTIES: Difficulty[] = ['beginner', 'intermediate', 'advanced'];

const TYPE_LABELS: Record<ResourceType, string> = {
  book: 'book',
  course: 'course',
  video: 'video',
  article: 'article',
  documentation: 'docs',
  paper: 'paper',
  tool: 'tool',
};

const DIFF_LABELS: Record<Difficulty, string> = {
  beginner: 'beginner',
  intermediate: 'intermediate',
  advanced: 'advanced',
};

export function TagFilter() {
  const {
    activeTags,
    activeTypes,
    activeDifficulties,
    toggleTag,
    toggleType,
    toggleDifficulty,
    clearAllFilters,
    hasActiveFilters,
  } = useFilterStore();

  const [tagsExpanded, setTagsExpanded] = useState(false);
  const reduced = useReducedMotion();
  const TAGS_PREVIEW = 20;
  const visibleTags = tagsExpanded ? ALL_TAGS : ALL_TAGS.slice(0, TAGS_PREVIEW);

  const isActive = hasActiveFilters();

  return (
    <aside className="space-y-5" aria-label="Filter resources">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-1.5 text-xs font-mono tracking-widest uppercase text-neutral-400 dark:text-neutral-500">
          <Filter size={12} strokeWidth={2} />
          <span>Filters</span>
        </div>
        <AnimatePresence>
          {isActive && (
            <motion.button
              onClick={clearAllFilters}
              className="flex items-center gap-1 text-xs text-neutral-400 dark:text-neutral-500 hover:text-neutral-800 dark:hover:text-neutral-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-neutral-400 dark:focus-visible:ring-neutral-600 rounded-sm transition-colors font-mono"
              type="button"
              variants={reduced ? {} : fadeIn}
              initial="hidden"
              animate="visible"
              exit="exit"
              whileTap={reduced ? {} : { scale: 0.92 }}
              transition={spring.tight}
            >
              <X size={11} strokeWidth={2.5} />
              clear all
            </motion.button>
          )}
        </AnimatePresence>
      </div>

      <div>
        <p className="text-[10px] font-mono tracking-widest uppercase text-neutral-400 dark:text-neutral-500 mb-2">
          Type
        </p>
        <div className="flex flex-wrap gap-1">
          {ALL_TYPES.map((type) => (
            <TagBadge
              key={type}
              tag={TYPE_LABELS[type]}
              active={activeTypes.has(type)}
              onClick={() => toggleType(type)}
            />
          ))}
        </div>
      </div>

      <div>
        <p className="text-[10px] font-mono tracking-widest uppercase text-neutral-400 dark:text-neutral-500 mb-2">
          Difficulty
        </p>
        <div className="flex flex-wrap gap-1">
          {DIFFICULTIES.map((d) => (
            <TagBadge
              key={d}
              tag={DIFF_LABELS[d]}
              active={activeDifficulties.has(d)}
              onClick={() => toggleDifficulty(d)}
            />
          ))}
        </div>
      </div>

      <div>
        <p className="text-[10px] font-mono tracking-widest uppercase text-neutral-400 dark:text-neutral-500 mb-2">
          Tags
        </p>
        <motion.div layout className="flex flex-wrap gap-1">
          {visibleTags.map((tag) => (
            <TagBadge
              key={tag}
              tag={tag}
              active={activeTags.has(tag)}
              onClick={() => toggleTag(tag)}
            />
          ))}
        </motion.div>
        {ALL_TAGS.length > TAGS_PREVIEW && (
          <motion.button
            onClick={() => setTagsExpanded((v) => !v)}
            className="mt-2 flex items-center gap-1 text-[11px] font-mono text-neutral-400 dark:text-neutral-500 hover:text-neutral-700 dark:hover:text-neutral-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-neutral-400 dark:focus-visible:ring-neutral-600 rounded-sm transition-colors"
            type="button"
            whileTap={reduced ? {} : { scale: 0.94 }}
            transition={spring.tight}
          >
            {tagsExpanded ? (
              <><ChevronUp size={12} strokeWidth={2} /> show less</>
            ) : (
              <><ChevronDown size={12} strokeWidth={2} /> +{ALL_TAGS.length - TAGS_PREVIEW} more</>
            )}
          </motion.button>
        )}
      </div>

      <AnimatePresence>
        {isActive && (
          <motion.div
            className="pt-3 border-t border-neutral-100 dark:border-neutral-800"
            variants={reduced ? {} : fadeIn}
            initial="hidden"
            animate="visible"
            exit="exit"
          >
            <p className="text-[10px] font-mono tracking-widest uppercase text-neutral-400 dark:text-neutral-500 mb-2">
              Active
            </p>
            <div className="flex flex-wrap gap-1">
              {[...activeTags].map((t) => (
                <TagBadge key={t} tag={t} active removable onClick={() => toggleTag(t)} />
              ))}
              {[...activeTypes].map((t) => (
                <TagBadge
                  key={t}
                  tag={TYPE_LABELS[t]}
                  active
                  removable
                  onClick={() => toggleType(t)}
                />
              ))}
              {[...activeDifficulties].map((d) => (
                <TagBadge
                  key={d}
                  tag={DIFF_LABELS[d]}
                  active
                  removable
                  onClick={() => toggleDifficulty(d)}
                />
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </aside>
  );
}
