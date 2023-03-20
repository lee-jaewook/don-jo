import styled from "styled-components";

export const SettingWrapper = styled.div`
  width: 100%;
  max-width: 53.75rem;
  background-color: var(--color-modal);
  border-radius: 1.25rem;
  padding: 2rem 1.5rem;
  margin-bottom: 2.5rem;
`;
export const AddButton = styled.button`
  width: 25.25rem;
  height: 12.25rem;
  max-width: 50.75rem;
  border: 2px dashed #d2d2d2;
  border-radius: 1.25rem;
  margin-bottom: 2.5rem;

  &:hover {
    background-color: white;
  }
`;

export const AddIcon = styled.div`
  display: flex;
  width: 3.75rem;
  height: 3.75rem;
  border-radius: 50%;
  background-color: var(--color-text);
  margin: 0 auto;
  align-items: center;
  justify-content: center;
`;
