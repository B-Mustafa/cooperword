export type Task = {
  id: number;
  title: string;
  description?: string;
  dueDate?: string;
  status: TaskStatus;
  priority?: string;
  email?: string;
  reminderTimeInMinutes?: number;
  completed?: boolean;
};

export enum TaskStatus {
  todo = "INCOMPLETE",
  done = "DONE",
}
