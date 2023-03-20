import styled from "styled-components";

export const Container = styled.div`
  display: flex;
  margin-bottom: 2.5rem;
  height: 2.5rem;
  width: 9rem;
`;

export const IconContainer = styled.div`
  margin: auto;
  padding: 0.125rem;
  border-radius: 0.25rem;
  cursor: pointer;
  &:hover {
    background-color: var(--color-background-secondary);
  }
`;
