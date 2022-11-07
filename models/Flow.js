import mongoose from "mongoose";

const { Schema } = mongoose;

const flowSchema = new Schema({
  name: { type: String, required: true },
  description: { type: String },
  duration: {
    hours: { type: Number },
    minutes: { type: Number },
  },
  asanas: { type: Array },
});

const Flow =
  mongoose.models.Flow || mongoose.model("Flow", flowSchema, "flows");

export default Flow;
