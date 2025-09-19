
export type TaskStatus = 'todo' | 'doing' | 'done';

export type IssuePriority = 'low' | 'medium' | 'high' | 'critical';

export type IssueType = 'bug' | 'feature' | 'enhancement' | 'documentation';

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
  priority?: IssuePriority;
  issueType?: IssueType;
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
