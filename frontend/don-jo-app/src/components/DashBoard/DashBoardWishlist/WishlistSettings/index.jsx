import React, { useState } from "react";
import { FiPlus } from "@react-icons/all-files/fi/FiPlus.js";
import BasicTitle from "../../../Common/BasicTitle";
import DashboardWishlist from "./DashboardWishlist";
import * as S from "./style";
import AddWishlistModal from "../../../Common/Modal/AddWishlistModal";

const WishlistSettings = () => {
  const [isWishListRegisterModal, setIsWishListRegisterModal] = useState(false);
  const [callApi, setCallApi] = useState(false);

  const handleAddWishListModalOpen = () => {
    setIsWishListRegisterModal((prev) => !prev);
  };

  const handleCallApiChange = () => {
    setCallApi(false);
  };
  return (
    <S.SettingWrapper>
      <S.AddButton onClick={handleAddWishListModalOpen}>
        <S.AddIcon>
          <FiPlus size="32px" color="white" />
        </S.AddIcon>
      </S.AddButton>
      <BasicTitle text="Wishlist" />
      {isWishListRegisterModal && (
        <AddWishlistModal
          handleSetShowModal={() => {
            setIsWishListRegisterModal(false);
            setCallApi(true);
          }}
        />
      )}
      <DashboardWishlist callApi={callApi} setCallApi={handleCallApiChange} />
    </S.SettingWrapper>
  );
};

export default WishlistSettings;
