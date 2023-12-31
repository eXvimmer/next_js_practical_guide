import { createContext, useCallback, useEffect, useState } from "react";
import type { NotificationContextType, Notification } from "@/types";

const NotificationContext = createContext<NotificationContextType>({
  notification: null,
  showNotification(_notification: Notification) {},
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

  const showNotification = useCallback(function (notification: Notification) {
    setActiveNotification(notification);
  }, []);

  const hideNotification = useCallback(function () {
    setActiveNotification(null);
  }, []);

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
