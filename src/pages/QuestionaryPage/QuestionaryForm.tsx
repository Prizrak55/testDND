import { yupResolver } from "@hookform/resolvers/yup";
import { useCallback } from "react";
import { useForm, useWatch } from "react-hook-form";
import "react-toastify/dist/ReactToastify.css";
import { FieldWrapper } from "../../components/FieldWrapper.ts";
import { Form } from "../../components/Form.ts";
import { FormContainer } from "../../components/FormContainer.ts";
import { EmailField } from "../../components/EmailField.tsx";
import { PhoneField } from "../../components/PhoneField.tsx";
import { Select } from "../../components/Select.tsx";
import { Label } from "../../components/Label.ts";
import { ImageGallery, type ImageData } from "./components/ImageGallery";
import { SubmitButton } from "./components/StyledComponentsForm.ts";
import { YEAR_OPTIONS } from "./constants/constants.ts";
import { formSchema, type FormData } from "./constants/schema.ts";
import { MAX_IMAGES, MIN_IMAGES } from "./constants/validation.ts";

type ImagesUpdater = (prev: ImageData[]) => ImageData[];
type ImagesChangeHandler = (updater: ImagesUpdater) => void;

export const QuestionaryForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    control,
    setValue,
    getValues,
  } = useForm<FormData>({
    resolver: yupResolver(formSchema),
    defaultValues: {
      images: [],
    },
  });

  const images = useWatch<FormData, "images">({ control, name: "images" });

  const handleImagesChange = useCallback<ImagesChangeHandler>(
    (updater) => {
      const currentImages = getValues("images");
      const newImages = updater(currentImages);
      setValue("images", newImages, { shouldValidate: true });
    },
    [getValues, setValue],
  );

  const onSubmit = useCallback((data: FormData) => {
    console.log("Form submitted:", data);
    // ну тут и т.д.
  }, []);

  return (
    <FormContainer>
      <Form onSubmit={handleSubmit(onSubmit)} noValidate>
        <EmailField
          id="email"
          name="email"
          label="Email *"
          placeholder="Email автора"
          error={errors.email}
          register={register}
        />

        <PhoneField
          id="phone"
          name="phone"
          label="Телефон *"
          placeholder="+7 (___) ___-__-__"
          error={errors.phone}
          register={register}
        />

        <Select
          id="year"
          name="year"
          label="Год реализации проекта *"
          error={errors.year}
          register={register}
          options={YEAR_OPTIONS}
          placeholder="Выберите год"
        />

        <FieldWrapper>
          <Label>{`${MIN_IMAGES}-${MAX_IMAGES} изображений проекта, jpeg, высота < 1500 рх`}</Label>
          <ImageGallery
            images={images}
            onImagesChange={handleImagesChange}
            error={errors.images?.message}
          />
        </FieldWrapper>

        <SubmitButton type="submit">Отправить</SubmitButton>
      </Form>
    </FormContainer>
  );
};
