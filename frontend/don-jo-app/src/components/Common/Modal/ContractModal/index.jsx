import * as S from "./style";
import { Mobile } from "../../Template";
import BasicModal from "../BasicModal";
import FullScreenModal from "../FullScreenModal";
import PropTypes from "prop-types";
import ProfileImg from "../../ProfileImg";
import { useMediaQuery } from "react-responsive";
import { useEffect, useState } from "react";
import { FiRefreshCcw } from "@react-icons/all-files/fi/FiRefreshCcw";
import blockchain from "../../../../assets/img/common/blockchain.jpg";
import { supportApi } from "../../../../api/support";
import { calculateEth } from "../../../../utils/calculateEth";

const DesktopTablet = ({ children }) => {
  const isDesktopTablet = useMediaQuery({ minWidth: 769 });
  return isDesktopTablet ? children : null;
};

const ContractInfo = ({ supportContent, uid, toMemberAddress }) => {
  const [refreshedTime, setRefreshedTime] = useState("");

  const getRefreshedTime = () => {
    let now = new Date();
    let hours = ("0" + now.getHours()).slice(-2);
    let minutes = ("0" + now.getMinutes()).slice(-2);
    let seconds = ("0" + now.getSeconds()).slice(-2);
    let timeString = hours + ":" + minutes + ":" + seconds;
    setRefreshedTime(timeString);
  };

  const [contractDetail, setContractDetail] = useState({
    amount: 0.0,
    arriveTimeStamp: "",
    sendTimeStamp: "",
    from: {
      fromMemberProfileImagePath: "",
    },
    to: {
      toMemberProfileImagePath: "",
    },
  });

  const [isArrived, setIsArrived] = useState(false);
  const getSupportContent = async () => {
    const { data } = await supportApi.getSupportDetail(uid, toMemberAddress);
    if (data.arriveTimeStamp) setIsArrived(true);
    setContractDetail(data);
  };

  const refresh = () => {
    getRefreshedTime();
    getSupportContent();
  };

  useEffect(() => {
    refresh();
  }, []);

  return (
    <div>
      <S.Title>Support</S.Title>
      <S.ProgressContainer>
        <S.RefreshContainer>
          Refreshed at {refreshedTime}
          <S.RefreshIconWrapper onClick={refresh}>
            <FiRefreshCcw color="var(--color-text-secondary)" size={18} />
          </S.RefreshIconWrapper>
        </S.RefreshContainer>
        <S.ProgressWrapper>
          <S.Bar isFirst={true} isEnable={true} />
          <S.Bar isFirst={false} isEnable={isArrived} />

          {/* 보낸 사람 */}
          <S.ProfileContainer>
            <S.ProfileWrapper isEnable={true}>
              <ProfileImg
                width={3}
                src={contractDetail.from.fromMemberProfileImagePath}
              />
            </S.ProfileWrapper>
            <S.Tag>Supporter</S.Tag>
          </S.ProfileContainer>

          {/* 컨트랙트 */}
          <S.ProfileContainer isMiddle={true}>
            <S.ProfileWrapper isEnable={true}>
              <ProfileImg width={3} src={blockchain} isLocalSrc={true} />
            </S.ProfileWrapper>
            <S.Tag>Contract</S.Tag>
          </S.ProfileContainer>

          {/* 받는 사람 */}
          <S.ProfileContainer>
            <S.ProfileWrapper isEnable={isArrived}>
              <ProfileImg
                width={3}
                src={contractDetail.to.toMemberProfileImagePath}
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
            <label>{contractDetail.from.fromMemberNickname}</label>
            <label>{contractDetail.from.fromMemberAddress}</label>
          </S.TextContainer>
        </S.Wrapper>
        <S.Wrapper>
          <S.Type>Creator</S.Type>
          <S.TextContainer>
            <label>{contractDetail.to.toMemberNickname}</label>
            <label>{contractDetail.to.toMemberAddress}</label>
          </S.TextContainer>
        </S.Wrapper>
        <S.Wrapper>
          <S.Type>Amount</S.Type>
          <div>
            <S.Amount>{calculateEth(contractDetail.amount)}</S.Amount>
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
              <S.TimeText>{contractDetail.sendTimeStamp}</S.TimeText>
            </S.TimeContainer>
            <S.TimeContainer>
              <label style={{ color: "var(--color-text-secondary)" }}>
                Arrived:
              </label>
              <S.TimeText>{contractDetail.arriveTimeStamp}</S.TimeText>
            </S.TimeContainer>
          </S.TextContainer>
        </S.Wrapper>
      </S.InfoContainer>
    </div>
  );
};

const ContractModal = ({ handleSetShowModal, uid, toMemberAddress }) => {
  return (
    <>
      <DesktopTablet>
        <BasicModal handleSetShowModal={handleSetShowModal}>
          <ContractInfo uid={uid} toMemberAddress={toMemberAddress} />
        </BasicModal>
      </DesktopTablet>
      <Mobile>
        <FullScreenModal handleSetShowModal={handleSetShowModal}>
          <ContractInfo uid={uid} toMemberAddress={toMemberAddress} />
        </FullScreenModal>
      </Mobile>
    </>
  );
};

export default ContractModal;

ContractModal.propTypes = {
  handleSetShowModal: PropTypes.func.isRequired,
  uid: PropTypes.number.isRequired,
  toMemberAddress: PropTypes.string.isRequired,
};
