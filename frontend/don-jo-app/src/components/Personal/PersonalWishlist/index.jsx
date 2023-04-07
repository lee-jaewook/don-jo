import * as S from "./style";
import WishlistItem from "../../Common/WishlistItem";
import { FiPlus } from "@react-icons/all-files/fi/FiPlus";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import ShowMoreButton from "../../Common/ShowMoreButton";
import { wishlistAPI } from "../../../api/wishlist";
import PropTypes from "prop-types";
import AddWishlistModal from "../../Common/Modal/AddWishlistModal";
import { PulseLoader } from "react-spinners";
import WishlistDetailModal from "../../Common/Modal/WishlistDetailModal";
import { useDispatch } from "react-redux";
import { setRefreshWishlistStatus } from "../../../stores/wishlist";

const PersonalWishlist = ({ isOwner }) => {
  //현재 페이지의 멤버 지갑주소 정보
  const dispatch = useDispatch();
  const pageMemberAddress = useSelector(
    (state) => state.memberInfo.memberAddress
  ).toLowerCase();
  const refreshWishlistStatus = useSelector((state) => state.wishlist.refreshWishlistStatus)

  const [isShowWishlistDetailModal, setIsShowWishlistDetailModal] =
    useState(false);
  const [isShowWishlistAddModal, setIsShowWishlistAddModal] = useState(false);
  const [thisItemUID, setThisItemUId] = useState(0);

  const [pageNum, setPageNum] = useState(0);
  const PAGE_SIZE = 6;
  const [wishlist, setWishlist] = useState([]);
  const [hasMore, setIsEnd] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const getWishList = async (isUpdated = false) => {
    try {
      const { data } = await wishlistAPI.getWishList(
        pageMemberAddress,
        isUpdated ? 0 : pageNum,
        PAGE_SIZE
      );

      if (isUpdated) {
        setWishlist(data.wishlists || []);
        setPageNum(1);
      } else {
        setWishlist((prev) => [...prev, ...(data.wishlists || [])]);
        setPageNum((prev) => prev + 1);
      }
      setIsEnd(data.hasMore);
      setIsLoading(false);
    } catch (error) {
      console.log("An error occurred in PersonalWishlist.: ", error);
    }
  };

  const refreshWishlist = async () => {
    const { data } = await wishlistAPI.getWishList(
      pageMemberAddress,
      0,
      pageNum * PAGE_SIZE
    )
    setWishlist(data.wishlists || []);
    dispatch(setRefreshWishlistStatus(false));
  }

  useEffect(() => {
    getWishList();
  }, []);

  useEffect(() => {
    if (refreshWishlistStatus && !isShowWishlistDetailModal) {
      refreshWishlist()
    }
  }, [isShowWishlistDetailModal])

  const handleOnClickShowMoreButton = () => {
    getWishList();
  };

  const OwnerOrHasWishList = () => {
    return (
      <S.CardContainer>
        {isOwner && (
          <S.AddCard
            onClick={() => {
              setIsShowWishlistAddModal(true);
            }}
          >
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
                  uid={wishlistItem.id}
                  title={wishlistItem.title}
                  imgPath={wishlistItem.imgPath}
                  description={wishlistItem.description}
                  collectedAmount={wishlistItem.collectedAmount}
                  totalAmount={wishlistItem.targetAmount}
                  thankMsg={wishlistItem.thankMsg}
                  handleSetShowModal={() => {
                    setThisItemUId(wishlistItem.id);
                    setIsShowWishlistDetailModal(true);
                  }}
                  isOwner={isOwner}
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

  const Contents = () => {
    return (
      <>
        {isOwner || wishlist.length !== 0 ? (
          <OwnerOrHasWishList />
        ) : (
          <Nothing />
        )}

        {hasMore && (
          <ShowMoreButton handleOnClickButton={handleOnClickShowMoreButton} />
        )}

        {isShowWishlistAddModal && (
          <AddWishlistModal
            handleSetLoading={setIsLoading}
            handleSetShowModal={() => {
              setIsShowWishlistAddModal(false);
              getWishList(true);
            }}
          />
        )}

        {isShowWishlistDetailModal && (
          <WishlistDetailModal
            handleSetShowModal={setIsShowWishlistDetailModal}
            handleOnClickButton={setIsShowWishlistDetailModal}
            uid={thisItemUID}
            isDashboard={false}
          />
        )}
      </>
    );
  };

  const Loading = () => {
    return (
      <S.LoadingContainer>
        <PulseLoader color="var(--color-primary)" />
      </S.LoadingContainer>
    );
  };

  return (
    <S.Container>
      <S.Title>Support My Wishlist</S.Title>
      {isLoading ? <Loading /> : <Contents />}
    </S.Container>
  );
};

export default PersonalWishlist;

PersonalWishlist.propTypes = {
  isOwner: PropTypes.bool,
};
