import React, { useCallback, useState } from "react";
import { FiPlus } from "react-icons/fi";
import BasicTitle from "../../../Common/BasicTitle";
import WishlistDetailModal from "../../../Common/Modal/WishlistDetailModal";
import Wishlist from "../../../Common/Wishlist";
import * as S from "./style";
const WishlistSettings = () => {
  const [isShowWishlistModal, setShowWishlistModal] = useState(false);

  const handleEditWishlistItem = useCallback(() => {
    console.log("handleEditWishlist()...");
  }, []);

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
      {isShowWishlistModal && (
        <WishlistDetailModal
          handleSetShowModal={setShowWishlistModal}
          handleOnClickButton={handleEditWishlistItem}
          isDashboard={true}
        />
      )}
    </S.SettingWrapper>
  );
};

export default WishlistSettings;
