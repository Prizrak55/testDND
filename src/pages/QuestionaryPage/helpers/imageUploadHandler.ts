import { toast } from "react-toastify";
import type { ImageData } from "../components/ImageGallery";
import {
  IMAGE_DISPLAY_HEIGHT,
  MAX_IMAGE_HEIGHT,
  MAX_IMAGES,
} from "../constants/validation.ts";

interface ImageUploadHandlerParams {
  files: FileList | null;
  onImagesChange: (updater: (prevImages: ImageData[]) => ImageData[]) => void;
}

const createImageId = (): string => {
  return `image-${Date.now()}-${Math.random().toString(36).substring(2, 9)}`;
};

const validateFileFormat = (file: File): boolean => {
  return file.type === "image/jpeg" || file.type === "image/jpg";
};

const loadImageFile = (file: File): Promise<ImageData> => {
  return new Promise((resolve, reject) => {
    if (!validateFileFormat(file)) {
      reject({
        fileName: file.name,
        message: `Файл "${file.name}" имеет неподдерживаемый формат. Разрешены только JPEG изображения.`,
      });
      return;
    }

    const objectURL = URL.createObjectURL(file);
    const img = new Image();

    img.onload = () => {
      if (img.height > MAX_IMAGE_HEIGHT) {
        URL.revokeObjectURL(objectURL);
        reject({
          fileName: file.name,
          message: `Изображение "${file.name}" слишком большое. Максимальная высота: ${MAX_IMAGE_HEIGHT}px (текущая: ${img.height}px).`,
        });
        return;
      }

      const aspectRatio = img.width / img.height;
      const displayWidth = IMAGE_DISPLAY_HEIGHT * aspectRatio;

      const newImage: ImageData = {
        id: createImageId(),
        url: objectURL,
        width: displayWidth,
        height: IMAGE_DISPLAY_HEIGHT,
      };

      resolve(newImage);
    };

    img.onerror = () => {
      URL.revokeObjectURL(objectURL);
      reject({
        fileName: file.name,
        message: `Не удалось загрузить изображение "${file.name}".`,
      });
    };

    img.src = objectURL;
  });
};

export const handleImageUpload = ({
  files,
  onImagesChange,
}: ImageUploadHandlerParams): void => {
  if (!files || files.length === 0) return;

  const filesArray = Array.from(files);

  Promise.allSettled(filesArray.map((file) => loadImageFile(file))).then(
    (results) => {
      const successfulImages: ImageData[] = [];
      const errors: string[] = [];

      results.forEach((result) => {
        if (result.status === "fulfilled") {
          successfulImages.push(result.value);
        } else {
          errors.push(result.reason.message);
        }
      });

      errors.forEach((errorMessage) => {
        toast.error(errorMessage);
      });

      if (successfulImages.length > 0) {
        onImagesChange((prevImages) => {
          const availableSlots = MAX_IMAGES - prevImages.length;

          if (availableSlots <= 0) {
            successfulImages.forEach((img) => URL.revokeObjectURL(img.url));
            toast.error(
              `Достигнуто максимальное количество изображений (${MAX_IMAGES}).`,
            );
            return prevImages;
          }

          const imagesToAdd = successfulImages.slice(0, availableSlots);
          const rejectedImages = successfulImages.slice(availableSlots);

          rejectedImages.forEach((img) => URL.revokeObjectURL(img.url));

          if (rejectedImages.length > 0) {
            toast.error(
              `Добавлено ${imagesToAdd.length} из ${successfulImages.length} изображений. Достигнут лимит (${MAX_IMAGES}).`,
            );
          } else if (errors.length > 0) {
            toast.success(
              `Успешно добавлено ${imagesToAdd.length} из ${filesArray.length} файлов.`,
            );
          }

          return [...prevImages, ...imagesToAdd];
        });
      }
    },
  );
};
