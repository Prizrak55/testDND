import { memo } from "react";
import type { FieldError, Path, UseFormRegister } from "react-hook-form";
import type { FormData } from "../pages/QuestionaryPage/constants/schema.ts";
import { ErrorMessage } from "./ErrorMessage.ts";
import { FieldWrapper } from "./FieldWrapper.ts";
import { Input } from "./Input.ts";
import { InputWrapper } from "./InputWrapper.ts";
import { Label } from "./Label.ts";

interface FormFieldProps {
  id: string;
  name: Path<FormData>;
  label: string;
  placeholder?: string;
  error?: FieldError;
  register: UseFormRegister<FormData>;
}

export const EmailField = memo(
  ({ id, name, label, placeholder, error, register }: FormFieldProps) => {
    const registerProps = register(name);

    return (
      <FieldWrapper>
        <Label htmlFor={id}>{label}</Label>
        <InputWrapper>
          <Input
            id={id}
            type={"email"}
            placeholder={placeholder}
            $hasError={!!error}
            {...registerProps}
          />
          {error && <ErrorMessage>{error.message}</ErrorMessage>}
        </InputWrapper>
      </FieldWrapper>
    );
  },
);

EmailField.displayName = "FormFieldInput";
