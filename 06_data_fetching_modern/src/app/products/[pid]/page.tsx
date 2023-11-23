import { getData } from "@/lib/products";
import { notFound } from "next/navigation";

export default async function ProductDetailPage({
  params,
}: {
  params: { pid: string };
}) {
  const data = await getData();
  const product = data.products.find((p) => p.id === params.pid);

  if (!params.pid || !product) {
    notFound();
  }

  return (
    <>
      <h1>{product.title}</h1>
      <p>{product.description}</p>
    </>
  );
}
