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
            <label>Tom</label>
            <label>0xb890800CA5f2b802758FC30AE1f2b3663796331A</label>
          </S.TextContainer>
        </S.Wrapper>
        <S.Wrapper>
          <S.Type>Creator</S.Type>
          <S.TextContainer>
            <label>Robert Downey Jr.</label>
            <label>0xb890800CA5f2b802758FC30AE1f2b3663796332B</label>
          </S.TextContainer>
        </S.Wrapper>
        <S.Wrapper>
          <S.Type>Amount</S.Type>
          <S.Amount>1000.000</S.Amount>
          <S.Unit>eth</S.Unit>
        </S.Wrapper>
        <S.Wrapper>
          <S.Type>Time stamp</S.Type>
          <S.TextContainer>
            <S.TimeContainer>
              <label>Send: &nbsp;</label>
            </S.TimeContainer>
            <S.TimeContainer>
              <label>Arrived:</label>
            </S.TimeContainer>
          </S.TextContainer>
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
