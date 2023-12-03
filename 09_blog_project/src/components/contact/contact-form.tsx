import { useState, FormEventHandler, useEffect } from "react";
import styles from "./contact-form.module.css";
import Notification from "../ui/notification";
import type { Notification as NotificationType } from "@/types";

function ContactForm() {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [message, setMessage] = useState("");
  const [requestStatus, setRequestStatus] = useState<
    NotificationType["status"] | null
  >(null);
  const [error, setError] = useState("");

  useEffect(() => {
    if (requestStatus === "success" || requestStatus === "error") {
      const timer = setTimeout(() => {
        setRequestStatus(null);
      }, 3000);

      return () => {
        clearTimeout(timer);
      };
    }
  }, [requestStatus]);

  let notification: NotificationType | null = null;

  switch (requestStatus) {
    case "success":
      {
        notification = {
          title: "Success",
          message: "Messaged saved successfully",
          status: "success",
        };
      }
      break;
    case "error":
      {
        notification = {
          title: "Error",
          message: error || "something went wrong",
          status: "error",
        };
      }
      break;
    case "pending": {
      notification = {
        title: "Please wait",
        message: "Saving the message to database",
        status: "pending",
      };
    }
    default:
      notification = null;
  }

  const sendMessageHandler: FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();
    setRequestStatus("pending");
    fetch("/api/contact", {
      method: "POST",
      body: JSON.stringify({
        email,
        name,
        message,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => {
        if (!res.ok) {
          throw new Error("something went wrong");
        }
        return res.json();
      })
      .then((data) => {
        if (data.success) {
          setRequestStatus("success");
          setEmail("");
          setName("");
          setMessage("");
        } else {
          setRequestStatus("error");
        }
      })
      .catch((err) => {
        setRequestStatus("error");
        setError(err instanceof Error ? err.message : "something went wrong");
      });
  };

  return (
    <section className={styles.contact}>
      <h1>How can I help you?</h1>
      <form className={styles.form} onSubmit={sendMessageHandler}>
        <div className={styles.controls}>
          <div className={styles.control}>
            <label htmlFor="email">Your Email</label>
            <input
              type="email"
              id="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className={styles.control}>
            <label htmlFor="name">Your Name</label>
            <input
              type="text"
              id="name"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
        </div>
        <div className={styles.control}>
          <label htmlFor="message">Your Message</label>
          <textarea
            id="message"
            rows={5}
            required
            value={message}
            onChange={(e) => setMessage(e.target.value)}
          />
        </div>
        <div className={styles.actions}>
          <button disabled={requestStatus === "pending"}>Send Message</button>
        </div>
      </form>
      {notification && <Notification {...notification} />}
    </section>
  );
}

export default ContactForm;
