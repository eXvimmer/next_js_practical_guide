import { FormEventHandler, useRef } from "react";

export default function Home() {
  const emailRef = useRef<HTMLInputElement>(null);
  const feedbackRef = useRef<HTMLTextAreaElement>(null);

  const handleFormSubmission: FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();
    const email = emailRef.current?.value;
    const feedback = feedbackRef.current?.value;
    fetch("/api/feedback", {
      method: "POST",
      body: JSON.stringify({ email, text: feedback }),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((data) => console.log(data));
  };

  return (
    <form onSubmit={handleFormSubmission}>
      <div>
        <label htmlFor="email">Email</label>
        <input type="email" id="email" name="email" ref={emailRef} />
      </div>
      <div>
        <label htmlFor="feedback">Feedback</label>
        <textarea rows={5} id="feedback" name="feedback" ref={feedbackRef} />
      </div>
      <button type="submit">Send feedback</button>
    </form>
  );
}
