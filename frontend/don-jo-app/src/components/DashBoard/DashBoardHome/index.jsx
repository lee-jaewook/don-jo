import React from "react";
import * as S from "./style";
import DashBoardEarning from "../DashBoardEarning";
import DashBoardSupportList from "../DashBoardSupportList";
const DashBoardHome = () => {
  return (
    <S.HomeContainer>
      <DashBoardEarning text="Earnings" />
      <DashBoardSupportList />
    </S.HomeContainer>
  );
};

export default DashBoardHome;
