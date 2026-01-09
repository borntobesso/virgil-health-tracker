# Virgil Health Tracker - Development Context

## Project Overview

**Project Name:** Virgil Health Tracker  
**Repository:** `virgil-health-tracker`  
**Purpose:** A comprehensive health management dashboard for my cat Virgil, who has a congenital heart condition (Cor Triatriatum Sinister) requiring daily medication and health monitoring.

**Developer:** Soyoung (소영)  
- Full-stack developer, currently intern at Assurly (Paris)
- Tech stack experience: React, Python, AWS, TypeScript
- Learning goals: DevOps, CI/CD, Docker, MLOps
- Location: Paris, France (13th arrondissement)

---

## Tech Stack

### Phase 1: MVP - Local Development (Current)
- **Frontend:** Next.js 14 (App Router), TypeScript, Tailwind CSS
- **State Management:** React Query (TanStack Query), Zustand (optional)
- **Data Storage:** JSON files + localStorage
- **UI Components:** Custom components with Tailwind, Lucide React icons
- **Date Handling:** date-fns

### Phase 2: Cloud Deployment (Future)
- **Backend:** Supabase (PostgreSQL, Auth, Storage)
- **Deployment:** Vercel
- **PWA:** next-pwa

### Phase 3: Production Infrastructure (Future)
- **Backend:** FastAPI (Python)
- **Database:** PostgreSQL (RDS)
- **Storage:** AWS S3
- **Container:** Docker + Docker Compose
- **Deployment:** AWS ECS (Fargate)
- **CI/CD:** GitHub Actions
- **Monitoring:** CloudWatch, Sentry

---

## Project Structure

```
virgil-health-tracker/
├── app/
│   ├── layout.tsx              # Root layout
│   ├── page.tsx                # Dashboard (home)
│   ├── medications/
│   │   ├── page.tsx            # Medication list
│   │   └── [id]/
│   │       └── page.tsx        # Medication detail
│   ├── respiratory/
│   │   ├── page.tsx            # Respiratory rate measurement
│   │   └── history/
│   │       └── page.tsx        # Respiratory rate history
│   ├── logs/
│   │   └── page.tsx            # Medication logs
│   └── settings/
│       └── page.tsx            # Settings
├── components/
│   ├── ui/                     # Reusable UI components
│   │   ├── Button.tsx
│   │   ├── Card.tsx
│   │   ├── Input.tsx
│   │   └── ...
│   ├── layout/
│   │   ├── Navigation.tsx      # Bottom navigation
│   │   └── Header.tsx
│   ├── dashboard/
│   │   ├── MedicationCard.tsx
│   │   ├── RespiratoryCard.tsx
│   │   └── SymptomSummary.tsx
│   ├── medications/
│   │   ├── MedicationForm.tsx
│   │   └── MedicationList.tsx
│   └── respiratory/
│       ├── MeasurementTimer.tsx
│       ├── TapCounter.tsx
│       └── RespiratoryChart.tsx
├── lib/
│   ├── storage.ts              # LocalStorage wrapper
│   ├── utils.ts                # Utility functions
│   └── constants.ts            # Constants
├── types/
│   ├── medication.ts
│   ├── respiratoryRate.ts
│   ├── symptom.ts
│   └── vetVisit.ts
├── data/
│   ├── medications.json        # Mock data
│   ├── logs.json
│   └── respiratory-rates.json
├── public/
│   └── icons/                  # PWA icons (future)
├── .github/
│   └── workflows/              # CI/CD (future)
├── docker-compose.yml          # Phase 3
├── Dockerfile                  # Phase 3
└── README.md
```

---

## Data Models

### Medication
```typescript
interface Medication {
  id: string;
  name: string;                    // e.g., "Vetmedin"
  dosage: string;                  // e.g., "1.25mg"
  frequency: string;               // e.g., "twice daily"
  times: string[];                 // e.g., ["09:00", "21:00"]
  startDate: Date;
  endDate?: Date;
  notes?: string;
  active: boolean;
}
```

### MedicationLog
```typescript
interface MedicationLog {
  id: string;
  medicationId: string;
  scheduledTime: string;           // "2026-01-10T09:00:00Z"
  actualTime?: string;             // When actually given
  completed: boolean;
  skipped: boolean;
  note?: string;
  photoUrl?: string;               // Phase 2+
}
```

### RespiratoryRateRecord (NEW - Important!)
```typescript
interface RespiratoryRateRecord {
  id: string;
  date: Date;
  time: string;                    // "14:30"
  count30sec: number;              // Count during 30 seconds
  ratePerMinute: number;           // count30sec × 2
  status: 'normal' | 'caution' | 'alert';
  note?: string;
  catState?: 'sleeping' | 'resting' | 'awake';
  createdAt: Date;
}

// Status determination:
// - normal: 20-30 breaths/min
// - caution: 15-20 or 30-40 breaths/min
// - alert: <15 or >40 breaths/min
```

