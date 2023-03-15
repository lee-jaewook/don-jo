import React from "react";
import { useLocation } from "react-router-dom";
import DashBoardAccount from "../DashBoardAccount";
import DashBoardButtons from "../DashBoardButtons";
import DashBoardDonation from "../DashBoardDonation";
import DashBoardHome from "../DashBoardHome";
import DashBoardItems from "../DashBoardItems";
import DashBoardWishlist from "../DashBoardWishlist";
import * as S from "./style";
const DashBoardContent = () => {
  const location = useLocation();
  return (
    <S.HomeContainer>
      {location.pathname === "/dashboard/home" && <DashBoardHome />}
      {location.pathname === "/dashboard/donation" && <DashBoardDonation />}
      {location.pathname === "/dashboard/items" && <DashBoardItems />}
      {location.pathname === "/dashboard/wishlist" && <DashBoardWishlist />}
      {location.pathname === "/dashboard/buttons" && <DashBoardButtons />}
      {location.pathname === "/dashboard/account" && <DashBoardAccount />}
    </S.HomeContainer>
  );
};

export default DashBoardContent;
