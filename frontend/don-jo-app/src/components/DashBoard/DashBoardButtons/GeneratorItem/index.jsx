import React, { useState } from "react";
import * as S from "./style";
import PropTypes from "prop-types";
import PluginGenerator from "../../DashBoardGeneratorModal";
import QRCodeModal from "../../DashboardQRModal";
import { useMediaQuery } from "react-responsive";
/**
 * GeneratorItem 컴포넌트
 * @param {Object} props - 컴포넌트에 전달되는 props
 * @param {string} title - PlugIn 유형
 * @param {string} description - PlugIn에 대한 설명
 * @param {boolean} isItemsRequired - searchItems 컴포넌트 필수 여부
 * @returns
 */

const GeneratorItem = ({
  id,
  title,
  description,
  isItemsRequired,
  previewSrc,
}) => {
  const [isShowPlugInModal, setShowPlugInModal] = useState(false);
  const [isOpenQRCodeModal, setOpenQRCodeModal] = useState(false);
  const isMobile = useMediaQuery({ maxWidth: 768 });

  const handlePlugInGenModalChange = () => {
    if (id === "generator-item2") {
      setOpenQRCodeModal(true);
      return;
    }

    setShowPlugInModal((prev) => !prev);
  };

  return (
    <>
      <S.ItemWrapper>
        <S.ItemImg>
          <img
            src={previewSrc}
            alt="preview-img"
            width="auto"
            height={isMobile ? "180px" : "100px"}
          />
        </S.ItemImg>
        <S.ItemInfo>
          <S.Title>{title}</S.Title>
          <S.Description>{description}</S.Description>
        </S.ItemInfo>
        <S.GenerateButton onClick={handlePlugInGenModalChange}>
          Generate
        </S.GenerateButton>
      </S.ItemWrapper>
      {isShowPlugInModal && (
        <PluginGenerator
          setShowPlugInModal={setShowPlugInModal}
          isItemsRequired={isItemsRequired}
        />
      )}
      {isOpenQRCodeModal && (
        <QRCodeModal handleSetShowModal={setOpenQRCodeModal} />
      )}
    </>
  );
};

export default GeneratorItem;

GeneratorItem.protoTypes = {
  id: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
};
