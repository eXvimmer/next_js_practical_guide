import EventList from "@/components/events/EventList";
import ResultsTitle from "@/components/events/ResultsTitle";
import Button from "@/components/ui/Button";
import ErrorAlert from "@/components/ui/ErrorAlert";
import { useRouter } from "next/router";
import { Event } from "@/types";
import { useEffect, useState } from "react";
import supabase from "@/services/supabase";

export default function FilteredEventsPage() {
  const [events, setEvents] = useState<Event[]>([]);
  const [isValid, setIsValid] = useState(true);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();
  const { slug } = router.query;

  useEffect(() => {
    (async () => {
      try {
        setIsValid(true);
        if (!slug || !slug.length || typeof slug === "string") {
          setIsValid(false);
          return;
        }
        const [year, month] = slug;
        const numYear = +year;
        const numMonth = +month;
        if (
          isNaN(numYear) ||
          isNaN(numMonth) ||
          numMonth < 1 ||
          numMonth > 12 ||
          slug.length !== 2
        ) {
          setIsValid(false);
          return;
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
        if (error) {
          console.error(error);
          setIsValid(false);
          return;
        }
        setEvents(data);
      } finally {
        setIsLoading(false);
      }
    })();
  }, [slug]);

  if (isLoading) {
    return <p className="center">Loading...</p>;
  }

  if (!isValid || !slug || typeof slug === "string") {
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

  if (!events.length) {
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

  const [year, month] = slug;
  const numYear = +year;
  const numMonth = +month;
  const date = new Date(numYear, numMonth - 1);

  return (
    <>
      <ResultsTitle date={date} />
      <EventList items={events} />
    </>
  );
}
