export type Task = {
    id: number;
    title: string;
    description?: string; 
    dueDate?: string;
    status: TaskStatus;
    priority?: string;
  };
  
  export enum TaskStatus {
    todo = "TODO",
    done = "DONE",
  }
  