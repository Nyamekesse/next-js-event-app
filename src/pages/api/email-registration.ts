import type { NextApiRequest, NextApiResponse } from "next";
import path from "path";
import fs from "fs";
import { Data } from "../../../shared/types";

function buildPath() {
  return path.join(process.cwd(), "data", "data.json");
}

function extractData(filePath: string) {
  const jsonData = fs.readFileSync(filePath);
  const data = JSON.parse(jsonData.toString());
  console.log(data);

  return data;
}

const handler = (req: NextApiRequest, res: NextApiResponse) => {
  const { method } = req;

  const filePath = buildPath();
  const { events_categories, allEvents } = extractData(filePath);

  if (!allEvents)
    return res
      .status(404)
      .json({ status: "404", message: "Events data not found" });

  switch (method) {
    case "POST":
      const { email, eventId } = req.body;

      if (!email || !email.includes("@")) {
        res.status(422).json({ message: "Invalid email address" });
      }

      const newAllEvents = allEvents.map((event: Data) => {
        if (event.id === eventId) {
          if (event.emails_registered.includes(email)) {
            res
              .status(409)
              .json({ message: "This email has already been registered" });
            return event;
          }
          return {
            ...event,
            emails_registered: [...event.emails_registered, email],
          };
        }
        return event;
      });

      fs.writeFileSync(
        filePath,
        JSON.stringify({ events_categories, allEvents: newAllEvents })
      );
      res.status(200).json({
        message: `user has been successfully registered with email ${email} ${eventId}`,
      });
      break;

    default:
      break;
  }
};

export default handler;
