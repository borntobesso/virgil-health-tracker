// Color schemes for respiratory rate status
export const STATUS_COLORS = {
  normal: 'bg-green-100 text-green-800 border-green-300',
  caution: 'bg-orange-100 text-orange-800 border-orange-300',
  alert: 'bg-red-100 text-red-800 border-red-300',
} as const;

// Local storage keys
export const STORAGE_KEYS = {
  MEDICATIONS: 'virgil-medications',
  MEDICATION_LOGS: 'virgil-medication-logs',
  RESPIRATORY_RATES: 'virgil-respiratory-rates',
  SYMPTOMS: 'virgil-symptoms',
  VET_VISITS: 'virgil-vet-visits',
} as const;

// Respiratory rate measurement
export const MEASUREMENT_DURATION = 30; // seconds

// Navigation routes
export const ROUTES = {
  HOME: '/',
  MEDICATIONS: '/medications',
  RESPIRATORY: '/respiratory',
  RESPIRATORY_HISTORY: '/respiratory/history',
  LOGS: '/logs',
  SETTINGS: '/settings',
} as const;
