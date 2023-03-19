import * as S from "./style";
import WishlistItem from "../../Common/WishlistItem";
import { FiPlus } from "react-icons/fi";
import { useEffect, useState } from "react";
import { wishlistList } from "./dummyData";

//현재 로그인한 유저 더미 데이터
const loginUser = {
  memberAddress: "memberaddress",
  nickname: "taehyun",
};

//해당 페이지 사람 더미 데이터
const pageOwner = {
  memberAddress: "memberaddress",
  profileImgPath:
    "https://img.insight.co.kr/static/2023/01/06/700/img_20230106141320_ai905341.webp",
  backgroundImgPath:
    "https://cloudfront-ap-northeast-1.images.arcpublishing.com/chosun/Q5WX26BXPG3CB5COPKO6AU2P54.png",
  nickname: "Robert Downey Jr.",
  introduction:
    "This is Example introduction. It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here', making it look like readable English. Many desktop publishing packages and web page editors now use Lorem Ipsum as their default model text, and a search for 'lorem ipsum' will uncover many web sites still in their infancy. This is Example introduction. It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here', making it look like readable English. Many desktop publishing packages and web page editors now use Lorem Ipsum as their default model text, and a search for 'lorem ipsum' will uncover many web sites still in their infancy.",
  numSupporters: 16000,
  socialList: [
    "https://www.youtube.com/@SamsungKorea",
    "https://velog.io/@taebong1012",
    "https://github.com/taebong1012",
  ],
};

const PersonalWishlist = () => {
  //로그인 유저가 페이지 주인인지 확인
  const [isOwner, setIsOwner] = useState(false);
  useEffect(() => {
    setIsOwner(loginUser.memberAddress === pageOwner.memberAddress);
  }, []);

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
        {wishlistList.map((wishlist) => {
          return (
            <S.WishlistItemWrapper key={wishlist.uid}>
              <WishlistItem
                uid={wishlist.uid}
                title={wishlist.title}
                imgPath={wishlist.imgPath}
                description={wishlist.description}
                collectedAmount={wishlist.collectedAmount.toFixed(3)}
                totalAmount={wishlist.totalAmount.toFixed(3)}
                thankMsg={wishlist.thankMsg}
              />
            </S.WishlistItemWrapper>
          );
        })}
      </S.CardContainer>
    </S.Container>
  );
};

export default PersonalWishlist;
