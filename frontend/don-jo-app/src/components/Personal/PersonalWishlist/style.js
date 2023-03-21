import styled from "styled-components";

export const Container = styled.div`
  width: 100%;
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
`;

export const WishlistItemWrapper = styled.div`
  margin-bottom: 2rem;
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
  background-color: ${(props) => (props.color ? props.color : "black")};
  height: 3.75rem;
  width: 3.75rem;
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
`;
