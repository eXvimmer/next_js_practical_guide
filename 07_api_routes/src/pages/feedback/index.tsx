import { GetStaticProps, InferGetStaticPropsType } from "next";
import { Feedback, extractFeedback } from "../api/feedback";
import { useState } from "react";

export default function FeedbackPage(
  props: InferGetStaticPropsType<typeof getStaticProps>,
) {
  const [feedback, setFeedback] = useState<Feedback | null>(null);

  const handleDetailDisplay = (id: string) => {
    // NOTE: this request is redundant, we already have this data in props
    fetch(`/api/${id}`)
      .then((res) => res.json())
      .then((data) => setFeedback(data.feedback));
  };

  return (
    <div>
      {feedback && <p>{feedback.email}</p>}
      <ul>
        {props.feedback.map((item) => (
          <li key={item.id}>
            {item.text}{" "}
            <button onClick={handleDetailDisplay.bind(null, item.id)}>
              Show email
            </button>
          </li>
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
