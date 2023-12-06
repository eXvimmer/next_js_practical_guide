import Link from "next/link";
import Image from "next/image";
import styles from "./post-item.module.css";
import type { Post } from "@/types";

function PostItem({
  post: { title, image, excerpt, date, slug },
}: {
  post: Post;
}) {
  const imagePath = `/images/posts/${slug}/${image}`;
  const formattedDate = new Date(date).toLocaleDateString("en-US", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
  return (
    <li className={styles.post}>
      <Link href={`/posts/${slug}`}>
        <div className={styles.image}>
          <Image
            src={imagePath}
            alt={title}
            width={300}
            height={200}
            style={{
              width: "100%",
              height: "auto",
            }}
          />
        </div>
        <div className={styles.content}>
          <h3>{title}</h3>
          <time>{formattedDate}</time>
          <p>{excerpt}</p>
        </div>
      </Link>
    </li>
  );
}

export default PostItem;
