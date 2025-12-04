import { useCallback } from "react";
import { handleImageUpload as processImageUpload } from "../../helpers/imageUploadHandler";
import type { ImageData } from "../ImageGallery";
import { MAX_IMAGES } from "../../constants/validation.ts";

interface UseImageManagementProps {
  images: ImageData[];
  onImagesChange: (updater: (prev: ImageData[]) => ImageData[]) => void;
}

export const useImageManagement = ({
  images,
  onImagesChange,
}: UseImageManagementProps) => {
  const handleImageUpload = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      processImageUpload({ files: e.target.files, onImagesChange });

      e.target.value = "";
    },
    [onImagesChange],
  );

  const removeImage = useCallback(
    (id: string) => {
      onImagesChange((prevImages) => {
        const imageToRemove = prevImages.find((img) => img.id === id);
        if (imageToRemove) {
          URL.revokeObjectURL(imageToRemove.url);
        }
        return prevImages.filter((img) => img.id !== id);
      });
    },
    [onImagesChange],
  );

  const isMaxImagesReached = images.length >= MAX_IMAGES;

  return {
    handleImageUpload,
    removeImage,
    isMaxImagesReached,
  };
};

