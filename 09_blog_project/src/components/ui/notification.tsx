import type { Notification } from "@/types";
import styles from "./notification.module.css";
import ReactDOM from "react-dom";

function Notification({ title, message, status }: Notification) {
  const statusStyles =
    status === "success"
      ? styles.success
      : status === "error"
      ? styles.error
      : "";
  const cssStyles = `${styles.notification} ${statusStyles}`;

  return ReactDOM.createPortal(
    <div className={cssStyles}>
      <h2>{title}</h2>
      <p>{message}</p>
    </div>,
    document.getElementById("notifications")!,
  );
}

export default Notification;
