# Fillmore Training Platform

A comprehensive training management platform built as a **pnpm workspace monorepo** with **React 19 + TypeScript + Vite**.

## 🏗️ Monorepo Structure

```
fillmore-demo/
├── apps/
│   └── fillmore-educator/      # Educator/Trainer application
├── packages/
│   └── ui/                     # Shared UI component library
├── pnpm-workspace.yaml         # Workspace configuration
└── pnpm-lock.yaml             # Dependency lockfile
```

## 🚀 Quick Start

### Prerequisites

- **Node.js** 18+ 
- **pnpm** 8+ (recommended package manager)

```bash
npm install -g pnpm
```

### Installation

```bash
# Install all dependencies
pnpm install

# Start educator app in development
pnpm dev:educator

# Build all packages
pnpm build

# Lint entire codebase
pnpm lint
```

## 📦 Available Scripts

### Root Level Commands

```bash
# Development
pnpm dev:educator           # Start educator app dev server
pnpm dev:learner           # Start learner app dev server (planned)

# Build & Deploy
pnpm build                 # Build all apps and packages
pnpm lint                  # Lint entire codebase

# Workspace-specific commands
pnpm --filter fillmore-educator dev      # Run dev in specific workspace
pnpm --filter @fillmore/ui build         # Build UI package
```

### Individual App Commands

```bash
# Navigate to specific app
cd apps/fillmore-educator

# Standard React app commands
pnpm dev                   # Development server
pnpm build                # Production build  
pnpm preview              # Preview build
pnpm lint                 # Lint this app
```

## 🏛️ Architecture

### Applications

- **`fillmore-educator`**: Educator/trainer dashboard with learner management, progress tracking, and grading features
- **`fillmore-learner`**: Learner interface with personal dashboard, assignments, and progress tracking *(planned)*

### Packages

- **`@fillmore/ui`**: Shared React component library with consistent design system

### Tech Stack

- **Frontend**: React 19 with TypeScript
- **Styling**: Emotion (CSS-in-JS) 
- **Build Tool**: Vite with Hot Module Replacement
- **Package Manager**: pnpm with workspaces
- **Linting**: ESLint with shared configuration
- **Type Checking**: TypeScript with shared base configurations

## 🎯 Key Features

- **Interactive Map Visualization**: Regional shipbuilding company data with zoom/pan
- **User Progress Tracking**: Comprehensive learner analytics and reporting  
- **Task Management**: Training assignments with type-specific styling
- **Responsive Design**: Multi-device support with consistent theming
- **Monorepo Architecture**: Shared components and efficient dependency management

## 🔧 Development

### Adding New Apps

```bash
# Create new app in apps/ directory
mkdir apps/new-app
cd apps/new-app

# Initialize with Vite
pnpm create vite . --template react-ts

# Update package.json name to match workspace pattern
```

### Adding Shared Components

```bash
# Add components to packages/ui/src/
# Export from packages/ui/src/index.ts
# Import in apps using @fillmore/ui
```

### Configuration

- **ESLint**: Root config extends to all workspaces (`eslint.config.js`)
- **TypeScript**: Base configs for apps and Node.js tools (`tsconfig.base.json`, `tsconfig.node.base.json`)
- **Dependencies**: Shared deps hoisted to root, workspace-specific deps in individual `package.json`

## 📖 Documentation

See **[CLAUDE.md](./CLAUDE.md)** for detailed development guidelines, component architecture, and project structure.
