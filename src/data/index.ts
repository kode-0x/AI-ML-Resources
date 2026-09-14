import type { Difficulty, Resource, ResourceType, Section } from '../types';

const rawSections = import.meta.glob('../../data/*.json', {
  eager: true,
  import: 'default',
}) as Record<string, unknown>;

const RESOURCE_TYPES: ResourceType[] = [
  'book',
  'course',
  'video',
  'article',
  'documentation',
  'paper',
  'tool',
];

const DIFFICULTIES: Difficulty[] = ['beginner', 'intermediate', 'advanced'];

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === 'object' && value !== null;
}

function isResource(value: unknown): value is Resource {
  if (!isRecord(value)) return false;

  return (
    typeof value.id === 'string' &&
    typeof value.title === 'string' &&
    typeof value.author === 'string' &&
    typeof value.url === 'string' &&
    RESOURCE_TYPES.includes(value.type as ResourceType) &&
    Array.isArray(value.tags) &&
    value.tags.every((tag) => typeof tag === 'string') &&
    typeof value.description === 'string' &&
    DIFFICULTIES.includes(value.difficulty as Difficulty)
  );
}

function parseSection(value: unknown): Section | null {
  if (!isRecord(value)) return null;
  if (
    typeof value.id !== 'string' ||
    typeof value.title !== 'string' ||
    typeof value.description !== 'string' ||
    typeof value.order !== 'number' ||
    !Array.isArray(value.resources)
  ) {
    return null;
  }

  return {
    id: value.id,
    title: value.title,
    description: value.description,
    order: value.order,
    resources: value.resources.filter(isResource),
  };
}

export const ALL_SECTIONS: Section[] = Object.values(rawSections)
  .map(parseSection)
  .filter((section): section is Section => section !== null)
  .sort((a, b) => a.order - b.order);

export const ALL_SECTION_IDS = ALL_SECTIONS.map((section) => section.id);

export const ALL_RESOURCES: Resource[] = ALL_SECTIONS.flatMap((s) => s.resources);

export const ALL_TAGS: string[] = [
  ...new Set(ALL_RESOURCES.flatMap((r) => r.tags)),
].sort();

export const ALL_TYPES: ResourceType[] = [
  ...new Set(ALL_RESOURCES.map((r) => r.type)),
].sort() as ResourceType[];

export const TOTAL_COUNT = ALL_RESOURCES.length;

export function filterResources(
  resources: Resource[],
  {
    activeTags,
    activeTypes,
    activeDifficulties,
    searchQuery,
  }: {
    activeTags: Set<string>;
    activeTypes: Set<ResourceType>;
    activeDifficulties: Set<string>;
    searchQuery: string;
  },
): Resource[] {
  const query = searchQuery.trim().toLowerCase();

  return resources.filter((r) => {
    if (activeTags.size > 0 && !r.tags.some((t) => activeTags.has(t))) return false;
    if (activeTypes.size > 0 && !activeTypes.has(r.type)) return false;
    if (activeDifficulties.size > 0 && !activeDifficulties.has(r.difficulty)) return false;
    if (query) {
      const haystack = `${r.title} ${r.author} ${r.description} ${r.tags.join(' ')}`.toLowerCase();
      if (!haystack.includes(query)) return false;
    }
    return true;
  });
}
