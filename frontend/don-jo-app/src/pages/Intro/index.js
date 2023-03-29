import React from "react";
import * as S from "./style";

const Intro = () => {
  return (
    <S.Container>
      <S.DonJoTitle>DON-JO TO ME</S.DonJoTitle>
      <S.CurrentEthInfoWrapper>
        <S.CurrentEthInfoItem>
          <S.StandardDate> Mar 23 2023</S.StandardDate>
          <S.Indicator />
          <S.EthValue>DONATE</S.EthValue>
          <S.Indicator />
          <S.EthValue>982.9273 ETH</S.EthValue>
        </S.CurrentEthInfoItem>
        {/* <S.CurrentEthInfoItem>
          <S.StandardDate> Mar 23 2023</S.StandardDate>
          <S.Indicator />
          <S.EthValue>ITEMS</S.EthValue>
          <S.Indicator />
          <S.EthValue>982.9273 ETH</S.EthValue>
        </S.CurrentEthInfoItem>
        <S.CurrentEthInfoItem>
          <S.StandardDate> Mar 23 2023</S.StandardDate>
          <S.Indicator />
          <S.EthValue>WISHLIST</S.EthValue>
          <S.Indicator />
          <S.EthValue>982.9273 ETH</S.EthValue>
        </S.CurrentEthInfoItem> */}
      </S.CurrentEthInfoWrapper>

      <S.Background>
        <S.BackgroundBlur />
        <S.InputWrapper>
          <S.InputLabel>don-jo.co/</S.InputLabel>
          <S.Input type="text" placeholder="your page name" />
          <S.FiArrowRightIcon />
        </S.InputWrapper>
      </S.Background>
    </S.Container>
  );
};

export default Intro;
