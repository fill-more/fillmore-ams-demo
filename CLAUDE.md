# CLAUDE.md

Development guidance for Fillmore monorepo - a training management platform.

## Development Commands

```bash
pnpm install             # Install dependencies
pnpm dev:educator        # Start educator app
pnpm dev:learner         # Start learner app  
pnpm build               # Build all apps
pnpm lint                # Lint entire codebase
```

## Project Structure

```
fillmore-demo/
├── apps/
│   ├── fillmore-educator/    # Trainer application
│   └── fillmore-learner/     # Learner application
└── packages/
    └── ui/                   # Shared components (@fillmore/ui)
```

## Code Quality Standards

### File Limits
- **Max 150 lines per file** - Split large files into smaller modules
- **Max 50 lines per function** - Break complex functions into smaller ones
- **Max 3 nested if statements** - Use early returns or guard clauses

### Component Structure
```typescript
// Component pattern: index.tsx + styles.ts
import React from 'react';
import S from './styles';

interface ComponentProps {
  // Always define interfaces for props
}

const Component: React.FC<ComponentProps> = ({ prop }) => {
  // Max 30 lines component logic
  return <S.Container>{/* JSX */}</S.Container>;
};

export default Component;
```

### Styling Standards
```typescript
// styles.ts - Use Emotion styled components
import styled from '@emotion/styled';

const Container = styled.div`
  // Use CSS variables: var(--color-name)
  // Max 20 lines per styled component
`;

export default { Container };
```

### Import Standards
```typescript
// Within workspace: use @/ alias
import Component from '@/components/Component';

// Cross-workspace: use package name
import { Button } from '@fillmore/ui';

// Group imports: React → External → Internal
import React from 'react';
import styled from '@emotion/styled';
import S from './styles';
```

### State Management
```typescript
// Zustand stores - Keep actions and state separate
interface State {
  data: DataType;
}

interface Actions {
  updateData: (data: DataType) => void;
}

export const useStore = create<State & Actions>((set) => ({
  data: initialData,
  updateData: (data) => set({ data }),
}));
```

### TypeScript Requirements
- **Strict mode enabled** - No `any` types allowed
- **Interface over type** - Use interfaces for object shapes
- **Explicit return types** - For all exported functions
- **No unused variables** - Clean imports and variables

### Function Complexity
```typescript
// ❌ Avoid deep nesting
if (condition1) {
  if (condition2) {
    if (condition3) {
      // Too deep
    }
  }
}

// ✅ Use early returns
if (!condition1) return;
if (!condition2) return;
if (!condition3) return;
// Main logic here
```

### Component Naming
- **PascalCase** for components and interfaces
- **camelCase** for functions and variables
- **UPPER_CASE** for constants
- **Descriptive names** - No abbreviations unless obvious

## Architecture Patterns

### Monorepo Structure
- **Apps**: Full applications with pages, components, hooks
- **Packages**: Shared utilities and components
- **pnpm workspaces** for dependency management

### Component Organization
```
src/
├── components/     # Reusable components
├── pages/         # Route components  
├── hooks/         # Custom hooks (max 30 lines)
├── stores/        # Zustand state stores
├── types/         # TypeScript definitions
├── data/          # Static data and mock data
└── utils/         # Utility functions (max 20 lines each)
```

### Error Handling
```typescript
// Always handle errors gracefully
try {
  const result = await riskyOperation();
  return result;
} catch (error) {
  console.error('Operation failed:', error);
  return fallbackValue;
}
```

## Tech Stack

- **React 19** with TypeScript (strict mode)
- **Emotion** for styling (CSS-in-JS)
- **Zustand** for state management  
- **React Router v7** for routing
- **Vite** for build tooling
- **ESLint + Prettier** for code quality

## Quality Checklist

Before submitting code:
- [ ] No file exceeds 150 lines
- [ ] No function exceeds 50 lines  
- [ ] Max 3 levels of if nesting
- [ ] All TypeScript errors resolved
- [ ] ESLint passes without warnings
- [ ] Prettier formatting applied
- [ ] All imports properly organized
- [ ] Component interfaces defined
- [ ] Error handling implemented

## Performance Guidelines

- Use `React.memo` for expensive re-renders
- Implement proper dependency arrays in hooks
- Avoid inline functions in render methods
- Use CSS variables for consistent theming
- Optimize bundle size with tree-shaking

## Testing Requirements

- Test files must accompany complex logic
- Use descriptive test names
- Cover error scenarios
- Mock external dependencies
- Keep tests focused and isolated

---

**Remember**: Code should be readable by anyone joining the project. Prioritize clarity over cleverness.