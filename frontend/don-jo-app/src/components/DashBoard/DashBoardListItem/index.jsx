import React from "react";
import * as S from "./style";
import { FiMoreHorizontal } from "react-icons/fi";
const DashBoardListItem = () => {
  return (
    <S.ItemWrapper>
      <span aria-label="icon" role="img">
        💰
      </span>
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
