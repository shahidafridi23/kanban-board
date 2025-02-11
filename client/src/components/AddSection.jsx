import { Plus } from "lucide-react";

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

const formSchema = z.object({
  title: z
    .string()
    .min(3, {
      message: "title must be at least 3 characters.",
    })
    .max(25, {
      message: "title must be at most 25 characters.",
    }),
});

const AddSection = ({ setSections }) => {
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
    },
  });

  const { toast } = useToast();

  const [isLoading, setIsLoading] = useState(false);
  const [open, setOpen] = useState(false);

  const onSubmit = async ({ title }) => {
    try {
      setIsLoading(true);
      const response = await axios.post("/section", { title });
      const { message, section } = response?.data;
      setSections((prev) => [...prev, section]);
      toast({ title: message });
    } catch (error) {
      console.log(error);
      toast({ title: "Something Went Wrong!", variant: "destructive" });
    } finally {
      setIsLoading(false);
      setOpen(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <button
          type="button"
          className="self-start flex items-center text-sm text-gray-500 pt-0.5 pl-2"
        >
          <Plus className="w-4 h-4" /> Add Section
        </button>
      </DialogTrigger>
      <DialogContent>
        <DialogTitle>Create a new section</DialogTitle>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-2">
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input placeholder="Enter Section Title" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit" className="w-full">
              {isLoading && <Spinner />} Add Section
            </Button>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default AddSection;
