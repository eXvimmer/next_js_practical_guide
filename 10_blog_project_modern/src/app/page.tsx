import Hero from "@/components/home-page/Hero";
import FeaturedPosts from "@/components/home-page/featured-posts";
import { getFeaturedPosts } from "@/lib/post-util";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Home",
  description:
    "I post about web development, programming, cyber security and trading",
};

export default function Home() {
  const posts = getFeaturedPosts();

  return (
    <>
      <Hero />
      <FeaturedPosts posts={posts} />
    </>
  );
}
