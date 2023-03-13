import * as S from "./style";
import { FiX } from "react-icons/fi";

export const FullScreenModal = ({ handleSetShowModal }) => {
  const closeModal = () => {
    handleSetShowModal(false);
  };

  return (
    <S.Modal>
      <S.ModalHeader>
        <S.CloseBtnContainer>
          <FiX size="26" color="#666666" onClick={() => closeModal()} />
        </S.CloseBtnContainer>
      </S.ModalHeader>

      <S.ModalBody>
        <S.ContentCard>
          <S.Content></S.Content>
          <S.ButtonContainer></S.ButtonContainer>
        </S.ContentCard>
      </S.ModalBody>
    </S.Modal>
  );
};
