"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";
import type { Notification, NotificationContextType } from "@/types";

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
  const [notification, setNotification] = useState<Notification | null>(null);

  useEffect(() => {
    if (
      notification &&
      (notification.status === "success" || notification.status === "error")
    ) {
      const timer = setTimeout(() => {
        setNotification(null);
      }, 3000);
      return () => {
        clearTimeout(timer);
      };
    }
  }, [notification]);

  const showNotification = useCallback(function (notification: Notification) {
    setNotification(notification);
  }, []);

  const hideNotification = useCallback(function () {
    setNotification(null);
  }, []);

  return (
    <NotificationContext.Provider
      value={{
        notification,
        showNotification,
        hideNotification,
      }}
    >
      {children}
    </NotificationContext.Provider>
  );
}

export function useNotification() {
  const context = useContext(NotificationContext);
  if (!context) {
    throw new Error(
      "useNotification should be used inside a NotificationContextProvider",
    );
  }
  return context;
}

export default NotificationContext;
