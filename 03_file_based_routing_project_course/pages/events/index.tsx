import EventList from "@/components/events/EventList";
import EventsSearch from "@/components/events/EventsSearch";
import supabase from "@/services/supabase";
import { GetStaticProps, InferGetStaticPropsType } from "next";
import { useRouter } from "next/router";

export default function Events(
  props: InferGetStaticPropsType<typeof getStaticProps>,
) {
  const router = useRouter();

  const handleSearch = (year: string, month: string) => {
    const fullPath = `/events/${year}/${month}`;
    router.push(fullPath);
  };

  return (
    <>
      <EventsSearch onSearch={handleSearch} />
      <EventList items={props.events} />
    </>
  );
}

export const getStaticProps = (async () => {
  const { data, error } = await supabase.from("events").select("*");
  if (error) {
    return {
      props: {
        events: [],
      },
    };
  }
  return {
    props: {
      events: data,
    },
  };
}) satisfies GetStaticProps;
