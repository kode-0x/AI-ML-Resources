# AI / ML Resources

A single-page, monochrome, minimalist resource directory for AI & ML learners — inspired by [ml-resources.vercel.app](https://ml-resources.vercel.app/).

## Stack

| Tool | Purpose |
|---|---|
| React 18 + TypeScript | UI & type safety |
| Vite | Build tooling |
| Tailwind CSS | Styling |
| Zustand | Filter & section state |
| React Router v6 | Routing |
| Lucide React | Icons |

## Getting started

```bash
npm install
npm run dev       # development server
npm run build     # production build
npm run preview   # preview production build
```

## Project structure

```
├── data/                         # Raw JSON resource data (edit here to add resources)
│   ├── mathematics.json
│   ├── machine-learning.json
│   └── deep-learning.json
│
└── src/
    ├── types/index.ts            # Shared TypeScript types
    ├── data/                     # JSON loaders + filterResources() utility
    ├── store/useFilterStore.ts   # Zustand store (filters + section state)
    ├── components/               # Reusable UI atoms
    │   ├── Header.tsx
    │   ├── SearchBar.tsx
    │   ├── TagFilter.tsx
    │   ├── TagBadge.tsx
    │   ├── ResourceCard.tsx
    │   ├── ResourceTypeBadge.tsx
    │   ├── DifficultyDot.tsx
    │   ├── SectionHeader.tsx
    │   ├── EmptyState.tsx
    │   └── MobileFilterDrawer.tsx
    ├── sections/                 # Per-section components
    │   └── ResourcesSection.tsx  # Shared collapsible section wrapper
    └── pages/
        └── HomePage.tsx
```

## Adding resources

Edit the relevant JSON file in `/data`. Each resource follows this schema:

```jsonc
{
  "id": "unique-id",
  "title": "Resource Title",
  "author": "Author Name",
  "url": "https://...",
  "type": "book | course | video | article | documentation | paper | tool",
  "tags": ["tag-one", "tag-two"],
  "description": "One or two sentence description.",
  "difficulty": "beginner | intermediate | advanced"
}
```

No code changes needed — the data files are the single source of truth.

## Resource sections

| # | Section | Resources |
|---|---|---|
| 1 | Mathematics | 15 |
| 2 | Machine Learning | 18 |
| 3 | Deep Learning | 20 |
