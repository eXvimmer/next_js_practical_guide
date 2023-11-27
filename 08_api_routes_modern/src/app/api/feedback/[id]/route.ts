import { db } from "@/db";

export async function GET(_req: Request, context: { params: { id: string } }) {
  const { id } = context.params;
  const data = await db.feedback.findFirst({
    where: {
      id: parseInt(id),
    },
  });
  if (!data) {
    return new Response(
      JSON.stringify({
        success: false,
        error: "not found",
        feedback: null,
      }),
      { status: 404 },
    );
  }
  return new Response(
    JSON.stringify({
      success: true,
      error: "",
      feedback: data,
    }),
    { status: 200 },
  );
}
