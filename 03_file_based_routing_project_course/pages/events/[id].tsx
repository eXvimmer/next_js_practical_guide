import { useRouter } from "next/router";

export default function EventDetailPage() {
  const router = useRouter();
  const id = router.query.id;

  return (
    <div>
      <h1>Event Item #{Array.isArray(id) ? id[0] : id}</h1>
    </div>
  );
}
