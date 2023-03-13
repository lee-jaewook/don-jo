import styled from "styled-components";

export const Modal = styled.div`
  height: 100vh;
  width: 100vw;
  z-index: 10;

  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);

  display: flex;
  flex-direction: column;
  height: 100vh;
  background-color: var(--color-background-secondary);
`;

export const ModalHeader = styled.div`
  width: 100%;
  height: 3.75rem;

  display: flex;
  align-items: center;
  justify-content: center;

  background-color: var(--color-background);
`;

export const CloseBtnContainer = styled.div`
  width: 80rem;
  padding: 0 1.5rem;

  display: flex;
  justify-content: flex-end;
`;

export const ModalBody = styled.div`
  flex: 1; //헤더를 제외한 높이를 이 div의 높이로 설정

  display: flex;
  align-items: center;
  justify-content: center;
`;

export const ContentCard = styled.div`
  width: 53.75rem;
  min-height: 20rem;

  background-color: var(--color-modal);
  border-radius: 1.25rem;

  padding: 2rem 1.5rem;
`;

export const Content = styled.div``;

export const ButtonContainer = styled.div`
  width: 100%;

  display: flex;
  justify-content: center;
`;
