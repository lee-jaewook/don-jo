import React, { useCallback, useState } from "react";
import * as S from "./style";
import PropTypes from "prop-types";
import BasicModal from "../BasicModal";
import BasicTitle from "../../BasicTitle";
import BasicButton from "../../BasicButton";
import BasicTextarea from "../../BasicTextarea";

const WishlistDetailModal = ({
  isDashboard,
  handleSetShowModal,
  handleOnClickButton,
}) => {
  // 후원 상태바 계산을 위한 함수
  //   const handleCalcProgressState = () => {
  //     if (Number(collectedAmount) >= Number(totalAmount)) {
  //       return 100;
  //     }
  //     return (Number(collectedAmount) / Number(totalAmount)) * 100;
  //   };

  const [price, setPrice] = useState(0); // 확인 메세지
  const [confirmationMessage, setConfirmationMessage] = useState(""); // 확인 메세지

  const handleDeleteWishlistItem = useCallback(() => {
    console.log("handleDeleteWishlistItem()...");
  }, []);

  return (
    <BasicModal handleSetShowModal={handleSetShowModal} width={40}>
      <S.ContentWrapper>
        <S.WishlistContent>
          <S.wishlistImg src="" alt="" />
          <S.Content>
            <S.Title>Tesla</S.Title>
            <S.Description>
              Inspirational designs, illustrations, and graphic elements from
              the world’s best designers. Want more inspiration? Browse our
              search results. Inspirational designs, illustrations, and graphic
              elements.
            </S.Description>
            <S.Price>
              1000.000 <S.Eth>eth</S.Eth>
            </S.Price>
          </S.Content>
        </S.WishlistContent>
        <S.ProgressBarWrapper>
          <S.ProgressBar isDashboard={isDashboard}>
            <S.ProgressState currentState={50.0} />
          </S.ProgressBar>
          <S.AmountWrapper>
            <S.ProgressAmount>50.000</S.ProgressAmount>
            <S.ProgressAmount isAllAmount={true}>
              /100.000 <S.Eth>eth</S.Eth>
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
            color="black"
            isBackground={true}
            handleOnClickButton={handleOnClickButton}
          />
        </S.ButtonWrapper>
      </S.ContentWrapper>
    </BasicModal>
  );
};

export default WishlistDetailModal;

WishlistDetailModal.propTypes = {
  handleSetShowModal: PropTypes.func.isRequired,
  handleOnClickButton: PropTypes.func.isRequired,
  idDashboard: PropTypes.bool,
};
