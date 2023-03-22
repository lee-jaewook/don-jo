import * as S from "./style";
import { Mobile } from "../../Template";
import BasicModal from "../BasicModal";
import FullScreenModal from "../FullScreenModal";
import PropTypes from "prop-types";
import { useMediaQuery } from "react-responsive";

const DesktopTablet = ({ children }) => {
  const isDesktopTablet = useMediaQuery({ minWidth: 769 });
  return isDesktopTablet ? children : null;
};

const ContractInfo = () => {
  return (
    <div>
      <S.Title>Support</S.Title>
      <S.ProgressContainer></S.ProgressContainer>
      <S.InfoContainer>
        <S.Wrapper>
          <S.Type>Supporter</S.Type>
          <S.TextContainer>
            <S.Text>Tom</S.Text>
            <S.Text>0xb890800CA5f2b802758FC30AE1f2b3663796331A</S.Text>
          </S.TextContainer>
        </S.Wrapper>
        <S.Wrapper>
          <S.Type>Creator</S.Type>
        </S.Wrapper>
        <S.Wrapper>
          <S.Type>Supporter</S.Type>
        </S.Wrapper>
        <S.Wrapper>
          <S.Type>Supporter</S.Type>
        </S.Wrapper>
        <S.Wrapper>
          <S.Type>Supporter</S.Type>
        </S.Wrapper>
      </S.InfoContainer>
    </div>
  );
};

const ContractModal = ({ handleSetShowModal }) => {
  return (
    <>
      <DesktopTablet>
        <BasicModal handleSetShowModal={handleSetShowModal}>
          <ContractInfo />
        </BasicModal>
      </DesktopTablet>
      <Mobile>
        <FullScreenModal handleSetShowModal={handleSetShowModal}>
          <ContractInfo />
        </FullScreenModal>
      </Mobile>
    </>
  );
};

export default ContractModal;

ContractModal.propTypes = {
  handleSetShowModal: PropTypes.func.isRequired,
};
