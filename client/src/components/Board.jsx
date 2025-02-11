import { useState } from "react";
import Section from "./Section";
import AddSection from "./AddSection";

const Board = () => {
  const [sections, setSections] = useState([
    {
      _id: 1,
      title: "To DO",
      tasks: [],
    },
    {
      _id: 2,
      title: "In Progess",
      tasks: [],
    },
    {
      _id: 3,
      title: "Done",
      tasks: [],
    },
    // {
    //   _id: 4,
    //   title: "Review",
    //   tasks: [],
    // },
    // {
    //   _id: 5,
    //   title: "Review",
    //   tasks: [],
    // },
    // {
    //   _id: 6,
    //   title: "Review",
    //   tasks: [],
    // },
  ]);

  return (
    <div className="p-5 md:p-10 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4  gap-5">
      {sections?.map((section) => {
        return <Section key={section._id} section={section} />;
      })}
      <AddSection setSections={setSections} />
    </div>
  );
};

export default Board;
