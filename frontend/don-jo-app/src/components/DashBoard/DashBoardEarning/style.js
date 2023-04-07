import styled from "styled-components";

export const EarningWrapper = styled.div`
  width: 100%;
  background-color: var(--color-modal);
  border-radius: 1.25rem;
  padding: 2rem 1.5rem;
  margin-bottom: 2.5rem;

  @media (max-width: 768px) {
    background-color: transparent;
    margin-bottom: 0.5rem;
    padding: 2rem 1.25rem;
  }
`;

export const CardWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  @media (max-width: 1280px) {
    flex-direction: column;
  }
`;
