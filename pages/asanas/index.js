import { getAllAsanas } from "../../services/asanaService";

export async function getServerSideProps() {
  const asanas = await getAllAsanas();

  return {
    props: { asanas: asanas },
  };
}

export default function AsanasTest({ asanas }) {
  console.log(asanas);
  return (
    <>
      <p>Test</p>
      {asanas.map((asana) => (
        <p key={asana.id}> {asana.english_name}</p>
      ))}
      <p>{asanas[0].english_name}</p>;
    </>
  );
}
