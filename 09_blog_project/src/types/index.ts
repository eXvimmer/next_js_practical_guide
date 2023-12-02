export interface Post {
  title: string;
  image: string;
  date: string;
  slug: string;
  excerpt: string;
  isFeatured: boolean;
}

export interface PostData extends Post {
  slug: string;
  content: string;
}
