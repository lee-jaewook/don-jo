import { useEffect, useState } from "react";
import * as S from "./style";
import PropTypes from "prop-types";
import { calculateEth } from "../../../../../utils/calculateEth";

const WishlistCard = ({ content }) => {
  // 진행 퍼센티지 계산
  const [percentage, setPercentage] = useState(0.0);
  useEffect(() => {
    setPercentage((content.collectedAmount / content.totalAmount) * 100);
  }, []);

  const S3URL = "https://don-jo.s3.ap-northeast-2.amazonaws.com/";

  return (
    <S.Container>
      <S.TitleContainer>
        <S.Img imgPath={S3URL + content.imgPath} />
        <S.TitleText>{content.title}</S.TitleText>
      </S.TitleContainer>
      <S.GaugeBarContainer>
        <S.GaugeBarBackground />
        <S.GaugeBarActive color="" percentage={percentage} />
      </S.GaugeBarContainer>
      <S.AmountContainer>
        <S.CollectedAmount>
          {calculateEth(content.collectedAmount)}
        </S.CollectedAmount>
        <S.TotalAmount>/{content.totalAmount.toFixed(3)}</S.TotalAmount>
        <S.Unit>matic</S.Unit>
      </S.AmountContainer>
    </S.Container>
  );
};

export default WishlistCard;

WishlistCard.propTypes = {
  content: PropTypes.shape({
    uid: PropTypes.number.isRequired,
    title: PropTypes.string.isRequired,
    imgPath: PropTypes.string,
    collectedAmount: PropTypes.number.isRequired,
    totalAmount: PropTypes.number.isRequired,
  }),
};
