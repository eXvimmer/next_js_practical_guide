import EventContent from "@/components/event-detail/EventContent";
import EventLogistics from "@/components/event-detail/EventLogistics";
import EventSummary from "@/components/event-detail/EventSummary";
import ErrorAlert from "@/components/ui/ErrorAlert";
import { getEventById } from "@/dummy_data";

export default function EventDetailPage({
  params: { id },
}: {
  params: { id: string };
}) {
  const event = getEventById(Array.isArray(id) ? id[0] : id!);

  if (!event) {
    return (
      <ErrorAlert>
        <p>Event Not Found</p>
      </ErrorAlert>
    );
  }

  return (
    <>
      <EventSummary title={event.title} />
      <EventLogistics
        date={event.date}
        address={event.location}
        image={event.image}
        imageAlt={event.title}
      />
      <EventContent content={""}>
        <p>{event.description}</p>
      </EventContent>
    </>
  );
}