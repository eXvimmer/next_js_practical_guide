import PostsGrid from "../posts/posts-grid";
import styles from "./featured-posts.module.css";

function FeaturedPosts() {
  return (
    <section className={styles.latest}>
      <h2>Featured Posts</h2>
      <PostsGrid posts={[]} /> {/* TODO: add posts */}
    </section>
  );
}

export default FeaturedPosts;
