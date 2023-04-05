import React, { useEffect, useState } from "react";
import * as S from "./style";
import { useSelector } from "react-redux";
import WishlistItem from "../../../../Common/WishlistItem";
import WishlistDetailModal from "../../../../Common/Modal/WishlistDetailModal";
import { wishlistAPI } from "../../../../../api/wishlist";
import ShowMoreButton from "../../../../Common/ShowMoreButton";
import AddWishlistModal from "../../../../Common/Modal/AddWishlistModal";
import PropTypes from "prop-types";

const DashboardWishlist = ({ callApi, setCallApi }) => {
  const PAGE_SIZE = 6;
  const memberAddress = useSelector((state) => state.member.walletAddress);
  const [isShowWishlistModal, setShowWishlistModal] = useState(false);
  const [isShowWishListModifyModal, setIsShowWishListModifyModal] =
    useState(false);
  const [uid, setUid] = useState(0);
  const [pageNum, setPageNum] = useState(0);
  const [result, setResult] = useState([]);
  const [hasMore, setIsEnd] = useState(false);

  const handleOpenModal = (id) => {
    setShowWishlistModal(true);
    setUid(id);
  };

  const handleOnClickButton = () => {
    setShowWishlistModal(false);
    setIsShowWishListModifyModal((prev) => !prev);
  };

  const handleGetWishlist = async (type) => {
    try {
      const {
        data: { wishlists, hasMore },
      } = await wishlistAPI.getWishList(
        memberAddress,
        type === "update" ? 0 : pageNum,
        PAGE_SIZE
      );
      setPageNum((prev) => prev + 1);
      if (type === "update") {
        setResult(wishlists);
        setPageNum(1);
      } else {
        setResult((prev) => [...prev, ...(wishlists || [])]);
      }
      setIsEnd(hasMore);
    } catch (error) {
      console.log("error: ", error);
    }
  };

  const handleUpdateModalOpen = () => {
    setShowWishlistModal(false);
    setIsShowWishListModifyModal(false);
    handleGetWishlist("update");
  };

  useEffect(() => {
    handleGetWishlist();
  }, []);

  useEffect(() => {
    if (callApi) {
      handleGetWishlist("update");
      setCallApi(false);
    }
  }, [callApi]);

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
            collectedAmount={item.collectedAmount}
            totalAmount={item.targetAmount}
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
          handleSetShowModal={handleUpdateModalOpen}
          handleOnClickButton={handleOnClickButton}
        />
      )}
      {isShowWishListModifyModal && (
        <AddWishlistModal
          handleSetShowModal={handleUpdateModalOpen}
          callOldData={true}
          wishlistUid={uid}
        />
      )}
    </S.WishlistContainer>
  );
};

export default DashboardWishlist;

DashboardWishlist.propTypes = {
  callApi: PropTypes.bool,
};
