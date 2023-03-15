import { useState } from "react";
import * as S from "./style";
import BasicTextarea from "../../../Common/BasicTextarea";
import BasicButton from "../../../Common/BasicButton";
import { FiMinus, FiPlus } from "react-icons/fi";

const HomeDonation = () => {
  const [count, setCount] = useState(1);
  const [msg, setMsg] = useState("");

  const DecreaseBtn = () => {
    return (
      <div style={{ margin: "0 auto" }}>
        <S.RoundBtn onClick={decreaseCount}>
          <FiMinus color="white" size={22} />
        </S.RoundBtn>
      </div>
    );
  };

  const IncreaseBtn = () => {
    return (
      <S.RoundBtn onClick={increaseCount}>
        <FiPlus color="white" size={22} />
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

  return (
    <S.Container>
      <S.Title>Buy Robert Downy Jr.</S.Title>
      <S.Card>
        <S.ImojiContainer>
          <S.Imoji>🍪</S.Imoji>
          <S.ImojiTitle>Cookie</S.ImojiTitle>
        </S.ImojiContainer>
        <S.CounterContainer>
          <S.CountInput
            type="number"
            value={count}
            onChange={handleOnChangeCount}
          ></S.CountInput>
          <DecreaseBtn />
          <IncreaseBtn />
        </S.CounterContainer>
        <BasicTextarea
          handleOnChangeValue={handleOnChangeMsg}
          placeholder="Send a message"
        />
        <S.BasicButtonWrapper>
          <BasicButton
            text="Donate"
            color="var(--color-primary)"
            handleOnClickButton={handleOnClickDonate}
            isBackground={true}
          />
        </S.BasicButtonWrapper>
      </S.Card>
    </S.Container>
  );
};

export default HomeDonation;
