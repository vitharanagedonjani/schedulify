# Schedulify Developer Guide

## Prerequisites
- [Bun](https://bun.sh/) (Latest version)
- Node.js 18+ (for certain dev tools)

## Getting Started

```bash
# Clone the repository
git clone https://github.com/yourusername/schedulify.git

# Navigate to project directory
cd schedulify

# Install dependencies
bun install

# Start development playground
bun run dev
```

## Available Commands

### Development
```bash
# Start playground with HMR
bun run dev

# Build package in watch mode
bun run build --watch

# Format code with Biome
bun run format

# Lint code with Biome
bun run lint

# Run both format and lint
bun run check
```

### Production
```bash
# Build package for production
bun run build
```

## Code Style & Conventions

- Use kebab-case for file names (e.g., `event-calendar.tsx`)
- Follow TypeScript strict mode guidelines
- Components should be function components with explicit return types
- Use named exports instead of default exports
- Use React 19 features appropriately:
  - `useActionState` for form handling
  - `useOptimistic` for immediate UI updates
  - Resource preloading with `preload` and `preinit`

## Project Structure

### Key Directories

#### `/src`
Contains all source code for the application:
- `app.tsx`: Main application entry point using React 19
- `components/`: React components with virtualization support
- `types/`: TypeScript type definitions
- `styles/`: Global styles and Tailwind utilities

#### `/src/components`
React components following single responsibility principle:
- `event-calendar.tsx`: Main calendar grid with TanStack Virtual integration
- `event-form.tsx`: Form handling with React 19 actions
- `event-item.tsx`: Individual event display with optimistic updates

#### `/src/types`
TypeScript definitions:
- `index.ts`: Shared interfaces and types
- `crypto.d.ts`: Type extensions for Crypto API
- `form-data.d.ts`: Type extensions for FormData

#### `/public`
Static assets and resources served directly

### Configuration Files
- `biome.json`: Biome linting and formatting rules
- `package.json`: Project metadata and dependencies
- `tsconfig.json`: TypeScript compiler options with ESNext target
- `tailwind.config.js`: Tailwind CSS customization

## Performance Guidelines

### Large Dataset Handling
- Use TanStack Virtual for efficient rendering of 100k+ events
- Implement windowing for long lists
- Use React.memo() for expensive components
- Leverage React 19's useOptimistic for better UX

### State Management
- Use React Query for server state
- Implement optimistic updates
- Proper memoization strategies
- Efficient re-render patterns

### Bundle Optimization
- Code splitting
- Tree shaking
- Dynamic imports
- Asset optimization

## Common Issues & Solutions

### Type Errors
If you encounter TypeScript errors about missing types:
1. Check `tsconfig.json` settings (ensure ESNext is set)
2. Ensure all dependencies are installed
3. Run `bun install` to update types

### Build Issues
If build fails:
1. Clear `node_modules` and `bun.lockb`
2. Run `bun install` fresh
3. Check for conflicting dependencies

### Performance Issues
If experiencing slowdown with large datasets:
1. Verify TanStack Virtual implementation
2. Check React DevTools for unnecessary re-renders
3. Profile with React Profiler
4. Ensure proper memoization is in place

## Contributing

1. Create a feature branch
2. Make your changes
3. Run tests and linting
4. Submit a pull request

## Need Help?

- Check existing issues
- Create a new issue with:
  - Steps to reproduce
  - Expected behavior
  - Actual behavior
  - Environment details
