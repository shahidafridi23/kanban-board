import { Ellipsis } from "lucide-react";
import { format } from "date-fns";
import { useDrag } from "react-dnd";
import { useEffect } from "react";

const Task = ({ task }) => {
  const formattedDate = format(new Date(task.dueDate), "dd MMM");

  const [{ isDragging }, drag, preview] = useDrag(() => ({
    type: "TASK",
    item: { item: task, sectionId: task.section },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  }));

  useEffect(() => {
    preview(null);
  }, [preview]);

  return (
    <div
      ref={drag}
      className={`w-full bg-white rounded-md p-3 relative mb-3  ${
        isDragging ? "opacity-0" : "opacity-1"
      }`}
    >
      <p className="text-md mb-3">{task.description}</p>

      <div className="stats flex items-center justify-between">
        <div className="flex gap-1 items-center">
          <div className="avatar w-5 h-5 bg-blue-500 rounded-full uppercase text-white font-medium text-sm flex items-center justify-center">
            {task.assignee[0]}
          </div>
          <div className="text-gray-500 text-sm">{formattedDate}</div>
        </div>
        <div className="title rounded-full px-2 bg-gray-100 text-sm text-gray-500">
          {task.title}
        </div>
      </div>
    </div>
  );
};

export default Task;
