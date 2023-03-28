import React from "react";
import { FiPlus } from "react-icons/fi";
import BasicTitle from "../../../Common/BasicTitle";
import Wishlist from "./DashboardWishlist";
import * as S from "./style";
import AddItemModal from "../../../Common/Modal/AddItemModal";
const WishlistSettings = () => {
<<<<<<< HEAD
  const [isShowWishlistModal, setShowWishlistModal] = useState(false);
  const [isWishListRegisterModal, setIsWishListRegisterModal] = useState(false);

  const handleAddWishListModalOpen = () => {
    setIsWishListRegisterModal((prev) => !prev);
  };

=======
>>>>>>> 462fd9d15b69925077d517cea1c33172568a1b54
  return (
    <S.SettingWrapper>
      <S.AddButton onClick={handleAddWishListModalOpen}>
        <S.AddIcon>
          <FiPlus size="32px" color="white" />
        </S.AddIcon>
      </S.AddButton>
      <BasicTitle text="Wishlist" />
<<<<<<< HEAD
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
=======
      <Wishlist />
>>>>>>> 462fd9d15b69925077d517cea1c33172568a1b54
    </S.SettingWrapper>
  );
};

export default WishlistSettings;
