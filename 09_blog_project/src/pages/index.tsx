import FeaturedPosts from "@/components/home-page/featured-posts";
import Hero from "@/components/home-page/hero";
import { getFeaturedPosts } from "@/lib/posts-util";
import { GetStaticProps, InferGetStaticPropsType } from "next";
import Head from "next/head";

export default function Home({
  posts,
}: InferGetStaticPropsType<typeof getStaticProps>) {
  return (
    <>
      <Head>
        <title>Welcome to my blog</title>
        <meta
          name="description"
          content="I post about general web development, programming, cyber security and trading"
        />
      </Head>
      <Hero />
      <FeaturedPosts posts={posts} />
    </>
  );
}

export const getStaticProps = (async () => {
  return {
    props: {
      posts: getFeaturedPosts(),
    },
    // revalidate: 1800, // every 30 minutes
  };
}) satisfies GetStaticProps;
