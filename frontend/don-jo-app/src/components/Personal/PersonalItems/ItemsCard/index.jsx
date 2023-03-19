import * as S from "./style";

const ItemCard = ({ item, isOwner }) => {
  const handleOnClickButton = () => {
    console.log(isOwner);
  };

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
