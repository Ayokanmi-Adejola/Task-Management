
import { Task } from '@/types/kanban';

// Get tasks for a specific user
export const getTasksFromLocalStorage = (userId?: string): Task[] => {
  try {
    if (userId) {
      const tasksJson = localStorage.getItem(`tasks_${userId}`);
      return tasksJson ? JSON.parse(tasksJson) : [];
    } else {
      // Fallback to the general tasks store for non-authenticated users
      const tasksJson = localStorage.getItem('tasks');
      return tasksJson ? JSON.parse(tasksJson) : [];
    }
  } catch (error) {
    console.error('Error fetching tasks from localStorage:', error);
    return [];
  }
};

// Save tasks for a specific user
export const saveTasksToLocalStorage = (tasks: Task[], userId?: string): void => {
  try {
    if (userId) {
      localStorage.setItem(`tasks_${userId}`, JSON.stringify(tasks));
    } else {
      // Fallback to the general tasks store for non-authenticated users
      localStorage.setItem('tasks', JSON.stringify(tasks));
    }
  } catch (error) {
    console.error('Error saving tasks to localStorage:', error);
  }
};

// Clear the demo tasks for a user
export const clearDemoTasks = (userId: string): void => {
  try {
    localStorage.setItem(`tasks_${userId}`, JSON.stringify([]));
  } catch (error) {
    console.error('Error clearing demo tasks:', error);
  }
};
