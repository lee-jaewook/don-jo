import React from "react";
import * as S from "./style";
import PropTypes from "prop-types";
import { useLocation } from "react-router-dom";
const DashBoardListItem = ({
  supportType,
  from,
  to,
  amountEth,
  arrivedDate,
}) => {
  const location = useLocation();

  return (
    <S.ItemWrapper>
      {location.pathname === "/dashboard/home" && (
        <S.Icon aria-label="icon" role="img">
          💰
        </S.Icon>
      )}
      <S.UserImg src="" alt="user-img" />
      <S.ContentWrapper pathname={location.pathname}>
        <S.UserInfo>
          <S.Supporter>userName</S.Supporter>
          <S.SponsorshipAmount>
            100.000 <S.Eth>eth</S.Eth>
          </S.SponsorshipAmount>
        </S.UserInfo>
        <S.DateWrapper>
          <S.Date>2023.02.28</S.Date>
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
  to: PropTypes.object.isRequired,
  amountEth: PropTypes.string.isRequired,
  arrivedDate: PropTypes.string.isRequired,
};
