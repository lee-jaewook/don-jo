import React, { useCallback, useEffect, useRef, useState } from "react";
import * as S from "./style";
import BasicModal from "../BasicModal";
import PropTypes from "prop-types";
import BasicButton from "../../BasicButton";
import FullScreenModal from "../FullScreenModal";
import { useMediaQuery } from "react-responsive";
import { itemApi } from "../../../../api/items";
import { useDispatch } from "react-redux";
import { setCurrentItem, setItemStatus } from "../../../../stores/items";
import DashboardLoading from "../../../DashBoard/DashboardLoading";
import sendToastMessage from "../../../../utils/sendToastMessage";
import { useAccount, useProvider, useSwitchNetwork, useNetwork, useContractWrite, useWaitForTransaction  } from 'wagmi'
import { useWeb3Modal } from "@web3modal/react";
import ApplicationHandler from "../../../../contracts/ApplicationHandler.json"
import Web3 from "web3";
import { supportApi } from "../../../../api/support";
const ItemDetailModal = ({
  uid,
  isDashboard = false,
  handleSetShowModal,
  handleOnClickButton,
}) => {
  const [isLoading, setLoading] = useState(false);
  const isMobile = useMediaQuery({ maxWidth: 768 });
  const [result, setResult] = useState({});
  const dispatch = useDispatch();
  const { address, isConnected } = useAccount();
  const [isAlreadyBought, setIsAlreadyBought] = useState(false);
  const provider = useProvider();
  const web3 = new Web3(provider);
  const { open } = useWeb3Modal();
  const network = useSwitchNetwork({
    chainId: 80001,
  });
  const { chain } = useNetwork();
  // const [isAlreadyBought, setIsAlreadyBought] = useState(false);
  const contract = useContractWrite({
    abi: ApplicationHandler.abi,
    address: '0xb4787A11745AfC48D76c2E603164118502447EC6',
    functionName: 'buyItemDonation',
    args: [result?.seller, result?.id],
    overrides: {
      gasLimit: 8000000,
      value: web3.utils.toWei((result?.price || 0).toString(), "ether"),
    },
    chainId: 80001,
    onSuccess(data) {
      const donationDto = {
        amountEth: parseFloat(result.price),
        fromAddress: address,
        sendMsg: "",
        supportType: "item",
        supportTypeUid: result?.id, // 아이템 uid
        toAddress: result?.seller,
        transactionHash: data.hash,
      };
      supportApi.saveSponsorshipDetail(donationDto)
      .then(() => {
        sendToastMessage(result?.message);
      })
      .catch(() => {
        sendToastMessage("Item Purchase Fail");
      })
    }
  })

  const waitForTransaction = useWaitForTransaction({
    chainId: 80001,
    hash: contract.data?.hash,
    onSuccess() {
      supportApi.getSupportDetail(contract.data?.hash);
      setIsAlreadyBought(true);
      dispatch(setItemStatus(true));
    }
  })

  const handleGetItemDetail = async () => {
    setLoading(true);
    try {
      const { data } = await itemApi.getItemDetail(uid);
      setResult(data);
      if (!isDashboard && isConnected) {
        checkAlreadyBought(data.id);
      }
      dispatch(setCurrentItem(data));
    } catch (error) {
      console.log(
        'An error occurred in ItemDetailModal. the function name is "handleGetItemDetail".',
        error
      );
    } finally {
      setLoading(false);
    }
  };

  const buyButtonClick = () => {
    if (!isConnected) {
      open()
      return
    }

    if (chain.id === 80001) {
      contract.write()
    } else {
      network.switchNetwork()
    }
  }

  const handleDeleteItem = useCallback(async () => {
    setLoading(true);
    try {
      await itemApi.deleteItem(uid);
      sendToastMessage("✨ Deleted successfully.");
      handleSetShowModal();
    } catch (error) {
      sendToastMessage("Delete Failed", "error");
      console.log(
        'An error occurred in ItemDetailModal. the function name is "handleDeleteItem".',
        error
      );
    } finally {
      setLoading(false);
    }
  }, []);

  const checkAlreadyBought = async (id) => {
    const status = await itemApi.getIsPurchased(id, address);
    setIsAlreadyBought(status.data);
  };

  useEffect(() => {
    handleGetItemDetail();
  }, []);

  useEffect(() => {
    if (isConnected && !isDashboard && result?.id) {
      checkAlreadyBought(result?.id);
    }
  }, [isConnected]);

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
              handleOnClickButton={isDashboard ? handleOnClickButton : buyButtonClick}
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
  handleOnClickButton: PropTypes.func,
};
