export interface Event {
    id: number;
    title: string;
    description: string;
    date: string; 
    time: string;
    priority: string; 
    completed?: boolean;
    reminderMinutes?: number 
  }
  
  export enum EventStatus {
    upcoming = "upcoming",
    completed = "completed",
    canceled = "canceled",
  }
  