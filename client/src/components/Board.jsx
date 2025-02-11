import { useEffect, useState } from "react";
import Section from "./Section";
import AddSection from "./AddSection";
import axios from "axios";
import { Skeleton } from "./ui/skeleton";

const Board = () => {
  const [sections, setSections] = useState([]);
  const [isloading, setIsLoading] = useState(true);

  useEffect(() => {
    async function getSections() {
      try {
        const response = await axios.get("/section");
        const { sections } = response?.data;
        setSections(sections);
      } catch (error) {
        console.log(error);
      } finally {
        setIsLoading(false);
      }
    }

    getSections();
  }, []);

  if (isloading) {
    return (
      <div className="p-5 md:p-10 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4  gap-5">
        <Skeleton className={"w-full h-[80vh]"} />
        <Skeleton className={"w-full h-[80vh]"} />
        <Skeleton className={"w-full h-[80vh]"} />
        <Skeleton className={"w-full h-[80vh]"} />
      </div>
    );
  }

  return (
    <div className="p-5 md:p-10 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4  gap-5">
      {sections?.map((section) => {
        return (
          <Section
            key={section._id}
            section={section}
            setSections={setSections}
          />
        );
      })}
      <AddSection setSections={setSections} />
    </div>
  );
};

export default Board;
