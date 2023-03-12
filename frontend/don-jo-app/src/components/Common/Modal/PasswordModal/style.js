import styled from "styled-components";

export const BackgroundOpacity = styled.div`
  height: 100vh;
  width: 100vw;
  z-index: 10;

  background-color: #000000;
  opacity: 0.2;
`;

export const BackgroundBlur = styled.div`
  height: 100vh;
  width: 100vw;
  z-index: 11;

  backdrop-filter: blur(1.25rem);

  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
`;

export const Modal = styled.div`
  width: 33rem;
  max-height: 47.25rem;
  z-index: 12;

  background-color: var(--color-modal);
  border-radius: 1.25rem;

  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);

  box-sizing: border-box;
  padding: 1rem 1.5rem 1.25rem 1.5rem;

  display: flex;
  flex-direction: column;
`;

export const CloseContainer = styled.div`
  width: 100%;
  height: 3.75rem;

  display: flex;
  align-items: center;
  justify-content: flex-end;
`;

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
