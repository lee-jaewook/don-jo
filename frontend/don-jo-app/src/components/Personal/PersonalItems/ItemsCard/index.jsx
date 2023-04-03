import * as S from "./style";
import PropTypes from "prop-types";
import { useEffect, useState } from "react";
import ItemDetailModal from "../../../Common/Modal/ItemDetailModal";
import { calculateEth } from "../../../../utils/calculateEth";
import { itemApi } from "../../../../api/items";
import { useSelector } from "react-redux";
import { useWaitForTransaction, useProvider, usePrepareContractWrite, useContractWrite } from 'wagmi';
import ApplicationHandler from "../../../../contracts/ApplicationHandler.json";
import Web3 from "web3";
import { supportApi } from "../../../../api/support";

const ItemCard = ({ item, isOwner }) => {
  const [isShowItemDetailModal, setIsShowItemDetailModal] = useState(false);
  const [isAlreadyBought, setIsAlreadyBought] = useState(false);
  const [btnText, setBtnText] = useState("");

  const loginUserAddress = useSelector(
    (state) => state.member.walletAddress
  ).toLowerCase();

  const getIsPurchased = async () => {
    try {
      const { data } = await itemApi.getIsPurchased(item.id, loginUserAddress);
      if (data) setBtnText("Download");
      else setBtnText("Buy");
      setIsAlreadyBought(data);
    } catch (error) {
      console.log("error: ", error);
    }
  };

  useEffect(() => {
    if (!isOwner) {
      getIsPurchased();
    }
  }, []);

  const provider = useProvider()
  const web3 = new Web3(provider)

  const { config } = usePrepareContractWrite({
    abi: ApplicationHandler.abi,
    address: "0x87F54beAa91600aF02284df366531904Dd3735D8",
    functionName: "buyItemDonation",
    args: [item.seller, item.id],
    overrides: {
      gasLimit: 8000000,
      value: web3.utils.toWei(item.price.toString(), "ether")
    }
  })
  const contractWrite = useContractWrite(config)

  const waitForTransaction = useWaitForTransaction({
    hash: contractWrite.data?.hash,
    onError(error) {
      alert("구입 실패")
    },
    onSuccess(data) {
      alert("구입 성공")
      const logs = data.logs.filter(
        (log) => log.topics[0] === web3.utils.sha3("SupportIdEvent(uint64)")
      );
      if (logs.length > 0) {
        const log = logs[0];
        const id = web3.eth.abi.decodeParameters(
          ["uint64"],
          log.topics[1]
        )[0];
        const donationDto = {
          amountEth: item.price,
          fromAddress: data.from,
          sendMsg: "",
          supportType: "item",
          supportTypeUid: item.id,
          supportUid: id,
          toAddress: item.seller,
          transactionHash: data.transactionHash,
        };
        supportApi
          .saveSponsorshipDetail(donationDto)
          .then((res) => {
            console.log("저장 성공!");
          })
          .catch((error) => {
            console.log("저장 실패");
          });
      }
    }
  })

  const doBuy = async () => {
    contractWrite.write()
  };

  return (
    <S.Container>
      <S.ItemImg imgPath={item.imgPath} />
      <S.DescriptionContainer>
        <S.Title>{item.title}</S.Title>
        <S.Description>{item.description}</S.Description>
        <S.PriceBtnContainer>
          <S.PriceWrapper>
            <S.Price>{calculateEth(item.price)}</S.Price>
            <S.Unit>matic</S.Unit>
          </S.PriceWrapper>
          {!isOwner && (
            <S.BuyBtn
              color=""
              onClick={() => {
                setIsShowItemDetailModal(true);
              }}
            >
              {btnText}
            </S.BuyBtn>
          )}
        </S.PriceBtnContainer>
      </S.DescriptionContainer>
      {isShowItemDetailModal && (
        <ItemDetailModal
          uid={item.id}
          handleSetShowModal={setIsShowItemDetailModal}
          handleOnClickButton={doBuy}
          isAlreadyBought={isAlreadyBought}
        />
      )}
    </S.Container>
  );
};

export default ItemCard;

ItemCard.propTypes = {
  item: PropTypes.shape({
    imgPath: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
  }).isRequired,
  isOwner: PropTypes.bool,
};
