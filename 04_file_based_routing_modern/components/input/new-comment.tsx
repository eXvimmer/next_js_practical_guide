"use client";
import { useEffect, useState } from "react";
import styles from "./new-comment.module.css";
import { useFormState } from "react-dom";
import { createComment } from "@/actions";

function NewComment({ eventId }: { eventId: string }) {
  const [isValid, setIsValid] = useState(true);
  const [formState, action] = useFormState(createComment, {
    message: "",
    success: isValid,
  });

  useEffect(() => {
    setIsValid(formState.success);
  }, [formState]);

  return (
    <form className={styles.form} action={action}>
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
      {!isValid && <p>{formState.message}</p>}
      <button type="submit">Submit</button>
    </form>
  );
}

export default NewComment;
