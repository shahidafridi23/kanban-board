import mongoose from "mongoose";

const TaskSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    description: { type: String, required: true },
    dueDate: { type: Date, required: true },
    assignee: { type: String, required: true },
    section: { type: mongoose.Schema.Types.ObjectId, ref: "Section" },
  },
  { timestamps: true }
);

export default mongoose.model("Task", TaskSchema);
