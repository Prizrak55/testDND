import { memo } from "react";
import styled from "styled-components";
import type { FieldError, UseFormRegister, Path } from "react-hook-form";
import { FieldWrapper } from "./FieldWrapper.ts";
import { Label } from "./Label.ts";
import { InputWrapper } from "./InputWrapper.ts";
import { ErrorMessage } from "./ErrorMessage.ts";
import type { FormData } from "../pages/QuestionaryPage/constants/schema.ts";

export interface SelectOption {
  value: string;
  label: string;
}

export interface FormSelectProps {
  id: string;
  name: Path<FormData>;
  label: string;
  error?: FieldError;
  register: UseFormRegister<FormData>;
  options: SelectOption[];
  placeholder?: string;
}

const SelectComponent = styled.select<{ $hasError?: boolean }>`
  padding: 10px 12px;
  font-size: 14px;
  border: 1px solid ${(props) => (props.$hasError ? "#f44336" : "#ddd")};
  border-radius: 4px;
  outline: none;
  width: 100%;
  cursor: pointer;

  &:focus {
    border-color: ${(props) => (props.$hasError ? "#f44336" : "#2196F3")};
  }
`;

export const Select = memo(
  ({
    id,
    name,
    label,
    error,
    register,
    options,
    placeholder,
  }: FormSelectProps) => {
    const registerProps = register(name);

    return (
      <FieldWrapper>
        <Label htmlFor={id}>{label}</Label>
        <InputWrapper>
          <SelectComponent id={id} $hasError={!!error} {...registerProps}>
            {placeholder && <option value="">{placeholder}</option>}
            {options.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </SelectComponent>
          {error && <ErrorMessage>{error.message}</ErrorMessage>}
        </InputWrapper>
      </FieldWrapper>
    );
  },
);

Select.displayName = "FormSelect";
