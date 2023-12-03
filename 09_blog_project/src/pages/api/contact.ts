import supabase from "@/db";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  switch (req.method) {
    case "POST":
      {
        const { email, name, message }: Record<string, string> = req.body;
        if (
          !email ||
          !name ||
          !message ||
          !email.includes("@") ||
          name.trim() === "" ||
          message.trim() === ""
        ) {
          res.status(422).json({
            success: false,
            message: "invalid input",
          });
          return;
        }
        try {
          const { error } = await supabase.from("messages").insert({
            email,
            name,
            message,
          });
          res.status(error ? 500 : 201).json({
            success: !error,
            message: error ? error.message : "message stored successfully",
          });
          return;
        } catch (error) {
          res.status(500).json({
            success: false,
            message:
              error instanceof Error ? error.message : "something went wrong",
          });
        }
      }
      break;
    default: {
      res.setHeader("Allow", "POST");
      res.status(405).json({
        success: false,
        message: "method not allowed",
        data: null,
      });
    }
  }
}
