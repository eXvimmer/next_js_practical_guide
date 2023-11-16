import { GetStaticPaths, GetStaticProps, InferGetStaticPropsType } from "next";
import { getData } from "@/lib/products";

export default function ProductDetailPage({
  product,
}: InferGetStaticPropsType<typeof getStaticProps>) {
  return (
    <>
      <h1>{product.title}</h1>
      <p>{product.description}</p>
    </>
  );
}

export const getStaticPaths = (async () => {
  const data = await getData();
  const ids = data.products.map((p) => p.id);
  const paths = ids.map((id) => ({ params: { pid: id } }));
  return {
    paths,
    fallback: false,
  };
}) satisfies GetStaticPaths;

export const getStaticProps = (async ({ params }) => {
  const productId = Array.isArray(params?.pid) ? params?.pid[0] : params?.pid;
  if (!productId) {
    return {
      notFound: true,
    };
  }
  const data = await getData();
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
