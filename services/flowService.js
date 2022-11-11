import dbConnect from "../lib/dbConnect";
import Flow from "../models/Flow";

export async function getAllFlows(author) {
  await dbConnect();

  const flows = await Flow.find();
  const flowsByAuthor = flows.filter((flow) => author === flow.author);

  const sanatizedFlows = flowsByAuthor.map((flow) => ({
    id: flow._id,
    name: flow.name,
    description: flow.description,
    hours: flow.duration.hours,
    minutes: flow.duration.minutes,
    asanas: flow.asanas,
    author: flow.author,
  }));

  return JSON.parse(JSON.stringify(sanatizedFlows));
}

export async function getFlowById(id, author) {
  await dbConnect();

  const flow = await Flow.findById(id);

  const sanitizedFlow = {
    id: flow._id,
    name: flow.name,
    description: flow.description,
    hours: flow.duration.hours,
    minutes: flow.duration.minutes,
    asanas: flow.asanas,
    author: flow.author,
  };
  if (author === flow.author) {
    return JSON.parse(JSON.stringify(sanitizedFlow));
  } else return {};
}
