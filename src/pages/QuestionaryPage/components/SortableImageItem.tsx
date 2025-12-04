import { useSortable } from "@dnd-kit/sortable";
import { memo, useCallback } from "react";
import { Image } from "../../../components/Image.ts";
import type { ImageData } from "./ImageGallery";
import { ImageItem, RemoveButton } from "./StyledComponentsForm.ts";

interface SortableImageItemProps {
  image: ImageData;
  onRemove: (id: string) => void;
  isOver?: boolean;
}

export const SortableImageItem = memo(
  ({ image, onRemove, isOver }: SortableImageItemProps) => {
    const { attributes, listeners, setNodeRef, isDragging } = useSortable({
      id: image.id,
    });

    const handleRemoveClick = useCallback(
      (e: React.MouseEvent<HTMLButtonElement>) => {
        e.stopPropagation();
        onRemove(image.id);
      },
      [image.id, onRemove],
    );

    return (
      <ImageItem
        ref={setNodeRef}
        $isDragging={isDragging}
        $isOver={isOver}
        $width={image.width}
        {...attributes}
        {...listeners}
      >
        <Image src={image.url} alt="Uploaded" draggable="false" />
        <RemoveButton
          type="button"
          onClick={handleRemoveClick}
          aria-label="Удалить изображение"
        >
          ×
        </RemoveButton>
      </ImageItem>
    );
  },
);

SortableImageItem.displayName = "SortableImageItem";
