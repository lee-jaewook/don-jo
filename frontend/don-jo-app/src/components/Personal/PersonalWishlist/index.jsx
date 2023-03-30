import * as S from "./style";
import WishlistItem from "../../Common/WishlistItem";
import { FiPlus } from "@react-icons/all-files/fi/FiPlus";
import { useEffect, useState } from "react";
import WishlistDetailModal from "../../Common/Modal/WishlistDetailModal";
import { useSelector } from "react-redux";
import ShowMoreButton from "../../Common/ShowMoreButton";
import { wishlistAPI } from "../../../api/wishlist";
import PropTypes from "prop-types";

const PersonalWishlist = ({ isOwner }) => {
  //현재 페이지의 멤버 지갑주소 정보
  const pageMemberAddress = useSelector(
    (state) => state.memberInfo.memberAddress
  ).toLowerCase();

  const [isShowWishlistDetailModal, setIsShowWishlistDetailModal] =
    useState(false);
  const [thisItemUID, setThisItemUId] = useState(0);

  const [pageNum, setPageNum] = useState(0);
  const PAGE_SIZE = 6;
  const [wishlist, setWishlist] = useState([]);
  const [hasMore, setIsEnd] = useState(false);

  const getWishList = async () => {
    try {
      const { data } = await wishlistAPI.getWishList(
        pageMemberAddress,
        pageNum,
        PAGE_SIZE
      );
      setPageNum((prev) => prev + 1);
      setWishlist((prev) => [...prev, ...(data.wishlists || [])]);
      setIsEnd(data.hasMore);
    } catch (error) {
      console.log("error: ", error);
    }
  };

  useEffect(() => {
    getWishList();
  }, []);

  const handleOnClickShowMoreButton = () => {
    console.log("Show More");
    getWishList();
  };

  const OwnerOrHasWishList = () => {
    return (
      <S.CardContainer>
        {isOwner && (
          <S.AddCard>
            <S.IconWrapper>
              <FiPlus color="white" size={30} />
            </S.IconWrapper>
          </S.AddCard>
        )}
        {wishlist.map((wishlistItem) => {
          if (!wishlistItem.closed) {
            return (
              <S.WishlistItemWrapper key={wishlistItem.id} disabled={isOwner}>
                <WishlistItem
                  onClick={() => setThisItemUId(wishlistItem.id)}
                  uid={wishlistItem.id}
                  title={wishlistItem.title}
                  imgPath={wishlistItem.imgPath}
                  description={wishlistItem.description}
                  collectedAmount={wishlistItem.collectedAmount.toString()}
                  totalAmount={wishlistItem.targetAmount.toString()}
                  thankMsg={wishlistItem.thankMsg}
                  handleSetShowModal={setIsShowWishlistDetailModal}
                  isDashboard={isOwner}
                />
              </S.WishlistItemWrapper>
            );
          } else {
            return null;
          }
        })}
      </S.CardContainer>
    );
  };

  const Nothing = () => {
    return <S.Nothing>There's no wishlists 🥲</S.Nothing>;
  };

  return (
    <S.Container>
      <S.Title>Support My Wishlist</S.Title>

      {isOwner || wishlist.length !== 0 ? <OwnerOrHasWishList /> : <Nothing />}

      {hasMore && (
        <ShowMoreButton handleOnClickButton={handleOnClickShowMoreButton} />
      )}

      {isShowWishlistDetailModal && (
        <WishlistDetailModal
          uid={thisItemUID}
          isDashboard={false}
          handleSetShowModal={setIsShowWishlistDetailModal}
          handleOnClickButton={() => {}}
        />
      )}
    </S.Container>
  );
};

export default PersonalWishlist;

PersonalWishlist.propTypes = {
  isOwner: PropTypes.bool,
};
