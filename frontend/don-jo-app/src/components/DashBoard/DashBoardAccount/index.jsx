import React, { useState } from "react";
import { FiEdit } from "react-icons/fi";
import { useInput } from "../../../hooks/useInput";
import BasicButton from "../../Common/BasicButton";
import BasicInput from "../../Common/BasicInput";
import BasicTitle from "../../Common/BasicTitle";
import * as S from "./style";

const colorSet = ["#F02C7E", "#F96D1F", "#14A985", "#2966DD", "#9042DD"];

const DashBoardAccount = () => {
  const [userName, onChangeUserName] = useInput("Robert Downey Jr.");
  const [pageName, onChangePageName] = useInput("songo427");
  const [colorIndex, setColorIndex] = useState(0); // 사용자의 현재 테마 색상 설정

  const handleSaveAccount = () => {
    console.log("handleSaveAccount()...");
  };

  return (
    <S.AccountWrapper>
      <BasicTitle text="Background Photo" />
      <S.BackgroundImg>
        <S.EditIconWrapper>
          <FiEdit size="24px" color="white" />
        </S.EditIconWrapper>
      </S.BackgroundImg>
      <BasicTitle text="Profile Photo" />
      <S.UserProfileImg>
        <S.EditIconWrapper>
          <FiEdit size="24px" color="white" />
        </S.EditIconWrapper>
      </S.UserProfileImg>
      <BasicTitle text="Nickname" />

      <S.InputWrapper size="15rem">
        <BasicInput
          type="text"
          value={userName}
          handleOnChangeValue={onChangeUserName}
        />
      </S.InputWrapper>
      <BasicTitle text="Social Link" />
      <S.InputWrapper>
        <BasicInput
          type="text"
          value="link1"
          handleOnChangeValue={() => console.log("link1")}
        />
        <BasicInput
          type="text"
          value="link2"
          handleOnChangeValue={() => console.log("link2")}
        />
        <BasicInput
          type="text"
          value="link3"
          handleOnChangeValue={() => console.log("link3")}
        />
      </S.InputWrapper>
      <BasicTitle text="Page Name" />
      <S.InputWrapper>
        <BasicInput
          type="text"
          value={pageName}
          handleOnChangeValue={onChangePageName}
        />
      </S.InputWrapper>
      <BasicTitle text="Theme Color" />
      <S.ColorPalette>
        {colorSet &&
          colorSet.length > 0 &&
          colorSet.map((color, index) => (
            <S.Color
              type="radio"
              name="color"
              key={color}
              value={color}
              defaultChecked={index === colorIndex}
              onChange={(e) => setColorIndex(e.target.value)}
            />
          ))}
      </S.ColorPalette>
      <S.ButtonWrapper>
        <BasicButton
          text="Save"
          color="black"
          handleOnClickButton={handleSaveAccount}
        />
      </S.ButtonWrapper>
    </S.AccountWrapper>
  );
};

export default DashBoardAccount;
