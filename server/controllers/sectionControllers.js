import Section from "../models/sectionModel.js";

export const createSection = async (req, res) => {
  try {
    const { title } = req.body;
    const newSection = await Section.create({ title });
    res
      .status(200)
      .json({ message: "New Section is created!", section: newSection });
  } catch (error) {
    console.log(error);
    res
      .status(400)
      .json({ message: "Something went wrong!", error: error.message });
  }
};
