import { Plus } from "lucide-react";
import { useState } from "react";
import CreateTask from "./CreateTask";
import Task from "./Task";
import { useDrop } from "react-dnd";
import { useToast } from "@/hooks/use-toast";
import axios from "axios";

const Section = ({ section, setSections }) => {
  const [openCreateTask, setOpenCreateTask] = useState(false);
  const { toast } = useToast();

  const [{ isOver }, drop] = useDrop(() => ({
    accept: "TASK",
    drop: async ({ item, sectionId }) => {
      console.log("dropping", item);

      if (sectionId !== section._id) {
        await moveTask(item, section._id);
      }
    },
    collect: (monitor) => ({
      isOver: monitor.isOver(),
    }),
  }));

  const moveTask = async (item, newSectionId) => {
    setSections((prevSections) => {
      return prevSections.map((sec) => {
        if (sec._id === newSectionId) {
          return {
            ...sec,
            tasks: [...sec.tasks, { ...item, section: newSectionId }],
          };
        }
        if (sec._id === item.section) {
          return {
            ...sec,
            tasks: sec.tasks.filter((task) => task._id !== item._id),
          };
        }
        return sec;
      });
    });

    try {
      const response = await axios.put(`/task/${item._id}`, {
        sectionId: newSectionId,
      });

      const { message } = response?.data;

      toast({ title: message });
    } catch (error) {
      console.error("Error updating task:", error);
      toast({
        title: "Unable to changed the status on database",
        variant: "destructive",
      });
    }
  };

  return (
    <>
      <div ref={drop}>
        <div className="flex items-center justify-between mb-2">
          <h2
            onClick={() => setOpenCreateTask(true)}
            className="text-md font-semibold cursor-pointer"
          >
            {section?.title}
          </h2>
          <button
            onClick={() => setOpenCreateTask(true)}
            type="button"
            className="flex items-center text-sm text-gray-500"
          >
            <Plus className="w-4 h-4" />
          </button>
        </div>
        <div className="min-h-[80vh] bg-gray-100 rounded-md p-5">
          {section?.tasks.map((task) => (
            <Task key={task._id} task={task} />
          ))}

          {!section?.tasks?.length && (
            <button
              onClick={() => setOpenCreateTask(true)}
              type="button"
              className="flex items-center text-sm text-gray-500 mx-auto"
            >
              <Plus className="w-4 h-4" /> Add Task
            </button>
          )}
        </div>
      </div>
      <CreateTask
        section={section}
        setSections={setSections}
        open={openCreateTask}
        setOpen={setOpenCreateTask}
      />
    </>
  );
};

export default Section;
