import React, { useState } from "react";
import { FiPlus } from "@react-icons/all-files/fi/FiPlus.js";
import BasicTitle from "../../../Common/BasicTitle";
import DashboardWishlist from "./DashboardWishlist";
import * as S from "./style";
import AddWishlistModal from "../../../Common/Modal/AddWishlistModal";

const WishlistSettings = () => {
  const [isShowWishlistModal, setShowWishlistModal] = useState(false);
  const [isWishListRegisterModal, setIsWishListRegisterModal] = useState(false);

  const handleAddWishListModalOpen = () => {
    setIsWishListRegisterModal((prev) => !prev);
  };

  return (
    <S.SettingWrapper>
      <S.AddButton onClick={handleAddWishListModalOpen}>
        <S.AddIcon>
          <FiPlus size="32px" color="white" />
        </S.AddIcon>
      </S.AddButton>
      <BasicTitle text="Wishlist" />
      <DashboardWishlist />
      {isWishListRegisterModal && (
        <AddWishlistModal handleSetShowModal={handleAddWishListModalOpen} />
      )}
    </S.SettingWrapper>
  );
};

export default WishlistSettings;
