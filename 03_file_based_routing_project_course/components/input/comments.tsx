import { useState } from "react";

import CommentList from "./comment-list";
import NewComment from "./new-comment";
import styles from "./comments.module.css";
import { Comment } from "@/types";

function Comments({ eventId }: { eventId: string }) {
  const [showComments, setShowComments] = useState(false);

  function toggleCommentsHandler() {
    setShowComments((s) => !s);
  }

  function addCommentHandler(comment: Partial<Comment>) {
    fetch(`/api/events/${eventId}/comments`, {
      method: "POST",
      body: JSON.stringify(comment),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then(() => {
        setShowComments(false);
      });
  }

  return (
    <section className={styles.comments}>
      <button onClick={toggleCommentsHandler}>
        {showComments ? "Hide" : "Show"} Comments
      </button>
      {showComments && <NewComment onAddComment={addCommentHandler} />}
      {showComments && <CommentList />}
    </section>
  );
}

export default Comments;
