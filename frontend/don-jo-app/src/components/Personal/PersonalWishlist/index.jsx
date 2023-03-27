import * as S from "./style";
import WishlistItem from "../../Common/WishlistItem";
import { FiPlus } from "react-icons/fi";
import { useEffect, useState } from "react";
import WishlistDetailModal from "../../Common/Modal/WishlistDetailModal";
import { useSelector } from "react-redux";
import ShowMoreButton from "../../Common/ShowMoreButton";
import { wishlistAPI } from "../../../api/wishlist";

const PersonalWishlist = () => {
  //로그인 유저의 지갑주소 정보
  const loginUserMemberAddress = useSelector(
    (state) => state.web3.walletAddress
  );

  //현재 페이지의 멤버 지갑주소 정보
  const pageMemberAddress = useSelector(
    (state) => state.memberInfo.memberAddress
  ).toLowerCase();

  //로그인 유저가 페이지 주인인지 확인
  const [isOwner, setIsOwner] = useState(false);
  useEffect(() => {
    setIsOwner(pageMemberAddress === loginUserMemberAddress);
  }, []);

  const [isShowWishlistDetailModal, setIsShowWishlistDetailModal] =
    useState(false);
  const [thisItemUID, setThisItemUId] = useState(0);

  const [pageNum, setPageNum] = useState(0);
  const PAGE_SIZE = 6;
  const [wishlist, setWishlist] = useState([]);
  const [hasMore, setIsEnd] = useState(false);

  const getWishList = async () => {
    const { data } = await wishlistAPI.getWishList(
      pageMemberAddress,
      pageNum,
      PAGE_SIZE
    );
    setPageNum((prev) => prev + 1);
    setWishlist([...wishlist, ...data.wishlists]);
    setIsEnd(data.hasMore);
  };

  useEffect(() => {
    getWishList();
  }, []);

  const handleOnClickShowMoreButton = () => {
    console.log("Show More");
    getWishList();
  };

  const S3URL = "https://don-jo.s3.ap-northeast-2.amazonaws.com/";

  return (
    <S.Container>
      <S.Title>Support My Wishlist</S.Title>
      <S.CardContainer>
        {isOwner && (
          <S.AddCard>
            <S.IconWrapper>
              <FiPlus color="white" size={30} />
            </S.IconWrapper>
          </S.AddCard>
        )}
        {wishlist.map((wishlistItem) => {
          return (
            <S.WishlistItemWrapper key={wishlistItem.id} disabled={isOwner}>
              <WishlistItem
                onClick={() => setThisItemUId(wishlistItem.id)}
                uid={wishlistItem.id}
                title={wishlistItem.title}
                imgPath={S3URL + wishlistItem.imgPath}
                description={wishlistItem.description}
                collectedAmount={wishlistItem.collectedAmount.toString()}
                totalAmount={wishlistItem.targetAmount.toString()}
                thankMsg={wishlistItem.thankMsg}
                handleSetShowModal={setIsShowWishlistDetailModal}
                isDashboard={isOwner}
              />
            </S.WishlistItemWrapper>
          );
        })}
      </S.CardContainer>

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
