import React, { useEffect, useState } from "react";
import * as S from "./style";
import { useSelector } from "react-redux";
import WishlistItem from "../../../../Common/WishlistItem";
import { wishlist } from "../../../../../data/common";
import WishlistDetailModal from "../../../../Common/Modal/WishlistDetailModal";
import { wishlistAPI } from "../../../../../api/wishlist";

const DashboardWishlist = () => {
  const memberAddress = useSelector((state) => state.web3.walletAddress);
  const [isShowWishlistModal, setShowWishlistModal] = useState(false);
  const [result, setResult] = useState([]);
  const [uid, setUid] = useState(0);
  const [pageNum, setPageNum] = useState(0);

  const handleOpenModal = (id) => {
    setShowWishlistModal(true);
    setUid(id);
  };

  const handleEditWishlistItem = () => {
    console.log("edit wishlist");
  };

  const handleGetWishlist = async () => {
    try {
      const { status, data } = await wishlistAPI.getWishList(
        memberAddress,
        pageNum,
        10
      );
      console.log("success: ", data);
      if (status === 200) {
        setResult(data);
        setPageNum((prev) => prev + 1);
      }
    } catch (error) {
      console.log("error: ", error);
    }
  };

  useEffect(() => {
    console.log("???");
    handleGetWishlist();
  }, []);

  return (
    <S.WishlistContainer isDashboard={true}>
      {result && result.length > 0 ? (
        result.map((item) => (
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

export default DashboardWishlist;
