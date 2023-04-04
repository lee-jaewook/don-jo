import React, { useEffect, useState } from "react";
import * as S from "./style";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import CurrentSupportList from "../../components/Intro/CurrentSupportRecent";
import DonJoTitleSvg from "../../components/Intro/DonJoTitleSvg";
import { introContents } from "../../data/intro";
import IntroContent from "../../components/Intro/IntroContent";
const Intro = () => {
  const navigate = useNavigate();
  const _pageName = useSelector((state) => state.member.pageName);
  const [pageName, setPageName] = useState("");
  const [isReadOnly, setReadOnly] = useState(false);

  const handleOnChangePageName = (e) => {
    const { value } = e.target;
    setPageName(value);
  };

  const handleOnClickArrowButton = () => {
    if (_pageName !== "") {
      navigate(`/${_pageName}`);
    } else {
      // 회원가입 모달
    }
  };

  useEffect(() => {
    if (_pageName !== "") {
      setPageName(_pageName);
      setReadOnly(true);
    }
  }, [_pageName]);

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
          <S.Input
            value={pageName}
            placeholder="Your Page Name"
            onChange={handleOnChangePageName}
            readOnly={isReadOnly}
          />
          <S.ArrowIcon onClick={handleOnClickArrowButton} />
        </S.InputWrapper>
      </S.Background>
      {introContents &&
        introContents.length > 0 &&
        introContents.map((item) => (
          <IntroContent
            title={item.title}
            description={item.description}
            imageSrc={item.img}
          />
        ))}
    </S.Container>
  );
};

export default Intro;
