import React, { useRef, useState } from "react";
import * as S from "./style";
import { FiEdit } from "react-icons/fi";
import { useInput } from "../../../hooks/useInput";
import BasicButton from "../../Common/BasicButton";
import BasicInput from "../../Common/BasicInput";
import BasicTitle from "../../Common/BasicTitle";
import { colorSet } from "../../../data/dashboard";

const DashBoardAccount = () => {
  // 업로드 파일 미리보기
  const backgroundImgRef = useRef();
  const profileRef = useRef();

  const [nickname, onChangeNickname] = useInput("HyunJu"); // 사용자의 현재 이름 설정
  const [pageName, onChangePageName] = useInput("songo427"); // 사용자의 현재 페이지 이름 설정
  const [colorIndex, setColorIndex] = useState("#F02C7E"); // 사용자의 현재 테마 색상 설정
  const [backgroundImgFile, setBackgroundImgFile] = useState(""); // 사용자의 기본 배경 설정
  const [profileImgFile, setProfileImgFile] = useState(""); // 사용자의 기본 프로필 설정

  const handleSaveImgFile = (e) => {
    const {
      target: { id },
    } = e;
    if (id === "bg-file" && backgroundImgRef.current !== null) {
      const file = backgroundImgRef.current.files[0];
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onloadend = () => {
        setBackgroundImgFile(reader.result);
      };
      return;
    }

    if (id === "profile-file" && profileRef.current !== null) {
      const file = profileRef.current.files[0];
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onloadend = () => {
        setProfileImgFile(reader.result);
      };
      return;
    }
  };

  const handleSaveAccount = () => {
    console.log("handleSaveAccount()...");
  };

  return (
    <S.AccountWrapper>
      <BasicTitle text="Background Photo" />
      <S.BackgroundImg url={backgroundImgFile || ""}>
        <S.EditIconWrapper>
          <label htmlFor="bg-file">
            <FiEdit className="edit-icon" size="24px" color="white" />
          </label>
          <S.UploadButton
            ref={backgroundImgRef}
            id="bg-file"
            type="file"
            accept="image/*"
            onChange={handleSaveImgFile}
          />
        </S.EditIconWrapper>
      </S.BackgroundImg>
      <BasicTitle text="Profile Photo" />
      <S.UserProfileImg url={profileImgFile || ""}>
        <S.EditIconWrapper>
          <label htmlFor="profile-file">
            <FiEdit className="edit-icon" size="24px" color="white" />
          </label>
          <S.UploadButton
            ref={profileRef}
            id="profile-file"
            type="file"
            accept="image/*"
            onChange={handleSaveImgFile}
          />
        </S.EditIconWrapper>
      </S.UserProfileImg>
      <BasicTitle text="Nickname" />

      <S.InputWrapper size="15rem">
        <BasicInput
          type="text"
          value={nickname}
          handleOnChangeValue={onChangeNickname}
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
              defaultChecked={color === colorIndex}
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
