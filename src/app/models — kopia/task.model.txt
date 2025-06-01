export interface Task {
  id: number;
  title: string;
  description?: string; // Opcjonalne, bo może być null w bazie
  status: string;
  assigned_to: number;
  created_by: number;
  list_id: number;
  due_date?: string; // Opcjonalne, bo może być null w bazie
  created_at?: string; // Opcjonalne
  updated_at?: string; // Opcjonalne
  created_by_name?: string; // Dodane przez backend (JOIN z users)
  created_by_lastname?: string; // Dodane przez backend
  assigned_to_name?: string; // Dodane przez backend
  assigned_to_lastname?: string; // Dodane przez backend
}
