import React from "react";
import { FiPlus } from "react-icons/fi";
import BasicTitle from "../../../Common/BasicTitle";
import Wishlist from "../../../Common/Wishlist";
import * as S from "./style";
const WishlistSettings = () => {
  return (
    <S.SettingWrapper>
      <S.AddButton>
        <S.AddIcon>
          <FiPlus size="32px" color="white" />
        </S.AddIcon>
      </S.AddButton>
      <BasicTitle text="Wishlist" />
      <Wishlist isDashboard={true} />
    </S.SettingWrapper>
  );
};

export default WishlistSettings;
