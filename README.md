# Virgil Health Tracker 🐱

A comprehensive health management dashboard for monitoring Virgil, my British Shorthair cat with a congenital heart condition (Cor Triatriatum Sinister).

## About

Virgil requires daily medication and regular health monitoring, particularly respiratory rate tracking. This application helps manage medications, track respiratory rates, log symptoms, and maintain veterinary visit records.

## Tech Stack

- **Frontend**: Next.js 14 (App Router), TypeScript, Tailwind CSS
- **State Management**: TanStack Query (React Query), Zustand
- **Data Storage**: LocalStorage (Phase 1) → Supabase (Phase 2) → AWS (Phase 3)
- **UI Components**: Custom components with Tailwind, Lucide React icons
- **Date Handling**: date-fns

## Getting Started

### Prerequisites

- Node.js 20+
- npm or yarn

### Installation

```bash
# Install dependencies
npm install

# Run development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view the application.

### Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint

## Project Structure

```
virgil-health-tracker/
├── app/                    # Next.js app router pages
├── components/             # React components
│   ├── ui/                # Reusable UI components
│   ├── layout/            # Layout components
│   ├── dashboard/         # Dashboard-specific components
│   ├── medications/       # Medication management
│   └── respiratory/       # Respiratory rate tracking
├── lib/                   # Utility functions
│   ├── storage.ts         # LocalStorage wrapper
│   ├── utils.ts           # Helper functions
│   └── constants.ts       # App constants
├── types/                 # TypeScript type definitions
├── data/                  # Mock data (Phase 1)
└── public/                # Static assets
```

## Core Features

### Phase 1 (Current - MVP)
- ✅ Project setup and initial structure
- ⏳ Medication management and scheduling
- ⏳ Respiratory rate measurement (tap counter with 30s timer)
- ⏳ Daily medication logs
- ⏳ Dashboard with today's overview

### Phase 2 (Cloud Deployment)
- Supabase integration (PostgreSQL, Auth, Storage)
- Photo upload for medication and symptom logs
- PWA with push notifications
- Vercel deployment

### Phase 3 (Production Infrastructure)
- FastAPI backend
- Docker containerization
- AWS deployment (ECS, RDS, S3)
- CI/CD with GitHub Actions
- Monitoring and observability

## Development

This project follows incremental development practices with a focus on:
- Clean, documented code for portfolio purposes
- Mobile-first responsive design
- TypeScript strict mode
- Conventional commit messages

See [VIRGIL_HEALTH_TRACKER_CONTEXT.md](./VIRGIL_HEALTH_TRACKER_CONTEXT.md) for detailed development context and guidelines.

## License

Private project for personal use.

## Contact

Developer: Soyoung Jung
- Location: Paris, France
- Current: Intern at Assurly
