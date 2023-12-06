import styles from "./all-posts.module.css";
import { Post } from "@/types";
import PostsGrid from "./posts-grid";

export default function AllPosts({ posts }: { posts: Post[] }) {
  return (
    <section className={styles.posts}>
      <h1>All Posts</h1>
      <PostsGrid posts={posts} />
    </section>
  );
}
