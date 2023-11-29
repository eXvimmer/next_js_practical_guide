import supabase from "@/services/supabase";

export async function GET(req: Request, context: { params: { id: string } }) {
  const id = context.params.id;
  const { data: comments, error } = await supabase
    .from("comments")
    .select()
    .eq("event_id", id);
  return new Response(
    JSON.stringify({
      success: !error,
      comments: error ? [] : comments,
    }),
    {
      status: error ? 404 : 200,
      headers: {
        "Content-Type": "application/json",
      },
    },
  );
}
