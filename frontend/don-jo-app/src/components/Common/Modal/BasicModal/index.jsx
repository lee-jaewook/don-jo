import * as S from "./style";
import { FiX } from "react-icons/fi";

export const BasicModal = ({ handleSetShowModal, children }) => {
  const closeModal = () => {
    handleSetShowModal(false);
  };

  return (
    <div>
      <S.BackgroundOpacity />
      <S.BackgroundBlur onClick={closeModal} />
      <S.Modal>
        <S.CloseContainer>
          <FiX size="26" color="#666666" onClick={closeModal} />
        </S.CloseContainer>
        <S.Content>{children}</S.Content>
      </S.Modal>
    </div>
  );
};
