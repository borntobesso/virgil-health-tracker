export type RespiratoryStatus = 'normal' | 'caution' | 'alert';
export type CatState = 'sleeping' | 'resting' | 'awake';

export interface RespiratoryRateRecord {
  id: string;
  date: Date;
  time: string;
  count30sec: number;
  ratePerMinute: number;
  status: RespiratoryStatus;
  note?: string;
  catState?: CatState;
  createdAt: Date;
}

export const RESPIRATORY_RATE_THRESHOLDS = {
  critical_low: 15,
  caution_low: 20,
  normal_low: 20,
  normal_high: 30,
  caution_high: 40,
  critical_high: 40,
} as const;

export function calculateRespiratoryStatus(ratePerMinute: number): RespiratoryStatus {
  if (ratePerMinute < RESPIRATORY_RATE_THRESHOLDS.critical_low ||
      ratePerMinute > RESPIRATORY_RATE_THRESHOLDS.critical_high) {
    return 'alert';
  }
  if ((ratePerMinute >= RESPIRATORY_RATE_THRESHOLDS.caution_low &&
       ratePerMinute < RESPIRATORY_RATE_THRESHOLDS.normal_low) ||
      (ratePerMinute > RESPIRATORY_RATE_THRESHOLDS.normal_high &&
       ratePerMinute <= RESPIRATORY_RATE_THRESHOLDS.caution_high)) {
    return 'caution';
  }
  return 'normal';
}
