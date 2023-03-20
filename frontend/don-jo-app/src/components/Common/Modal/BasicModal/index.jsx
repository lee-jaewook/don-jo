import { useEffect } from "react";
import * as S from "./style";
import PropTypes from "prop-types";
import { FiX } from "react-icons/fi";

const BasicModal = ({ handleSetShowModal, children, width }) => {
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
    <div>
      <S.BackgroundOpacity />
      <S.BackgroundBlur onClick={closeModal} />
      <S.Modal width={width}>
        <S.CloseContainer>
          <FiX size="26" color="#666666" onClick={closeModal} />
        </S.CloseContainer>
        <S.Content>{children}</S.Content>
      </S.Modal>
    </div>
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
