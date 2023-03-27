import * as S from "./style";
import WishlistItem from "../../Common/WishlistItem";
import { FiPlus } from "react-icons/fi";
import { useEffect, useState } from "react";
import { wishlist } from "./dummyData";
import WishlistDetailModal from "../../Common/Modal/WishlistDetailModal";
import { useSelector } from "react-redux";
import ShowMoreButton from "../../Common/ShowMoreButton";

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

  const handleOnClickShowMoreButton = () => {
    console.log("Show More");
  };

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
            <S.WishlistItemWrapper key={wishlistItem.uid}>
              <WishlistItem
                onClick={() => setThisItemUId(wishlistItem.uid)}
                uid={wishlistItem.uid}
                title={wishlistItem.title}
                imgPath={wishlistItem.imgPath}
                description={wishlistItem.description}
                collectedAmount={wishlistItem.collectedAmount.toFixed(3)}
                totalAmount={wishlistItem.totalAmount.toFixed(3)}
                thankMsg={wishlistItem.thankMsg}
                handleSetShowModal={setIsShowWishlistDetailModal}
                isDashboard={isOwner}
              />
            </S.WishlistItemWrapper>
          );
        })}
      </S.CardContainer>

      <ShowMoreButton handleOnClickButton={handleOnClickShowMoreButton} />

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
