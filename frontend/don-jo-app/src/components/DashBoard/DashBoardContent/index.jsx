import React from "react";
import { useLocation } from "react-router-dom";
import DashBoardDonation from "../DashBoardDonation";
import DashBoardHome from "../DashBoardHome";
import * as S from "./style";
const DashBoardContent = () => {
  const location = useLocation();
  return (
    <S.HomeContainer>
      {location.pathname === "/dashboard/home" && <DashBoardHome />}
      {location.pathname === "/dashboard/donation" && <DashBoardDonation />}
    </S.HomeContainer>
  );
};

export default DashBoardContent;
