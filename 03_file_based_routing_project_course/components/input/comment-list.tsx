import { Comment } from "@/types";
import styles from "./comment-list.module.css";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";

function CommentList() {
  const [comments, setComments] = useState<Comment[]>([]);
  const router = useRouter();
  const id = router.query.id as string;

  useEffect(() => {
    if (!comments.length) {
      fetch(`/api/events/${id}/comments`)
        .then((res) => res.json())
        .then((data) => {
          if (data.success) {
            setComments(data.comments);
          }
        });
    }
  }, [comments.length, id]);

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
