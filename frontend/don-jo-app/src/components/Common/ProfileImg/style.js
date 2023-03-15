import styled from "styled-components";

export const Circle = styled.div`
  width: ${(props) => props.width}rem;
  height: ${(props) => props.width}rem;

  border-radius: 50%;

  background-size: cover;
  background-image: url("${(props) => props.src}");
`;
