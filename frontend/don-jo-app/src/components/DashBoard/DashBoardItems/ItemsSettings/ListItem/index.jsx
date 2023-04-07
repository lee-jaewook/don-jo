import React from "react";
import * as S from "./style";
import PropTypes from "prop-types";
import { FiUser } from "@react-icons/all-files/fi/FiUser.js";
import { FiCreditCard } from "@react-icons/all-files/fi/FiCreditCard.js";
import { useMediaQuery } from "react-responsive";

const S3URL = "https://don-jo.s3.ap-northeast-2.amazonaws.com/";

const ListItem = ({
  uid,
  setUid,
  imgPath,
  title,
  price,
  deleted,
  totalAmount,
  supportCount,
  handleShowItemDetailModal,
}) => {
  const isMobile = useMediaQuery({ maxWidth: 578 });

  return (
    <S.ItemWrapper
      deleted={deleted}
      onClick={() => {
        setUid(uid);
        handleShowItemDetailModal(true);
      }}
    >
      <S.ItemInfoWrapper>
        <S.ItemImg src={`${S3URL}${imgPath}`} alt="item-img" />
        <S.ItemInfo>
          <S.InfoText size="0.875rem">{title}</S.InfoText>
          <S.InfoText>
            {price}
            <S.Unit>MATIC</S.Unit>
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
            <S.Unit>MATIC</S.Unit>
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
  deleted: PropTypes.bool.isRequired,
  totalAmount: PropTypes.string.isRequired,
  supportCount: PropTypes.number,
  handleShowItemDetailModal: PropTypes.func.isRequired,
};
