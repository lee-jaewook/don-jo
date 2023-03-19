import styled from "styled-components";

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  width: 100vw;
  height: calc(var(--vh, 1vh) * 100);
  max-width: 528px;
  max-height: 756px;
`;

export const BackgroundOpacity = styled.div`
  height: calc(var(--vh, 1vh) * 100);
  width: 100vw;
  z-index: 10;
  background-color: #000000;
  opacity: 0.2;
`;

export const BackgroundBlur = styled.div`
  height: calc(var(--vh, 1vh) * 100);
  width: 100vw;
  z-index: 11;
  backdrop-filter: blur(1.25rem);
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
`;
