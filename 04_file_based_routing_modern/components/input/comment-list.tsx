"use client";

import { Comment } from "@/types";
import styles from "./comment-list.module.css";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { useNotification } from "@/store/notification-context";

function CommentList() {
  const [comments, setComments] = useState<Comment[]>([]);
  const params = useParams();
  const id = params.id as string;
  const { showNotification, notification } = useNotification();

  useEffect(() => {
    if (!comments.length) {
      try {
        showNotification({
          title: "Loading",
          message: "Loading comments",
          status: "pending",
        });
        fetch(`/api/events/${id}/comments`)
          .then((res) => res.json())
          .then((data) => {
            if (data.success) {
              setComments(data.comments);
              showNotification({
                title: "Success!",
                message: "Comments loaded successfully",
                status: "success",
              });
            } else {
              showNotification({
                title: "Error!",
                message: "Couldn't load comments",
                status: "error",
              });
            }
          })
          .catch((err) => {
            showNotification({
              title: "Error!",
              message:
                err instanceof Error ? err.message : "Couldn't load comments",
              status: "error",
            });
          });
      } catch (error) {}
    }
  }, [comments.length, id, showNotification]);

  if (notification?.status === "pending") {
    return <p>Loading...</p>;
  }

  return (
    <ul className={styles.comments}>
      {comments.length ? (
        comments.map((c) => (
          <li key={c.id}>
            <p>{c.text}</p>
            <div>
              By{" "}
              <address>
                {c.username} ({c.email} at {c.created_at.split("T")[0]})
              </address>
            </div>
          </li>
        ))
      ) : (
        <p>No comments for this event</p>
      )}
    </ul>
  );
}

export default CommentList;
