import React from "react";
import PropTypes from "prop-types";
import * as S from "./style";
import { calculateEth } from "../../../utils/calculateEth";
const S3URL = "https://don-jo.s3.ap-northeast-2.amazonaws.com/";

const WishlistItem = ({
  isDashboard = false,
  handleSetShowModal,
  uid,
  imgPath,
  title,
  description,
  collectedAmount,
  totalAmount,
  isClosed,
}) => {
  // 후원 상태바 계산을 위한 함수
  const handleCalcProgressState = () => {
    if (Number(collectedAmount) >= Number(totalAmount)) {
      return 100;
    }
    return (Number(collectedAmount) / Number(totalAmount)) * 100;
  };

  return (
    <S.ItemWrapper
      id={uid}
      isDashboard={isDashboard}
      bgColor={isClosed ? "#EFEFEF" : "white"}
      onClick={isDashboard ? () => handleSetShowModal(uid) : undefined}
    >
      <S.ItemContent>
        <S.ItemImg src={`${S3URL}${imgPath}`} />
        <S.ItemInformation>
          <S.Title>{title}</S.Title>
          <S.Description>
            {description.length >= 42
              ? `${description.substr(0, 41)}...`
              : description}
          </S.Description>
          {!isDashboard && (
            <S.SupportButton onClick={handleSetShowModal}>
              Support
            </S.SupportButton>
          )}
        </S.ItemInformation>
      </S.ItemContent>
      <S.ProgressBarWrapper>
        <S.ProgressBar isDashboard={isDashboard}>
          <S.ProgressState currentState={handleCalcProgressState()} />
        </S.ProgressBar>
        <S.AmountWrapper>
          <S.ProgressAmount>{calculateEth(collectedAmount)}</S.ProgressAmount>
          <S.ProgressAmount isAllAmount={true}>
            /{calculateEth(totalAmount)} <S.Eth>MATIC</S.Eth>
          </S.ProgressAmount>
        </S.AmountWrapper>
      </S.ProgressBarWrapper>
    </S.ItemWrapper>
  );
};

export default WishlistItem;

WishlistItem.propTypes = {
  isDashboard: PropTypes.bool,
  handleSetShowModal: PropTypes.func,
  uid: PropTypes.number.isRequired,
  imgPath: PropTypes.string,
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  collectedAmount: PropTypes.string.isRequired,
  totalAmount: PropTypes.string.isRequired,
  thankMsg: PropTypes.string,
};
