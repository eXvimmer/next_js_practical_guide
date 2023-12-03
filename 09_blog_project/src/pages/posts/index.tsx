import AllPosts from "@/components/posts/all-posts";
import { getAllPosts } from "@/lib/posts-util";
import { GetStaticProps, InferGetStaticPropsType } from "next";
import Head from "next/head";

function AllPostsPage({
  posts,
}: InferGetStaticPropsType<typeof getStaticProps>) {
  return (
    <>
      <Head>
        <title>All posts</title>
        <meta
          name="description"
          content="see all my posts about programming, web development, cyber security and trading"
        />
      </Head>
      <AllPosts posts={posts} />
    </>
  );
}

export default AllPostsPage;

export const getStaticProps = (async () => {
  return {
    props: {
      posts: getAllPosts(),
    },
  };
}) satisfies GetStaticProps;
