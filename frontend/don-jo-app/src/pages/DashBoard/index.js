import React from "react";
import { Desktop, Mobile } from "../../components/Common/Template";
import DashBoardContent from "../../components/DashBoard/DashBoardContent";
import NavBar from "../../components/DashBoard/NavBar";
import * as S from "./style";
const DashBoard = () => {
  return (
    <S.Container>
      <S.DashboardWrapper>
        <Desktop>
          <NavBar />
        </Desktop>
        <Mobile>
          <button>메뉴</button>
        </Mobile>
        <DashBoardContent />
      </S.DashboardWrapper>
    </S.Container>
  );
};

export default DashBoard;
