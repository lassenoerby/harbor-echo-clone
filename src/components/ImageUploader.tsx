
import React, { useState, useCallback } from "react";
import { useDropzone } from "react-dropzone";
import { Image, Upload, X } from "lucide-react";
import { Button } from "@/components/ui/button";

interface ImageUploaderProps {
  currentImage: string;
  onImageUpload: (url: string) => void;
  onClearImage: () => void;
}

const ImageUploader = ({ currentImage, onImageUpload, onClearImage }: ImageUploaderProps) => {
  const [isUploading, setIsUploading] = useState(false);

  const onDrop = useCallback((acceptedFiles: File[]) => {
    if (acceptedFiles.length === 0) return;
    
    const file = acceptedFiles[0];
    setIsUploading(true);
    
    // In a real app, this would upload the file to a server
    // For this demo, we'll simulate an upload by creating a local URL
    setTimeout(() => {
      // Create a local URL for the image
      const imageUrl = URL.createObjectURL(file);
      onImageUpload(imageUrl);
      setIsUploading(false);
    }, 500); // Simulate network delay
  }, [onImageUpload]);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'image/*': ['.jpeg', '.jpg', '.png', '.gif']
    },
    maxFiles: 1
  });

  return (
    <div className="space-y-3">
      {currentImage ? (
        <div className="relative">
          <img 
            src={currentImage} 
            alt="Task image" 
            className="max-h-48 rounded-md object-contain"
          />
          <Button 
            variant="destructive" 
            size="icon" 
            className="absolute top-2 right-2 h-6 w-6 rounded-full" 
            onClick={onClearImage}
          >
            <X className="h-4 w-4" />
          </Button>
        </div>
      ) : (
        <div 
          {...getRootProps()} 
          className={`border-2 border-dashed rounded-md p-8 text-center transition-colors ${
            isDragActive ? 'border-primary bg-primary/5' : 'border-gray-300'
          }`}
        >
          <input {...getInputProps()} />
          <div className="flex flex-col items-center justify-center gap-2">
            <Upload className="h-10 w-10 text-gray-400" />
            <p className="text-sm text-gray-600">
              {isDragActive ? 'Drop the image here' : 'Drag and drop an image, or click to select'}
            </p>
            <p className="text-xs text-gray-400">
              JPG, PNG or GIF, max 10MB
            </p>
          </div>
        </div>
      )}
      {isUploading && (
        <div className="text-center text-sm text-gray-600">
          Uploading...
        </div>
      )}
    </div>
  );
};

export default ImageUploader;
