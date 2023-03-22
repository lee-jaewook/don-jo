import { useEffect } from "react";
import * as S from "./style";
import PropTypes from "prop-types";
import { FiX } from "react-icons/fi";
import { createPortal } from "react-dom";

const BasicModal = ({ handleSetShowModal, children, width }) => {
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
    <S.Container>
      <S.BackgroundOpacity />
      <S.BackgroundBlur onClick={closeModal} />
      <S.Modal width={width}>
        <S.CloseContainer>
          <FiX
            size="26"
            color="#666666"
            onClick={closeModal}
            style={{ cursor: "pointer" }}
          />
        </S.CloseContainer>
        <S.Content>{children}</S.Content>
      </S.Modal>
    </S.Container>,
    document.getElementById("modal")
  );
};

export default BasicModal;

BasicModal.propTypes = {
  handleSetShowModal: PropTypes.func.isRequired,
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]).isRequired,
  width: PropTypes.number,
};
