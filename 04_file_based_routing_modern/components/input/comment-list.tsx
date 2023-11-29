"use client";

import { Comment } from "@/types";
import styles from "./comment-list.module.css";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";

function CommentList() {
  const [comments, setComments] = useState<Comment[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const params = useParams();
  const id = params.id as string;

  useEffect(() => {
    if (!comments.length) {
      setIsLoading(true);
      fetch(`/api/events/${id}/comments`)
        .then((res) => res.json())
        .then((data) => {
          if (data.success) {
            setComments(data.comments);
          }
        })
        .finally(() => {
          setIsLoading(false);
        });
    }
  }, [comments.length, id]);

  if (isLoading) {
    return <p>Loading...</p>;
  }

  if (!comments.length) {
    return <p>No comments available for this event.</p>;
  }
  return (
    <ul className={styles.comments}>
      {comments.map((c) => (
        <li key={c.id}>
          <p>{c.text}</p>
          <div>
            By{" "}
            <address>
              {c.username} ({c.email} at {c.created_at.split("T")[0]})
            </address>
          </div>
        </li>
      ))}
    </ul>
  );
}

export default CommentList;
