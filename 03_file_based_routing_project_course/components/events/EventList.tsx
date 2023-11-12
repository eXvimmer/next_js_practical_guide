import { Event } from "@/types";
import EventItem from "./EventItem";

interface EventListProps {
  items: Event[];
}

function EventList({ items }: EventListProps) {
  return (
    <ul>
      {items.map((event) => (
        <EventItem key={event.id} event={event} />
      ))}
    </ul>
  );
}

export default EventList;
