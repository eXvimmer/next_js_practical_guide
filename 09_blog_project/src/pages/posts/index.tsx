import AllPosts from "@/components/posts/all-posts";
import { getAllPosts } from "@/lib/posts-util";
import { GetStaticProps, InferGetStaticPropsType } from "next";

function AllPostsPage({
  posts,
}: InferGetStaticPropsType<typeof getStaticProps>) {
  return <AllPosts posts={posts} />;
}

export default AllPostsPage;

export const getStaticProps = (async () => {
  return {
    props: {
      posts: getAllPosts(),
    },
  };
}) satisfies GetStaticProps;
