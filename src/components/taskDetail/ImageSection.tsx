
import React from "react";
import { Image } from "lucide-react";
import ImageUploader from "@/components/ImageUploader";

interface ImageSectionProps {
  imageUrl: string;
  setImageUrl: (url: string) => void;
}

export const ImageSection = ({ imageUrl, setImageUrl }: ImageSectionProps) => {
  const handleImageUpload = (url: string) => {
    setImageUrl(url);
  };

  const clearImage = () => {
    setImageUrl("");
  };

  return (
    <div className="space-y-2">
      <label className="text-sm font-medium flex items-center gap-2">
        <Image className="h-4 w-4" />
        Task Image
      </label>
      
      <ImageUploader 
        currentImage={imageUrl} 
        onImageUpload={handleImageUpload} 
        onClearImage={clearImage}
      />
    </div>
  );
};
