import type { Post } from "@/types";
import PostItem from "./post-item";
import styles from "./posts-grid.module.css";

function PostsGrid({ posts }: { posts: Post[] }) {
  return (
    <ul className={styles.grid}>
      {posts.map((post) => (
        <PostItem key={post.slug} post={post} />
      ))}
    </ul>
  );
}

export default PostsGrid;
