import { Link } from "react-router-dom";
import styled from "styled-components";

export const Container = styled.div`
  width: 100%;
  height: 100vh;
  background-color: white;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

export const NotFound = styled.h1`
  font-family: "RobotoBold";
  font-size: 4rem;
  line-height: 4.6875rem;
  color: var(--color-text);
  margin-top: 3rem;

  @media (max-width: 768px) {
    font-size: 2.5rem;
  }
`;

export const IntroLink = styled(Link)`
  margin-top: 2rem;
  font-size: 1.5rem;
  text-decoration: underline;
`;
