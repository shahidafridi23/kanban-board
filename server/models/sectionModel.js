import mongoose from "mongoose";

const SectionSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

export default mongoose.model("Section", SectionSchema);
