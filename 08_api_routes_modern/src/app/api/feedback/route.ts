import { db } from "@/db";

export async function GET() {
  return new Response(
    JSON.stringify({
      data: await db.feedback.findMany(),
    }),
  );
}

export async function POST(req: Request) {
  try {
    const { email, text }: { email?: string; text?: string } = await req.json();
    if (!email || !text) {
      return new Response(
        JSON.stringify({
          success: false,
          error: "email and text fields are required",
          feedback: null,
        }),
        { status: 400 },
      );
    }
    const data = await db.feedback.create({
      data: { email, text },
    });
    return new Response(
      JSON.stringify({
        success: true,
        error: "",
        feedback: data,
      }),
      { status: 201 },
    );
  } catch (err) {
    console.error(err);
    return new Response(
      JSON.stringify({
        success: false,
        error: err instanceof Error ? err.message : err,
        feedback: null,
      }),
      { status: 500 },
    );
  }
}
