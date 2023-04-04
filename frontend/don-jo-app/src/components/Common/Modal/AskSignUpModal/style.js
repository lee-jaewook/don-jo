import { symbol } from "prop-types";
import styled from "styled-components";

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
  text-align: center;
`;

export const Title = styled.label`
  font-family: "RobotoBold";
  font-size: 1.25rem;
  margin-bottom: 1rem;
`;

export const Description = styled.label`
  margin-bottom: 2rem;
  line-height: 120%;
  width: 300px;
`;

export const SignUpBtn = styled.button`
  width: 100%;
  max-width: 10rem;
  height: 3rem;
  font-family: "RobotoMedium";
  font-size: 1rem;
  margin-bottom: 0.8rem;
  border: 2px solid;
  background-color: black;
  border-radius: 1.5rem;
  color: white;

  &:hover {
    background-color: white;
    color: black;
  }
`;

export const NoThanks = styled.label`
  color: var(--color-text-secondary);
  cursor: pointer;

  &:hover {
    text-decoration: underline;
    text-decoration-color: var(--color-text-secondary);
  }
`;
