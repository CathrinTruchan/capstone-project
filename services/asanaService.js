import dbConnect from "../lib/dbConnect";
import Asana from "../models/Asana";

export async function getAllAsanas() {
  await dbConnect();

  const asanas = await Asana.find();

  const sanatizedAsanas = asanas.map((asana) => ({
    id: asana._id,
    english_name: asana.english_name,
    sanskrit_name: asana.sanskrit_name,
    img_url: asana.img_url,
    description: asana.description,
    levels: asana.levels,
    category: asana.category,
    benefit: asana.benefit,
    next: asana.next,
  }));

  return JSON.parse(JSON.stringify(sanatizedAsanas));
}

export async function getAsanaById(id) {
  await dbConnect();
  const asana = await Asana.findById(id);

  const sanitizedAsana = {
    id: asana._id,
    sanskrit_name: asana.sanskrit_name,
    english_name: asana.english_name,
    img_url: asana.img_url,
    description: asana.description,
    levels: asana.levels,
    category: asana.category,
    benefit: asana.benefit,
    next: asana.next,
  };
  return JSON.parse(JSON.stringify(sanitizedAsana));
}
