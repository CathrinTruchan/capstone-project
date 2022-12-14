import dbConnect from "../../../lib/dbConnect";
import Flow from "../../../models/Flow";
import { getFlowById } from "../../../services/flowService";
import { unstable_getServerSession } from "next-auth/next";
import { authOptions } from "../auth/[...nextauth]";

export default async function handler(request, response) {
  const { id } = request.query;
  const session = await unstable_getServerSession(
    request,
    response,
    authOptions
  );
  await dbConnect();

  if (request.method === "GET") {
    if (session) {
      const flow = await getFlowById(id, session.user.email);
      return response.status(201).json(flow);
    } else return response.status(401).json({ message: "Unauthorized" });
  } else if (request.method === "PUT") {
    if (session) {
      const updatedData = JSON.parse(request.body);
      const updatedFlow = await Flow.findByIdAndUpdate(id, updatedData);
      return response
        .status(200)
        .json({ message: "Flow updated", name: updatedFlow.name });
    } else {
      return response.status(401).json({ message: "Unauthorized" });
    }
  } else if (request.method === "PATCH") {
    if (session) {
      const updatedData = JSON.parse(request.body);

      const updatedFlow = await Flow.findByIdAndUpdate(
        { _id: updatedData.id },
        {
          name: updatedData.name,
          duration: {
            hours: updatedData.duration.hours,
            minutes: updatedData.duration.minutes,
          },
        }
      );

      return response.status(200).json({
        message: "Flow updated",
        name: updatedFlow.name,
        id: updatedFlow.id,
      });
    } else {
      return response.status(401).json({ message: "Unauthorized" });
    }
  } else if (request.method === "DELETE") {
    if (session) {
      const idToDelete = JSON.parse(request.body);
      await Flow.findByIdAndDelete(idToDelete);
      return response
        .status(200)
        .json({ message: "Flow deleted", id: idToDelete });
    } else {
      return response.status(401).json({ message: "Unauthorized" });
    }
  }
  return response.status(405).json({ message: "HTTP method is not allowed" });
}
