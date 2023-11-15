import { GetStaticProps, InferGetStaticPropsType } from "next";
import path from "path";
import fs from "fs/promises";
import { Product } from "@/types";
import Link from "next/link";

export default function Home({
  products,
}: InferGetStaticPropsType<typeof getStaticProps>) {
  return (
    <ul>
      {products.map((p) => (
        <Link href={p.id} key={p.id}>
          <li>{p.title}</li>
        </Link>
      ))}
    </ul>
  );
}

export const getStaticProps = (async (/* context */) => {
  const filePath = path.join(process.cwd(), "data", "dummy-backend.json");
  const content = await fs.readFile(filePath, { encoding: "utf8" });
  const data: { products: Product[] } = JSON.parse(content);

  return {
    props: {
      products: data.products,
    },
    revalidate: 10, // amount in seconds after which a page-regeneration can occur
  };
}) satisfies GetStaticProps;
