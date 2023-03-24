import * as S from "./style";
import PropTypes from "prop-types";
import PasswordModal from "../../../Common/Modal/PasswordSetModal";
import { useState } from "react";

const ItemCard = ({ item, isOwner }) => {
  const [isShowPasswordModal, setSetIsShowPasswordModal] = useState(false);
  const handleOnClickButton = () => {
    setSetIsShowPasswordModal(true);
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
          {isOwner && (
            <S.BuyBtn color="" onClick={handleOnClickButton}>
              Buy
            </S.BuyBtn>
          )}
        </S.PriceBtnContainer>
      </S.DescriptionContainer>
      {isShowPasswordModal && (
        <PasswordModal handleSetShowModal={setSetIsShowPasswordModal} />
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
