import React, { useState } from "react";
import * as S from "./style";
import PropTypes from "prop-types";
import { useLocation } from "react-router-dom";
import ContractModal from "../../Common/Modal/ContractModal";
import DefaultImg from "../../../assets/img/common/default-profile.svg";

const S3URL = "https://don-jo.s3.ap-northeast-2.amazonaws.com/";

const type = {
  wishlist: "🙏",
  donation: "💰",
  item: "📁",
};

const DashBoardListItem = ({
  supportType,
  from,
  amount,
  arriveTimeStamp,
  transactionHash,
}) => {
  const location = useLocation();
  const [isClickedSupportItem, setClickedSupportItem] = useState(false);

  return isClickedSupportItem ? (
    <ContractModal
      handleSetShowModal={setClickedSupportItem}
      transactionHash={transactionHash}
    />
  ) : (
    <S.ItemWrapper onClick={() => setClickedSupportItem(true)}>
      {location.pathname === "/dashboard/home" && (
        <S.Icon aria-label="icon" role="img">
          {type[supportType]}
        </S.Icon>
      )}
      <S.UserImg
        src={
          !from.memberProfileImagePath
            ? `${DefaultImg}`
            : `${S3URL}${from.memberProfileImagePath}`
        }
        alt="user-img"
      />
      <S.ContentWrapper pathname={location.pathname}>
        <S.UserInfo>
          <S.Supporter>{from.memberNickname}</S.Supporter>
          <S.SponsorshipAmount>
            {amount} <S.Eth>MATIC</S.Eth>
          </S.SponsorshipAmount>
        </S.UserInfo>

        <S.DateWrapper>
          <S.Date>
            {arriveTimeStamp === null
              ? "Processing"
              : new Date(arriveTimeStamp).toDateString()}
          </S.Date>
        </S.DateWrapper>
      </S.ContentWrapper>
      <S.SFiMoreHorizontal size="24px" />
    </S.ItemWrapper>
  );
};

export default DashBoardListItem;

DashBoardListItem.propTypes = {
  supportType: PropTypes.string,
  from: PropTypes.object.isRequired,
  amount: PropTypes.string,
  arrivedDate: PropTypes.string,
  transactionHash: PropTypes.string,
};
