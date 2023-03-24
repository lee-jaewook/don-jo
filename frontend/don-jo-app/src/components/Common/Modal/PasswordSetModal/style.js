import styled from "styled-components";

export const Title = styled.div`
  font-family: RobotoBold;
  font-size: 1.75rem;
  margin-bottom: 1.5rem;
  color: ${(props) => (props.isWrong ? "red" : "var(--color-text)")};
`;

export const Description = styled.div`
  font-size: 1.25rem;
  color: ${(props) => (props.isWrong ? "red" : "var(--color-text)")};

  @media screen and (max-width: 48rem) {
    height: 20px;
  }
`;

export const PasswordContainer = styled.div`
  height: 15.1875rem;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 26.125rem;

  @media screen and (max-width: 48rem) {
    height: 8rem;
    width: unset;
  }
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
  /* background-color: ${(props) =>
    props.isEnable ? "var(--color-primary)" : "var(--color-text-third)"}; */

  background-color: ${(props) =>
    props.isWrong
      ? "red"
      : props.isEnable
      ? "var(--color-primary)"
      : "var(--color-text-third)"};
`;

export const KeypadContainer = styled.div`
  width: 100%;
  height: 18rem;
  display: flex;
  flex-wrap: wrap;
`;

export const KeypadButton = styled.button`
  width: 33.33%;
  height: 25%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-family: RobotoBold;
  font-size: 1.75rem;

  &:active {
    opacity: 0.4;
  }
`;
