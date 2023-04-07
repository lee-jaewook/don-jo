import * as S from "./style";
import { FiX } from "@react-icons/all-files/fi/FiX.js";
import PropTypes from "prop-types";
import { useEffect } from "react";
import { createPortal } from "react-dom";

const FullScreenModal = ({ handleSetShowModal, children }) => {
  //모달 열릴때 외부 요소 스크롤 막기
  useEffect(() => {
    document.body.style.overflow = "hidden";
  }, []);

  //모달 닫힐 때 외부 요소 스크롤 허용
  const closeModal = () => {
    document.body.style.overflow = "auto";
    handleSetShowModal(false);
  };

  return createPortal(
    <S.Modal>
      <S.ModalHeader>
        <S.CloseBtnContainer>
          <S.CloseBtnWrapper onClick={closeModal}>
            <FiX size="26" color="#666666" />
          </S.CloseBtnWrapper>
        </S.CloseBtnContainer>
      </S.ModalHeader>

      <S.ModalBody>
        <S.ContentCardWrapper>
          <S.ContentCard>{children}</S.ContentCard>
        </S.ContentCardWrapper>
      </S.ModalBody>
    </S.Modal>,
    document.getElementById("modal")
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
