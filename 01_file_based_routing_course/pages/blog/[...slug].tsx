import { useRouter } from "next/router";

export default function BlogPostsPage() {
  const router = useRouter();
  console.log(router.query); // visit /blog/2023/11, slug will be ["2023", "11"]

  return (
    <div>
      <h1>Blog Posts Page</h1>
    </div>
  );
}
