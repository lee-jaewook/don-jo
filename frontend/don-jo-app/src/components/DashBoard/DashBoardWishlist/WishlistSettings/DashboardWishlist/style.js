import styled from "styled-components";

export const WishlistContainer = styled.div`
  width: 100%;
  max-width: 56.25rem;
  min-height: 6.25rem;
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 2rem 0.75rem;
  background-color: ${(props) =>
    props.isDashboard ? "var(--color-modal)" : "white"};

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    justify-items: center;
  }
`;

export const Message = styled.label`
  width: 100%;
  font-size: 1rem;
  color: var(--color-text-secondary);
  justify-items: center;
  background-color: transparent;
  text-align: center;
  line-height: 6.25rem;
  grid-column: 1 / 3;
`;