### Symptom
```typescript
interface Symptom {
  id: string;
  date: Date;
  type: 'appetite' | 'activity' | 'breathing' | 'other';
  severity: 1 | 2 | 3 | 4 | 5;    // 1=mild, 5=severe
  description: string;
  photoUrl?: string;               // Phase 2+
}
```

### VetVisit
```typescript
interface VetVisit {
  id: string;
  date: Date;
  vetName: string;
  clinic: string;
  reason: string;
  diagnosis?: string;
  treatment?: string;
  cost?: number;
  nextAppointment?: Date;
  notes?: string;
}
```

---

## Core Features (Phase 1)

### 1. Dashboard (Priority: High)
- Today's medication schedule with checkboxes
- Quick respiratory rate measurement prompt
- Recent symptoms summary
- Next vet appointment reminder

### 2. Respiratory Rate Measurement (Priority: High) ⭐
This is a critical feature for monitoring Virgil's heart condition.

**User Flow:**
1. User taps "Measure Respiratory Rate" button
2. Screen shows 30-second countdown timer
3. User taps screen each time Virgil breathes
4. After 30 seconds, system calculates breaths per minute (count × 2)
5. System determines status (normal/caution/alert)
6. User can add optional notes
7. Record is saved with timestamp

**UI Requirements:**
- Large, easy-to-tap area for counting
- Clear countdown timer display
- Real-time count display (big numbers)
- Visual/haptic feedback on each tap
- Ability to cancel mid-measurement
- Clear status feedback with color coding

**Technical Implementation:**
- Use React hooks for timer (useEffect + setInterval)
- Implement tap counter with haptic feedback (navigator.vibrate)
- Store measurements in localStorage (Phase 1) or Supabase (Phase 2)
- Visualize trends with chart library (recharts or chart.js)

### 3. Medication Management
- Add/Edit/Delete medications
- Set recurring schedules
- Mark as completed/skipped
- Add notes to each log entry

### 4. Medication Logs
- Daily checklist view
- Calendar view of past logs
- Quick check-off functionality

### 5. Basic Notifications
- Browser notification for medication times
- Daily reminder for respiratory rate measurement

---

## Development Phases & Current Status

### ✅ Setup Complete
- [x] GitHub repository created
- [x] Project structure planned
- [x] Issues and milestones created
- [x] Epic 1.3 updated with respiratory rate tickets (+2 tickets)

