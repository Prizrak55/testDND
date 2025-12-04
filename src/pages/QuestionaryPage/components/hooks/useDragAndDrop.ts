import {
  PointerSensor,
  useSensor,
  useSensors,
  type DragEndEvent,
  type DragOverEvent,
  type DragStartEvent,
} from "@dnd-kit/core";
import { arrayMove } from "@dnd-kit/sortable";
import { useCallback, useMemo, useState } from "react";
import type { ImageData } from "../ImageGallery";

interface UseDragAndDropProps {
  images: ImageData[];
  onImagesChange: (updater: (prev: ImageData[]) => ImageData[]) => void;
}

export const useDragAndDrop = ({
  images,
  onImagesChange,
}: UseDragAndDropProps) => {
  const [activeId, setActiveId] = useState<string | null>(null);
  const [overId, setOverId] = useState<string | null>(null);

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 4,
      },
    }),
  );

  const handleDragStart = useCallback((event: DragStartEvent) => {
    const id = event.active.id;
    setActiveId(String(id));
  }, []);

  const handleDragOver = useCallback((event: DragOverEvent) => {
    const id = event.over?.id;
    setOverId(id ? String(id) : null);
  }, []);

  const handleDragEnd = useCallback(
    (event: DragEndEvent) => {
      const { active, over } = event;

      setActiveId(null);
      setOverId(null);

      if (over && active.id !== over.id) {
        onImagesChange((prevImages) => {
          const oldIndex = prevImages.findIndex(
            (item) => item.id === active.id,
          );
          const newIndex = prevImages.findIndex((item) => item.id === over.id);

          if (oldIndex !== -1 && newIndex !== -1) {
            return arrayMove(prevImages, oldIndex, newIndex);
          }
          return prevImages;
        });
      }
    },
    [onImagesChange],
  );

  const imageIds = useMemo(() => images.map((img) => img.id), [images]);

  const activeImage = useMemo(
    () => (activeId ? images.find((img) => img.id === activeId) : null),
    [activeId, images],
  );

  const placeholderIndex = useMemo(() => {
    if (!activeId || !overId || activeId === overId) {
      return -1;
    }
    const overIndex = images.findIndex((img) => img.id === overId);
    const activeIndex = images.findIndex((img) => img.id === activeId);

    if (activeIndex < overIndex) {
      return overIndex + 1;
    } else {
      return overIndex;
    }
  }, [activeId, overId, images]);

  return {
    activeId,
    overId,
    sensors,
    handleDragStart,
    handleDragOver,
    handleDragEnd,
    imageIds,
    activeImage,
    placeholderIndex,
  };
};
