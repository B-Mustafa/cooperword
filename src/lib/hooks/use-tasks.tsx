import { useCopilotAction, useCopilotReadable } from "@copilotkit/react-core";
import { createContext, useContext, useEffect, useState, ReactNode } from "react";
import { Task, TaskStatus } from "../tasks.types";
import { Event } from "../events.types";
import { defaultTasks } from "../default-tasks";
import { useUser } from "@clerk/nextjs";

let nextTaskId = defaultTasks.length + 1;
let nextEventId = 1; 

type TasksContextType = {
  tasks: Task[];
  events: Event[];
  addTask: (title: string, description?: string, dueDate?: string, priority?: string) => void;
  updateTask: (id: number, updates: Partial<Task>) => void;
  setTaskStatus: (id: number, status: TaskStatus) => void;
  deleteTask: (id: number) => void;
  addEvent: (title: string, description: string, date: string, time: string, priority?: string, reminderTimeInMinutes?: number) => void;
  deleteEvent: (id: number) => void;
  completeEvent: (id: number) => void;
};

const TasksContext = createContext<TasksContextType | undefined>(undefined);

export const TasksProvider = ({ children }: { children: ReactNode }) => {
  const [tasks, setTasks] = useState<Task[]>(defaultTasks);
  const [events, setEvents] = useState<Event[]>([]); 
  const { user } = useUser();

  useCopilotReadable({
    description: "The state of the task list",
    value: JSON.stringify(tasks),
  });

  useEffect(() => {
    const storedEvents = localStorage.getItem("events");
    if (storedEvents) {
      const parsedEvents = JSON.parse(storedEvents);
      setEvents(parsedEvents);
      const lastEvent = parsedEvents.slice(-1)[0];
      nextEventId = lastEvent ? lastEvent.id + 1 : 1;
    }
  }, []); 

  useEffect(() => {
    localStorage.setItem("events", JSON.stringify(events));
  }, [events]); 

  useCopilotAction({
    name: "addTask",
    description: "Adds a task to the task list",
    parameters: [
      { name: "title", type: "string", description: "The title of the task", required: true },
      { name: "description", type: "string", description: "The description of the task", required: false },
      { name: "dueDate", type: "string", description: "The due date of the task", required: false },
      { name: "priority", type: "string", description: "The priority of the task", required: false },
    ],
    handler: ({ title, description, dueDate, priority }) => {
      addTask(title, description, dueDate, priority);
    },
  });

  useCopilotAction({
    name: "updateTask",
    description: "Updates a task in the task list",
    parameters: [
      { name: "id", type: "number", description: "The id of the task", required: true },
      { name: "updates", type: "object", description: "The updates for the task", required: true },
    ],
    handler: ({ id, updates }) => {
      updateTask(id, updates);
    },
  });

  useCopilotAction({
    name: "deleteTask",
    description: "Deletes a task from the task list",
    parameters: [
      { name: "id", type: "number", description: "The id of the task", required: true },
    ],
    handler: ({ id }) => {
      deleteTask(id);
    },
  });

  useCopilotAction({
    name: "setTaskStatus",
    description: "Sets the status of a task",
    parameters: [
      { name: "id", type: "number", description: "The id of the task", required: true },
      { name: "status", type: "string", description: "The status of the task", enum: Object.values(TaskStatus), required: true },
    ],
    handler: ({ id, status }) => {
      setTaskStatus(id, status);
    },
  });

  useCopilotAction({
    name: "addEvent",
    description: "Adds an event to the event list",
    parameters: [
      { name: "title", type: "string", description: "The title of the event", required: true },
      { name: "description", type: "string", description: "The description of the event", required: true },
      { name: "date", type: "string", description: "The date of the event", required: true },
      { name: "time", type: "string", description: "The time of the event", required: true },
      { name: "priority", type: "string", description: "The priority of the event", required: false },
      { name: "reminderTimeInMinutes", type: "number", description: "The reminder time in minutes before the event", required: false },
    ],
    handler: ({ title, description, date, time, priority = "normal", reminderTimeInMinutes }) => {
      addEvent(title, description, date, time, priority, reminderTimeInMinutes);
    },
  });

  useCopilotAction({
    name: "deleteEvent",
    description: "Deletes an event from the event list",
    parameters: [
      { name: "id", type: "number", description: "The id of the event", required: true },
    ],
    handler: ({ id }) => {
      deleteEvent(id);
    },
  });

  const addTask = (title: string, description?: string, dueDate?: string, priority?: string) => {
    setTasks([...tasks, { id: nextTaskId++, title, description, dueDate, status: TaskStatus.todo, priority }]);
  };

  const updateTask = (id: number, updates: Partial<Task>) => {
    setTasks(tasks.map(task => (task.id === id ? { ...task, ...updates } : task)));
  };

  const setTaskStatus = (id: number, status: TaskStatus) => {
    setTasks(tasks.map(task => (task.id === id ? { ...task, status } : task)));
  };

  const deleteTask = (id: number) => {
    setTasks(tasks.filter(task => task.id !== id));
  };

  const addEvent = async (title: string, description: string, date: string, time: string, priority: string = "normal", reminderTimeInMinutes?: number) => {
    const email = user?.primaryEmailAddress?.emailAddress;

    if (!email) {
      console.error("User email is not available");
      return;
    }

    const newEvent = { id: nextEventId++, title, description, date, time, priority, email, reminderTimeInMinutes };
    const updatedEvents = [...events, newEvent];
    setEvents(updatedEvents);

    setTimeout(() => {
      const reminderTime = prompt("Enter the reminder time in minutes before the event:") || "0";

      const reminderInMinutes = parseInt(reminderTime, 10);
      if (!isNaN(reminderInMinutes)) {
        const updatedEventsWithReminder = updatedEvents.map(event => event.id === newEvent.id ? { ...event, reminderTimeInMinutes: reminderInMinutes } : event);
        setEvents(updatedEventsWithReminder);

        const eventDate = new Date(`${date}T${time}`);
        const reminderTime = new Date(eventDate.getTime() - reminderInMinutes * 60000);
        const currentTime = new Date();

        if (reminderTime > currentTime) {
          const timeUntilReminder = reminderTime.getTime() - currentTime.getTime();
          setTimeout(async () => {
            alert(`Reminder: The event "${title}" is coming up! You will be reminded ${reminderInMinutes} minutes before the event at ${email}.`);

            // Email reminder logic
            try {
              const response = await fetch('/api/resend', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                  title,
                  date,
                  time,
                  reminderTimeInMinutes,
                  email,
                  firstName: user?.firstName,
                }),
              });

              if (!response.ok) {
                throw new Error('Failed to send reminder email');
              }

              console.log("Reminder email sent successfully");
            } catch (error) {
              console.error("Failed to send reminder email", error);
            }
          }, timeUntilReminder);
        }
      }
    }, 100);
  };

  const completeEvent = (id: number) => {
    setEvents(events.map(event => (event.id === id ? { ...event, status: "completed" } : event)));
  };

  const deleteEvent = (id: number) => {
    setEvents(events.filter(event => event.id !== id));
  };

  return (
    <TasksContext.Provider value={{ tasks, events, addTask, updateTask, setTaskStatus, deleteTask, addEvent, deleteEvent, completeEvent }}>
      {children}
    </TasksContext.Provider>
  );
};

export const useTasks = () => {
  const context = useContext(TasksContext);
  if (!context) {
    throw new Error("useTasks must be used within a TasksProvider");
  }
  return context;
};
