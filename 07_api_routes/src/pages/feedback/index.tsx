import { GetStaticProps, InferGetStaticPropsType } from "next";
import { extractFeedback } from "../api/feedback";

export default function FeedbackPage(
  props: InferGetStaticPropsType<typeof getStaticProps>,
) {
  return (
    <div>
      <ul>
        {props.feedback.map((item) => (
          <li key={item.id}>{item.text}</li>
        ))}
      </ul>
    </div>
  );
}

export const getStaticProps = (async () => {
  // NOTE: don't make API calls with fetch or axios, instead use some exported
  // functions to get the data directly.
  try {
    return {
      props: {
        feedback: extractFeedback(),
      },
    };
  } catch {
    return {
      notFound: true,
    };
  }
}) satisfies GetStaticProps;
