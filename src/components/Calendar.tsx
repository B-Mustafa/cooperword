import { useState } from "react";
import { useTasks } from "@/lib/hooks/use-tasks";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { AddEvent } from "@/components/addEvent";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { Event } from "@/lib/events.types";

const daysOfWeek = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

export const Calendar = () => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState<string | null>(null);
  const [isAddEventOpen, setIsAddEventOpen] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState<Event | null>(null);
  const [isEventDetailsOpen, setIsEventDetailsOpen] = useState(false);
  const { events } = useTasks();

  const handleDateClick = (date: string) => {
    setSelectedDate(date);
    setIsAddEventOpen(true);
  };

  const handleEventClick = (event: Event) => {
    setSelectedEvent(event);
    setIsEventDetailsOpen(true);
  };

  const getDaysInMonth = (year: number, month: number) => {
    return new Date(year, month + 1, 0).getDate();
  };

  const handlePrevMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1));
  };

  const handleNextMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1));
  };

  const getEventsForDate = (date: string) => {
    return events.filter((event) => event.date === date);
  };

  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();
  const daysInMonth = getDaysInMonth(year, month);

  const getPriorityClass = (priority: string) => {
    switch (priority.toLowerCase()) {
      case "high":
        return "bg-red-600";
      case "medium":
        return "bg-blue-600";
      case "low":
        return "bg-green-600";
      default:
        return "bg-gray-200";
    }
  };

  return (
    <div className="calendar-container bg-black/20">
      <div className="flex justify-between mb-4">
        <button onClick={handlePrevMonth} className="bg-blue-500 text-white p-2 rounded">
          <ArrowLeft />
        </button>
        <h2 className="text-xl font-bold">
          {currentDate.toLocaleString("default", { month: "long" })} {year}
        </h2>
        <button onClick={handleNextMonth} className="bg-blue-500 text-white p-2 rounded">
          <ArrowRight />
        </button>
      </div>

      <div className="grid grid-cols-7 gap-2 text-center">
        {daysOfWeek.map((day) => (
          <div key={day} className="font-bold">{day}</div>
        ))}
        {[...Array(daysInMonth)].map((_, index) => {
          const date = `${year}-${String(month + 1).padStart(2, "0")}-${String(index + 1).padStart(2, "0")}`;
          return (
            <div
              key={index}
              className={`border p-2 cursor-pointer hover:bg-slate-200 hover:text-black transition-all`}
              onClick={() => handleDateClick(date)}
            >
              {index + 1}
              <div className="flex flex-wrap gap-x-2 text-xs items-center justify-center">
                {getEventsForDate(date).map((event) => (
                  <div
                    key={event.id}
                    className={`p-1 mt-1 rounded-full w-4 h-4 flex ${getPriorityClass(event.priority)} text-white cursor-pointer`}
                    onClick={(e) => {
                      e.stopPropagation();
                      handleEventClick(event);
                    }}
                  >
                    {/* Optionally display title here */}
                  </div>
                ))}
              </div>
            </div>
          );
        })}
      </div>

      <Dialog open={isAddEventOpen} onOpenChange={setIsAddEventOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Add Event on {selectedDate ?? ""}</DialogTitle>
            <DialogDescription>
              Please fill in the details for the event.
            </DialogDescription>
          </DialogHeader>
          <AddEvent
            onClose={() => setIsAddEventOpen(false)}
            selectedDate={selectedDate || ""}
          />
        </DialogContent>
      </Dialog>

      <Dialog open={isEventDetailsOpen} onOpenChange={setIsEventDetailsOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{selectedEvent?.title}</DialogTitle>
            <DialogDescription>
              <p><strong>Date:</strong> {selectedEvent?.date}</p>
              <p><strong>Time:</strong> {selectedEvent?.time}</p>
              <p><strong>Priority:</strong> {selectedEvent?.priority}</p>
              <p><strong>Description:</strong> {selectedEvent?.description}</p>
            </DialogDescription>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </div>
  );
};
