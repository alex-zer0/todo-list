import { Task } from "../models/Task";

export const restoreTasks = (): Task[] => {
  const tasks = localStorage.getItem('tasks');
  try {
    return tasks ? JSON.parse(tasks) : [];
  } catch(e) {
    return [];
  }
};

export const saveTasks = (tasks: Task[]): void => {
  localStorage.setItem('tasks', JSON.stringify(tasks));
};
