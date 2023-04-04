import React, { useCallback, useEffect, useState } from "react";
import * as S from "./style";
import PropTypes from "prop-types";
import BasicModal from "../BasicModal";
import BasicTitle from "../../BasicTitle";
import BasicButton from "../../BasicButton";
import BasicTextarea from "../../BasicTextarea";
import { useMediaQuery } from "react-responsive";
import FullScreenModal from "../FullScreenModal";
import { wishlistAPI } from "../../../../api/wishlist";
import { useSelector } from "react-redux";
import { buyWishlistDonation } from "../../../../utils/transactionFunc/buyWishlistDonation";
import sendToastMessage from "../../../../utils/sendToastMessage";
import DashboardLoading from "../../../DashBoard/DashboardLoading";

const S3URL = "https://don-jo.s3.ap-northeast-2.amazonaws.com/";

const WishlistDetailModal = ({
  uid,
  isDashboard = false,
  handleSetShowModal,
  handleOnClickButton,
}) => {
  const [result, setResult] = useState({
    targetAmount: "0",
    collectedAmount: "0",
  });
  const [price, setPrice] = useState(0);
  const [sendMsg, setSendMsg] = useState(""); // 확인 메세지
  const [isLoading, setLoading] = useState(false);
  //현재 페이지의 멤버 지갑주소 정보
  const pageMemberAddress = useSelector(
    (state) => state.memberInfo.memberAddress
  ).toLowerCase();

  const isMobile = useMediaQuery({ maxWidth: 768 });

  const handleGetWishlistItemDetail = async () => {
    setLoading(true);
    try {
      const { data } = await wishlistAPI.getWishlistItemDetail(uid);
      setResult(data);
    } catch (error) {
      console.log("error: ", error);
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteWishlistItem = useCallback(async () => {
    setLoading(true);
    try {
      await wishlistAPI.deleteWishlistItem(uid);
      sendToastMessage("✨ Deleted successfully.");
      handleSetShowModal();
    } catch (error) {
      sendToastMessage("Delete Failed", "error");
      console.log("[Wishlists] Delete Error:", error);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    handleGetWishlistItemDetail();
  }, []);
  const handleLoading = () => {
    setLoading((prev) => !prev);
  };
  const BuyOrEdit = async () => {
    if (isDashboard) {
      handleOnClickButton();
      return;
    }
    const item = {
      price: price,
      id: uid,
      seller: pageMemberAddress,
      sendMsg: sendMsg,
    };

    setLoading(true);

    buyWishlistDonation(item, handleLoading, handleOnClickButton);

    // setLoading(false);
    // try {
    //   sendToastMessage("✨ Updated successfully.");
    // } catch (error) {
    //   console.log("error: ", error);
    // } finally {
    //   console.log("왜 여기안와?");
    // }
  };

  // 후원 상태바 계산을 위한 함수
  const handleCalcProgressState = () => {
    // 초기값 처리
    if (result.targetAmount === "0") return 0;

    if (Number(result.collectedAmount) >= Number(result.targetAmount)) {
      return 100;
    }
    return (Number(result.collectedAmount) / Number(result.targetAmount)) * 100;
  };

  const handleMakeModalContent = () => {
    return isLoading ? (
      <DashboardLoading />
    ) : (
      <S.ContentWrapper>
        <S.WishlistContent>
          <S.wishlistImg
            src={
              result.imgPath !== undefined ? `${S3URL}${result.imgPath}` : ""
            }
            alt="wishlist-img"
          />
          <S.Content>
            <S.Title>{result.title}</S.Title>
            <S.Description>{result.description}</S.Description>
            <S.Price>
              {result.targetAmount} <S.Eth>MATIC</S.Eth>
            </S.Price>
          </S.Content>
        </S.WishlistContent>
        <S.ProgressBarWrapper isDashboard={isDashboard}>
          <BasicTitle text="Collected Amount" />
          <S.ProgressBar>
            <S.ProgressState
              currentState={result === {} ? 0 : handleCalcProgressState()}
            />
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
                <S.Eth>MATIC</S.Eth>
              </span>
            </S.PriceInputWrapper>
            <BasicTitle text="Send a Message" />
            <BasicTextarea
              handleOnChangeValue={(e) => setSendMsg(e.target.value)}
              placeholder="Express your appreciation to the seller!"
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
            handleOnClickButton={BuyOrEdit}
            isDisabled={false}
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
  handleOnClickButton: PropTypes.func,
};
