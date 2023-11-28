import { FormEventHandler, useState } from "react";
import styles from "./newsletter-registration.module.css";
import Alert from "../ui/Alert";

function NewsletterRegistration() {
  const [email, setEmail] = useState("");
  const [isSuccessful, setIsSuccessful] = useState(true);
  const [message, setMessage] = useState("");

  const registrationHandler: FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();
    if (!email) {
      setIsSuccessful(false);
      setMessage("Please provide a valid email address");
      return;
    }
    setIsSuccessful(true);
    setMessage("");
    fetch(`/api/newsletter`, {
      method: "POST",
      body: JSON.stringify({ email }),
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
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <button>Register</button>
        </div>
      </form>
      {message && <Alert success={isSuccessful} message={message} />}
    </section>
  );
}

export default NewsletterRegistration;
