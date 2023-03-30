import { useEffect, useState } from "react";
import * as S from "./style";
import BasicTextarea from "../../../Common/BasicTextarea";
import BasicButton from "../../../Common/BasicButton";
import { FiMinus } from "@react-icons/all-files/fi/FiMinus.js";
import { FiPlus } from "@react-icons/all-files/fi/FiPlus.js";
import PropTypes from "prop-types";
import { useSelector } from "react-redux";

const HomeDonation = ({ donationSettingData, isOwner }) => {
  const [count, setCount] = useState(1);
  const [msg, setMsg] = useState("");
  const [btnText, setBtnText] = useState("");
  const [donationAmount, setDonationAmount] = useState(0);

  //현재 페이지의 멤버 닉네임
  const pageMemberNickname = useSelector((state) => state.memberInfo.nickname);

  const DecreaseBtn = () => {
    return (
      <div style={{ margin: "0 auto" }}>
        <S.RoundBtn onClick={decreaseCount} disabled={isOwner}>
          <FiMinus color="var(--color-primary)" size={22} />
        </S.RoundBtn>
      </div>
    );
  };

  const IncreaseBtn = () => {
    return (
      <S.RoundBtn onClick={increaseCount} disabled={isOwner}>
        <FiPlus color="var(--color-primary)" size={22} />
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

  const handleOnClickDonate = () => {};

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
