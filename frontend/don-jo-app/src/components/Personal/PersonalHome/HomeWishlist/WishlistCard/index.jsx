import { useEffect, useState } from "react";
import * as S from "./style";

const WishlistCard = ({ content }) => {
  // 진행 퍼센티지 계산
  const [percentage, setPercentage] = useState(0.0);
  useEffect(() => {
    setPercentage((content.collectedAmount / content.totalAmount) * 100);
  }, []);

  return (
    <S.Container>
      <S.TitleContainer>
        <S.Img imgPath={content.imgPath} />
        <S.TitleText>{content.title}</S.TitleText>
      </S.TitleContainer>
      <S.GaugeBarContainer>
        <S.GaugeBarBackground />
        <S.GaugeBarActive color="" percentage={percentage} />
      </S.GaugeBarContainer>
      <S.AmountContainer>
        <S.CollectedAmount>
          {content.collectedAmount.toFixed(3)}
        </S.CollectedAmount>
        <S.TotalAmount>/{content.totalAmount.toFixed(3)}</S.TotalAmount>
        <S.Unit>eth</S.Unit>
      </S.AmountContainer>
    </S.Container>
  );
};

export default WishlistCard;
