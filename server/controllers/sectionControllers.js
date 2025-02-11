import Section from "../models/sectionModel.js";

export const getSections = async (req, res) => {
  try {
    const sections = await Section.find();
    console.log(sections);
    res.status(200).json({ message: "All the sections!", sections });
  } catch (error) {
    console.log(error);
    res
      .status(400)
      .json({ message: "Something went wrong!", error: error.message });
  }
};

export const createDefaultSections = async () => {
  const defaultSections = ["To Do", "In Progress", "Done"];
  const existingSections = await Section.find({
    title: { $in: defaultSections },
  });

  if (existingSections.length > 0) {
    console.log("default sections is already exits");
    return;
  }

  await Section.insertMany(defaultSections.map((title) => ({ title })));
  console.log("Default sections created!");
};

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
