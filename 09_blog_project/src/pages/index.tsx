import FeaturedPosts from "@/components/home-page/featured-posts";
import Hero from "@/components/home-page/hero";
import type { Post } from "@/types";

// TODO: get real posts from database
const dummy_posts: Post[] = [
  {
    title: "Getting started with NextJS",
    slug: "getting-started-with-nextjs",
    image: "getting-started-nextjs.png",
    excerpt: "NextJS is a React framework for production",
    date: "2023-12-02",
  },
  {
    title: "Getting started with NextJS1",
    slug: "getting-started-with-nextjs",
    image: "getting-started-nextjs.png",
    excerpt: "NextJS is a React framework for production",
    date: "2023-12-02",
  },
  {
    title: "Getting started with NextJS2",
    slug: "getting-started-with-nextjs",
    image: "getting-started-nextjs.png",
    excerpt: "NextJS is a React framework for production",
    date: "2023-12-02",
  },
  {
    title: "Getting started with NextJS3",
    slug: "getting-started-with-nextjs",
    image: "getting-started-nextjs.png",
    excerpt: "NextJS is a React framework for production",
    date: "2023-12-02",
  },
  {
    title: "Getting started with NextJS4",
    slug: "getting-started-with-nextjs",
    image: "getting-started-nextjs.png",
    excerpt: "NextJS is a React framework for production",
    date: "2023-12-02",
  },
];

export default function Home() {
  return (
    <>
      <Hero />
      <FeaturedPosts posts={dummy_posts} />
    </>
  );
}
