import { createContext, useEffect, useState } from "react";
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

  useEffect(() => {
    if (
      activeNotification &&
      (activeNotification.status === "success" ||
        activeNotification.status === "error")
    ) {
      const timer = setTimeout(() => {
        setActiveNotification(null);
      }, 3000);
      return () => {
        clearTimeout(timer);
      };
    }
  }, [activeNotification]);

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
