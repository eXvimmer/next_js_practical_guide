import { NextApiRequest, NextApiResponse } from "next";
import path from "path";
import fs from "fs";
import crypto from "crypto";

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === "POST") {
    const { email, text }: { email?: string; text?: string } = req.body;
    if (!email || !text) {
      return res
        .status(400)
        .json({ message: "email and feedback text are required" });
    }
    const newFeedback = {
      id: crypto.randomUUID(),
      email,
      text,
    };
    const filePath = path.join(process.cwd(), "data", "feedback.json");
    const buffer = fs.readFileSync(filePath);
    const data = JSON.parse(buffer);
    data.push(newFeedback);
    fs.writeFileSync(filePath, JSON.stringify(data));
    return res.status(201).json({ message: "success", feedback: newFeedback });
  }
  res.setHeader("Allow", "POST");
  return res.status(405).json({ message: "method not allowed" });
}
