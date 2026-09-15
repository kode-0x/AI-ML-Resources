import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import { useFilterStore } from '../store/useFilterStore';
import { filterResources } from '../data';
import { ResourceCard } from '../components/ResourceCard';
import { SectionHeader } from '../components/SectionHeader';
import { EmptyState } from '../components/EmptyState';
import { staggerContainer, fadeUp } from '../lib/animations';
import type { Section, SectionId } from '../types';

interface ResourcesSectionProps {
  section: Section;
  collapsible?: boolean;
}

export function ResourcesSection({ section, collapsible = true }: ResourcesSectionProps) {
  const { openSections, activeTags, activeTypes, activeDifficulties, searchQuery } =
    useFilterStore();

  const isOpen = !collapsible || openSections.has(section.id as SectionId);
  const reduced = useReducedMotion();

  const filtered = filterResources(section.resources, {
    activeTags,
    activeTypes,
    activeDifficulties,
    searchQuery,
  });

  return (
    <section
      className="border-b border-neutral-200 dark:border-neutral-800 last:border-b-0"
      aria-labelledby={`section-heading-${section.id}`}
    >
      {collapsible && (
        <SectionHeader
          id={section.id as SectionId}
          title={section.title}
          description={section.description}
        />
      )}

      {collapsible ? (
        <AnimatePresence initial={false}>
          {isOpen && (
            <motion.div
              id={`section-${section.id}`}
              role="region"
              key="content"
              initial={reduced ? { opacity: 0 } : { height: 0, opacity: 0 }}
              animate={reduced ? { opacity: 1 } : { height: 'auto', opacity: 1 }}
              exit={reduced ? { opacity: 0 } : { height: 0, opacity: 0 }}
              transition={{ duration: 0.22, ease: [0.25, 0.1, 0.25, 1] }}
              style={{ overflow: 'hidden' }}
            >
              <ResourceGrid section={section} filtered={filtered} reduced={reduced} />
            </motion.div>
          )}
        </AnimatePresence>
      ) : (
        <ResourceGrid section={section} filtered={filtered} reduced={reduced} />
      )}
    </section>
  );
}

function ResourceGrid({
  section,
  filtered,
  reduced,
}: {
  section: Section;
  filtered: Section['resources'];
  reduced: boolean | null;
}) {
  return (
    <div className="pb-6 pt-1">
      {filtered.length === 0 ? (
        <EmptyState sectionTitle={section.title} />
      ) : (
        <motion.div
          className="grid min-w-0 grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-3 auto-rows-[280px]"
          variants={reduced ? {} : staggerContainer}
          initial="hidden"
          animate="visible"
        >
          {filtered.map((resource) => (
          <motion.div
              key={resource.id}
              className="h-full"
              variants={reduced ? {} : fadeUp}
          >
              <ResourceCard resource={resource} />
          </motion.div>
          ))}
        </motion.div>
      )}
    </div>
  );
}
