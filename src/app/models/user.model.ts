export interface User {
  id: number;
  name: string;
  lastname: string;
  email?: string;
  nickname?: string;
  photo?: string;
  total_points?: number; // Dodane pole sumy punktów
}
