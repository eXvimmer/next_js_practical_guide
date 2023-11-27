import { NextApiRequest, NextApiResponse } from "next";
import path from "path";
import fs from "fs";
import crypto from "crypto";

const filePath = path.join(process.cwd(), "data", "feedback.json");

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  const buffer = fs.readFileSync(filePath);
  const data = JSON.parse(buffer);
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
    data.push(newFeedback);
    fs.writeFileSync(filePath, JSON.stringify(data));
    return res.status(201).json({ message: "success", feedback: newFeedback });
  } else {
    return res.status(200).json({ feedback: data });
  }
}
