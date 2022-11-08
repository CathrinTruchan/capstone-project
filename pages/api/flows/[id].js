import dbConnect from "../../../lib/dbConnect";
import Flow from "../../../models/Flow";
import { getFlowById } from "../../../services/flowService";

export default async function handler(request, response) {
  const { id } = request.query;
  await dbConnect();

  if (request.method === "GET") {
    const flow = await getFlowById(id);
    return response.status(201).json(flow);
  } else if (request.method === "PUT") {
    const updatedData = JSON.parse(request.body);
    const updatedFlow = await Flow.findByIdAndUpdate(id, updatedData);
    return response
      .status(200)
      .json({ message: "Flow updated", updatedFlow: updatedFlow.name });
  }
  return response.status(405).json({ message: "HTTP method is not allowed" });
}
