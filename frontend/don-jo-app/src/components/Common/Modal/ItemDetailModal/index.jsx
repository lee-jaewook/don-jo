import React from "react";
import * as S from "./style";
import BasicModal from "../BasicModal";
import PropTypes from "prop-types";
import BasicButton from "../../BasicButton";
import FullScreenModal from "../FullScreenModal";

const ItemDetailModal = ({
  handleSetShowModal,
  idDashboard,
  handleOnClickButton,
}) => {
  return (
    <FullScreenModal handleSetShowModal={handleSetShowModal}>
      <S.ContentWrapper>
        <S.ContentImg
          src="https://www.zdnet.com/a/img/2020/11/16/37e33024-2892-4bb7-9d21-6ac6f7544def/apple-macbook-pro-m1-2020-5.jpg"
          alt="item-img"
        />
        <S.Title>This is my project</S.Title>
        <S.Description>
          Inspirational designs, illustrations, and graphic elements from the
          world’s best designers. Want more inspiration? Browse our search
          results. Inspirational designs, illustrations, and graphic elements.
        </S.Description>
        <S.Price>
          1000.000
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
    </FullScreenModal>
  );
};

export default ItemDetailModal;

ItemDetailModal.propTypes = {
  handleSetShowModal: PropTypes.func.isRequired,
};
