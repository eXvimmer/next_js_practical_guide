import { Event } from "@/types";
import Link from "next/link";

interface EventItemProps {
  event: Event;
}

function EventItem({ event }: EventItemProps) {
  const readableDate = new Date(event.date).toLocaleDateString("en-US", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
  const address = event.location.replace(", ", "\n");

  return (
    <li>
      <img src={"/" + event.image} alt={event.title} />
      <div>
        <div>
          <h2>{event.title}</h2>
          <div>
            <time>{readableDate}</time>
          </div>
          <div>
            <address>{address}</address>
          </div>
        </div>
        <div>
          <Link href={`/events/${event.id}`}>Explore Event</Link>
        </div>
      </div>
    </li>
  );
}

export default EventItem;
