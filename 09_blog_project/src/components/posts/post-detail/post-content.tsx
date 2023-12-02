import PostHeader from "./post-header";
import Image from "next/legacy/image";
import styles from "./post-content.module.css";
import ReactMarkdown from "react-markdown";
import type { PostData } from "@/types";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { materialOceanic } from "react-syntax-highlighter/dist/cjs/styles/prism";

function PostContent({ post }: { post: PostData }) {
  const imagePath = `/images/posts/${post.slug}/${post.image}`;

  const customRenderers = {
    // @ts-ignore
    p(paragraph) {
      if (paragraph.node?.children[0]?.tagName === "img") {
        const image = paragraph.node.children[0];
        return (
          <div className={styles.image}>
            <Image
              src={`/images/posts/${post.slug}/${image.properties.src}`}
              alt={image.alt}
              width={600}
              height={300}
              priority={false}
            />
          </div>
        );
      }
      return <p>{paragraph.children}</p>;
    },
    // @ts-ignore
    code(code) {
      const { className, children } = code;
      const language = className.split("-")[1]; // className is something like language-js => We need the "js" part here
      return (
        <SyntaxHighlighter style={materialOceanic} language={language}>
          {children}
        </SyntaxHighlighter>
      );
    },
  };

  return (
    <article className={styles.content}>
      <PostHeader title={post.title} image={imagePath} />
      <ReactMarkdown components={customRenderers}>{post.content}</ReactMarkdown>
    </article>
  );
}

export default PostContent;
