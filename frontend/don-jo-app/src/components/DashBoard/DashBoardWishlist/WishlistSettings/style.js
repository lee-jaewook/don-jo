import styled from "styled-components";

export const SettingWrapper = styled.div`
  width: 100%;
  background-color: var(--color-modal);
  border-radius: 1.25rem;
  padding: 2rem 1.5rem;
  margin-bottom: 2.5rem;
  @media (max-width: 768px) {
    padding: 2rem 1.25rem;
  }

  @media (max-width: 1280px) {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
  }
`;
export const AddButton = styled.button`
  width: 100%;
  height: 12.25rem;
  max-width: 25.25rem;
  border: 2px dashed #d2d2d2;
  border-radius: 1.25rem;
  margin-bottom: 2.5rem;

  &:hover {
    background-color: white;
  }

  @media (max-width: 769px) {
    align-self: center;
  }
`;

export const AddIcon = styled.div`
  display: flex;
  width: 3.75rem;
  height: 3.75rem;
  border-radius: 50%;
  background-color: var(--color-primary);
  margin: 0 auto;
  align-items: center;
  justify-content: center;
`;
