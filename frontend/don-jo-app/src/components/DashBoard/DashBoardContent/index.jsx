import React from "react";
import { useLocation } from "react-router-dom";
import DashBoardAccount from "../DashBoardAccount";
import DashBoardButtons from "../DashBoardButtons";
import DashBoardDonation from "../DashBoardDonation";
import DashBoardHome from "../DashBoardHome";
import DashBoardItems from "../DashBoardItems";
import DashBoardWishlist from "../DashBoardWishlist";
import * as S from "./style";

const contents = {
  "/dashboard/home": <DashBoardHome />,
  "/dashboard/donation": <DashBoardDonation />,
  "/dashboard/items": <DashBoardItems />,
  "/dashboard/wishlist": <DashBoardWishlist />,
  "/dashboard/buttons": <DashBoardButtons />,
  "/dashboard/account": <DashBoardAccount />,
};

const DashBoardContent = () => {
  const location = useLocation();
  return <S.HomeContainer>{contents[location.pathname]}</S.HomeContainer>;
};

export default DashBoardContent;
