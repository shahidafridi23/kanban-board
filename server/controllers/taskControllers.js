import Task from "../models/taskModel.js";
import Section from "../models/sectionModel.js";

export const createTask = async (req, res) => {
  try {
    const { title, description, dueDate, assignee, sectionId } = req.body;
    const section = await Section.findById(sectionId);
    if (!section) {
      return res.status(404).json({ message: "Section not found" });
    }

    const newTask = await Task.create({
      title,
      description,
      dueDate,
      assignee,
      section: sectionId,
    });

    section.tasks.push(newTask._id);
    await section.save();

    res
      .status(200)
      .json({ message: "New Task has been created!", task: newTask });
  } catch (error) {
    console.log(error);
    res
      .status(400)
      .json({ message: "Something went wrong!", error: error.message });
  }
};
