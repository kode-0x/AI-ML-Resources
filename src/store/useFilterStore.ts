import { create } from 'zustand';
import { ALL_SECTION_IDS } from '../data';
import type { Difficulty, ResourceType, SectionId } from '../types';

interface FilterStore {
  activeTags: Set<string>;
  activeTypes: Set<ResourceType>;
  activeDifficulties: Set<Difficulty>;
  searchQuery: string;
  openSections: Set<SectionId>;
  toggleTag: (tag: string) => void;
  clearTags: () => void;
  toggleType: (type: ResourceType) => void;
  clearTypes: () => void;
  toggleDifficulty: (difficulty: Difficulty) => void;
  clearDifficulties: () => void;
  setSearchQuery: (query: string) => void;
  toggleSection: (id: SectionId) => void;
  openAllSections: () => void;
  closeAllSections: () => void;
  clearAllFilters: () => void;
  hasActiveFilters: () => boolean;
}

export const useFilterStore = create<FilterStore>((set, get) => ({
  activeTags: new Set(),
  activeTypes: new Set(),
  activeDifficulties: new Set(),
  searchQuery: '',
  openSections: new Set(ALL_SECTION_IDS),

  toggleTag: (tag) =>
    set((state) => {
      const next = new Set(state.activeTags);
      next.has(tag) ? next.delete(tag) : next.add(tag);
      return { activeTags: next };
    }),

  clearTags: () => set({ activeTags: new Set() }),

  toggleType: (type) =>
    set((state) => {
      const next = new Set(state.activeTypes);
      next.has(type) ? next.delete(type) : next.add(type);
      return { activeTypes: next };
    }),

  clearTypes: () => set({ activeTypes: new Set() }),

  toggleDifficulty: (difficulty) =>
    set((state) => {
      const next = new Set(state.activeDifficulties);
      next.has(difficulty) ? next.delete(difficulty) : next.add(difficulty);
      return { activeDifficulties: next };
    }),

  clearDifficulties: () => set({ activeDifficulties: new Set() }),

  setSearchQuery: (query) => set({ searchQuery: query }),

  toggleSection: (id) =>
    set((state) => {
      const next = new Set(state.openSections);
      next.has(id) ? next.delete(id) : next.add(id);
      return { openSections: next };
    }),

  openAllSections: () => set({ openSections: new Set(ALL_SECTION_IDS) }),
  closeAllSections: () => set({ openSections: new Set() }),

  clearAllFilters: () =>
    set({
      activeTags: new Set(),
      activeTypes: new Set(),
      activeDifficulties: new Set(),
      searchQuery: '',
    }),

  hasActiveFilters: () => {
    const { activeTags, activeTypes, activeDifficulties, searchQuery } = get();
    return (
      activeTags.size > 0 ||
      activeTypes.size > 0 ||
      activeDifficulties.size > 0 ||
      searchQuery.trim().length > 0
    );
  },
}));
