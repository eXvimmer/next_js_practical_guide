import type { Post } from "@/types";
import PostsGrid from "../posts/posts-grid";
import styles from "./featured-posts.module.css";

function FeaturedPosts({ posts }: { posts: Post[] }) {
  return (
    <section className={styles.latest}>
      <h2>Featured Posts</h2>
      <PostsGrid posts={posts} />
    </section>
  );
}

export default FeaturedPosts;
