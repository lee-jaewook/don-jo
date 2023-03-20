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
  display: grid;
  justify-content: center;
  grid-template-columns: repeat(3, 1fr);

  @media screen and (max-width: 1190px) {
    grid-template-columns: repeat(2, 1fr);
  }

  @media screen and (max-width: 768px) {
    grid-template-columns: repeat(1, 1fr);
  }
`;

export const AddCard = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  width: 100%;
  max-width: 17.875rem;
  height: 20.1875rem;
  border: 0.125rem dashed #d2d2d2;
  border-radius: 1.25rem;

  &:hover {
    background-color: var(--color-modal);
  }

  @media screen and (max-width: 1190px) {
    max-width: 26rem;
  }

  /* @media screen and (max-width: 768px) {
    
  } */
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
