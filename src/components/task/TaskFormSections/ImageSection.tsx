
import React from "react";
import { FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form";
import { Control } from "react-hook-form";
import { Image } from "lucide-react";
import ImageUploader from "../../ImageUploader";
import { TaskFormValues } from "../TaskFormTypes";

interface ImageSectionProps {
  control: Control<TaskFormValues>;
}

export const ImageSection = ({ control }: ImageSectionProps) => {
  return (
    <FormField
      control={control}
      name="imageUrl"
      render={({ field }) => (
        <FormItem>
          <FormLabel className="flex items-center gap-2">
            <Image className="h-4 w-4" />
            Task Image
          </FormLabel>
          <FormControl>
            <ImageUploader
              currentImage={field.value || ""}
              onImageUpload={(url) => field.onChange(url)}
              onClearImage={() => field.onChange("")}
            />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};
