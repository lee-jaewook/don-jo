import React from "react";
import CurrentSupportList from "../../components/Intro/CurrentSupportRecent";
import DonJoTitleSvg from "../../components/Intro/DonJoTitleSvg";
import UndrawEther from "../../assets/img/intro/undraw_ether.svg";
import UndrawTransaction from "../../assets/img/intro/undraw_transaction.svg";
import UndrawTransferMoney from "../../assets/img/intro/undraw_transfer_money.svg";
import * as S from "./style";

const Intro = () => {
  return (
    <S.Container>
      <S.DonJoTitle>
        <DonJoTitleSvg />
      </S.DonJoTitle>
      <CurrentSupportList />
      <S.Background>
        <ul className="circles">
          <li></li>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
        </ul>
        <S.InputWrapper>
          don-jo.co/
          <S.Input placeholder="Your Page Name" />
          <S.ArrowIcon />
        </S.InputWrapper>
      </S.Background>
      {/* 컨텐츠 소개1 */}
      <S.ContentTitle>Go to my own sponsorship page!</S.ContentTitle>
      <S.ContentDescription>
        DonJo provides an image button that can be attached to my site or blog.
      </S.ContentDescription>
      <S.ContentWrapper>
        <img src={UndrawTransferMoney} alt="undrawEther" width={300} />
      </S.ContentWrapper>

      <S.ContentTitle>Go to my own sponsorship page!</S.ContentTitle>
      <S.ContentDescription>
        DonJo provides an image button that can be attached to my site or blog.
      </S.ContentDescription>
      <S.ContentWrapper>
        <img src={UndrawEther} alt="undrawEther" width={300} />
      </S.ContentWrapper>

      <S.ContentTitle>Go to my own sponsorship page!</S.ContentTitle>
      <S.ContentDescription>
        DonJo provides an image button that can be attached to my site or blog.
      </S.ContentDescription>
      <S.ContentWrapper>
        <img src={UndrawTransaction} alt="undrawEther" width={300} />
      </S.ContentWrapper>
    </S.Container>
  );
};

export default Intro;
