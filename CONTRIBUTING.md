# Contributing Guide

This document outlines the development conventions and standards for the Virgil Health Tracker project.

## Table of Contents

- [Folder Structure](#folder-structure)
- [Naming Conventions](#naming-conventions)
- [Code Style](#code-style)
- [Git Workflow](#git-workflow)
- [TypeScript Guidelines](#typescript-guidelines)

---

## Folder Structure

### Overview

```
virgil-health-tracker/
├── app/                    # Next.js App Router pages
│   ├── layout.tsx         # Root layout
│   ├── page.tsx           # Home/Dashboard page
│   ├── medications/       # Medication management pages
│   ├── respiratory/       # Respiratory rate pages
│   ├── logs/              # Medication logs pages
│   └── settings/          # Settings page
├── components/            # React components
│   ├── ui/               # Reusable UI components (buttons, cards, inputs)
│   ├── layout/           # Layout components (navigation, header)
│   ├── dashboard/        # Dashboard-specific components
│   ├── medications/      # Medication-specific components
│   └── respiratory/      # Respiratory rate components
├── lib/                  # Utility functions and helpers
│   ├── storage.ts        # LocalStorage wrapper (Phase 1)
│   ├── utils.ts          # General utility functions
│   └── constants.ts      # Application constants
├── types/                # TypeScript type definitions
│   ├── medication.ts     # Medication-related types
│   ├── respiratoryRate.ts # Respiratory rate types
│   ├── symptom.ts        # Symptom types
│   ├── vetVisit.ts       # Vet visit types
│   └── index.ts          # Type exports
├── data/                 # Mock data (Phase 1 only)
└── public/               # Static assets
```

### Component Organization

Components are organized by feature and reusability:

1. **`components/ui/`** - Highly reusable UI primitives
   - Button, Card, Input, Modal, etc.
   - Should be generic and not tied to specific features
   - Example: `Button.tsx`, `Card.tsx`

2. **`components/layout/`** - Layout and navigation
   - Navigation, Header, Footer
   - Example: `Navigation.tsx`, `Header.tsx`

3. **`components/[feature]/`** - Feature-specific components
   - Components used within a specific feature area
   - Example: `components/medications/MedicationForm.tsx`

---

## Naming Conventions

### Files and Folders

| Type           | Convention | Example                  |
| -------------- | ---------- | ------------------------ |
| **Components** | PascalCase | `MedicationCard.tsx`     |
| **Pages**      | lowercase  | `page.tsx`, `layout.tsx` |
| **Utilities**  | camelCase  | `storage.ts`, `utils.ts` |
| **Types**      | camelCase  | `medication.ts`          |
| **Constants**  | camelCase  | `constants.ts`           |

### Functions and Variables

```typescript
// Component names: PascalCase
export function MedicationCard({ medication }: MedicationCardProps) {}

// Hook names: camelCase with 'use' prefix
function useMedications() {}

// Event handlers: handle[Action]
function handleSubmit() {}
function handleMedicationDelete(id: string) {}

// Utility functions: verb-first camelCase
function formatDate(date: Date): string {}
function calculateRespiratoryRate(count: number): number {}

// Constants: UPPER_SNAKE_CASE for true constants
const MAX_RETRY_ATTEMPTS = 3;
const API_BASE_URL = "https://api.example.com";

// Configuration objects: camelCase
const statusColors = { normal: "green", alert: "red" };
```

### TypeScript Types and Interfaces

```typescript
// Interfaces: PascalCase
interface Medication {}
interface MedicationCardProps {}

// Type aliases: PascalCase
type RespiratoryStatus = "normal" | "caution" | "alert";

// Enums: PascalCase for enum, UPPER_SNAKE_CASE for values
enum UserRole {
  ADMIN = "ADMIN",
  USER = "USER",
}
```

---

## Code Style

### Prettier Configuration

The project uses Prettier for automatic code formatting:

- **Quotes**: Double quotes (`"`)
- **Semicolons**: Required
- **Trailing commas**: ES5 (multiline objects/arrays)
- **Print width**: 100 characters
- **Tab width**: 2 spaces
- **Line endings**: LF

Prettier runs automatically on git commit via lint-staged.

### ESLint

ESLint is configured with Next.js defaults. Run:

```bash
npm run lint        # Check for issues
npm run lint:fix    # Auto-fix issues
```

### TypeScript

- **Strict mode enabled** - No `any` types without good reason
- **Type imports** - Use `import type` for type-only imports
- **Explicit return types** - For exported functions

```typescript
// ✅ Good
import type { Medication } from "@/types";

export function getMedication(id: string): Medication | null {
  // implementation
}

// ❌ Avoid
import { Medication } from "@/types";

export function getMedication(id: string) {
  // implementation
}
```

---

## Git Workflow

### Commit Messages

Follow [Conventional Commits](https://www.conventionalcommits.org/):

```
<type>: <short description>

<detailed description (optional)>

<footer (optional)>
```

**Types:**

- `feat:` - New feature
- `fix:` - Bug fix
- `refactor:` - Code refactoring
- `docs:` - Documentation changes
- `style:` - Code style changes (formatting, no logic changes)
- `test:` - Adding or updating tests
- `chore:` - Maintenance tasks

**Examples:**

```bash
git commit -m "feat: add respiratory rate tap counter component"
git commit -m "fix: correct medication time calculation logic"
git commit -m "refactor: extract medication form validation to utility"
git commit -m "docs: update README with setup instructions"
```

### Pre-commit Hooks

The following checks run automatically before each commit:

1. **lint-staged** - Formats and lints staged files
2. **type-check** - Validates TypeScript types

If any check fails, the commit will be rejected. Fix the issues and try again.

### Branch Strategy

For this solo project:

- `main` - Production-ready code
- Feature branches - For specific features/tickets (e.g., `feat/respiratory-rate-measurement`)

---

## TypeScript Guidelines

### Type Definitions

- Define types in `types/` directory
- Export types from `types/index.ts` for easy importing
- Use interfaces for object shapes
- Use type aliases for unions, primitives, and utility types

```typescript
// types/medication.ts
export interface Medication {
  id: string;
  name: string;
  dosage: string;
  // ...
}

export type MedicationStatus = "active" | "inactive";

// Usage
import type { Medication, MedicationStatus } from "@/types";
```

### Component Props

Always define props with an interface or type:

```typescript
interface MedicationCardProps {
  medication: Medication;
  onDelete?: (id: string) => void;
  className?: string;
}

export function MedicationCard({ medication, onDelete, className }: MedicationCardProps) {
  // component implementation
}
```

### Avoid `any`

Use `unknown` for truly unknown types, then narrow with type guards:

```typescript
// ❌ Avoid
function processData(data: any) {}

// ✅ Good
function processData(data: unknown) {
  if (typeof data === "string") {
    // TypeScript knows data is string here
  }
}
```

---

## Project-Specific Guidelines

### Mobile-First Design

- All components must be mobile-responsive
- Use Tailwind's mobile-first breakpoints (`sm:`, `md:`, `lg:`)
- Test on mobile viewport (375px width minimum)

### Accessibility

- Use semantic HTML (`<button>`, `<nav>`, `<main>`)
- Include ARIA labels where needed
- Ensure keyboard navigation works
- Minimum touch target size: 44×44px

### Performance

- Use Next.js Image component for images
- Lazy load components when appropriate
- Avoid unnecessary re-renders (React.memo, useMemo, useCallback)

### Data Management (Phase 1)

- Use localStorage via `lib/storage.ts` wrapper
- Handle localStorage errors gracefully
- Validate data before saving

---

## Questions or Issues?

See the [VIRGIL_HEALTH_TRACKER_CONTEXT.md](./VIRGIL_HEALTH_TRACKER_CONTEXT.md) for detailed project context and development guidelines.

For questions or discussions, create an issue in the GitHub repository.
