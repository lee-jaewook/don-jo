import styled from "styled-components";

export const Container = styled.div`
  width: 100%;
  max-width: 16.375rem;
  height: 9.625rem;
  border-radius: 0.5rem;
  background-color: white;
  padding: 2rem 1.5rem;

  &:first-child {
    background-color: black;
  }
`;

export const Classification = styled.p`
  font-family: "RobotoMedium";
  font-size: 1rem;
  line-height: 1.188rem;
  color: ${(props) => (props.isFirstCard ? "white" : "var(--color-text)")};
  margin-bottom: 1.5rem;
`;

export const Data = styled.h2`
  font-family: "RobotoBold";
  font-size: 2.5rem;
  line-height: 1.6888rem;
  color: ${(props) => (props.isFirstCard ? "white" : "var(--color-text)")};
`;

export const Unit = styled.label`
  font-family: "RobotoRegular";
  color: ${(props) =>
    props.isFirstCard ? "white" : "var(--color-text-third)"};
  font-size: 1.5rem;
  line-height: 1.75rem;
  margin-left: 0.25rem;
`;
