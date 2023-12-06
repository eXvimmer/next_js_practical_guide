import React from "react";
import AllPosts from "@/components/posts/all-posts";
import { getAllPosts } from "@/lib/post-util";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "All posts",
  description:
    "see all my posts about programming, web development, cyber security and trading",
};

function PostsPage() {
  const posts = getAllPosts();

  return <AllPosts posts={posts} />;
}

export default PostsPage;
