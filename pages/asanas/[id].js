import { getAsanaByID, getAllAsanas } from "../../db";
import Image from "next/image";

export async function getStaticPaths() {
  const asanas = await getAllAsanas();
  const ids = asanas.map((asana) => asana.id);
  return {
    paths: ids.map((id) => ({ params: { id: id } })),
    fallback: false,
  };
}

export async function getStaticProps(context) {
  const { id } = context.params;
  const asana = await getAsanaByID(id);
  return {
    props: { asana: asana },
  };
}

export default function Asana({ asana }) {
  return (
    <>
      <Image
        src={asana.img_url}
        alt={asana.english_name}
        width={230}
        height={230}
        layout="fixed"
      />
      <h2>{asana.english_name}</h2>
      <h3>{asana.sanskrit_name}</h3>
      <p>{asana.description}</p>
      <h4>Eignet sich für: </h4>
      <ul>
        {asana.level.map((item, index) => {
          return <li key={index}>{item}</li>;
        })}
      </ul>
      <p>{asana.benefit}</p>
    </>
  );
}
