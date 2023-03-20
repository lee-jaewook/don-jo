import * as S from "./style";
import PropTypes from "prop-types";

const ItemCard = ({ item, isOwner }) => {
  const handleOnClickButton = () => {};

  return (
    <S.Container>
      <S.ItemImg imgPath={item.imgPath} />
      <S.DescriptionContainer>
        <S.Title>{item.title}</S.Title>
        <S.Description>{item.description}</S.Description>
        <S.PriceBtnContainer>
          <S.PriceWrapper>
            <S.Price>{item.price.toFixed(3)}</S.Price>
            <S.Unit>eth</S.Unit>
          </S.PriceWrapper>
          <S.BuyBtn color="" onClick={handleOnClickButton} disabled={isOwner}>
            Buy
          </S.BuyBtn>
        </S.PriceBtnContainer>
      </S.DescriptionContainer>
    </S.Container>
  );
};

export default ItemCard;

ItemCard.propTypes = {
  item: PropTypes.shape({
    imgPath: PropTypes.string,
    description: PropTypes.string,
    price: PropTypes.number.isRequired,
  }).isRequired,
  isOwner: PropTypes.bool,
};
