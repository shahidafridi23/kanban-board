import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useToast } from "@/hooks/use-toast";
import axios from "axios";
import { Ellipsis } from "lucide-react";
import { useState } from "react";

const DeleteTask = ({ taskId, setSections }) => {
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);

  const handleDeleteTask = async () => {
    try {
      setIsLoading(true);
      const response = await axios.delete(`/task/${taskId}`);
      const { message } = response?.data;
      setSections((prevSections) => {
        return prevSections.map((sec) => ({
          ...sec,
          tasks: sec.tasks.filter((task) => task._id !== taskId),
        }));
      });
      toast({ title: message });
    } catch (error) {
      console.log(error);
      toast({
        title: "Unable to delete this Task in database",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="absolute top-3 right-3 text-gray-500 ">
        <Ellipsis className="w-4" />
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuItem>
          <button
            onClick={handleDeleteTask}
            type="button"
            className="bg-none text-red-500 font-bold"
            disabled={isLoading}
          >
            Delete
          </button>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default DeleteTask;
