import EventList from "@/components/events/EventList";
import ResultsTitle from "@/components/events/ResultsTitle";
import Button from "@/components/ui/Button";
import ErrorAlert from "@/components/ui/ErrorAlert";
import supabase from "@/services/supabase";

export default async function FilteredEventsPage({
  params: { slug },
}: {
  params: { slug: string[] };
}) {
  const [year, month] = slug;
  const numYear = +year;
  const numMonth = +month;

  if (isNaN(numYear) || isNaN(numMonth) || numMonth < 1 || numMonth > 12) {
    return (
      <>
        <ErrorAlert>
          <p>Invalid filter. Please adjust the filter values.</p>
        </ErrorAlert>
        <div className="center">
          <Button link="/events">Show All Events</Button>
        </div>
      </>
    );
  }
  const startDate = new Date(numYear, numMonth - 1, 1);
  const endDate = new Date(numYear, numMonth, 0);
  const startDateString = startDate.toISOString().split("T")[0];
  const endDateString = endDate.toISOString().split("T")[0];
  const { data, error } = await supabase
    .from("events")
    .select()
    .gte("date", startDateString)
    .lte("date", endDateString);

  if (error || !data) {
    return (
      <>
        <ErrorAlert>
          <p>No events found</p>
        </ErrorAlert>
        <div className="center">
          <Button link="/events">Show All Events</Button>
        </div>
      </>
    );
  }

  return (
    <>
      <ResultsTitle date={new Date(numYear, numMonth - 1)} />
      <EventList items={data} />
    </>
  );
}
