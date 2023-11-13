import EventList from "@/components/events/EventList";
import { getAllEvents } from "@/dummy_data";

export default function Events() {
  const events = getAllEvents();

  return (
    <div>
      <EventList items={events} />
    </div>
  );
}
