export interface Medication {
  id: string;
  name: string;
  dosage: string;
  frequency: string;
  times: string[];
  startDate: Date;
  endDate?: Date;
  notes?: string;
  active: boolean;
}

export interface MedicationLog {
  id: string;
  medicationId: string;
  scheduledTime: string;
  actualTime?: string;
  completed: boolean;
  skipped: boolean;
  note?: string;
  photoUrl?: string;
}
