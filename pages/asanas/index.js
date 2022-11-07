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