### 🚧 Phase 1: MVP - Local Development (Current)
**Epic 1.1: Project Setup** (#1-2)
- [ ] Repository & initial structure
- [ ] Development environment standardization

**Epic 1.2: Data Modeling** (#3-4)
- [ ] Define TypeScript interfaces
- [ ] Implement JSON-based local storage

**Epic 1.3: Core UI Components** (#5-10)
- [ ] Layout & navigation
- [ ] Dashboard screen
- [ ] **Respiratory rate measurement screen** ⭐ NEW (#7)
- [ ] **Respiratory rate history screen** ⭐ NEW (#8)
- [ ] Medication management screen
- [ ] Medication logs screen

**Epic 1.4: Basic Features** (#11-12)
- [ ] Notification system
- [ ] Calendar view

**Note:** Ticket numbers after Epic 1.3 are shifted by +2 due to respiratory rate features.

---

## Design Guidelines

### Color Scheme
- **Primary:** Blue/Indigo (#6366f1) - Trustworthy, medical
- **Success/Normal:** Green (#10b981) - Respiratory rate normal
- **Warning/Caution:** Orange (#f59e0b) - Respiratory rate caution
- **Danger/Alert:** Red (#ef4444) - Respiratory rate alert
- **Background:** White (#ffffff) / Light gray (#f9fafb)

### Respiratory Rate Status Colors
```typescript
const STATUS_COLORS = {
  normal: 'bg-green-100 text-green-800 border-green-300',
  caution: 'bg-orange-100 text-orange-800 border-orange-300',
  alert: 'bg-red-100 text-red-800 border-red-300',
};
```

### Typography
- **Headings:** Font-semibold, larger sizes
- **Body:** Font-normal, readable size (16px base)
- **Countdown Timer:** Very large (48px+), bold
- **Tap Counter:** Extra large (64px+), bold

### Mobile-First
- All components must work well on mobile (iPhone/Android)
- Bottom navigation for easy thumb access
- Large touch targets (min 44×44px)
- Swipe gestures where appropriate

---

## Naming Conventions

### Files & Folders
- Components: PascalCase (e.g., `MedicationCard.tsx`)
- Utils/Libs: camelCase (e.g., `storage.ts`)
- Types: camelCase (e.g., `medication.ts`)

### Functions
- Event handlers: `handle[Action]` (e.g., `handleTap`, `handleComplete`)
- Utilities: verb-first (e.g., `formatDate`, `calculateRate`)
- Components: PascalCase (e.g., `TapCounter`)

### Git Commits
Follow conventional commits:
- `feat:` - New feature
- `fix:` - Bug fix
- `refactor:` - Code refactoring
- `docs:` - Documentation
- `style:` - Code style changes
- `test:` - Tests
- `chore:` - Maintenance

Example: `feat: add respiratory rate tap counter component`

---

## Important Context for Claude Code

### About Virgil 🐱
- **Name:** Virgil (비르질)
- **Breed:** British Shorthair
- **Health Condition:** Cor Triatriatum Sinister (congenital heart defect)
- **Current Medications:** 3 different heart medications, taken daily
- **Critical Monitoring:** Respiratory rate must be measured almost daily
  - Normal range: 20-30 breaths per minute
  - Method: Count for 30 seconds while cat is resting/sleeping, multiply by 2
  - Current manual process that needs to be replaced by this app

### Developer (Me)
- **Language Preference:** Korean and French, but code/comments in English
- **Working Style:** Incremental development, test as I go
- **Learning Goals:** This project is partly for learning DevOps/CI/CD
- **Time Constraints:** Working full-time internship, so development in evenings/weekends

### Special Requests
- Prioritize respiratory rate measurement feature - it's the most critical for Virgil's health
- Keep code clean and well-documented for portfolio purposes
- Consider that this will eventually be shown to Assurly team (potential conversion to CDI)
- Think about UX for someone who will use this daily while managing a sick cat

---

## Common Tasks

### Starting Development
```bash
npm run dev
# Open http://localhost:3000
```

### Creating a New Component
```bash
# Create component file
touch components/[category]/ComponentName.tsx

# Basic structure:
interface ComponentNameProps {
  // props
}

export function ComponentName({ }: ComponentNameProps) {
  return (
    <div>
      {/* component content */}
    </div>
  );
}
```

### Working with Local Storage
```typescript
import { storage } from '@/lib/storage';

// Save
await storage.save('respiratory-rates', newRecord);

// Load
const records = await storage.load('respiratory-rates');

// Update
await storage.update('respiratory-rates', id, updatedRecord);

// Delete
await storage.delete('respiratory-rates', id);
```

---

## Testing Checklist

Before committing code, ensure:
- [ ] Component renders without errors
- [ ] Mobile responsive (test in Chrome DevTools mobile view)
- [ ] TypeScript types are correct (no `any`)
- [ ] Data persists in localStorage
- [ ] No console errors or warnings
- [ ] Code follows project conventions

---

## Questions to Consider

When implementing features, think about:
1. **UX:** Is this easy to use while holding a cat?
2. **Performance:** Will this work smoothly on older phones?
3. **Data:** What happens if localStorage is full/cleared?
4. **Accessibility:** Can this work without perfect vision/motor control?
5. **Reliability:** What if the timer is interrupted?

---

## Future Migration Notes

### Phase 2 (Supabase) Changes
- Replace localStorage with Supabase client calls
- Add authentication (email login)
- Implement file upload for photos
- Enable PWA with push notifications

### Phase 3 (AWS) Changes
- Separate frontend/backend
- Docker containerization
- Set up CI/CD pipeline
- AWS infrastructure provisioning

Keep code modular to make migration easier!

---

## Emergency Contacts & Resources

### Veterinary Info
- **Vet Clinic:** [To be added]
- **Emergency Vet:** [To be added]
- **Critical Respiratory Rate:** If >40 or <15, contact vet immediately

### Technical Resources
- Next.js Docs: https://nextjs.org/docs
- TypeScript Handbook: https://www.typescriptlang.org/docs/
- Tailwind CSS: https://tailwindcss.com/docs
- React Query: https://tanstack.com/query/latest

### Project Links
- GitHub Repo: [Your repo URL]
- Project Board: [Your project board URL]
- Deployed App (Phase 2): [Will be added]

---

## Current Sprint Focus

**Sprint 1 (This Week):**
1. Complete Epic 1.1 & 1.2 (setup + data models)
2. Start Epic 1.3 (navigation + dashboard)
3. Begin respiratory rate measurement component

**Key Deliverable:** 
Working respiratory rate measurement screen that can count taps and calculate rate.

---

## Notes & Decisions Log

**2026-01-10:**
- Decided to add respiratory rate measurement feature to Epic 1.3
- Chose PWA approach for mobile experience
- Shifted all ticket numbers after Epic 1.3 by +2

**[Add more as development progresses]**

---

## Claude Code CLI Tips

When asking Claude Code for help:
- Reference specific ticket numbers: "Help me implement #7 (respiratory rate measurement)"
- Mention relevant context: "This is for monitoring my cat's heart condition"
- Ask for incremental steps: "Let's start with just the timer component"
- Request explanations: "Can you explain why we use useEffect here?"
- Think about mobile: "Make sure this works well on touch screens"

Remember: Claude Code has access to this entire context document, so you don't need to repeat all the details every time!

---

**Last Updated:** 2026-01-10  
**Phase:** 1 (MVP - Local Development)  
**Current Epic:** 1.1 (Project Setup)
