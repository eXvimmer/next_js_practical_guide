import PostHeader from "./post-header";
import styles from "./post-content.module.css";
// import type { Post } from "@/types";

const dummyPost = {
  title: "Getting started with NextJS",
  slug: "getting-started-with-nextjs",
  image: "getting-started-nextjs.png",
  // excerpt: "NextJS is a React framework for production",
  date: "2023-12-02",
  content: "# This is the first post",
};

function PostContent() {
  const imagePath = `/images/posts/${dummyPost.slug}/${dummyPost.image}`;

  return (
    <article className={styles.content}>
      <PostHeader title={dummyPost.title} image={imagePath} />
      {dummyPost.content}
    </article>
  );
}

export default PostContent;
