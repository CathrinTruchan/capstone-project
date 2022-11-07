import dbConnect from "../lib/dbConnect";
import Flow from "../models/Flow";

export async function getAllFlows() {
  await dbConnect();

  const flows = await Flow.find();
  console.log(flows);
  console.log("test");
  const sanatizedFlows = flows.map((flow) => ({
    id: flow._id,
    name: flow.name,
    description: flow.description,
    hours: flow.duration.hours,
    minutes: flow.duration.minutes,
    asanas: flow.asanas,
  }));

  return JSON.parse(JSON.stringify(sanatizedFlows));
}

export async function getFlowById(id) {
  await dbConnect();
  const flows = await Flow.find();
  const flow = flows.find((flow) => flow.id === id);

  const sanitizedFlow = {
    id: flow._id,
    name: flow.name,
    description: flow.description,
    hours: flow.duration.hours,
    minutes: flow.duration.minutes,
    asanas: flow.asanas,
  };
  return JSON.parse(JSON.stringify(sanitizedFlow));
}
