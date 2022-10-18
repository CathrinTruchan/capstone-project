import asanas from "../../db";
import { getAsanaByID, getAllAsanas } from "../../db";

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

export default function Asana({ asana }) {}
