import EventList from "@/components/events/EventList";
import { GetStaticProps, InferGetStaticPropsType } from "next";
import supabase from "@/services/supabase";
import { Event } from "@/types";

export default function Home(
  props: InferGetStaticPropsType<typeof getStaticProps>,
) {
  return (
    <div>
      <EventList items={props.events} />
    </div>
  );
}

export const getStaticProps = (async (/* context */) => {
  const { data, error } = await supabase.from("events").select("*");
  if (error) {
    return {
      props: {
        events: [] as Event[],
      },
    };
  }
  return {
    props: {
      events: data.filter((e) => e.isFeatured),
    },
    revalidate: 30 * 60, // every 30 minutes
  };
}) satisfies GetStaticProps;
