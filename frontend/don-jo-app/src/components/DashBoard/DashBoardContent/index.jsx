import React from "react";
import { useLocation } from "react-router-dom";
import DashBoardEarning from "../DashBoardEarning";
import DashBoardSupportList from "../DashBoardSupportList";
import * as S from "./style";
const DashBoardContent = () => {
  const location = useLocation();
  return (
    <S.HomeContainer>
      {location.pathname === "/dashboard/home" && (
        <>
          <DashBoardEarning />
          <DashBoardSupportList />
        </>
      )}
    </S.HomeContainer>
  );
};

export default DashBoardContent;
