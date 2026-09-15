export type ResourceType =
  | 'book'
  | 'course'
  | 'video'
  | 'article'
  | 'documentation'
  | 'paper'
  | 'tool'
  | 'blog'
  | 'community'
  | 'docs'
  | 'github'
  | 'interactive'
  | 'tutorial'
  | 'slides';

export type Difficulty = 'beginner' | 'intermediate' | 'advanced';

export interface Resource {
  id: string;
  title: string;
  author: string;
  url: string;
  type: ResourceType;
  tags: string[];
  description: string;
  difficulty: Difficulty;
}

export interface Section {
  id: string;
  title: string;
  description: string;
  order: number;
  resources: Resource[];
}

export type SectionId = string;

export interface FilterState {
  activeTags: Set<string>;
  activeTypes: Set<ResourceType>;
  activeDifficulties: Set<Difficulty>;
  searchQuery: string;
}
