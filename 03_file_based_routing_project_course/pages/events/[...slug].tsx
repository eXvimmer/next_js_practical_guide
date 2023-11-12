import { useRouter } from "next/router";

export default function FilteredEventsPage() {
  const router = useRouter();
  const { slug } = router.query;

  return (
    <div>
      <h1>Event slug</h1>
      <ul>
        {Array.isArray(slug) ? slug.map((s) => <li key={s}>{s}</li>) : slug}
        {/* {slug} */}
      </ul>
    </div>
  );
}
