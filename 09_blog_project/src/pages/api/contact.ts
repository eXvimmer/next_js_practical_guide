import { NextApiRequest, NextApiResponse } from "next";

export default function handler(req: NextApiRequest, res: NextApiResponse) {
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
            data: null,
          });
          return;
        }
        // TODO: store data in database
        const newMessage = { email, name, message };
        console.log(newMessage);
        res.status(201).json({
          success: true,
          message: "message stored successfully",
          data: newMessage,
        });
      }
      break;

    default: {
      res.status(405).json({
        success: false,
        message: "method not allowed",
        data: null,
      });
    }
  }
}
