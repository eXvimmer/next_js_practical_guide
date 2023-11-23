import Link from "next/link";
import { getData } from "@/lib/products";

export default async function Home() {
  const { products } = await getData();

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
