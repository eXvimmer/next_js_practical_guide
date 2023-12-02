import PostContent from "@/components/posts/post-detail/post-content";
import { getPostData, getPostsFiles } from "@/lib/posts-util";
import { GetStaticPaths, GetStaticProps, InferGetStaticPropsType } from "next";

function PostsDetailPage({
  post,
}: InferGetStaticPropsType<typeof getStaticProps>) {
  return <PostContent post={post} />;
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
