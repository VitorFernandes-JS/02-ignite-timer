import styled from "styled-components";

export const HomeContainer = styled.main`
  flex: 1;

  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  form {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 3.5rem;
  }
`;

const BaseCountdownButton = styled.button`
  width: 100%;
  border: 0;
  padding: 1rem;
  border-radius: 8px;

  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;

  cursor: pointer;
  color: ${({ theme }) => theme["gray-100"]};
  font-size: 1.25rem;
  font-weight: 500;
  transition: background-color 0.2s;
`;

export const StopCountdownButton = styled(BaseCountdownButton)`
  background: ${({ theme }) => theme["red-500"]};

  &:hover {
    background: ${({ theme }) => theme["red-700"]};
  }
`;

export const StartCountdownButton = styled(BaseCountdownButton)`
  background: ${({ theme }) => theme["blue-700"]};

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }

  &:not(:disabled):hover {
    background: ${({ theme }) => theme["blue-300"]};
  }
`;
