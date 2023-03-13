import * as S from "./style";
import { FiX } from "react-icons/fi";

export const FullScreenModal = ({ handleSetShowModal, children }) => {
  const closeModal = () => {
    handleSetShowModal(false);
  };

  return (
    <S.Modal>
      <S.ModalHeader>
        <S.CloseBtnContainer>
          <FiX size="26" color="#666666" onClick={closeModal} />
        </S.CloseBtnContainer>
      </S.ModalHeader>

      <S.ModalBody>
        <S.ContentCard>{children}</S.ContentCard>
      </S.ModalBody>
    </S.Modal>
  );
};
