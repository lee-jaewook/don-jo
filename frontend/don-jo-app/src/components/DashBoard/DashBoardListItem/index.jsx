import React from "react";
import * as S from "./style";
import PropTypes from "prop-types";
import { useLocation } from "react-router-dom";
const S3URL = "https://don-jo.s3.ap-northeast-2.amazonaws.com/";

const type = {
  wishlist: "🙏",
  donation: "💰",
  item: "📁",
};

const DashBoardListItem = ({ supportType, from, amount, arriveTimeStamp }) => {
  const location = useLocation();

  return (
    <S.ItemWrapper>
      {location.pathname === "/dashboard/home" && (
        <S.Icon aria-label="icon" role="img">
          {type[supportType]}
        </S.Icon>
      )}
      <S.UserImg
        src={`${S3URL}${from.fromMemberProfileImagePath}`}
        alt="user-img"
      />
      <S.ContentWrapper pathname={location.pathname}>
        <S.UserInfo>
          <S.Supporter>{from.fromMemberNickname}</S.Supporter>
          <S.SponsorshipAmount>
            {amount} <S.Eth>eth</S.Eth>
          </S.SponsorshipAmount>
        </S.UserInfo>

        <S.DateWrapper>
          <S.Date>{arriveTimeStamp === null ? "Now" : arriveTimeStamp}</S.Date>
        </S.DateWrapper>
      </S.ContentWrapper>
      <S.SFiMoreHorizontal size="24px" />
    </S.ItemWrapper>
  );
};

export default DashBoardListItem;

DashBoardListItem.propTypes = {
  uid: PropTypes.number.isRequired,
  supportType: PropTypes.string,
  from: PropTypes.object.isRequired,
  amount: PropTypes.string,
  arrivedDate: PropTypes.string,
};
