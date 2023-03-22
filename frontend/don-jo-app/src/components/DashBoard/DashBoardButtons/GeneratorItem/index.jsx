import React, { useState } from "react";
import * as S from "./style";
import PropTypes from "prop-types";
import PluginGenerator from "../../DashBoardGeneratorModal";
/**
 * GeneratorItem 컴포넌트
 * @param {Object} props - 컴포넌트에 전달되는 props
 * @param {string} title - PlugIn 유형
 * @param {string} description - PlugIn에 대한 설명
 * @param {boolean} isItemsRequired - searchItems 컴포넌트 필수 여부
 * @returns
 */

const GeneratorItem = ({ title, description, isItemsRequired }) => {
  const [isPlugInGenModalOpen, setIsPlugInGenModalOpen] = useState(false);

  const handlePlugInGenModalChange = () => {
    setIsPlugInGenModalOpen((prev) => !prev);
  };

  return (
    <>
      <S.ItemWrapper>
        <S.ItemImg />
        <S.ItemInfo>
          <S.Title>{title}</S.Title>
          <S.Description>{description}</S.Description>
        </S.ItemInfo>
        <S.generateButton onClick={handlePlugInGenModalChange}>
          Generate
        </S.generateButton>
      </S.ItemWrapper>
      {isPlugInGenModalOpen && (
        <PluginGenerator
          isModalOpen={handlePlugInGenModalChange}
          isItemsRequired={isItemsRequired}
        />
      )}
    </>
  );
};

export default GeneratorItem;

GeneratorItem.protoTypes = {
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
};
