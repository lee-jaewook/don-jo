import * as S from "./style";
import PropTypes from "prop-types";
import { useEffect, useState } from "react";
import ItemDetailModal from "../../../Common/Modal/ItemDetailModal";
import { itemApi } from "../../../../api/items";
import { useSelector } from "react-redux";
import { useAccount, useSwitchNetwork, useNetwork } from "wagmi";
import { useWeb3Modal } from "@web3modal/react";
import { buyItem } from "../../../../api/wagmi/buyItem";

const ItemCard = ({ item, isOwner }) => {
  //현재 월렛커넥트와 연결되어있는 지갑 주소
  const { address, isConnected } = useAccount();
  const [isOwnerItems, setIsOwnerItems] = useState(isOwner);
  const [isShowItemDetailModal, setIsShowItemDetailModal] = useState(false);
  const [isAlreadyBought, setIsAlreadyBought] = useState(false);
  const [btnText, setBtnText] = useState("");
  const { open } = useWeb3Modal()
  const pageMemberAddress = useSelector(
    (state) => state.memberInfo.memberAddress
  );
  const network = useSwitchNetwork({
    chainId: 80001,
  })
  const { chain } = useNetwork()

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

  const doBuy = () => {
    if (!isConnected) {
      open()
      return
    }

    if (chain.id === 80001) {
      buyItem(item)
    } else {
      network.switchNetwork()
    }

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
