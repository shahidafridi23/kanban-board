import { Plus } from "lucide-react";
import { useState } from "react";
import CreateTask from "./CreateTask";

const Section = ({ section }) => {
  const [openCreateTask, setOpenCreateTask] = useState(false);
  return (
    <>
      <div className="">
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
        open={openCreateTask}
        setOpen={setOpenCreateTask}
      />
    </>
  );
};

export default Section;
