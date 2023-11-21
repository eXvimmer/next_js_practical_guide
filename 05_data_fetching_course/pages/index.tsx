import { GetStaticProps, InferGetStaticPropsType } from "next";
import Link from "next/link";
import { getData } from "@/lib/products";

export default function Home({
  products,
}: InferGetStaticPropsType<typeof getStaticProps>) {
  return (
    <ul>
      {products.map((p) => (
        <Link href={`/products/${p.id}`} key={p.id}>
          <li>{p.title}</li>
        </Link>
      ))}
    </ul>
  );
}

export const getStaticProps = (async (/* context */) => {
  const data = await getData();
  return {
    props: {
      products: data.products,
    },
    revalidate: 10, // amount in seconds after which a page-regeneration can occur
  };
}) satisfies GetStaticProps;
