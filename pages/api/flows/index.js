import dbConnect from "../../../lib/dbConnect";
import Flow from "../../../models/Flow";
import { getAllFlows } from "../../../services/flowService";
import { unstable_getServerSession } from "next-auth/next";
import { authOptions } from "../auth/[...nextauth]";

export default async function handler(request, response) {
  const session = await unstable_getServerSession(
    request,
    response,
    authOptions
  );

  await dbConnect();

  if (request.method === "GET") {
    if (session) {
      const flows = await getAllFlows(session.user.email);
      return response.status(200).json(flows);
    }
    {
      return response.status(401).json({ message: "Unauthorized" });
    }
  } else if (request.method === "POST") {
    if (session) {
      const data = JSON.parse(request.body);
      const postData = {
        ...data,
        author: session.user.email,
      };
      const newFlow = await Flow.create(postData);

      return response
        .status(201)
        .json({ message: "Flow created", createdId: newFlow.id });
    } else {
      return response.status(401).json({ message: "Unauthorized" });
    }
  } else
    return response.status(405).json({ message: "HTTP method is not allowed" });
}
