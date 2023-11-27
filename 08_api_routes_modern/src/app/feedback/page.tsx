import { db } from "@/db";

export default async function FeedbackPage() {
  const data = await db.feedback.findMany();

  return (
    <div>
      <ul>
        {data.map((f) => (
          <li key={f.id}>{f.text}</li>
        ))}
      </ul>
    </div>
  );
}
