import { Task ,TaskStatus } from "./tasks.types";

export const defaultTasks: Task[] = [
  {
    id: 1,
    title: "Complete project proposal",
    description: "Finalize the project proposal and share with the team for feedback.",
    dueDate: "2024-09-30",
    status: TaskStatus.done,
    priority: "High",
    reminderTimeInMinutes: 30,
  },
  {
    id: 2,
    title: "Review design mockups",
    description: "Go through the latest design mockups and provide feedback.",
    dueDate: "2024-10-02",
    status: TaskStatus.done,
    priority: "Medium",
    reminderTimeInMinutes: 30,
  },
  {
    id: 3,
    title: "Prepare presentation slides",
    description: "Create slides for the upcoming project presentation.",
    dueDate: "2024-10-05",
    status: TaskStatus.todo,
    priority: "High",
    reminderTimeInMinutes: 30,
  },
  {
    id: 4,
    title: "Send meeting notes email",
    description: "Email the notes from the last team meeting to all participants.",
    dueDate: "2024-10-01",
    status: TaskStatus.todo,
    priority: "Low",
    reminderTimeInMinutes: 30,
  },
  {
    id: 5,
    title: "Review Uli's pull request",
    description: "Check the pull request from Uli and provide feedback.",
    dueDate: "2024-10-03",
    status: TaskStatus.todo,
    priority: "Medium",
    reminderTimeInMinutes: 30,
  },
];
