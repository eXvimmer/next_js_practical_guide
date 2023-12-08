import { FormEventHandler, useRef, useState } from "react";
import styles from "./auth-form.module.css";
import { signIn } from "next-auth/react";

async function createUser(email: string, password: string) {
  const response = await fetch(`/api/auth/signup`, {
    method: "POST",
    body: JSON.stringify({ email, password }),
    headers: {
      "Content-Type": "application/json",
    },
  });
  const data = await response.json();
  if (!response.ok) {
    throw new Error(data.message || "something went wrong");
  }
  return data;
}

function AuthForm() {
  const [isInLoginMode, setIsInLoginMode] = useState(true); // login/create mode
  const emailRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);

  function switchAuthModeHandler() {
    setIsInLoginMode((s) => !s);
  }

  const handleSubmit: FormEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault();
    const email = emailRef.current?.value;
    const password = passwordRef.current?.value;
    if (!email || !password) {
      return;
    }
    try {
      if (isInLoginMode) {
        const result = await signIn("credentials", {
          redirect: false,
          email,
          password,
        });
        console.log(result);
        if (!result?.error) {
          emailRef.current.value = "";
          passwordRef.current.value = "";
        }
      } else {
        // create mode
        const result = await createUser(email, password);
        console.log(result); // TODO: add a notification
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <section className={styles.auth}>
      <h1>{isInLoginMode ? "Login" : "Sign Up"}</h1>
      <form onSubmit={handleSubmit}>
        <div className={styles.control}>
          <label htmlFor="email">Your Email</label>
          <input type="email" id="email" required ref={emailRef} />
        </div>
        <div className={styles.control}>
          <label htmlFor="password">Your Password</label>
          <input type="password" id="password" required ref={passwordRef} />
        </div>
        <div className={styles.actions}>
          <button>{isInLoginMode ? "Login" : "Create Account"}</button>
          <button
            type="button"
            className={styles.toggle}
            onClick={switchAuthModeHandler}
          >
            {isInLoginMode
              ? "Create new account"
              : "Login with existing account"}
          </button>
        </div>
      </form>
    </section>
  );
}

export default AuthForm;
