import React from "react";
import * as S from "./style";
import PropTypes from "prop-types";
const GeneratorItem = ({ title, description }) => {
  return (
    <S.ItemWrapper>
      <S.ItemImg />
      <S.ItemInfo>
        <S.Title>{title}</S.Title>
        <S.Description>{description}</S.Description>
      </S.ItemInfo>
      <S.generateButton>Generate</S.generateButton>
    </S.ItemWrapper>
  );
};

export default GeneratorItem;

GeneratorItem.protoTypes = {
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
};
