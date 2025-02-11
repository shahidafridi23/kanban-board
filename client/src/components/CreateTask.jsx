import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";

import { Input } from "./ui/input";
import { Button } from "./ui/button";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useState } from "react";
import axios from "axios";
import Spinner from "./ui/Spinner";
import { useToast } from "@/hooks/use-toast";
import DatePicker from "./ui/datepicker";

const formSchema = z.object({
  title: z
    .string()
    .min(3, {
      message: "title must be at least 3 characters.",
    })
    .max(20, {
      message: "title must be at most 20 characters.",
    }),
  description: z
    .string()
    .min(5, {
      message: "description must be at least 5 characters.",
    })
    .max(40, {
      message: "description must be at most 40 characters.",
    }),
  dueDate: z.date({ required_error: "Due date is required" }),
  assignee: z
    .string()
    .min(5, {
      message: "User name must be at least 5 characters.",
    })
    .max(20, {
      message: "User name must be at most 40 characters.",
    }),
});

const CreateTask = ({ section, setSections, open, setOpen }) => {
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      description: "",
      dueDate: undefined,
      assignee: "",
    },
  });

  const { reset } = form;

  const { toast } = useToast();

  const [isLoading, setIsLoading] = useState(false);

  const onSubmit = async (values) => {
    try {
      setIsLoading(true);
      const response = await axios.post("/task", {
        ...values,
        sectionId: section._id,
      });
      const { message, task } = response?.data;

      setSections((prevSections) =>
        prevSections.map((section) =>
          section._id === task.section
            ? { ...section, tasks: [...section.tasks, task] }
            : section
        )
      );

      toast({ title: message });
    } catch (error) {
      console.log(error);
      toast({ title: "Something Went Wrong!", variant: "destructive" });
    } finally {
      setIsLoading(false);
      setOpen(false);
      reset({
        title: "",
        description: "",
        dueDate: undefined,
        assignee: "",
      });
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild />
      <DialogContent>
        <DialogTitle>{`Create a task in section - ${section.title}`}</DialogTitle>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-2">
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input placeholder="Title" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input placeholder="Description" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="dueDate"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <DatePicker date={field.value} onChange={field.onChange} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="assignee"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input placeholder="assignee" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button type="submit" className="w-full">
              {isLoading && <Spinner />} Add Task
            </Button>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default CreateTask;
