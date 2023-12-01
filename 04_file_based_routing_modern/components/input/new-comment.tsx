"use client";
import { useEffect } from "react";
import styles from "./new-comment.module.css";
import { useFormState, useFormStatus } from "react-dom";
import { createComment } from "@/actions";
import { useNotification } from "@/store/notification-context";

function SubmitButton() {
  const { pending } = useFormStatus();
  const { showNotification } = useNotification();

  useEffect(() => {
    if (pending) {
      showNotification({
        title: "Registering",
        message: "Saving your comment",
        status: "pending",
      });
    }
  }, [pending, showNotification]);

  return <button type="submit">Submit</button>;
}

function NewComment({ eventId }: { eventId: string }) {
  const [formState, action] = useFormState(createComment, {
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
          (formState.success ? "" : "Something went wrong"),
        status: formState.success ? "success" : "error",
      });
    }
  }, [formState, showNotification]);

  return (
    <form
      className={styles.form}
      action={(payload) => {
        try {
          action(payload);
        } catch (error) {
          showNotification({
            title: "Error",
            message:
              error instanceof Error ? error.message : "Something went wrong",
            status: "error",
          });
        }
      }}
    >
      <input type="hidden" name="event-id" value={eventId} />
      <div className={styles.row}>
        <div className={styles.control}>
          <label htmlFor="email">Your email</label>
          <input type="email" id="email" name="email" />
        </div>
        <div className={styles.control}>
          <label htmlFor="username">Your name</label>
          <input type="text" id="username" name="username" />
        </div>
      </div>
      <div className={styles.control}>
        <label htmlFor="comment">Your comment</label>
        <textarea id="comment" rows={5} name="text"></textarea>
      </div>
      <SubmitButton />
    </form>
  );
}

export default NewComment;
