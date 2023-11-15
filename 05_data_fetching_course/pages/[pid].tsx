import { GetStaticPaths, GetStaticProps, InferGetStaticPropsType } from "next";
import path from "path";
import fs from "fs/promises";
import { Product } from "@/types";

export default function ProductDetailPage({
  product,
}: InferGetStaticPropsType<typeof getStaticProps>) {
  // if (!product) {
  //   return <p>Loading...</p>;
  // }
  return (
    <>
      <h1>{product.title}</h1>
      <p>{product.description}</p>
    </>
  );
}

export const getStaticPaths = (async () => {
  return {
    paths: [
      { params: { pid: "p1" } },
      // { params: { pid: "p2" } },
      // { params: { pid: "p3" } },
    ],
    // fallback: true,
    fallback: "blocking",
  };
}) satisfies GetStaticPaths;

export const getStaticProps = (async ({ params }) => {
  const productId = Array.isArray(params?.pid) ? params?.pid[0] : params?.pid;
  if (!productId) {
    return {
      notFound: true,
    };
  }
  const filePath = path.join(process.cwd(), "data", "dummy-backend.json");
  const content = await fs.readFile(filePath, { encoding: "utf8" });
  const data: { products: Product[] } = JSON.parse(content);
  const product = data.products.find((p) => p.id === productId);
  if (!product) {
    return {
      notFound: true,
    };
  }
  return {
    props: {
      product,
    },
  };
}) satisfies GetStaticProps;
