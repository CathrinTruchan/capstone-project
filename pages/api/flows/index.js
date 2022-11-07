import dbConnect from "../../../lib/dbConnect";
import Flow from "../../../models/Flow";
import { getAllFlows } from "../../../services/flowService";

export default async function handler(request, response) {
  if (request.method === "GET") {
    const flows = await getAllFlows();
    return response.status(200).json(flows);
  } else if (request.method === "POST") {
    await dbConnect();

    const postData = JSON.parse(request.body);
    const newFlow = await Flow.create(postData);

    return response
      .status(201)
      .json({ message: "Flow created", createdId: newFlow.id });
  }

  return response.status(405).json({ message: "HTTP method is not allowed" });
}
