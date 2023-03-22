import React from "react";
import * as S from "./style";
import PropTypes from "prop-types";
import { FiUser, FiCreditCard } from "react-icons/fi";
import { useMediaQuery } from "react-responsive";

const ListItem = ({
  uid,
  setUid,
  imgPath,
  title,
  collectedAmount,
  totalAmount,
  supportCount,
  handleShowItemDetailModal,
}) => {
  const isMobile = useMediaQuery({ maxWidth: 578 });

  return (
    <S.ItemWrapper
      onClick={() => {
        setUid(uid);
        handleShowItemDetailModal(true);
      }}
    >
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

      {!isMobile && (
        <>
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
        </>
      )}
    </S.ItemWrapper>
  );
};

export default ListItem;

ListItem.propTypes = {
  uid: PropTypes.number.isRequired,
  setUid: PropTypes.func.isRequired,
  imgPath: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  collectedAmount: PropTypes.string.isRequired,
  totalAmount: PropTypes.string.isRequired,
  supportCount: PropTypes.number,
  handleShowItemDetailModal: PropTypes.func.isRequired,
};
