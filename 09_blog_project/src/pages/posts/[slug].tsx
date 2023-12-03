import PostContent from "@/components/posts/post-detail/post-content";
import { getPostData, getPostsFiles } from "@/lib/posts-util";
import { GetStaticPaths, GetStaticProps, InferGetStaticPropsType } from "next";
import Head from "next/head";

function PostsDetailPage({
  post,
}: InferGetStaticPropsType<typeof getStaticProps>) {
  return (
    <>
      <Head>
        <title>{post.title}</title>
        <meta name="description" content={post.excerpt} />
      </Head>
      <PostContent post={post} />
    </>
  );
}

export default PostsDetailPage;

export const getStaticPaths = (async () => {
  return {
    paths: getPostsFiles().map((file) => ({
      params: { slug: file.replace(/\.md$/, "") },
    })),
    fallback: false,
  };
}) satisfies GetStaticPaths;

export const getStaticProps = (async (context) => {
  const slug = context.params?.slug as string;
  return {
    props: {
      post: getPostData(slug),
    },
    revalidate: 600, // every 10 minutes
  };
}) satisfies GetStaticProps;
