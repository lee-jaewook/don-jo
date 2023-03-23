import styled from "styled-components";

export const Title = styled.div`
  font-family: RobotoBold;
  font-size: 1.75rem;
  margin-bottom: 1.5rem;
`;

export const Description = styled.div`
  font-size: 1.25rem;
`;

export const PasswordContainer = styled.div`
  height: 15.1875rem;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const PasswordWrapper = styled.div`
  margin: auto;
  display: flex;
  gap: 1.25rem;
`;

export const Circle = styled.div`
  width: 1.5625rem;
  height: 1.5625rem;
  border-radius: 50%;
  background-color: ${(props) =>
    props.isEnable ? "var(--color-primary)" : "var(--color-text-third)"};
`;

export const KeypadContainer = styled.div`
  width: 100%;
  height: 20rem;
  font-family: RobotoBold;
  font-size: 1.75rem;
  display: flex;
  flex-wrap: wrap;
`;

export const KeypadButton = styled.div`
  width: 33.33%;
  height: 25%;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
`;
