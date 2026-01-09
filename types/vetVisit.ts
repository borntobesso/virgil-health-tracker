export interface VetVisit {
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
