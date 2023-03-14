import React from "react";
import NavBar from "../../components/DashBoard/NavBar";
import * as S from "./style";
const DashBoard = () => {
  return (
    <S.Container>
      <S.DashboardWrapper>
        <NavBar />
      </S.DashboardWrapper>
    </S.Container>
  );
};

export default DashBoard;
