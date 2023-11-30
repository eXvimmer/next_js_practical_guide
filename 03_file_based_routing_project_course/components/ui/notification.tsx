// import { useContext } from "react";

import { Notification } from "@/types";
import styles from "./notification.module.css";

function Notification(props: Notification) {
  // const notificationCtx = useContext(NotificationContext);
  const { title, message, status } = props;

  let statusStyles = "";
  switch (status) {
    case "success":
      statusStyles = styles.success;
      break;
    case "error":
      statusStyles = styles.error;
      break;
    case "pending":
      statusStyles = styles.pending;
      break;
    default:
      statusStyles = "";
  }
  const activeStyles = `${styles.notification} ${statusStyles}`;

  return (
    <div
      className={activeStyles} /* onClick={notificationCtx.hideNotification} */
    >
      <h2>{title}</h2>
      <p>{message}</p>
    </div>
  );
}

export default Notification;
