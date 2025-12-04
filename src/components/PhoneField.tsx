import { memo } from "react";
import { IMaskInput } from "react-imask";
import styled from "styled-components";
import type { FieldError, UseFormRegister, Path } from "react-hook-form";
import { FieldWrapper } from "./FieldWrapper.ts";
import { Label } from "./Label.ts";
import { InputWrapper } from "./InputWrapper.ts";
import { ErrorMessage } from "./ErrorMessage.ts";
import type { FormData } from "../pages/QuestionaryPage/constants/schema.ts";

interface FormPhoneFieldProps {
  id: string;
  name: Path<FormData>;
  label: string;
  placeholder?: string;
  error?: FieldError;
  register: UseFormRegister<FormData>;
  mask?: string;
}

const StyledMaskInput = styled(IMaskInput)<{ $hasError?: boolean }>`
  padding: 10px 12px;
  font-size: 14px;
  border: 1px solid ${(props) => (props.$hasError ? "#f44336" : "#ddd")};
  border-radius: 4px;
  outline: none;

  &:focus {
    border-color: ${(props) => (props.$hasError ? "#f44336" : "#2196F3")};
  }
`;

export const PhoneField = memo(
  ({
    id,
    name,
    label,
    placeholder,
    error,
    register,
    mask = "+7 (000) 000-00-00",
  }: FormPhoneFieldProps) => {
    const { ref, ...registerRest } = register(name);

    return (
      <FieldWrapper>
        <Label htmlFor={id}>{label}</Label>
        <InputWrapper>
          <StyledMaskInput
            mask={mask}
            id={id}
            placeholder={placeholder}
            inputRef={ref}
            type="tel"
            $hasError={!!error}
            {...registerRest}
          />
          {error && <ErrorMessage>{error.message}</ErrorMessage>}
        </InputWrapper>
      </FieldWrapper>
    );
  },
);

PhoneField.displayName = "FormPhoneField";
