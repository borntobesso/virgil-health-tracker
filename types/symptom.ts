export type SymptomType = 'appetite' | 'activity' | 'breathing' | 'other';
export type SymptomSeverity = 1 | 2 | 3 | 4 | 5;

export interface Symptom {
  id: string;
  date: Date;
  type: SymptomType;
  severity: SymptomSeverity;
  description: string;
  photoUrl?: string;
}
