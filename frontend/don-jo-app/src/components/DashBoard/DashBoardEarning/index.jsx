import React from "react";
import BasicTitle from "../../Common/BasicTitle";
import DashBoardCard from "../DashBoardCard";
import * as S from "./style";
const DashBoardEarning = () => {
  return (
    <S.EarningWrapper>
      <BasicTitle text="Earnings" />
      <S.CardWrapper>
        <DashBoardCard />
        <DashBoardCard />
        <DashBoardCard />
      </S.CardWrapper>
    </S.EarningWrapper>
  );
};

export default DashBoardEarning;
