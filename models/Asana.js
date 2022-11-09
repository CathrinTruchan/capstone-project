import mongoose from "mongoose";

const { Schema } = mongoose;

const asanaSchema = new Schema({
  sanskrit_name: { type: String, required: true },
  english_name: { type: String, required: true },
  img_url: { type: String, required: true },
  description: { type: String, required: true },
  levels: { type: Array, required: true },
  category: { type: String, required: true },
  benefit: { type: String, required: true },
  next: { type: Array, required: true },
});

const Asana =
  mongoose.models.Asana || mongoose.model("Asana", asanaSchema, "asanas");

export default Asana;
