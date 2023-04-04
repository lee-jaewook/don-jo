import { useEffect, useState } from "react";
import * as S from "./style";
import BasicTextarea from "../../../Common/BasicTextarea";
import BasicButton from "../../../Common/BasicButton";
import { FiMinus } from "@react-icons/all-files/fi/FiMinus.js";
import { FiPlus } from "@react-icons/all-files/fi/FiPlus.js";
import PropTypes from "prop-types";
import { useSelector } from "react-redux";
import { priceApi } from "../../../../api/price";
import Web3 from "web3";
import ApplicationHandler from "../../../../contracts/ApplicationHandler.json";
import { useWaitForTransaction, useProvider, usePrepareContractWrite, useContractWrite } from 'wagmi';
import { supportApi } from "../../../../api/support";
import { useAccount } from "wagmi";

const HomeDonation = ({ donationSettingData, isOwner }) => {
  const [count, setCount] = useState(1);
  const [price, setPrice] = useState(0);
  const [msg, setMsg] = useState("");
  const [btnText, setBtnText] = useState("");
  const [donationAmount, setDonationAmount] = useState(0);
  const { address, isConnected } = useAccount();
  //현재 페이지의 멤버 닉네임
  const pageMemberNickname = useSelector((state) => state.memberInfo.nickname);
  //현재 페이지의 멤버 지갑 주소
  const pageMemberWalletAddress = useSelector(
    (state) => state.memberInfo.memberAddress
  );

  const provider = useProvider()
  const web3 = new Web3(provider)

  const { config } = usePrepareContractWrite({
    abi: ApplicationHandler.abi,
    address: "0x87F54beAa91600aF02284df366531904Dd3735D8",
    functionName: "callBasicDonation",
    args: [pageMemberWalletAddress],
    overrides: {
      gasLimit: 8000000,
      value: web3.utils.toWei(price.toString(), "ether")
    },
  })

  const contractWrite = useContractWrite({
    ...config,
    onSuccess(data) {
      const donationDto = {
          amountEth: price,
          fromAddress: address,
          sendMsg: msg,
          supportType: "donation",
          supportTypeUid: "",
          toAddress: pageMemberWalletAddress,
          transactionHash: data.hash,
        };
      console.log(donationDto)
      supportApi.saveSponsorshipDetail(donationDto)
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
      alert("도네이션 실패")
    },
    onSettled() {

    },
    onSuccess(data) {
      alert("도네이션 성공")
      const logs = data.logs.filter(
        (log) => log.topics[0] === web3.utils.sha3("SupportIdEvent(uint64)")
      );
      if (logs.length > 0) {
        const log = logs[0];
        const id = web3.eth.abi.decodeParameters(
          ["uint64"],
          log.topics[1]
        )[0];
        
        supportApi
          .updateSponsorshipArrived(id, data.transactionHash)
          .then((res) => {
            console.log("update 성공!");
          })
          .catch((error) => {
            console.log("update 실패!");
          });
      }
    }
  })

  const DecreaseBtn = () => {
    return (
      <div style={{ margin: "0 auto" }}>
        <S.RoundBtn onClick={decreaseCount} disabled={isOwner}>
          <FiMinus
            color={isOwner ? "white" : "var(--color-primary)"}
            size={22}
          />
        </S.RoundBtn>
      </div>
    );
  };

  const IncreaseBtn = () => {
    return (
      <S.RoundBtn onClick={increaseCount} disabled={isOwner}>
        <FiPlus color={isOwner ? "white" : "var(--color-primary)"} size={22} />
      </S.RoundBtn>
    );
  };

  const decreaseCount = () => {
    if (count > 1) setCount((prev) => prev - 1);
  };

  const increaseCount = () => {
    setCount((prev) => prev + 1);
  };

  const handleOnChangeCount = (e) => {
    setCount(Number(e.target.value));
    if (count < 1) setCount(1);
  };

  const handleOnChangeMsg = (e) => {
    setMsg(e.target.value);
  };

  const handleOnClickDonate = async () => {
    const { data } = await priceApi.getItemDetail();
    setPrice((data * donationAmount * 0.001).toFixed(18))
    
    // setPrice(data * donationAmount * 0.001)
  };
  const palyContractWrite = async () => {
    await contractWrite.write()
    setPrice(0)
  }

  useEffect(() => {
    if (price !== 0) {
      palyContractWrite()
    }
  }, [price]);

  useEffect(() => {
    const donationAmount = donationSettingData.pricePerDonation * count;
    setDonationAmount(donationAmount);
    setBtnText("Donate $" + String(donationAmount));
  }, [count, donationSettingData.pricePerDonation]);

  return (
    <S.Container>
      <S.Title>Buy {pageMemberNickname}</S.Title>
      <S.Card>
        <S.ImojiContainer>
          <S.Imoji>{donationSettingData.donationEmoji}</S.Imoji>
          <S.ImojiTitle>{donationSettingData.donationName}</S.ImojiTitle>
        </S.ImojiContainer>
        <S.CounterContainer>
          <S.CountInput
            type="number"
            value={count}
            onChange={handleOnChangeCount}
            disabled={isOwner}
          ></S.CountInput>
          <S.RoundBtnWrapper>
            <DecreaseBtn />
            <IncreaseBtn />
          </S.RoundBtnWrapper>
        </S.CounterContainer>
        <BasicTextarea
          handleOnChangeValue={handleOnChangeMsg}
          placeholder="Send a message"
          value={msg}
          disabled={isOwner}
        />
        <S.BasicButtonWrapper>
          <BasicButton
            text={btnText}
            color="var(--color-primary)"
            handleOnClickButton={handleOnClickDonate}
            isBackground={true}
            isDisabled={isOwner}
          />
        </S.BasicButtonWrapper>
      </S.Card>
    </S.Container>
  );
};

export default HomeDonation;

HomeDonation.propTypes = {
  donationSettingData: PropTypes.shape({
    donationEmoji: PropTypes.string.isRequired,
    donationName: PropTypes.string.isRequired,
    pricePerDonation: PropTypes.number,
    thankMsg: PropTypes.string.isRequired,
  }).isRequired,
  isOwner: PropTypes.bool,
};
