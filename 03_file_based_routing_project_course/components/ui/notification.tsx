// import { useContext } from "react";

import styles from "./notification.module.css";
// import NotificationContext from "../../store/notification-context";

function Notification(props: {
  title: string;
  message: string;
  status: "pending" | "success" | "error" | "";
}) {
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
