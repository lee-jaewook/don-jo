import * as S from "./style";
import { Mobile } from "../../Template";
import BasicModal from "../BasicModal";
import FullScreenModal from "../FullScreenModal";
import PropTypes from "prop-types";
import ProfileImg from "../../ProfileImg";
import { useMediaQuery } from "react-responsive";
import { useEffect, useState } from "react";
import { FiRefreshCcw } from "react-icons/fi";
import blockchain from "../../../../assets/img/common/blockchain.jpg";

const DesktopTablet = ({ children }) => {
  const isDesktopTablet = useMediaQuery({ minWidth: 769 });
  return isDesktopTablet ? children : null;
};

const ContractInfo = () => {
  const [refreshedTime, setRefreshedTime] = useState("");

  const getRefreshedTime = () => {
    let now = new Date();
    let hours = ("0" + now.getHours()).slice(-2);
    let minutes = ("0" + now.getMinutes()).slice(-2);
    let seconds = ("0" + now.getSeconds()).slice(-2);
    let timeString = hours + ":" + minutes + ":" + seconds;
    setRefreshedTime(timeString);
  };

  useEffect(() => {
    getRefreshedTime();
  }, []);

  return (
    <div>
      <S.Title>Support</S.Title>
      <S.ProgressContainer>
        <S.RefreshContainer>
          Refreshed at {refreshedTime}
          <S.RefreshIconWrapper onClick={getRefreshedTime}>
            <FiRefreshCcw color="var(--color-text-secondary)" size={18} />
          </S.RefreshIconWrapper>
        </S.RefreshContainer>
        <S.ProgressWrapper>
          <S.Bar isFirst={true} isEnable={true} />
          <S.Bar isFirst={false} isEnable={false} />

          {/* 보낸 사람 */}
          <S.ProfileContainer>
            <S.ProfileWrapper isEnable={true}>
              <ProfileImg
                width={3}
                src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQpEewiU8DvuCtpyAO0pb5xQaSQYQcCTobUDw&usqp=CAU"
              />
            </S.ProfileWrapper>
            <S.Tag>Supporter</S.Tag>
          </S.ProfileContainer>

          {/* 컨트랙트 */}
          <S.ProfileContainer isMiddle={true}>
            <S.ProfileWrapper isEnable={true}>
              <ProfileImg width={3} src={blockchain} />
            </S.ProfileWrapper>
            <S.Tag>Contract</S.Tag>
          </S.ProfileContainer>

          {/* 받는 사람 */}
          <S.ProfileContainer>
            <S.ProfileWrapper isEnable={false}>
              <ProfileImg
                width={3}
                src="https://img.insight.co.kr/static/2023/01/06/700/img_20230106141320_ai905341.webp"
              />
            </S.ProfileWrapper>
            <S.Tag>Creator</S.Tag>
          </S.ProfileContainer>
        </S.ProgressWrapper>
      </S.ProgressContainer>
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
          <div>
            <S.Amount>1000.000</S.Amount>
            <S.Unit>eth</S.Unit>
          </div>
        </S.Wrapper>
        <S.Wrapper>
          <S.Type>Time stamp</S.Type>
          <S.TextContainer>
            <S.TimeContainer>
              <label style={{ color: "var(--color-text-secondary)" }}>
                Send:
              </label>
              <S.TimeText>2023.03.01 12:48:23</S.TimeText>
            </S.TimeContainer>
            <S.TimeContainer>
              <label style={{ color: "var(--color-text-secondary)" }}>
                Arrived:
              </label>
              <S.TimeText>2023.03.01 12:50:43</S.TimeText>
            </S.TimeContainer>
          </S.TextContainer>
        </S.Wrapper>
      </S.InfoContainer>
    </div>
  );
};

const ContractModal = ({ handleSetShowModal,  }) => {
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
