import EventList from "@/components/events/EventList";
import NewsletterRegistration from "@/components/input/newsletter-registration";
import ErrorAlert from "@/components/ui/ErrorAlert";
import supabase from "@/services/supabase";

export const revalidate = 1800; // every 30 minutes

export default async function Home() {
  const { data, error } = await supabase
    .from("events")
    .select()
    .eq("isFeatured", true);

  if (error) {
    return <ErrorAlert>{error.message}</ErrorAlert>;
  }

  return (
    <div>
      <NewsletterRegistration />
      <EventList items={data} />
    </div>
  );
}
