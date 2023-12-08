import supabase from "@/db";
import { hashPassword } from "@/lib/auth";
import { NextApiRequest, NextApiResponse } from "next";

async function handler(req: NextApiRequest, res: NextApiResponse) {
  switch (req.method) {
    case "POST":
      try {
        const { email, password }: { email?: string; password?: string } =
          req.body;
        if (!email || !email.includes("@")) {
          res.status(422).json({
            success: false,
            message: "invalid email",
          });
          return;
        }
        if (!password || password.length < 8) {
          res.status(422).json({
            success: false,
            message:
              "invalid password, password should be at least 8 characters long",
          });
          return;
        }
        const hashedPassword = await hashPassword(password);
        const { error } = await supabase
          .from("users")
          .insert({ email, password: hashedPassword });
        res.status(error ? 400 : 201).json({
          success: !error,
          message: error
            ? error.message.toLowerCase().includes("duplicate")
              ? "user already exist"
              : error.message
            : "user created",
        });
      } catch (err) {
        res.status(500).json({
          success: false,
          message: err instanceof Error ? err.message : "something went wrong",
        });
      }
      break;
    default:
      res.status(405).setHeader("Allow", "POST").json({
        success: false,
        message: "method not allowed",
      });
  }
}

export default handler;
