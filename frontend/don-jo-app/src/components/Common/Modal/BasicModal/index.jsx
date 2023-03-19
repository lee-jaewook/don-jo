import * as S from "./style";
import PropTypes from "prop-types";
import { FiX } from "react-icons/fi";

const BasicModal = ({ handleSetShowModal, children, width }) => {
  const closeModal = () => {
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
