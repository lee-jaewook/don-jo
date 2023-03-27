import React, { useState } from "react";
import WishlistItem from "../WishlistItem";
import * as S from "./style";
import { wishlist } from "../../../data/common";
import WishlistDetailModal from "../Modal/WishlistDetailModal";

const Wishlist = () => {
  const [isShowWishlistModal, setShowWishlistModal] = useState(false);
  const [uid, setUid] = useState(0);

  const handleOpenModal = (id) => {
    setShowWishlistModal(true);
    setUid(id);
  };

  const handleEditWishlistItem = () => {
    console.log("edit wishlist");
  };

  return (
    <S.WishlistContainer isDashboard={true}>
      {wishlist && wishlist.length > 0 ? (
        wishlist.map((item) => (
          <WishlistItem
            key={item.id}
            isDashboard={true}
            uid={item.id}
            imgPath={item.imgPath}
            title={item.title}
            description={item.description}
            collectedAmount={item.collectedAmount}
            totalAmount={item.totalAmount}
            handleSetShowModal={setShowWishlistModal}
            onClick={() => handleOpenModal(item.id)}
          />
        ))
      ) : (
        <S.Message>There are no registered wishlist.</S.Message>
      )}

      {isShowWishlistModal && (
        <WishlistDetailModal
          uid={uid}
          isDashboard={true}
          handleSetShowModal={setShowWishlistModal}
          handleOnClickButton={handleEditWishlistItem}
        />
      )}
    </S.WishlistContainer>
  );
};

export default Wishlist;
