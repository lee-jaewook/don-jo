import React from "react";
import * as S from "./style";

const IntroContent = ({ title, description, imageSrc }) => (
  <S.Content>
    <S.ContentTitle>{title}</S.ContentTitle>
    <S.ContentDescription>{description}</S.ContentDescription>
    <S.ContentWrapper>
      <img src={imageSrc} alt="undrawEther" height={240} />
    </S.ContentWrapper>
  </S.Content>
);
export default IntroContent;
