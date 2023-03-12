import styled from "styled-components";

export const Circle = styled.div`
  width: ${(props) => props.width || "2.5"}rem;
  height: ${(props) => props.width || "2.5"}rem;

  border-radius: 50%;

  background-size: cover;
  background-image: url("${(props) =>
    props.src || "https://t1.daumcdn.net/cfile/tistory/2513B53E55DB206927"}");
`;
