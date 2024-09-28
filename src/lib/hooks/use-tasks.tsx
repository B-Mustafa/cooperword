import { useCopilotAction, useCopilotReadable } from "@copilotkit/react-core";
import { createContext, useContext, useEffect, useState, ReactNode } from "react";
import { Task, TaskStatus } from "../tasks.types";
import { Event } from "../events.types";
import { defaultTasks } from "../default-tasks";

let nextTaskId = defaultTasks.length + 1;
let nextEventId = 1; 

type TasksContextType = {
  tasks: Task[];
  events: Event[];
  addTask: (title: string, description?: string, dueDate?: string, priority?: string) => void;
  updateTask: (id: number, updates: Partial<Task>) => void;
  setTaskStatus: (id: number, status: TaskStatus) => void;
  deleteTask: (id: number) => void;
  addEvent: (title: string, description: string, date: string, time: string, priority?: string) => void;
  deleteEvent: (id: number) => void;
  completeEvent: (id: number) => void;
};

const TasksContext = createContext<TasksContextType | undefined>(undefined);

export const TasksProvider = ({ children }: { children: ReactNode }) => {
  const [tasks, setTasks] = useState<Task[]>(defaultTasks);
  const [events, setEvents] = useState<Event[]>([]); // State for events

  useCopilotReadable({
    description: "The state of the task list",
    value: JSON.stringify(tasks),
  });

  // Load events from local storage when the component mounts
  useEffect(() => {
    const storedEvents = localStorage.getItem("events");
    if (storedEvents) {
      const parsedEvents = JSON.parse(storedEvents);
      setEvents(parsedEvents);
      const lastEvent = parsedEvents.slice(-1)[0];
      nextEventId = lastEvent ? lastEvent.id + 1 : 1; // Increment from the last stored event ID
    }
  }, []); // Empty dependency array to run once on mount

  // Function to save events to local storage
  const saveEventsToLocalStorage = (events: Event[]) => {
    localStorage.setItem("events", JSON.stringify(events));
  };

  // Update events state and save to local storage whenever events change
  useEffect(() => {
    saveEventsToLocalStorage(events);
  }, [events]); // Run whenever events change

  // Add Copilot actions for tasks
  useCopilotAction({
    name: "addTask",
    description: "Adds a task to the task list",
    parameters: [
      {
        name: "title",
        type: "string",
        description: "The title of the task",
        required: true,
      },
      {
        name: "description",
        type: "string",
        description: "The description of the task",
        required: false,
      },
      {
        name: "dueDate",
        type: "string",
        description: "The due date of the task",
        required: false,
      },
      {
        name: "priority",
        type: "string",
        description: "The priority of the task",
        required: false,
      },
    ],
    handler: ({ title, description, dueDate, priority }) => {
      addTask(title, description, dueDate, priority);
    },
  });

  useCopilotAction({
    name: "updateTask",
    description: "Updates a task in the task list",
    parameters: [
      {
        name: "id",
        type: "number",
        description: "The id of the task",
        required: true,
      },
      {
        name: "updates",
        type: "object",
        description: "The updates for the task",
        required: true,
      },
    ],
    handler: ({ id, updates }) => {
      updateTask(id, updates);
    },
  });

  useCopilotAction({
    name: "deleteTask",
    description: "Deletes a task from the task list",
    parameters: [
      {
        name: "id",
        type: "number",
        description: "The id of the task",
        required: true,
      },
    ],
    handler: ({ id }) => {
      deleteTask(id);
    },
  });

  useCopilotAction({
    name: "setTaskStatus",
    description: "Sets the status of a task",
    parameters: [
      {
        name: "id",
        type: "number",
        description: "The id of the task",
        required: true,
      },
      {
        name: "status",
        type: "string",
        description: "The status of the task",
        enum: Object.values(TaskStatus),
        required: true,
      },
    ],
    handler: ({ id, status }) => {
      setTaskStatus(id, status);
    },
  });

  // Add Copilot actions for events
  useCopilotAction({
    name: "addEvent",
    description: "Adds an event to the event list",
    parameters: [
      { name: "title", type: "string", description: "The title of the event", required: true },
      { name: "description", type: "string", description: "The description of the event", required: true },
      { name: "date", type: "string", description: "The date of the event", required: true },
      { name: "time", type: "string", description: "The time of the event", required: true },
      { name: "priority", type: "string", description: "The priority of the event", required: false },
    ],
    handler: ({ title, description, date, time, priority = "normal" }) => {
      addEvent(title, description, date, time, priority);
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

  const addEvent = (title: string, description: string, date: string, time: string, priority: string = "normal") => {
    const newEvent = { id: nextEventId++, title, description, date, time, priority };
    setEvents(prevEvents => [...prevEvents, newEvent]);
  };

  const completeEvent = (id: number) => {
    setEvents(prevEvents =>
      prevEvents.map(event =>
        event.id === id ? { ...event, completed: true } : event
      )
    );
  };

  const deleteEvent = (id: number) => {
    setEvents(prevEvents => {
      const updatedEvents = prevEvents.filter(event => event.id !== id);
      saveEventsToLocalStorage(updatedEvents); // Save to local storage after deletion
      return updatedEvents;
    });
  };

  return (
    <TasksContext.Provider value={{ tasks, events, addTask, updateTask, setTaskStatus, deleteTask, addEvent, deleteEvent, completeEvent }}>
      {children}
    </TasksContext.Provider>
  );
};

export const useTasks = () => {
  const context = useContext(TasksContext);
  if (context === undefined) {
    throw new Error("useTasks must be used within a TasksProvider");
  }
  return context;
};
