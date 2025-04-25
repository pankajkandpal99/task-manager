import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Project, projectSchema } from "../../schema/projectSchema";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { Input } from "../ui/input";
import { Button } from "../ui/button";

interface ProjectFormProps {
  initialData?: Project;
  onSubmit: (values: Project) => void;
  onCancel: () => void;
}

export function ProjectForm({
  initialData,
  onSubmit,
  onCancel,
}: ProjectFormProps) {
  const form = useForm<Project>({
    resolver: zodResolver(projectSchema),
    defaultValues: initialData || {
      name: "",
      progress: 0,
      tasks: [],
    },
  });

  const handleSubmit = (values: Project) => {
    if (initialData?._id) {
      onSubmit({
        ...values,
        _id: initialData._id,
        tasks: initialData.tasks || [],
      });
    } else {
      onSubmit(values);
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-4">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Project Name</FormLabel>
              <FormControl>
                <Input placeholder="Enter project name" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="flex justify-end gap-2">
          <Button type="button" variant="outline" onClick={onCancel}>
            Cancel
          </Button>
          <Button type="submit">
            {initialData ? "Update" : "Create"} Project
          </Button>
        </div>
      </form>
    </Form>
  );
}
