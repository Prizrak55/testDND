import styled from "styled-components";

export const Input = styled.input<{ $hasError?: boolean }>`
  padding: 10px 12px;
  font-size: 14px;
  border: 1px solid ${(props) => (props.$hasError ? "#f44336" : "#ddd")};
  border-radius: 4px;
  outline: none;
  min-width: 500px;

  &:focus {
    border-color: ${(props) => (props.$hasError ? "#f44336" : "#2196F3")};
  }
`;
