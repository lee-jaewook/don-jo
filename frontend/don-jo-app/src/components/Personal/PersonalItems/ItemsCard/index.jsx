import * as S from "./style";
import PropTypes from "prop-types";
import { useEffect, useState } from "react";
import ItemDetailModal from "../../../Common/Modal/ItemDetailModal";
import { calculateEth } from "../../../../utils/calculateEth";
import { itemApi } from "../../../../api/items";
import { useSelector } from "react-redux";
import {
  useWaitForTransaction,
  useProvider,
  usePrepareContractWrite,
  useContractWrite,
  useAccount,
} from "wagmi";
import ApplicationHandler from "../../../../contracts/ApplicationHandler.json";
import Web3 from "web3";
import { supportApi } from "../../../../api/support";

const ItemCard = ({ item, isOwner }) => {
  //현재 월렛커넥트와 연결되어있는 지갑 주소
  const { address, isConnected } = useAccount();
  const [isOwnerItems, setIsOwnerItems] = useState(isOwner);
  const [isShowItemDetailModal, setIsShowItemDetailModal] = useState(false);
  const [isAlreadyBought, setIsAlreadyBought] = useState(false);
  const [btnText, setBtnText] = useState("");

  const pageMemberAddress = useSelector(
    (state) => state.memberInfo.memberAddress
  );

  useEffect(() => {
    if (isConnected) {
      setIsOwnerItems(
        address.toLowerCase() === pageMemberAddress.toLowerCase()
      );
    }
  }, [pageMemberAddress]);

  const getIsPurchased = async () => {
    try {
      if (isConnected) {
        const { data } = await itemApi.getIsPurchased(item.id, address);
        if (data) setBtnText("Download");
        else setBtnText("Buy");
        setIsAlreadyBought(data);
      } else {
        setBtnText("Buy");
      }
    } catch (error) {
      console.log("error: ", error);
    }
  };

  useEffect(() => {
    if (!isOwnerItems) {
      getIsPurchased();
    }
  }, []);

  const provider = useProvider();
  const web3 = new Web3(provider);

  const { config } = usePrepareContractWrite({
    abi: ApplicationHandler.abi,
    address: "0x87F54beAa91600aF02284df366531904Dd3735D8",
    functionName: "buyItemDonation",
    args: [item.seller, item.id],
    overrides: {
      gasLimit: 8000000,
      value: web3.utils.toWei(item.price.toString(), "ether"),
    },
  });
  const contractWrite = useContractWrite({
    ...config,
    onSuccess(data) {
      const donationDto = {
        amountEth: item.price,
        fromAddress: address,
        sendMsg: "",
        supportType: "item",
        supportTypeUid: item.id,
        supportUid: "",
        toAddress: item.seller,
        transactionHash: data.hash,
      };
      supportApi
        .saveSponsorshipDetail(donationDto)
        .then((res) => {
          console.log("저장 성공!");
        })
        .catch((error) => {
          console.log("저장 실패");
        });
    },
  });

  const waitForTransaction = useWaitForTransaction({
    hash: contractWrite.data?.hash,
    onError(error) {
      alert("구입 실패");
    },
    onSuccess(data) {
      alert("구입 성공");
      const logs = data.logs.filter(
        (log) => log.topics[0] === web3.utils.sha3("SupportIdEvent(uint64)")
      );
      if (logs.length > 0) {
        const log = logs[0];
        const id = web3.eth.abi.decodeParameters(["uint64"], log.topics[1])[0];
        console.log(data, id);
        supportApi
          .updateSponsorshipArrived(id, data.transactionHash)
          .then((res) => {
            console.log("update 성공!");
          })
          .catch((error) => {
            console.log("update 실패!");
          });
      }
    },
  });

  const doBuy = async () => {
    contractWrite.write();
  };

  return (
    <S.Container>
      <S.ItemImg imgPath={item.imgPath} />
      <S.DescriptionContainer>
        <S.Title>{item.title}</S.Title>
        <S.Description>{item.description}</S.Description>
        <S.PriceBtnContainer>
          <S.PriceWrapper>
            <S.Price>{item.price.toFixed(3)}</S.Price>
            <S.Unit>matic</S.Unit>
          </S.PriceWrapper>
          {!isOwnerItems && (
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
