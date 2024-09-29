import React, { useState } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import { useTasks } from "@/lib/hooks/use-tasks";
import { AddEvent } from "@/components/addEvent";

export function EventList() {
  const { events } = useTasks();
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);

  const onDateChange = (value: Date | Date[]) => {
    if (Array.isArray(value)) return;
    setSelectedDate(value);
  };

  const eventsForSelectedDate = events.filter((event) => {
    return (
      selectedDate && event.date === selectedDate.toISOString().split("T")[0]
    );
  });

  return (
    <main className="flex flex-col items-center justify-between p-8 md:p-24 min-h-screen">
      <h1 className="text-2xl font-bold mb-4">📅 My Event Calendar</h1>

      <AddEvent
        selectedDate={selectedDate ? selectedDate.toISOString().split("T")[0] : undefined}
        onClose={() => {}}
      />

      <Calendar
        onClickDay={onDateChange}
        value={selectedDate}
        tileContent={({ date }) => {
          const eventExists = events.some(
            (event) => event.date === date.toISOString().split("T")[0]
          );
          return eventExists ? <div className="dot"></div> : null;
        }}
        className="my-4"
      />

      {selectedDate && (
        <div className="mt-4">
          <h2 className="text-xl font-bold">Events on {selectedDate.toDateString()}:</h2>
          {eventsForSelectedDate.length > 0 ? (
            <ul className="list-disc ml-6">
              {eventsForSelectedDate.map((event) => (
                <li key={event.id} className="mt-2">
                  <strong>{event.title}</strong> - {event.description} at {event.time} (Priority: {event.priority})
                </li>
              ))}
            </ul>
          ) : (
            <p>No events on this date.</p>
          )}
        </div>
      )}
    </main>
  );
}
