import * as S from "./style";
import BasicModal from "../BasicModal";
import PropTypes from "prop-types";
import BasicButton from "../../BasicButton";

const AskSignUpModal = ({ handleSetShowModal }) => {
  return (
    <BasicModal handleSetShowModal={handleSetShowModal} width={1}>
      <S.Container>
        <S.Title>You're not a member of don-jo yet</S.Title>
        <S.Description>
          If you sign up now, you can create a personal page to receive
          sponsorship.
        </S.Description>
        <S.SignUpBtn>Sign Up</S.SignUpBtn>
        <S.NoThanks>No Thanks</S.NoThanks>
      </S.Container>
    </BasicModal>
  );
};

export default AskSignUpModal;

AskSignUpModal.propTypes = {
  handleSetShowModal: PropTypes.func.isRequired,
};
