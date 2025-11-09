# Brown Dictionary

An Urban Dictionary clone for Brown University-specific slang, terminology, and jokes.

## Project Goal

Create an exact Urban Dictionary clone (in concept and frontend design) that will serve as a baseline for Brown-specific slang. The site catalogues Brown terminology like CPAX, Perkins, Keeney, Josiah Carberry, the Wriston Quad Tickler, DPhi, DTau, Buxton, concentration, SmittyB, etc.

## Tech Stack

- **Framework**: React 19 + TypeScript
- **Build Tool**: Vite 7
- **Routing**: React Router v7
- **Styling**: Tailwind CSS v4
- **Animation**: Framer Motion
- **Database**: Firebase Firestore (ready to integrate, currently using test data)

## Core Principles

### 1. Clean Component Structure
All components must follow a hierarchical inheritance structure:
- Reusable components for cards, banners, buttons
- Clean parent-child relationships
- Minimal prop drilling

### 2. File Naming Convention
- All files: lowercase kebab-case
- Examples: `word-card.tsx`, `vote-buttons.tsx`, `search-bar.tsx`

### 3. Hierarchical Organization
Files organized conceptually:
```
src/
├── components/
│   ├── browse/         # Browsing-specific UI
│   ├── common/         # Reusable UI elements
│   ├── feed/           # Feed/list components
│   ├── layout/         # Page structure
│   └── word/           # Word/definition display
├── pages/              # Route pages
└── database/           # Centralized data layer
```

### 4. Theming
All colors handled through Tailwind theme configuration. No hardcoded colors in components.

Current theme colors:
- `background`: #161A20 (darkest)
- `card`: #212936 (card backgrounds)
- `card-secondary`: #2A3143 (hover/secondary states)
- `primary`: #134FE6 (blue accent)
- `primary-hover`: #2F5FFF
- `text`: #E8ECF4 (light text)
- `text-muted`: #8997AB (secondary text)
- `border`: #353D50 (borders)
- `highlight`: #4DAFFF (highlights)

### 5. No Fluff
Include only what is mentioned in requirements. No optional features, extraneous code, or unnecessary abstractions.

## Database Structure

### Firebase Schema (Flat Single Collection)

**Collection**: `words`

**Document Structure**:
```typescript
words/{slug} = {
  term: string           // Display term (e.g., "CPAX")
  slug: string          // URL-safe slug (e.g., "cpax")
  definitions: [
    {
      text: string          // Definition text
      example: string       // Usage example
      author: string        // Author name
      upvotes: number       // Upvote count
      downvotes: number     // Downvote count
      createdAt: timestamp  // Definition creation date
    }
  ]
  createdAt: timestamp  // Word creation date
  viewCount: number     // Total views
}
```

### Data Layer (`/src/database/db.ts`)

**Standard Interface** - All database access goes through these functions:

```typescript
getWords(): Promise<Word[]>
getWordBySlug(slug: string): Promise<Word | null>
getWordsByLetter(letter: string): Promise<Word[]>
searchWords(searchTerm: string): Promise<Word[]>
getRandomWords(count: number): Promise<Word[]>
```

**Current Implementation**:
- Using test data array (`TEST_WORDS`)
- Firebase code is commented out and ready to enable
- Switch between test/production by commenting/uncommenting sections in `db.ts`

**Test Data**:
Contains sample slang words (yeet, bussin, rizz, etc.) to demonstrate functionality. Can be seamlessly replaced by uncommenting Firebase code.

## Routing

Routes implemented with React Router v7:

| Route | Page | Purpose |
|-------|------|---------|
| `/` | Home | Feed of recent words |
| `/word/:slug` | Word Detail | Single word with all definitions |
| `/browse` | Browse | Alphabet grid |
| `/browse/:letter` | Browse by Letter | Words starting with letter |
| `/search?q=...` | Search Results | Search query results |
| `/add` | Add Definition | Form to submit new definition |

## Component Organization

### Layout Components (`/src/components/layout/`)
- `navbar.tsx` - Top navigation with search and add button
- `sidebar.tsx` - Slide-out mobile menu
- `footer.tsx` - Page footer
- `banner.tsx` - Reusable banner component

### Common Components (`/src/components/common/`)
- `button.tsx` - Reusable button (variants: primary, secondary, outline)
- `search-bar.tsx` - Search input with navigation
- `share-button.tsx` - Share functionality

### Word Components (`/src/components/word/`)
- `word-card.tsx` - Main card displaying term + definitions
- `definition-item.tsx` - Individual definition display
- `vote-buttons.tsx` - Upvote/downvote UI
- `related-words.tsx` - Related term suggestions

### Browse Components (`/src/components/browse/`)
- `alphabet-grid.tsx` - A-Z navigation grid
- `word-list.tsx` - List view of words

### Feed Components (`/src/components/feed/`)
- `word-feed.tsx` - Container for multiple word cards

## Pages (`/src/pages/`)

Each page corresponds to a route:
- `home.tsx` - Main feed
- `word-detail.tsx` - Single word view
- `browse.tsx` - Browse by letter
- `search-results.tsx` - Search results
- `add-definition.tsx` - Submit new definition

## Development Guidelines

### Step-by-Step Approach
When implementing features:
1. Secure the first win completely before moving to the next
2. Test each component in isolation
3. Build hierarchically (base components first)

### Component Structure
Each component should:
- Use TypeScript interfaces
- Accept props with clear typing
- Use Tailwind classes (no inline styles)
- Reference theme colors (e.g., `bg-card`, `text-primary`)
- Be single-purpose and composable

### Database Access
- Always import from `/src/database/db.ts`
- Never access data directly
- Use async/await pattern
- Handle loading and error states

### Example Component Pattern
```tsx
interface WordCardProps {
  word: Word;
}

export function WordCard({ word }: WordCardProps) {
  return (
    <div className="bg-card border border-border rounded-lg p-4">
      <h2 className="text-xl font-bold text-text">{word.term}</h2>
      {/* ... */}
    </div>
  );
}
```

## Future Considerations

### Not Currently Implemented
- User accounts/authentication
- Ability to add new definitions (UI exists, no backend)
- Ability to vote (UI exists, no backend)
- Real-time updates
- Comments/replies
- User profiles

### Ready for Firebase Integration
When ready to switch from test data to Firebase:
1. Add Firebase config to `db.ts`
2. Uncomment Firebase import block
3. Comment out test data section
4. All pages will automatically use real data (same interface)

## Brown-Specific Terms (Examples)

The dictionary should eventually include:
- **CPAX** - Campus dining location
- **Perkins** - Building/location
- **Keeney** - Dorm
- **Josiah Carberry** - Fictional professor/mascot
- **Wriston Quad Tickler** - Campus legend
- **DPhi, DTau** - Greek organizations
- **Buxton** - Science library
- **Concentration** - Brown's term for major
- **SmittyB** - Campus personality/location

## Scripts

```bash
npm run dev      # Start development server
npm run build    # Build for production
npm run preview  # Preview production build
npm run lint     # Run ESLint
```

## Project Status

Currently a functional Urban Dictionary clone with:
- Complete routing structure
- All core UI components
- Test data implementation
- Theming system
- Responsive design

Ready for:
- Brown-specific content
- Firebase integration
- User authentication (future)
- Definition submission (future)
