import { GetStaticProps, InferGetStaticPropsType } from "next";
import path from "path";
import fs from "fs/promises";

interface Product {
  id: string;
  title: string;
  description: string;
}

export default function Home({
  products,
}: InferGetStaticPropsType<typeof getStaticProps>) {
  return (
    <ul>
      {products.map((p) => (
        <li key={p.id}>{p.title}</li>
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
