import React, { useEffect, useState } from "react";
import * as S from "./style";
import { useSelector } from "react-redux";
import WishlistItem from "../../../../Common/WishlistItem";
import WishlistDetailModal from "../../../../Common/Modal/WishlistDetailModal";
import { wishlistAPI } from "../../../../../api/wishlist";
import ShowMoreButton from "../../../../Common/ShowMoreButton";
import AddWishlistModal from "../../../../Common/Modal/AddWishlistModal";

const DashboardWishlist = () => {
  const PAGE_SIZE = 6;
  const memberAddress = useSelector((state) => state.member.walletAddress);
  const [isShowWishlistModal, setShowWishlistModal] = useState(false);
  const [isShowWishListModifyModal, setIsShowWishListModifyModal] =
    useState(false);
  const [result, setResult] = useState([]);
  const [uid, setUid] = useState(0);
  const [pageNum, setPageNum] = useState(0);
  const [hasMore, setIsEnd] = useState(false);

  const handleOpenModal = (id) => {
    setShowWishlistModal(true);
    setUid(id);
  };

  const handleSetShowModal = () => {
    setShowWishlistModal(false);
  };

  const handleOnClickButton = () => {
    setShowWishlistModal(false);
    setIsShowWishListModifyModal((prev) => !prev);
  };

  const handleGetWishlist = async () => {
    try {
      const {
        data: { wishlists, hasMore },
      } = await wishlistAPI.getWishList(memberAddress, pageNum, PAGE_SIZE);
      console.log("data?", wishlists);
      setPageNum((prev) => prev + 1);
      setResult((prev) => [...prev, ...(wishlists || [])]);
      setIsEnd(hasMore);
    } catch (error) {}
  };

  useEffect(() => {
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
            isClosed={item.closed}
            description={item.description}
            collectedAmount={item.collectedAmount.toString()}
            totalAmount={item.targetAmount.toString()}
            handleSetShowModal={handleOpenModal}
          />
        ))
      ) : (
        <S.Message>There are no registered wishlist.</S.Message>
      )}

      {hasMore && <ShowMoreButton handleOnClickButton={handleGetWishlist} />}

      {isShowWishlistModal && (
        <WishlistDetailModal
          uid={uid}
          isDashboard={true}
          handleSetShowModal={handleSetShowModal}
          handleOnClickButton={handleOnClickButton}
        />
      )}
      {isShowWishListModifyModal && (
        <AddWishlistModal
          handleSetShowModal={handleOnClickButton}
          callOldData={true}
          wishlistUid={uid}
        />
      )}
    </S.WishlistContainer>
  );
};

export default DashboardWishlist;
