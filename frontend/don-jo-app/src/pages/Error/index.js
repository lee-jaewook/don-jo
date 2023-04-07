import React from "react";
import * as S from "./style";
import DefaultImage from "../../assets/img/common/img-not-found.svg";
const Error = () => {
  return (
    <S.Container>
      <img src={DefaultImage} alt="not-found-img" />
      <S.NotFound>NOT FOUND</S.NotFound>
      <S.IntroLink to="/">Go to Intro</S.IntroLink>
    </S.Container>
  );
};

export default Error;
