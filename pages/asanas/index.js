/* import { getAllAsanas } from "../../services/asanaService";

export async function getServerSideProps() {
  const asanas = await getAllAsanas();

  return {
    props: { asanas: asanas },
  };
} */

import { getAllFlows } from "../../services/flowService";

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
      <p>Test</p>
      <p>{flows[0].name}</p>
      <p>{flows[0].hours}</p>
      <p>{flows[0].minutes}</p>
    </>
  );
}
