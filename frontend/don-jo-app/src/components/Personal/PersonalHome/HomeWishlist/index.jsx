import * as S from "./style";
import WishlistCard from "./WishlistCard";
import PropTypes from "prop-types";

const HomeWishList = ({ wishListData }) => {
  return (
    <S.Container>
      <S.Title>Wishlist</S.Title>
      <S.Card>
        {wishListData.length === 0 ? (
          <S.NoWishlistText>No Wishlist</S.NoWishlistText>
        ) : (
          wishListData.map((content, i) => {
            return <WishlistCard key={i} content={content} />;
          })
        )}
      </S.Card>
    </S.Container>
  );
};

export default HomeWishList;

HomeWishList.propTypes = {
  wishListData: PropTypes.array,
};
