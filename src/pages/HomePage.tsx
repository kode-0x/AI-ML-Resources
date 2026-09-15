import { ChevronsDownUp, ChevronsUpDown } from 'lucide-react';
import { motion, useReducedMotion } from 'framer-motion';
import { SearchBar } from '../components/SearchBar';
import { TagFilter } from '../components/TagFilter';
import { MobileFilterDrawer } from '../components/MobileFilterDrawer';
import { ResourcesSection } from '../sections/ResourcesSection';
import { useFilterStore } from '../store/useFilterStore';
import { fadeUp, spring, staggerContainer } from '../lib/animations';
import type { Section } from '../types';

interface HomePageProps {
  title: string;
  description: string;
  sections: Section[];
  collapsibleSections?: boolean;
}

export function HomePage({ title, description, sections, collapsibleSections = true }: HomePageProps) {
  const { openAllSections, closeAllSections, openSections } = useFilterStore();
  const allOpen = sections.length > 0 && sections.every((section) => openSections.has(section.id));
  const reduced = useReducedMotion();

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
      <div className="flex flex-col lg:flex-row gap-8">

        <motion.aside
          className="hidden lg:block w-56 xl:w-64 shrink-0"
          variants={reduced ? {} : fadeUp}
          initial="hidden"
          animate="visible"
          transition={{ delay: 0.08 }}
        >
          <div className="sticky top-20 max-h-[calc(100vh-5rem)] overflow-y-auto space-y-6 pb-4">
            <SearchBar />
            <TagFilter resources={sections.flatMap((section) => section.resources)} />
          </div>
        </motion.aside>

        <main className="flex-1 min-w-0">

          <motion.div
            className="mb-6 flex items-start justify-between gap-4"
            variants={reduced ? {} : fadeUp}
            initial="hidden"
            animate="visible"
          >
            <div>
              <h1 className="text-xl font-semibold tracking-tight text-neutral-900 dark:text-neutral-100">
                {title}
              </h1>
              <p className="text-sm text-neutral-500 dark:text-neutral-400 mt-1 max-w-2xl">
                {description}
              </p>
            </div>

            <motion.button
              onClick={allOpen ? closeAllSections : openAllSections}
              className="shrink-0 flex items-center gap-1.5 text-xs font-mono text-neutral-400 dark:text-neutral-500 hover:text-neutral-800 dark:hover:text-neutral-200 transition-colors border border-neutral-200 dark:border-neutral-700 hover:border-neutral-400 dark:hover:border-neutral-500 focus:outline-none focus-visible:ring-2 focus-visible:ring-neutral-400 dark:focus-visible:ring-neutral-600 rounded-sm px-2.5 py-1.5"
              type="button"
              aria-label={allOpen ? 'Collapse all sections' : 'Expand all sections'}
              whileHover={reduced ? {} : { y: -1 }}
              whileTap={reduced ? {} : { scale: 0.95 }}
              transition={spring.tight}
            >
              {allOpen ? (
                <><ChevronsDownUp size={13} strokeWidth={2} /> collapse all</>
              ) : (
                <><ChevronsUpDown size={13} strokeWidth={2} /> expand all</>
              )}
            </motion.button>
          </motion.div>

          <motion.div
            className="lg:hidden mb-5"
            variants={reduced ? {} : fadeUp}
            initial="hidden"
            animate="visible"
            transition={{ delay: 0.06 }}
          >
            <SearchBar />
          </motion.div>

          <motion.div
            className="border border-neutral-200 dark:border-neutral-800 rounded-sm divide-y divide-neutral-200 dark:divide-neutral-800 bg-white dark:bg-neutral-950 transition-colors duration-300"
            variants={reduced ? {} : staggerContainer}
            initial="hidden"
            animate="visible"
          >
            {sections.map((section) => (
              <div className="px-4 sm:px-5" key={section.id}>
                <ResourcesSection section={section} collapsible={collapsibleSections} />
              </div>
            ))}
          </motion.div>

          <motion.p
            className="mt-8 text-[11px] text-neutral-300 dark:text-neutral-700 font-mono text-center"
            variants={reduced ? {} : fadeUp}
            initial="hidden"
            animate="visible"
            transition={{ delay: 0.3 }}
          >
            click any tag on a card to filter · resources open in new tab
          </motion.p>
        </main>
      </div>
      <MobileFilterDrawer resources={sections.flatMap((section) => section.resources)} />
    </div>
  );
}
