
import React from "react";
import { UseFormReturn } from "react-hook-form";
import { Form } from "@/components/ui/form";
import { BasicInfoSection } from "./TaskFormSections/BasicInfoSection";
import { PrioritySection } from "./TaskFormSections/PrioritySection";
import { DeadlineSection } from "./TaskFormSections/DeadlineSection"; 
import { AssignmentSection } from "./TaskFormSections/AssignmentSection";
import { ImageSection } from "./TaskFormSections/ImageSection";
import { FormFooter } from "./TaskFormSections/FormFooter";
import { TaskFormValues } from "./TaskFormTypes";
import { TaskTypeSection } from "./TaskFormSections/TaskTypeSection";

interface TaskFormProps {
  form: UseFormReturn<TaskFormValues>;
  onSubmit: (values: TaskFormValues) => void;
  onCancel: () => void;
}

const TaskForm = ({ form, onSubmit, onCancel }: TaskFormProps) => {
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <BasicInfoSection control={form.control} />
        <TaskTypeSection control={form.control} />
        <PrioritySection control={form.control} />
        <DeadlineSection control={form.control} />
        <AssignmentSection control={form.control} />
        <ImageSection control={form.control} />
        <FormFooter onCancel={onCancel} />
      </form>
    </Form>
  );
};

export default TaskForm;
