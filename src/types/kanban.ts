
export type TaskStatus = 'todo' | 'doing' | 'done';

export interface Task {
  id: string;
  title: string;
  description: string;
  status: TaskStatus;
  createdAt: number;
  dueDate?: string;
  tags?: string[];
  assignees?: string[];
  comments?: number;
  attachments?: number;
}

export interface Column {
  id: TaskStatus;
  title: string;
  color: string;
}

export interface Tag {
  id: string;
  name: string;
  color: string;
}

export interface User {
  id: string;
  name: string;
  avatar: string;
}
