"use client";

import { useNotification } from "@/store/notification-context";
import Notification from "@/components/ui/notification";

export default function Wrapper({ children }: { children: React.ReactNode }) {
  const { notification } = useNotification();

  return (
    <>
      {children}
      {notification && (
        <Notification
          title={notification.title}
          message={notification.message}
          status={notification.status}
        />
      )}
    </>
  );
}
