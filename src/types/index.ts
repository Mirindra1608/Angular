export interface Task {
  id: string;
  title: string;
  description?: string;
  completed: boolean;
  priority: 'low' | 'medium' | 'high';
  category: string;
  createdAt: Date;
  updatedAt: Date;
  dueDate?: Date;
}

export interface Project {
  id: string;
  name: string;
  description?: string;
  color: string;
  taskIds: string[];
  createdAt: Date;
  updatedAt: Date;
}

export interface Category {
  id: string;
  name: string;
  color: string;
  icon: string;
}