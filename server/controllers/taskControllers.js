import Task from "../models/taskModel.js";

export const createTask = async (req, res) => {
  try {
    const { title, description, dueDate, assignee, sectionId } = req.body;
    const newTask = await Task.create({
      title,
      description,
      dueDate,
      assignee,
      section: sectionId,
    });
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
