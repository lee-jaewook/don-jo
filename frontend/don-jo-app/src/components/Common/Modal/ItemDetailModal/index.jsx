import React, { useEffect, useState } from "react";
import * as S from "./style";
import BasicModal from "../BasicModal";
import PropTypes from "prop-types";
import BasicButton from "../../BasicButton";
import FullScreenModal from "../FullScreenModal";
import { useMediaQuery } from "react-responsive";
import { itemApi } from "../../../../api/items";

const ItemDetailModal = ({
  uid,
  idDashboard = false,
  handleSetShowModal,
  handleOnClickButton,
}) => {
  const isMobile = useMediaQuery({ maxWidth: 768 });

  const [result, setResult] = useState({});

  const handleGetItemDetail = async () => {
    try {
      const { data } = await itemApi.getItemDetail(uid);
      setResult(data);
    } catch (error) {
      console.log("error: ", error);
    }
  };

  useEffect(() => {
    handleGetItemDetail();
  }, []);

  const handleMakeModalContent = () => {
    return (
      <S.ContentWrapper>
        <S.ContentImg
          src={
            !result.filePath
              ? ""
              : `https://don-jo.s3.ap-northeast-2.amazonaws.com/${result.filePath}`
          }
          alt="item-img"
        />
        <S.Title>{result.title}</S.Title>
        <S.Description>{result.description}</S.Description>
        <S.Price>
          {result.price}
          <S.Eth>eth</S.Eth>
        </S.Price>
        <S.ButtonWrapper>
          <BasicButton
            text={idDashboard ? "Edit" : "Buy"}
            color="var(--color-primary)"
            isBackground={true}
            handleOnClickButton={handleOnClickButton}
          />
        </S.ButtonWrapper>
      </S.ContentWrapper>
    );
  };

  return isMobile ? (
    <FullScreenModal handleSetShowModal={handleSetShowModal}>
      {handleMakeModalContent()}
    </FullScreenModal>
  ) : (
    <BasicModal handleSetShowModal={handleSetShowModal}>
      {handleMakeModalContent()}
    </BasicModal>
  );
};

export default ItemDetailModal;

ItemDetailModal.propTypes = {
  uid: PropTypes.number.isRequired,
  idDashboard: PropTypes.bool,
  handleSetShowModal: PropTypes.func.isRequired,
  handleOnClickButton: PropTypes.func.isRequired,
};
