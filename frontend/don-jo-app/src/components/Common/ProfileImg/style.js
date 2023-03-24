import styled from "styled-components";
import { Link } from "react-router-dom";

export const Circle = styled.div`
  width: ${(props) => props.width}rem;
  height: ${(props) => props.width}rem;

  border-radius: 50%;

  background-size: cover;
  background-image: url("${(props) => props.src}");
`;

export const LinkCustom = styled(Link)`
  cursor: ${(props) => (props.to === "#" ? "default" : "cursor")};
`;
