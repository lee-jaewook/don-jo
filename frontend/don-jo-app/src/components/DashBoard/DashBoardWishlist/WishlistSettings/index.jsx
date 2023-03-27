import React, { useState } from "react";
import { FiPlus } from "react-icons/fi";
import BasicTitle from "../../../Common/BasicTitle";
import Wishlist from "../../../Common/Wishlist";
import * as S from "./style";
import AddItemModal from "../../../Common/Modal/AddItemModal";
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
      <Wishlist
        isDashboard={true}
        isShowWishlistModal={isShowWishlistModal}
        handleSetShowModal={setShowWishlistModal}
      />
      {isWishListRegisterModal && (
        <AddItemModal
          handleSetShowModal={handleAddWishListModalOpen}
          whichApiChoos={false}
          imageTitle="Featured Image"
        />
      )}
    </S.SettingWrapper>
  );
};

export default WishlistSettings;
