import type { Notification } from "@/types";
import styles from "./notification.module.css";

function Notification({ title, message, status }: Notification) {
  const statusStyles =
    status === "success"
      ? styles.success
      : status === "error"
      ? styles.error
      : "";
  const cssStyles = `${styles.notification} ${statusStyles}`;

  return (
    <div className={cssStyles}>
      <h2>{title}</h2>
      <p>{message}</p>
    </div>
  );
}

export default Notification;
