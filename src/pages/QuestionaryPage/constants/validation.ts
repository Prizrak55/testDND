export const EMAIL_REGEX = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;

export const PHONE_REGEX = /^\+7 \(\d{3}\) \d{3}-\d{2}-\d{2}$/;

export const VALIDATION_MESSAGES = {
  EMAIL: {
    REQUIRED: "Email обязателен",
    INVALID: "Неверный формат email",
  },
  PHONE: {
    REQUIRED: "Телефон обязателен",
    INVALID: "Неверный формат телефона",
  },
  YEAR: {
    REQUIRED: "Выберите год реализации проекта",
  },
  IMAGES: {
    REQUIRED: "обязательно от 3 до 10 картинок",
  },
} as const;

export const MAX_IMAGES = 10;
export const MIN_IMAGES = 3;
export const MAX_IMAGE_HEIGHT = 1500;
export const IMAGE_DISPLAY_HEIGHT = 150;
