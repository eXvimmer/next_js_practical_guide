"use client";

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

  return (
    <section className={styles.comments}>
      <button onClick={toggleCommentsHandler}>
        {showComments ? "Hide" : "Show"} Comments
      </button>
      {showComments && <NewComment eventId={eventId} />}
      {showComments && <CommentList />}
    </section>
  );
}

export default Comments;
