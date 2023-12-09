import styles from "./profile-form.module.css";
import { FormEventHandler, useRef } from "react";

function ProfileForm() {
  const oldPasswordRef = useRef<HTMLInputElement>(null);
  const newPasswordRef = useRef<HTMLInputElement>(null);

  const handleChangePassword: FormEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault();
    const oldPassword = oldPasswordRef?.current?.value;
    const newPassword = newPasswordRef?.current?.value;
    if (!oldPassword || !newPassword) {
      return;
    }
    try {
      const response = await fetch(`/api/user/change-password`, {
        method: "PATCH",
        body: JSON.stringify({ oldPassword, newPassword }),
        headers: {
          "Content-Type": "application/json",
        },
      });
      const data = await response.json();
      console.log(data);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <form className={styles.form} onSubmit={handleChangePassword}>
      <div className={styles.control}>
        <label htmlFor="old-password">Old Password</label>
        <input type="password" id="old-password" ref={oldPasswordRef} />
      </div>
      <div className={styles.control}>
        <label htmlFor="new-password">New Password</label>
        <input type="password" id="new-password" ref={newPasswordRef} />
      </div>
      <div className={styles.action}>
        <button type="submit">Change Password</button>
      </div>
    </form>
  );
}

export default ProfileForm;
