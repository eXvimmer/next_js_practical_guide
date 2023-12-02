import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { PostData } from "@/types";

const postsDirectory = path.join(process.cwd(), "src", "posts");

function getPostData(fileName: string) {
  const filePath = path.join(postsDirectory, fileName);
  const fileContent = fs.readFileSync(filePath, "utf-8");
  const { data, content } = matter(fileContent);
  return {
    slug: fileName.replace(/.md$/, ""),
    content,
    ...data,
  } as PostData;
}

export function getAllPosts() {
  return fs
    .readdirSync(postsDirectory)
    .map((file) => getPostData(file))
    .sort((a, b) => (a.date > b.date ? -1 : 1));
}

export function getFeaturedPosts() {
  return getAllPosts().filter((post) => post.isFeatured);
}
