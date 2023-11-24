import EventContent from "@/components/event-detail/EventContent";
import EventLogistics from "@/components/event-detail/EventLogistics";
import EventSummary from "@/components/event-detail/EventSummary";
import ErrorAlert from "@/components/ui/ErrorAlert";
import supabase from "@/services/supabase";
import { GetStaticPaths, GetStaticProps, InferGetStaticPropsType } from "next";

export default function EventDetailPage(
  props: InferGetStaticPropsType<typeof getStaticProps>,
) {
  if (!props.event) {
    return (
      <ErrorAlert>
        <p>Event Not Found</p>
      </ErrorAlert>
    );
  }

  return (
    <>
      <EventSummary title={props.event.title} />
      <EventLogistics
        date={props.event.date || ""}
        address={props.event.location || ""}
        image={props.event.image || ""}
        imageAlt={props.event.title || ""}
      />
      <EventContent content={""}>
        <p>{props.event.description}</p>
      </EventContent>
    </>
  );
}

export const getStaticPaths = (async () => {
  const { data, error } = await supabase.from("events").select("id");
  if (error || !data) {
    return {
      paths: [],
      fallback: "blocking",
    };
  }
  return {
    paths: data.map((o) => ({ params: { id: o.id } })),
    fallback: "blocking",
  };
}) satisfies GetStaticPaths;

export const getStaticProps = (async (context) => {
  const id = Array.isArray(context.params?.id)
    ? context.params?.id[0]
    : context.params?.id;
  if (!id) {
    return {
      notFound: true,
    };
  }
  const { data, error } = await supabase
    .from("events")
    .select("*")
    .eq("id", id)
    .single();
  if (error || !data) {
    return {
      notFound: true,
    };
  }
  return {
    props: {
      event: data,
    },
  };
}) satisfies GetStaticProps;
