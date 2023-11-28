import { FormEventHandler, useRef, useState } from "react";
import styles from "./newsletter-registration.module.css";
import Alert from "../ui/Alert";

function NewsletterRegistration() {
  const emailInputRef = useRef<HTMLInputElement>(null);
  const [isSuccessful, setIsSuccessful] = useState(true);
  const [message, setMessage] = useState("");

  const registrationHandler: FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();
    if (!emailInputRef.current?.value) {
      setIsSuccessful(false);
      setMessage("Please provide a valid email address");
      return;
    }
    setIsSuccessful(true);
    setMessage("");
    fetch(`/api/newsletter`, {
      method: "POST",
      body: JSON.stringify({ email: emailInputRef.current?.value }),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((data) => {
        if (!data.success) {
          setIsSuccessful(false);
          setMessage(data.message);
        } else {
          setIsSuccessful(true);
          setMessage(data.message);
          if (emailInputRef.current) {
            emailInputRef.current.value = "";
          }
        }
      });
  };

  return (
    <section className={styles.newsletter}>
      <h2>Sign up to stay updated!</h2>
      <form onSubmit={registrationHandler}>
        <div className={styles.control}>
          <input
            type="email"
            id="email"
            placeholder="Your email"
            aria-label="Your email"
            ref={emailInputRef}
          />
          <button>Register</button>
        </div>
      </form>
      {message && <Alert success={isSuccessful} message={message} />}
    </section>
  );
}

export default NewsletterRegistration;
