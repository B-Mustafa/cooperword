"use client";

import { Calendar } from "@/components/Calendar"; // Import your Calendar component
// import Navbar from "@/components/Navbar";
import { TasksProvider, useTasks } from "@/lib/hooks/use-tasks"; // Import useTasks to fetch tasks

export default function Home() {
  return (
    <TasksProvider>
      <MainContent />
    </TasksProvider>
  );
}

// Main Content Component
const MainContent = () => {
  const { events, deleteEvent, completeEvent } = useTasks(); // Fetch events and actions from the context

  const getEventsForMonth = (month: number) => {
    // Filter events by the current month
    return events.filter((event) => {
      const eventDate = new Date(event.date);
      return eventDate.getMonth() === month;
    });
  };

  const currentDate = new Date();
  const currentMonth = currentDate.getMonth();

  return (
    <div className="flex flex-col md:flex-row bg-black">
      {/* navbar
      <Navbar/> */}
      
      {/* Main Content Area */}
      <div className="md:flex-grow p-4 md:p-6 flex-col flex">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Calendar Section */}
          <div className="shadow rounded-lg p-4">
            <h2 className="text-lg font-semibold mb-4">Calendar</h2>
            <div className="overflow-hidden">
              <Calendar />
            </div>
          </div>

          {/* Upcoming Events Section */}
          <div className="shadow rounded-lg p-4">
            <h2 className="text-lg font-semibold mb-4">Upcoming Events</h2>
            <ul className="list-disc pl-5">
              {getEventsForMonth(currentMonth).length > 0 ? (
                getEventsForMonth(currentMonth).map((event) => (
                  <li key={event.id} className="flex justify-between items-center text-muted-foreground mb-4 bg-transparent outline p-3 rounded-lg ">
                    <span className={event.completed ? "line-through text-muted-foreground" : ""}>
                      {event.title} - {event.date} - {event.time}
                    </span>
                    <div>
                      <button
                        className="text-green-500 hover:text-green-700 mr-2"
                        onClick={() => completeEvent(event.id)}
                      >
                        ✓
                      </button>
                      <button
                        className="text-red-500 hover:text-red-700"
                        onClick={() => deleteEvent(event.id)}
                      >
                        ✕
                      </button>
                    </div>
                  </li>
                ))
              ) : (
                <li className="text-gray-600">No upcoming events.</li>
              )}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};
