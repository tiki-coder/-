
export interface MarkRecord {
  year: number;
  grade: number;
  subject: string;
  municipality: string;
  login: string;
  schoolName: string;
  participants: number;
  mark2: number;
  mark3: number;
  mark4: number;
  mark5: number;
}

export interface ScoreRecord {
  year: number;
  grade: number;
  subject: string;
  municipality: string;
  login: string;
  schoolName: string;
  participants: number;
  scores: Record<number, number>; // score -> percentage
}

export interface BiasRecord {
  year: number;
  login: string;
  municipality: string;
  schoolName: string;
  markers: Record<string, number>; // e.g., "4 РУ": 1
  totalMarkers: number;
}

export interface FilterState {
  year: string;
  grade: string;
  subject: string;
  municipality: string;
  school: string;
}

export interface DashboardStats {
  participants: number;
  successRate: number; // 3, 4, 5 marks
  qualityRate: number; // 4, 5 marks
  avgMark: number;
}
