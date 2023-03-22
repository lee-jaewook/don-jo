import React, { useState } from "react";
import { FiPlus } from "react-icons/fi";
import BasicTitle from "../../../Common/BasicTitle";
import Wishlist from "../../../Common/Wishlist";
import * as S from "./style";
const WishlistSettings = () => {
  const [isShowWishlistModal, setShowWishlistModal] = useState(false);

  return (
    <S.SettingWrapper>
      <S.AddButton>
        <S.AddIcon>
          <FiPlus size="32px" color="white" />
        </S.AddIcon>
      </S.AddButton>
      <BasicTitle text="Wishlist" />
      <Wishlist
        isDashboard={true}
        isShowWishlistModal={isShowWishlistModal}
        handleSetShowModal={setShowWishlistModal}
      />
    </S.SettingWrapper>
  );
};

export default WishlistSettings;
