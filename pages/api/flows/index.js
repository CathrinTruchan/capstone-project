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
  } else if (request.method === "PATCH") {
    await dbConnect();
    const updatedData = JSON.parse(request.body);
    console.log(updatedData);
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

    return response
      .status(200)
      .json({ message: "Flow updated", name: updatedFlow.name });
  } else if (request.method === "DELETE") {
    await dbConnect();
    const idToDelete = JSON.parse(request.body);
    await Flow.findByIdAndDelete(idToDelete);
    return response
      .status(200)
      .json({ message: "Flow deleted", id: idToDelete });
  }

  return response.status(405).json({ message: "HTTP method is not allowed" });
}
