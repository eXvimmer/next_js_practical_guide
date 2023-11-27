import { db } from "@/db";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export async function handleFormSubmission(formData: FormData) {
  "use server";
  try {
    const email = formData.get("email");
    const text = formData.get("text");
    if (!email || !text) {
      return;
    }
    await db.feedback.create({
      data: { email: email.toString(), text: text.toString() },
    });
  } catch (err) {
    console.error(err);
  }
  revalidatePath("/feedback");
  redirect("/feedback");
}

export default async function Home() {
  return (
    <div>
      <h1>Home page</h1>
      <form action={handleFormSubmission}>
        <div>
          <label htmlFor="email">Email</label>
          <input type="email" name="email" id="email" required />
        </div>
        <div>
          <label htmlFor="text">Feedback</label>
          <textarea name="text" id="text" rows={5} required />
        </div>
        <button type="submit">Send feedback</button>
      </form>
    </div>
  );
}
