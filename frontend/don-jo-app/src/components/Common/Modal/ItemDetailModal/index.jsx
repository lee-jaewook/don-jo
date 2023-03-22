import React, { useEffect, useState } from "react";
import * as S from "./style";
import BasicModal from "../BasicModal";
import PropTypes from "prop-types";
import BasicButton from "../../BasicButton";
import FullScreenModal from "../FullScreenModal";
import { useMediaQuery } from "react-responsive";

const ItemDetailModal = ({
  uid,
  idDashboard = false,
  handleSetShowModal,
  handleOnClickButton,
}) => {
  const isMobile = useMediaQuery({ maxWidth: 768 });

  const [result, setResult] = useState({});

  useEffect(() => {
    // uid를 통해 아이템 상세 조회 API 호출 및 세팅
    setResult({
      id: uid,
      title: "This is my project",
      imgPath: "ImgPath 5634481689157267798",
      description:
        "Inspirational designs, illustrations, and graphic elements from the world’s best designers. Want more inspiration? Browse our search results. Inspirational designs, illustrations, and graphic elements.",
      price: "1000.000",
      message: "Thanks",
      filePath: "",
      seller: "0x288fb136c9291a4b62f1620bee5901beb2b0ffd7",
      deleted: false,
    });
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
            color="black"
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
