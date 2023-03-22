import React from "react";
import * as S from "./style";
import PropTypes from "prop-types";
import { FiUser, FiEdit, FiCreditCard } from "react-icons/fi";

const ListItem = ({
  uid,
  imgPath,
  title,
  collectedAmount,
  totalAmount,
  supportCount,
}) => {
  const handleEditItem = () => {
    console.log("handleEditItem()...");
  };

  return (
    <S.ItemWrapper uid={uid}>
      <S.ItemInfoWrapper>
        <S.ItemImg src={imgPath} alt="item-img" />
        <S.ItemInfo>
          <S.InfoText size="0.875rem">{title}</S.InfoText>
          <S.InfoText>
            {collectedAmount}
            <S.Unit>eth</S.Unit>
          </S.InfoText>
        </S.ItemInfo>
      </S.ItemInfoWrapper>
      <S.Count>
        <FiUser style={{ marginRight: "2px" }} />
        {supportCount}
      </S.Count>
      <S.Count>
        <FiCreditCard
          size="16px"
          color="var(--color-text)"
          style={{ marginRight: "2px" }}
        />
        {totalAmount}
        <S.Unit>eth</S.Unit>
      </S.Count>
      <button onClick={handleEditItem}>
        <FiEdit size="24px" color="var(--color-text-secondary)" />
      </button>
    </S.ItemWrapper>
  );
};

export default ListItem;

ListItem.propTypes = {
  uid: PropTypes.number.isRequired,
  imgPath: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  collectedAmount: PropTypes.string.isRequired,
  totalAmount: PropTypes.string.isRequired,
  supportCount: PropTypes.number,
};
