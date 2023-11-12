import { Event } from "@/types";
import Link from "next/link";
import styles from "./event-item.module.css";

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
    <li className={styles.item}>
      <img src={"/" + event.image} alt={event.title} />
      <div className={styles.content}>
        <div className={styles.summary}>
          <h2>{event.title}</h2>
          <div className={styles.date}>
            <time>{readableDate}</time>
          </div>
          <div className={styles.address}>
            <address>{address}</address>
          </div>
        </div>
        <div className={styles.actions}>
          <Link href={`/events/${event.id}`}>Explore Event</Link>
        </div>
      </div>
    </li>
  );
}

export default EventItem;
