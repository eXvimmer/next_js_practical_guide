/*
✅
├── ✅ 404.tsx
├── ✅ about
│  └── ✅ index.tsx
├── ✅ blog
│  └── ✅ [...slug].tsx
├── ✅ clients
│  ├── ✅ [id]
│  │  ├── ✅ [clientprojectid].tsx
│  │  └── ✅ index.tsx
│  └── ✅ index.tsx
├── ✅ index.tsx
└── ✅ portfolio
  ├── ✅ [projectid].tsx
  ├── ✅ index.tsx
  └── ✅ list.tsx
*/

import Link from "next/link";

export default function Home() {
  return (
    <div>
      <h1>Home Page</h1>

      <ul>
        <li>
          <Link href="/about">About</Link>
        </li>
        <li>
          <Link href="/portfolio">Portfolio</Link>
        </li>
        <li>
          <Link href="/clients">Clients</Link>
        </li>
      </ul>
    </div>
  );
}
