import * as S from "./style";
import { wishlistList } from "../dummyData";
import WishlistCard from "./WishlistCard";

const HomeWishList = () => {
  return (
    <S.Container>
      <S.Title>Wishlist</S.Title>
      <S.Card>
        {wishlistList.length === 0 ? (
          <S.NoWishlistText>No Wishlist</S.NoWishlistText>
        ) : (
          wishlistList.map((content, i) => {
            return <WishlistCard key={i} content={content} />;
          })
        )}
      </S.Card>
    </S.Container>
  );
};

export default HomeWishList;
