"use client";

import { useState } from "react";
import { useTasks } from "@/lib/hooks/use-tasks";

export const EventForm = ({ selectedDate, onClose }: { selectedDate: string, onClose: () => void }) => {
  const { addEvent } = useTasks();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [time, setTime] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (title && time) {
      addEvent(title, description, selectedDate, time, "Normal");
      onClose();
    }
  };

  return (
    <div className="event-form">
      <h3>Add Event for {selectedDate}</h3>
      <form onSubmit={handleSubmit} className="flex flex-col gap-2">
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Event Title"
          className="border p-2"
          required
        />
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Event Description"
          className="border p-2"
        />
        <input
          type="time"
          value={time}
          onChange={(e) => setTime(e.target.value)}
          className="border p-2"
          required
        />
        <button type="submit" className="bg-blue-500 text-white p-2">Add Event</button>
        <button type="button" onClick={onClose} className="bg-red-500 text-white p-2">Cancel</button>
      </form>
    </div>
  );
};
