import * as S from "./style";
import { FiX } from "react-icons/fi";
import PropTypes from "prop-types";
import { useEffect } from "react";

const FullScreenModal = ({ handleSetShowModal, children }) => {
  //모달 열릴때 외부 요소 스크롤 막기
  useEffect(() => {
    document.body.style.overflowY = "hidden";
  }, []);

  //모달 닫힐 때 외부 요소 스크롤 허용
  const closeModal = () => {
    document.body.style.overflowY = "auto";
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

export default FullScreenModal;

FullScreenModal.propTypes = {
  handleSetShowModal: PropTypes.func.isRequired,
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]).isRequired,
};
