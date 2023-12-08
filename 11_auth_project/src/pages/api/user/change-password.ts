import supabase from "@/db";
import { hashPassword, verifyPassword } from "@/lib/auth";
import { NextApiRequest, NextApiResponse } from "next";
import { getSession } from "next-auth/react";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  switch (req.method) {
    // TODO: send a password reset token first
    case "PATCH":
      try {
        const session = await getSession({ req });
        if (!session) {
          return res.status(401).json({
            success: false,
            message: "not authenticated",
          });
        }
        const {
          oldPassword,
          newPassword,
        }: { oldPassword?: string; newPassword?: string } = req.body;
        if (!oldPassword || !newPassword) {
          return res.status(400).json({
            success: false,
            message: "email and password should be provided",
          });
        } else if (newPassword.length < 8) {
          return res.status(400).json({
            success: false,
            message: "password should be at least 8 characters long",
          });
        }
        // TODO: sanitize newPassword
        const email = session.user?.email;
        if (!email) {
          return res.status(400).json({
            success: false,
            message: "email value is missing",
          });
        }
        const { data: user, error } = await supabase
          .from("users")
          .select()
          .eq("email", email)
          .single();
        if (error || !user) {
          return res.status(404).json({
            success: false,
            message: "user not found",
          });
        }
        if (!(await verifyPassword(oldPassword, user.password))) {
          return res.status(403).json({
            success: false,
            message: "password is incorrect",
          });
        }
        const updatedResult = await supabase
          .from("users")
          .update({ password: await hashPassword(newPassword) })
          .eq("email", email);
        if (updatedResult.error) {
          return res.status(500).json({
            success: false,
            message: "something went wrong",
          });
        }
        return res.status(204).json({
          success: true,
          message: "password updated successfully",
        });
      } catch (err) {
        console.error(err);
        return res.status(500).json({
          success: false,
          message: "something went wrong",
        });
      }

    default:
      res.status(405).setHeader("Allow", "PATCH").json({
        success: false,
        message: "method not allowed",
      });
      break;
  }
}
