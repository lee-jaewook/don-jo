import React from "react";
import CurrentSupportList from "../../components/Intro/CurrentSupportRecent";
import DonJoTitleSvg from "../../components/Intro/DonJoTitleSvg";
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
      <S.ContentWrapper></S.ContentWrapper>
      {/* 컨텐츠 소개2 */}
      <S.ContentTitle>
        Transparent Sponsorship History Management!
      </S.ContentTitle>
      <S.ContentDescription>
        You can receive the details of the sponsors transparently through
        blockchain technology.
      </S.ContentDescription>
      <S.ContentWrapper></S.ContentWrapper>
      {/* 컨텐츠 소개3 */}
      <S.ContentTitle>
        Purchase items and provide wishlist functionality!
      </S.ContentTitle>

      <S.ContentDescription>
        You can sell and manage your own creations in DonJo!
      </S.ContentDescription>
      <S.ContentWrapper></S.ContentWrapper>
    </S.Container>
  );
};

export default Intro;
