import React from "react";
import * as S from "./style";
import PropTypes from "prop-types";
import { FiMoreHorizontal } from "react-icons/fi";
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
      <S.UserInfo>
        <S.Supporter>userName</S.Supporter>
        <S.SponsorshipAmount>
          100.000 <S.Eth>eth</S.Eth>
        </S.SponsorshipAmount>
      </S.UserInfo>
      <S.DateWrapper>
        <S.Date>2023.02.28</S.Date>
        <FiMoreHorizontal size="24px" />
      </S.DateWrapper>
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
