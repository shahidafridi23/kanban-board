import mongoose from "mongoose";

const SectionSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    tasks: [{ type: mongoose.Schema.Types.ObjectId, ref: "Task" }],
  },
  { timestamps: true }
);

export default mongoose.model("Section", SectionSchema);
