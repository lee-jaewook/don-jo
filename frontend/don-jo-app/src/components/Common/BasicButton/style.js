import styled from "styled-components";

export const Button = styled.button`
  width: 100%;
  height: 3rem;
  font-size: 1rem;
  font-weight: 500;
  line-height: 1.188rem;
  border-radius: 1.5rem;
  font-family: "RobotoMedium";
  border: ${(props) => (props.isBackground ? "none" : "2px solid black")};
  color: ${(props) => (props.isBackground ? "white" : props.color)};
  background-color: ${(props) => (props.isBackground ? props.color : "white")};
`;
