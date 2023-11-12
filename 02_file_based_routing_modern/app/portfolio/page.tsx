import Link from "next/link";

export default function PortfolioPage() {
  return (
    <div>
      <h1>Portfolio Page</h1>

      <ul>
        <li>
          <Link href="/portfolio/list">List</Link>
        </li>
      </ul>
    </div>
  );
}
