import styled from "styled-components";

export const Modal = styled.div`
  height: 100%;
  width: 100vw;
  z-index: 10;
  position: fixed;
  top: 0;
  left: 0;
  display: flex;
  flex-direction: column;
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

export const CloseBtnWrapper = styled.div`
  cursor: pointer;
`;

export const ModalBody = styled.div`
  flex: 1; //헤더를 제외한 높이를 이 div의 높이로 설정
  display: flex;
  /* align-items: center; */
  /* justify-content: center; */
  overflow-y: auto;
`;

export const ContentCardWrapper = styled.div`
  margin: auto;
  max-width: 100%;
`;

export const ContentCard = styled.div`
  min-width: 10px;
  max-width: 100%;
  min-height: 20rem;
  background-color: var(--color-modal);
  border-radius: 1.25rem;
  padding: 2rem 1.5rem;
  margin: 0.75rem;
  box-sizing: border-box;
`;

export const ButtonContainer = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
`;
