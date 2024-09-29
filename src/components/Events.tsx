import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { TrashIcon } from "lucide-react";
import { motion } from "framer-motion";
import { Event } from "@/lib/events.types"; 
import { useTasks } from "@/lib/hooks/use-tasks"; 

export function EventComponent({ event }: { event: Event }) {
  const { deleteEvent } = useTasks(); // Ensure deleteEvent is available

  return (
    <motion.div
      key={event.id}
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="flex flex-col p-4 rounded-md bg-muted mb-2"
    >
      <div className="flex items-center gap-4">
        <Label className="text-sm font-medium">{event.title}</Label>
        <Button variant="ghost" size="sm" onClick={() => deleteEvent(event.id)}>
          <TrashIcon className="w-4 h-4" />
          <span className="sr-only">Delete</span>
        </Button>
      </div>
      <p className="text-sm text-neutral-500">{event.description}</p>
      <p className="text-xs text-muted-foreground">Date: {event.date}</p>
      <p className="text-xs text-muted-foreground">Time: {event.time}</p>
      <p className="text-xs text-muted-foreground">Priority: {event.priority}</p>
    </motion.div>
  );
}
