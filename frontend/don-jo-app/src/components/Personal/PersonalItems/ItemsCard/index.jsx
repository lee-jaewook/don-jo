import * as S from "./style";
import PropTypes from "prop-types";
import { useEffect, useState } from "react";
import ItemDetailModal from "../../../Common/Modal/ItemDetailModal";

const ItemCard = ({ item, isOwner }) => {
  const [isShowItemDetailModal, setIsShowItemDetailModal] = useState(false);
  const doBuy = () => {
    // 해당 아이템을 구매하는 api
    console.log("buy");
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
          {!isOwner && (
            <S.BuyBtn
              color=""
              onClick={() => {
                setIsShowItemDetailModal(true);
              }}
            >
              Buy
            </S.BuyBtn>
          )}
        </S.PriceBtnContainer>
      </S.DescriptionContainer>
      {isShowItemDetailModal && (
        <ItemDetailModal
          handleSetShowModal={setIsShowItemDetailModal}
          uid={item.uid}
          handleOnClickButton={doBuy}
        />
      )}
    </S.Container>
  );
};

export default ItemCard;

ItemCard.propTypes = {
  item: PropTypes.shape({
    imgPath: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
  }).isRequired,
  isOwner: PropTypes.bool,
};
