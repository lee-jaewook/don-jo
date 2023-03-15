import React from "react";
import * as S from "./style";
const GeneratorItem = () => {
  return (
    <S.ItemWrapper>
      <S.ItemImg />
      <S.ItemInfo>
        <S.Title>title</S.Title>
        <S.Description>Description</S.Description>
      </S.ItemInfo>
      <S.generateButton>Generate</S.generateButton>
    </S.ItemWrapper>
  );
};

export default GeneratorItem;
