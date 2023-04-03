import styled from "styled-components";

export const Container = styled.div`
  width: 100%;

  @media screen and (max-width: 48rem) {
    max-width: 20.625rem;
    margin: 0 auto;
  }
`;

export const Title = styled.div`
  font-family: "RobotoBold";
  font-size: 1.25rem;
  margin-bottom: 0.75rem;
`;

export const CardContainer = styled.div`
  width: 100%;
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 1.25rem;

  @media screen and (max-width: 48rem) {
    display: flex;
    flex-direction: column;
    grid-template-columns: unset;
    gap: 0.75rem;
  }
`;

export const WishlistItemWrapper = styled.div`
  margin-bottom: 0.75rem;

  @media screen and (max-width: 48rem) {
    margin-bottom: unset;
  }

  ${(props) =>
    props.disabled &&
    `
    pointer-events: none;
  `}
`;

export const AddCard = styled.div`
  cursor: pointer;
  width: 100%;
  max-width: 27.5rem;
  height: 12.25rem;
  display: flex;
  justify-content: center;
  align-items: center;
  border: 0.125rem dashed #d2d2d2;
  border-radius: 1.25rem;

  &:hover {
    background-color: var(--color-modal);
  }
`;

export const IconWrapper = styled.div`
  background-color: ${(props) =>
    props.color ? props.color : "var(--color-primary)"};
  height: 3.75rem;
  width: 3.75rem;
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const Nothing = styled.div`
  width: 100%;
  height: 18.75rem;
  border-radius: 1.25rem;
  background-color: var(--color-modal);
  font-family: "RobotoMedium";
  font-size: 1.25rem;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const LoadingContainer = styled.div`
  width: 100%;
  height: 18.75rem;
  display: flex;
  justify-content: center;
  align-items: center;
`;
