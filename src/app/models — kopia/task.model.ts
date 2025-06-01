export interface Task {
  id: number;
  title: string;
  description?: string;
  status: string;
  assigned_to: number;
  created_by: number;
  list_id: number;
  due_date?: string;
  created_at?: string;
  updated_at?: string;
  created_by_name?: string;
  created_by_lastname?: string;
  assigned_to_name?: string;
  assigned_to_lastname?: string;
  points?: number; // Dodane pole punktów
}
