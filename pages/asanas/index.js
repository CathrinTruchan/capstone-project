/* import { getAllAsanas } from "../../services/asanaService";

export async function getServerSideProps() {
  const asanas = await getAllAsanas();

  return {
    props: { asanas: asanas },
  };
} */

import { getAllFlows } from "../../services/flowService";
import FlowCard from "/components/FlowCard";

export async function getServerSideProps() {
  const flows = await getAllFlows();
  return {
    props: { flows: flows },
  };
}

export default function AsanasTest({ flows }) {
  
  
  async function handleFlowPost(flowData) {
    try {
      const response = await fetch("/api/flows", {
        method: "POST",
        body: JSON.stringify(flowData),
      });
      console.log(data);
      const result = await response.json();
      console.log(result);
      if (result.createdId) {
        alert("Flow has been created");
      } else {
        alert("Creating a flow did not work!!");
      }
    } catch (error) {
      console.error(error);
    }
    setOpenForm(false);
  }
  
  console.log(flows);
  return (
    <>
      {flows.map((flow) => (
        <FlowCard
          key={flow.id}
          name={flow.name}
          hours={flow.hours}
          minutes={flow.minutes}
        />
      ))}
    </>
  );
}
