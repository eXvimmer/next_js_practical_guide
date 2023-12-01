"use server";

import supabase from "@/services/supabase";
import { revalidatePath } from "next/cache";

export async function subscribeToNewsletter(
  _formState: { message: string; success: boolean },
  formData: FormData,
) {
  const email = formData.get("email");
  if (!email) {
    return {
      message: "You should provide an email address",
      success: false,
    };
  }
  const { error } = await supabase
    .from("newsletter")
    .insert({ email: email.toString() });
  if (error) {
    return {
      message: error.message.includes("duplicate")
        ? "This email address is already subscribed"
        : "Something went wrong",
      success: false,
    };
  }
  return {
    message: "Thank you for subscribing to our newsletter!",
    success: true,
  };
}

export async function createComment(
  _prevState: { message: string; success: boolean },
  formData: FormData,
) {
  "use server";
  const email = formData.get("email");
  const text = formData.get("text");
  const username = formData.get("username");
  const id = formData.get("event-id");
  if (!email || !text || !username || !id) {
    return {
      message: "Please fill in the fields",
      success: false,
    };
  }
  const { error } = await supabase.from("comments").insert({
    email: email.toString(),
    text: text.toString(),
    username: username.toString(),
    event_id: id.toString(),
  });
  if (error) {
    return {
      message: "Something went wrong",
      success: false,
    };
  }
  return {
    message: "Comment created",
    success: true,
  };
}
