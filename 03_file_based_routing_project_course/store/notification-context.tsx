import { createContext, useState } from "react";
import type { NotificationContextType, Notification } from "@/types";

const NotificationContext = createContext<NotificationContextType>({
  notification: null,
  showNotification(_data: Notification) {},
  hideNotification() {},
});

export function NotificationContextProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [activeNotification, setActiveNotification] =
    useState<Notification | null>(null);

  function showNotification(data: Notification) {
    setActiveNotification(data);
  }

  function hideNotification() {
    setActiveNotification(null);
  }

  return (
    <NotificationContext.Provider
      value={{
        notification: activeNotification,
        showNotification,
        hideNotification,
      }}
    >
      {children}
    </NotificationContext.Provider>
  );
}

export default NotificationContext;
