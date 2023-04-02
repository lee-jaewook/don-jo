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
      {/* 컨텐츠 소개2 */}
      {/* 컨텐츠 소개3 */}
    </S.Container>
  );
};

export default Intro;
