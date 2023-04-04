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
  display: grid;
  justify-content: center;
  grid-template-columns: repeat(3, 1fr);
  gap: 1.3125rem;
  place-items: center;

  @media screen and (max-width: 58.75rem) {
    grid-template-columns: repeat(2, 1fr);
  }

  @media screen and (max-width: 48rem) {
    display: flex;
    flex-direction: column;
    width: 100%;
    gap: 0.75rem;
  }
`;

export const AddCard = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  width: 17.875rem;
  height: 20.1875rem;
  border: 0.125rem dashed #d2d2d2;
  border-radius: 1.25rem;
  margin-bottom: 0.6875rem;

  &:hover {
    background-color: var(--color-modal);
  }

  @media screen and (max-width: 48rem) {
    width: 100%;
    margin-bottom: unset;
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
