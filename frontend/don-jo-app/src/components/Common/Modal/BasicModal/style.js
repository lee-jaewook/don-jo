import styled from "styled-components";

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

export const Modal = styled.div`
  width: ${(props) => props.width || "33"}rem;
  max-height: 47.25rem;
  z-index: 12;
  background-color: var(--color-modal);
  border-radius: 1.25rem;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  box-sizing: border-box;
  padding: 1rem 1.5rem 2.5rem 1.5rem;
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

export const Content = styled.div`
  width: 100%;
  overflow-y: auto;
`;
