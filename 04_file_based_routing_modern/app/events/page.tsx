import EventList from "@/components/events/EventList";
import EventsSearch from "@/components/events/EventsSearch";
import ErrorAlert from "@/components/ui/ErrorAlert";
import supabase from "@/services/supabase";

export const revalidate = 1800;

export default async function Events() {
  const { data: events, error } = await supabase.from("events").select();
  if (error) {
    return <ErrorAlert>{error.message}</ErrorAlert>;
  }

  return (
    <>
      <EventsSearch />
      <EventList items={events} />
    </>
  );
}
