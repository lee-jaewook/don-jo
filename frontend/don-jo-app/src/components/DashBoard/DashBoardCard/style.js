import styled from "styled-components";

export const Container = styled.div`
  display: flex;
  width: 16.375rem;
  height: 9.625rem;
  flex-direction: column;
  border-radius: 0.5rem;
  background-color: white;
  padding: 2rem 1.5rem;
  &:first-child {
    background-color: var(--color-primary);
  }

  @media (max-width: 1280px) {
    width: 100%;
    height: 6.625rem;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 1rem;
  }
`;

export const Classification = styled.p`
  font-family: "RobotoMedium";
  font-size: 1rem;
  line-height: 1.188rem;
  color: ${(props) => (props.isFirstCard ? "white" : "var(--color-text)")};
  margin-bottom: 1.5rem;
  @media (max-width: 1280px) {
    margin-bottom: 0rem;
  }
`;

export const Data = styled.h2`
  font-family: "RobotoBold";
  font-size: 2.5rem;
  line-height: 1.6888rem;
  color: ${(props) => (props.isFirstCard ? "white" : "var(--color-text)")};
  @media (max-width: 1280px) {
    font-size: 2.25rem;
    line-height: 2.625rem;
  }
`;

export const Unit = styled.label`
  font-family: "RobotoRegular";
  color: ${(props) =>
    props.isFirstCard ? "white" : "var(--color-text-third)"};
  font-size: 1.5rem;
  line-height: 1.75rem;
  margin-left: 0.25rem;
`;
