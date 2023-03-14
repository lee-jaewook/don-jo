import React from "react";
import DashBoardContent from "../../components/DashBoard/DashBoardContent";
import NavBar from "../../components/DashBoard/NavBar";
import * as S from "./style";
const DashBoard = () => {
  return (
    <S.Container>
      <S.DashboardWrapper>
        <NavBar />
        <DashBoardContent />
      </S.DashboardWrapper>
    </S.Container>
  );
};

export default DashBoard;
