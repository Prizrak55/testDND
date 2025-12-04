import * as yup from "yup";
import {
  EMAIL_REGEX,
  MAX_IMAGES,
  MIN_IMAGES,
  PHONE_REGEX,
  VALIDATION_MESSAGES,
} from "./validation";

export const formSchema = yup
  .object({
    email: yup
      .string()
      .required(VALIDATION_MESSAGES.EMAIL.REQUIRED)
      .matches(EMAIL_REGEX, VALIDATION_MESSAGES.EMAIL.INVALID),
    phone: yup
      .string()
      .required(VALIDATION_MESSAGES.PHONE.REQUIRED)
      .matches(PHONE_REGEX, VALIDATION_MESSAGES.PHONE.INVALID),
    year: yup.string().required(VALIDATION_MESSAGES.YEAR.REQUIRED),
    images: yup
      .array()
      .of(
        yup.object({
          id: yup.string().required(),
          url: yup.string().required(),
          width: yup.number().required(),
          height: yup.number().required(),
        }),
      )
      .min(MIN_IMAGES, VALIDATION_MESSAGES.IMAGES.REQUIRED)
      .max(MAX_IMAGES, VALIDATION_MESSAGES.IMAGES.REQUIRED)
      .required(),
  })
  .required();

export type FormData = yup.InferType<typeof formSchema>;
