import React, { useState } from "react";
import { useTasks } from "@/lib/hooks/use-tasks";

export function AddEvent({ selectedDate, onClose }: { selectedDate?: string; onClose: () => void }) {
  const { addEvent } = useTasks();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [date, setDate] = useState(selectedDate || "");
  const [time, setTime] = useState("");
  const [priority, setPriority] = useState("");
  const [reminderMinutes, setReminderMinutes] = useState<number | undefined>(undefined);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    addEvent(title, description, date, time, priority, reminderMinutes);
    setTitle("");
    setDescription("");
    setDate("");
    setTime("");
    setPriority("");
    setReminderMinutes(undefined);
    onClose();
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-2">
      <input
        type="text"
        placeholder="Event Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        className="p-2 border border-gray-300 rounded"
        required
      />
      <textarea
        placeholder="Description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        className="p-2 border border-gray-300 rounded"
      />
      <input
        type="date"
        value={date}
        onChange={(e) => setDate(e.target.value)}
        className="p-2 border border-gray-300 rounded"
        required
      />
      <input
        type="time"
        value={time}
        onChange={(e) => setTime(e.target.value)}
        className="p-2 border border-gray-300 rounded"
        required
      />
      <input
        type="text"
        placeholder="Priority (Low/Medium/High)"
        value={priority}
        onChange={(e) => setPriority(e.target.value)}
        className="p-2 border border-gray-300 rounded"
      />
      <select
        value={reminderMinutes || ""}
        onChange={(e) => setReminderMinutes(e.target.value ? parseInt(e.target.value, 10) : undefined)}
        className="p-2 border border-gray-300 rounded"
      >
        <option value="">No Reminder</option>
        <option value="10">10 minutes before</option>
        <option value="30">30 minutes before</option>
        <option value="60">1 hour before</option>
        <option value="120">2 hours before</option>
      </select>
      <button type="submit" className="mt-2 bg-blue-500 text-white p-2 rounded">
        Add Event
      </button>
    </form>
  );
}
