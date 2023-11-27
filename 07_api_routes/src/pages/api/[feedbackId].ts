import { NextApiRequest, NextApiResponse } from "next";
import { extractFeedback } from "./feedback";

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  const data = extractFeedback();
  const feedbackId = req.query.feedbackId as string;
  const item = data.find((f) => f.id === feedbackId);
  if (!item) {
    return res.status(404).json({ feedback: null });
  }
  return res.status(200).json({ feedback: item });
}
