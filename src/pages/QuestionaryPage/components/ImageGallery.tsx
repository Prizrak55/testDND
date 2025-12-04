import { DndContext, DragOverlay, pointerWithin } from "@dnd-kit/core";
import {
  horizontalListSortingStrategy,
  SortableContext,
} from "@dnd-kit/sortable";
import React, { memo, useEffect, useRef } from "react";
import { ErrorMessage } from "../../../components/ErrorMessage.ts";
import { HiddenInput } from "../../../components/HiddenInput.ts";
import { Image } from "../../../components/Image.ts";
import { useDragAndDrop } from "./hooks/useDragAndDrop";
import { useImageManagement } from "./hooks/useImageManagement";
import { SortableImageItem } from "./SortableImageItem";
import {
  DragOverlayItem,
  DropPlaceholder,
  ImageGalleryContainer,
  ImageGallery as ImageGalleryStyled,
  UploadButton,
} from "./StyledComponentsForm.ts";

export interface ImageData {
  id: string;
  url: string;
  width: number;
  height: number;
}
interface ImageGalleryProps {
  images: ImageData[];
  onImagesChange: (updater: (prev: ImageData[]) => ImageData[]) => void;
  error?: string;
}

export const ImageGallery = memo(
  ({ images, onImagesChange, error }: ImageGalleryProps) => {
    const {
      activeId,
      overId,
      sensors,
      handleDragStart,
      handleDragOver,
      handleDragEnd,
      imageIds,
      activeImage,
      placeholderIndex,
    } = useDragAndDrop({ images, onImagesChange });

    const { handleImageUpload, removeImage, isMaxImagesReached } =
      useImageManagement({
        images,
        onImagesChange,
      });

    const imagesRef = useRef<ImageData[]>([]);

    useEffect(() => {
      imagesRef.current = images;
    }, [images]);

    useEffect(() => {
      return () => {
        imagesRef.current.forEach((image) => {
          if (image.url.startsWith("blob:")) {
            URL.revokeObjectURL(image.url);
          }
        });
      };
    }, []);

    return (
      <>
        <ImageGalleryContainer>
          {images.length > 0 && (
            <DndContext
              sensors={sensors}
              collisionDetection={pointerWithin}
              onDragStart={handleDragStart}
              onDragOver={handleDragOver}
              onDragEnd={handleDragEnd}
            >
              <SortableContext
                items={imageIds}
                strategy={horizontalListSortingStrategy}
              >
                <ImageGalleryStyled>
                  {images.map((image, index) => {
                    const isOver = overId === image.id && activeId !== image.id;
                    const showPlaceholderBefore =
                      placeholderIndex === index && activeImage;

                    return (
                      <React.Fragment key={image.id}>
                        {showPlaceholderBefore && <DropPlaceholder />}
                        <SortableImageItem
                          image={image}
                          onRemove={removeImage}
                          isOver={isOver}
                        />
                      </React.Fragment>
                    );
                  })}
                  {placeholderIndex === images.length && activeImage && (
                    <DropPlaceholder />
                  )}
                </ImageGalleryStyled>
              </SortableContext>
              <DragOverlay>
                {activeImage ? (
                  <DragOverlayItem $width={activeImage.width}>
                    <Image
                      src={activeImage.url}
                      alt="Dragging"
                      draggable="false"
                    />
                  </DragOverlayItem>
                ) : null}
              </DragOverlay>
            </DndContext>
          )}
          {error && <ErrorMessage>{error}</ErrorMessage>}

          <UploadButton $isDisabled={isMaxImagesReached}>
            Добавить изображения
            <HiddenInput
              type="file"
              accept="image/jpeg,image/jpg"
              multiple
              onChange={handleImageUpload}
              disabled={isMaxImagesReached}
            />
          </UploadButton>
        </ImageGalleryContainer>
      </>
    );
  },
);

ImageGallery.displayName = "ImageGallery";
