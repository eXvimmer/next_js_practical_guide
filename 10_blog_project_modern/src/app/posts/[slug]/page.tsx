import PostContent from "@/components/posts/post-detail/post-content";
import { getPostData } from "@/lib/post-util";

export const revalidate = 600;

function PostsDetailPage({ params: { slug } }: { params: { slug: string } }) {
  const post = getPostData(slug);

  return (
    <>
      <PostContent post={post} />
    </>
  );
}

export default PostsDetailPage;
