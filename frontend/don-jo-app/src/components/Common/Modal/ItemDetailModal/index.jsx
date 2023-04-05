import React, { useCallback, useEffect, useRef, useState } from "react";
import * as S from "./style";
import BasicModal from "../BasicModal";
import PropTypes from "prop-types";
import BasicButton from "../../BasicButton";
import FullScreenModal from "../FullScreenModal";
import { useMediaQuery } from "react-responsive";
import { itemApi } from "../../../../api/items";
import { useDispatch } from "react-redux";
import { setCurrentItem } from "../../../../stores/items";
import DashboardLoading from "../../../DashBoard/DashboardLoading";
import sendToastMessage from "../../../../utils/sendToastMessage";

const ItemDetailModal = ({
  uid,
  isDashboard = false,
  handleSetShowModal,
  handleOnClickButton,
  isAlreadyBought = false,
}) => {
  const [isLoading, setLoading] = useState(false);
  const isMobile = useMediaQuery({ maxWidth: 768 });
  const [result, setResult] = useState({});
  const dispatch = useDispatch();

  const handleGetItemDetail = async () => {
    setLoading(true);
    try {
      const { data } = await itemApi.getItemDetail(uid);
      setResult(data);
      dispatch(setCurrentItem(data));
    } catch (error) {
      console.log(
        'An error occurred in ItemDetailModal. the function name is "handleGetItemDetaile".',
        error
      );
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteItem = useCallback(async () => {
    setLoading(true);
    try {
      await itemApi.deleteItem(uid);
      sendToastMessage("✨ Deleted successfully.");
      handleSetShowModal();
    } catch (error) {
      sendToastMessage("Delete Failed", "error");
      console.log(
        'An error occurred in ItemDetailModal. the function name is "handleDeleteItem".'
      );
      console.log("[Items] Delete Error: ", error);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    handleGetItemDetail();
  }, []);

  const S3URL = "https://don-jo.s3.ap-northeast-2.amazonaws.com/";
  const aTagRef = useRef();
  const doDownload = () => {
    aTagRef.current.click();
  };

  const handleMakeModalContent = () => {
    return isLoading ? (
      <DashboardLoading />
    ) : (
      <S.ContentWrapper>
        <S.ContentImg
          src={
            !result.imgPath
              ? ""
              : `https://don-jo.s3.ap-northeast-2.amazonaws.com/${result.imgPath}`
          }
          alt="item-img"
        />
        <S.Title>{result.title}</S.Title>
        <S.Description>{result.description}</S.Description>
        <S.Price>
          {result.price}
          <S.Eth>MATIC</S.Eth>
        </S.Price>
        <S.ButtonWrapper>
          {isDashboard && (
            <S.DeleteButton onClick={handleDeleteItem}>Delete</S.DeleteButton>
          )}

          <S.DownloadLink
            href={S3URL + result.filePath}
            ref={aTagRef}
            target="_blank"
          />

          {isAlreadyBought ? (
            <BasicButton
              text="Download"
              color="var(--color-primary)"
              isBackground={true}
              handleOnClickButton={doDownload}
            />
          ) : (
            <BasicButton
              text={isDashboard ? "Edit" : "Buy"}
              color="var(--color-primary)"
              isBackground={true}
              handleOnClickButton={handleOnClickButton}
            />
          )}
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
  isAlreadyBought: PropTypes.bool,
};
