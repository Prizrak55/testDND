import styled from "styled-components";
import { IMAGE_DISPLAY_HEIGHT } from "../constants/validation.ts";

export const ImageGalleryContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
  width: 100%;
`;

export const ImageGallery = styled.div`
  display: flex;
  gap: 12px;
  flex-wrap: wrap;
  padding: 16px;
  background-color: #f5f5f5;
  border-radius: 8px;
  min-height: 180px;
`;

export const ImageItem = styled.div<{
  $isDragging?: boolean;
  $isOver?: boolean;
  $width?: number;
}>`
  width: ${(props) => props.$width}px;
  position: relative;
  height: ${IMAGE_DISPLAY_HEIGHT}px;
  border-radius: 8px;
  overflow: hidden;
  cursor: grab;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  transition: box-shadow 0.2s;
  background-color: white;
  user-select: none;
  -webkit-user-select: none;

  &:active {
    cursor: grabbing;
  }

  &:hover {
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
  }

  ${(props) =>
    props.$isDragging &&
    `opacity: 0.3;
  `}

  ${(props) =>
    props.$isOver &&
    `
    box-shadow: 0 0 0 3px #2196F3, 0 8px 16px rgba(33, 150, 243, 0.3);
  `}
`;

export const DropPlaceholder = styled.div`
  height: ${IMAGE_DISPLAY_HEIGHT}px;
  width: 10px;
  border-radius: 8px;
  border: 2px dashed #2196f3;
  background-color: rgba(33, 150, 243, 0.1);
  box-shadow: 0 0 0 3px rgba(33, 150, 243, 0.2);
  transition: all 0.2s ease;
  flex-shrink: 0;
`;

export const DragOverlayItem = styled.div<{ $width: number }>`
  position: relative;
  height: ${IMAGE_DISPLAY_HEIGHT}px;
  width: ${(props) => props.$width}px;
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.3);
  background-color: white;
  transform: rotate(5deg);
  opacity: 0.9;
`;

export const RemoveButton = styled.button`
  position: absolute;
  top: 3px;
  right: 3px;
  width: 18px;
  height: 28px;
  background-color: #181a1c73;
  color: white;
  border: none;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 18px;
  line-height: 1;
  transition: background-color 0.2s;
  pointer-events: auto;
  z-index: 10;

  &:hover {
    background-color: rgba(24, 26, 28, 0.6);
  }
`;

export const UploadButton = styled.label<{ $isDisabled?: boolean }>`
  opacity: ${(props) => (props.$isDisabled ? 0.5 : 1)};
  cursor: ${(props) => (props.$isDisabled ? "not-allowed" : "pointer")};
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 10px 16px;
  background-color: white;
  border: 1px solid #909090;
  color: black;
  border-radius: 4px;
  font-size: 14px;
  font-weight: 500;
  transition: background-color 0.2s;
`;

export const SubmitButton = styled.button`
  padding: 12px 24px;
  background-color: #2196f3;
  color: white;
  border: none;
  border-radius: 4px;
  font-size: 16px;
  font-weight: 500;
  cursor: pointer;
  width: 180px;

  &:hover:not(:disabled) {
    background-color: #1976d2;
  }

  &:disabled {
    background-color: #ccc;
    cursor: not-allowed;
  }
`;
