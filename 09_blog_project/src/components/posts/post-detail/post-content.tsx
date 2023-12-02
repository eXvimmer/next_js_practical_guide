import PostHeader from "./post-header";
import styles from "./post-content.module.css";
import ReactMarkdown from "react-markdown";
import type { PostData } from "@/types";

function PostContent({ post }: { post: PostData }) {
  const imagePath = `/images/posts/${post.slug}/${post.image}`;

  return (
    <article className={styles.content}>
      <PostHeader title={post.title} image={imagePath} />
      <ReactMarkdown>{post.content}</ReactMarkdown>
    </article>
  );
}

export default PostContent;
