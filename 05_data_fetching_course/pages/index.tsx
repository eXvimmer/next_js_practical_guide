import { GetStaticProps, InferGetStaticPropsType } from "next";

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
  return {
    props: {
      products: [
        { id: 1, title: "Product 1" },
        { id: 2, title: "Product 2" },
        { id: 3, title: "Product 3" },
      ],
    },
  };
}) satisfies GetStaticProps;
