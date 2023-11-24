import EventContent from "@/components/event-detail/EventContent";
import EventLogistics from "@/components/event-detail/EventLogistics";
import EventSummary from "@/components/event-detail/EventSummary";
import Button from "@/components/ui/Button";
import ErrorAlert from "@/components/ui/ErrorAlert";
import supabase from "@/services/supabase";

export default async function EventDetailPage({
  params,
}: {
  params: { id: string };
}) {
  const { data: event, error } = await supabase
    .from("events")
    .select()
    .eq("id", params.id)
    .single();

  if (error || !event) {
    return (
      <>
        <ErrorAlert>
          <p>Event Not Found</p>
        </ErrorAlert>
        <div className="center">
          <Button link="/events">Show All Events</Button>
        </div>
      </>
    );
  }

  return (
    <>
      <EventSummary title={event.title} />
      <EventLogistics
        date={event.date || ""}
        address={event.location || ""}
        image={event.image || ""}
        imageAlt={event.title}
      />
      <EventContent content={""}>
        <p>{event.description}</p>
      </EventContent>
    </>
  );
}
