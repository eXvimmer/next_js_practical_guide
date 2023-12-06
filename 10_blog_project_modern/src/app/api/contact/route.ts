import supabase from "@/db";

export async function POST(req: Request) {
  const {
    email,
    name,
    message,
  }: { email?: string; name?: string; message?: string } = await req.json();
  if (
    !email ||
    !name ||
    !message ||
    !email.includes("@") ||
    name.trim() === "" ||
    message.trim() === ""
  ) {
    // return new Response(
    //   JSON.stringify({
    //     success: false,
    //     message: "invalid input",
    //   }),
    //   { status: 422 },
    // );
    return Response.json(
      {
        success: false,
        message: "invalid input",
      },
      { status: 422 },
    );
  }
  try {
    const { error } = await supabase.from("messages").insert({
      email,
      name,
      message,
    });
    return new Response(
      JSON.stringify({
        success: !error,
        message: error ? error.message : "message stored successfully",
      }),
      { status: error ? 500 : 201 },
    );
  } catch (error) {
    return new Response(
      JSON.stringify({
        success: false,
        message:
          error instanceof Error ? error.message : "something went wrong",
      }),
      { status: 500 },
    );
  }
}
