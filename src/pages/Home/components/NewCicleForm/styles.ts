import styled from "styled-components";

export const FormContainer = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;

  color: ${({ theme }) => theme["gray-100"]};
  font-size: 1.125rem;
  font-weight: bold;
  flex-wrap: wrap;
`;

// este compenente é uma base para os dois outros inputs, esse é uma forma de reaproveitar o código
const BaseInput = styled.input`
  background: transparent;
  border: 0;
  height: 2.5rem;
  border-bottom: 2px solid ${({ theme }) => theme["gray-500"]};
  color: ${({ theme }) => theme["gray-100"]};
  font-size: 1.125rem;
  font-weight: bold;
  padding: 0 0.5rem;

  &::placeholder {
    color: ${({ theme }) => theme["gray-500"]};
  }

  &:focus {
    box-shadow: none;
    border-color: ${({ theme }) => theme["blue-500"]};
  }
`;

export const TaskInput = styled(BaseInput)`
  flex: 1;

  &::-webkit-calendar-picker-indicator {
    display: none !important;
  }
`;

export const MinutesAmountInput = styled(BaseInput)`
  width: 4rem;
`;