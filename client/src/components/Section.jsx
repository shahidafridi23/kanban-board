import { Plus } from "lucide-react";

const Section = ({ section }) => {
  return (
    <div className="">
      <div className="flex items-center justify-between mb-2">
        <h2 className="text-md font-semibold cursor-pointer">
          {section?.title}
        </h2>
        <button
          type="button"
          className="flex items-center text-sm text-gray-500"
        >
          <Plus className="w-4 h-4" />
        </button>
      </div>
      <div className="min-h-[80vh] bg-gray-100 rounded-md p-5">
        {!section?.tasks?.length && (
          <button
            type="button"
            className="flex items-center text-sm text-gray-500 mx-auto"
          >
            <Plus className="w-4 h-4" /> Add Task
          </button>
        )}
      </div>
    </div>
  );
};

export default Section;
