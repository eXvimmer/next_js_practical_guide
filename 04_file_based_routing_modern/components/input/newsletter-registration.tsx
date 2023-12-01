"use client";

import styles from "./newsletter-registration.module.css";
import { useFormState, useFormStatus } from "react-dom";
import { subscribeToNewsletter } from "@/actions";
import { useEffect } from "react";
import { useNotification } from "@/store/notification-context";

function RegisterButton() {
  const { pending } = useFormStatus();
  const { showNotification } = useNotification();

  useEffect(() => {
    if (pending) {
      showNotification({
        title: "Registering",
        message: "Submitting your email address",
        status: "pending",
      });
    }
  }, [pending, showNotification]);

  return <button disabled={pending}>Register</button>;
}

function NewsletterRegistration() {
  const [formState, action] = useFormState(subscribeToNewsletter, {
    message: "",
    success: true,
  });
  const { showNotification } = useNotification();

  useEffect(() => {
    if (formState.message) {
      showNotification({
        title: formState.success ? "Success!" : "Error!",
        message:
          formState.message ||
          (formState.success
            ? "Thank you for subscribing to our newsletter!"
            : "Something went wrong"),
        status: formState.success ? "success" : "error",
      });
    }
  }, [formState, showNotification]);

  return (
    <section className={styles.newsletter}>
      <h2>Sign up to stay updated!</h2>
      <form
        action={(payload) => {
          try {
            action(payload);
          } catch (error) {
            showNotification({
              title: "Error!",
              message:
                error instanceof Error ? error.message : "Something went wrong",
              status: "error",
            });
          }
        }}
      >
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
    </section>
  );
}

export default NewsletterRegistration;
