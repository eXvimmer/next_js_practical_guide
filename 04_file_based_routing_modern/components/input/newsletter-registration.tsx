"use client";

import styles from "./newsletter-registration.module.css";
import Alert from "../ui/Alert";
import { useFormState, useFormStatus } from "react-dom";
import { subscribeToNewsletter } from "@/actions";
import { useEffect, useState } from "react";

function RegisterButton() {
  const { pending } = useFormStatus();
  return <button disabled={pending}>Register</button>;
}

function NewsletterRegistration() {
  const [message, setMessage] = useState("");
  const [formState, action] = useFormState(subscribeToNewsletter, {
    message,
    success: true,
  });

  useEffect(() => {
    setMessage(formState.message);
  }, [formState]);

  return (
    <section className={styles.newsletter}>
      <h2>Sign up to stay updated!</h2>
      <form action={action}>
        <div className={styles.control}>
          <input
            type="email"
            id="email"
            name="email"
            placeholder="Your email"
            aria-label="Your email"
          />
          <RegisterButton />
        </div>
      </form>
      {message && (
        <Alert
          success={formState.success}
          message={message}
          handleClick={() => setMessage("")}
        />
      )}
    </section>
  );
}

export default NewsletterRegistration;
