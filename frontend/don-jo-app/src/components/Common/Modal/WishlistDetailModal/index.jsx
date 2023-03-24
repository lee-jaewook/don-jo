import React, { useCallback, useEffect, useState } from "react";
import * as S from "./style";
import PropTypes from "prop-types";
import BasicModal from "../BasicModal";
import BasicTitle from "../../BasicTitle";
import BasicButton from "../../BasicButton";
import BasicTextarea from "../../BasicTextarea";
import { useMediaQuery } from "react-responsive";
import FullScreenModal from "../FullScreenModal";

const WishlistDetailModal = ({
  uid,
  isDashboard,
  handleSetShowModal,
  handleOnClickButton,
}) => {
  const [result, setResult] = useState({});

  const [price, setPrice] = useState(0); // 확인 메세지
  const [confirmationMessage, setConfirmationMessage] = useState(""); // 확인 메세지
  const isMobile = useMediaQuery({ maxWidth: 768 });

  const handleDeleteWishlistItem = useCallback(() => {
    console.log("handleDeleteWishlistItem()...");
  }, []);

  const handleGetWishlistItemDetail = () => {
    // wishlist 상세 정보 API 호출
    setResult({
      id: 1,
      title: "Title 5634481689157267798",
      imgPath: "ImgPath 5634481689157267798",
      description: "Description 5634481689157267798",
      price: 1000000,
      message: "Message 5634481689157267798",
      filePath: "FilePath 5634481689157267798",
      seller: "0x288fb136c9291a4b62f1620bee5901beb2b0ffd7",
      deleted: false,
    });
  };

  useEffect(() => {
    handleGetWishlistItemDetail();
  }, []);

  // 후원 상태바 계산을 위한 함수
  const handleCalcProgressState = () => {
    if (Number(result.collectedAmount) >= Number(result.totalAmount)) {
      return 100;
    }
    return (Number(result.collectedAmount) / Number(result.totalAmount)) * 100;
  };

  const handleMakeModalContent = () => {
    return (
      <S.ContentWrapper>
        <S.WishlistContent>
          <S.wishlistImg src={`/${result.imgPath}`} alt="" />
          <S.Content>
            <S.Title>{result.title}</S.Title>
            <S.Description>{result.description}</S.Description>
            <S.Price>
              {result.price} <S.Eth>eth</S.Eth>
            </S.Price>
          </S.Content>
        </S.WishlistContent>
        <S.ProgressBarWrapper isDashboard={isDashboard}>
          <S.ProgressBar>
            <S.ProgressState currentState={handleCalcProgressState()} />
          </S.ProgressBar>
          <S.AmountWrapper>
            <S.ProgressAmount>{result.collectedAmount}</S.ProgressAmount>
            <S.ProgressAmount isAllAmount={true}>
              /{result.targetAmount} <S.Eth>eth</S.Eth>
            </S.ProgressAmount>
          </S.AmountWrapper>
        </S.ProgressBarWrapper>
        {!isDashboard && (
          <div>
            <S.PriceInputWrapper>
              <BasicTitle text="Price" />
              <span>
                <S.PriceInput
                  type="number"
                  placeholder="1000.000"
                  value={price}
                  onChange={(e) => setPrice(e.target.value)}
                />
                <S.Eth>eth</S.Eth>
              </span>
            </S.PriceInputWrapper>
            <BasicTitle text="Confirmation Message" />
            <BasicTextarea
              handleOnChangeValue={setConfirmationMessage}
              placeholder="Thank you for supporting my wishlist!"
            />
          </div>
        )}
        <S.ButtonWrapper>
          {isDashboard && (
            <S.DeleteButton onClick={handleDeleteWishlistItem}>
              Delete
            </S.DeleteButton>
          )}
          <BasicButton
            text={isDashboard ? "Edit" : "Donate"}
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
    <BasicModal handleSetShowModal={handleSetShowModal} width={40}>
      {handleMakeModalContent()}
    </BasicModal>
  );
};

export default WishlistDetailModal;

WishlistDetailModal.propTypes = {
  uid: PropTypes.number.isRequired,
  idDashboard: PropTypes.bool,
  handleSetShowModal: PropTypes.func.isRequired,
  handleOnClickButton: PropTypes.func.isRequired,
};
