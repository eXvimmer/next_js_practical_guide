"use client";

import EventList from "@/components/events/EventList";
import EventsSearch from "@/components/events/EventsSearch";
import { getAllEvents } from "@/dummy_data";
import { useRouter } from "next/navigation";

export default function Events() {
  const router = useRouter();
  const events = getAllEvents();

  const handleSearch = (year: string, month: string) => {
    const fullPath = `/events/${year}/${month}`;
    router.push(fullPath);
  };

  return (
    <>
      <EventsSearch onSearch={handleSearch} />
      <EventList items={events} />
    </>
  );
}
