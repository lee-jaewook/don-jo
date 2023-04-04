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

const PersonalWishlist = ({ isOwner }) => {
  //현재 페이지의 멤버 지갑주소 정보
  const pageMemberAddress = useSelector(
    (state) => state.memberInfo.memberAddress
  ).toLowerCase();

  const [isShowWishlistDetailModal, setIsShowWishlistDetailModal] =
    useState(false);
  const [isShowWishlistAddModal, setIsShowWishlistAddModal] = useState(false);
  const [thisItemUID, setThisItemUId] = useState(0);

  const [pageNum, setPageNum] = useState(0);
  const PAGE_SIZE = 6;
  const [wishlist, setWishlist] = useState([]);
  const [hasMore, setIsEnd] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

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
      setIsLoading(false);
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

  const doDonateWishlist = () => {
    console.log("위시리스트 후원하기");
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
                  collectedAmount={wishlistItem.collectedAmount.toString()}
                  totalAmount={wishlistItem.targetAmount.toString()}
                  thankMsg={wishlistItem.thankMsg}
                  handleSetShowModal={() => {
                    setThisItemUId(wishlistItem.id);
                    setIsShowWishlistDetailModal(true);
                  }}
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
          <AddWishlistModal handleSetShowModal={setIsShowWishlistAddModal} />
        )}

        {isShowWishlistDetailModal && (
          <WishlistDetailModal
            handleSetShowModal={setIsShowWishlistDetailModal}
            handleOnClickButton={() => setIsShowWishlistDetailModal(false)}
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
