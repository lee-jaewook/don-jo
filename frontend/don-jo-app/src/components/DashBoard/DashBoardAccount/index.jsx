import React, { useRef, useState } from "react";
import * as S from "./style";
import { FiEdit } from "react-icons/fi";
import BasicButton from "../../Common/BasicButton";
import BasicInput from "../../Common/BasicInput";
import BasicTitle from "../../Common/BasicTitle";
import { colorSet } from "../../../data/dashboard";

const DashBoardAccount = () => {
  // 업로드 파일 미리보기
  const backgroundImgRef = useRef();
  const profileRef = useRef();

  const [backgroundImgFile, setBackgroundImgFile] = useState(""); // 사용자의 기본 배경 설정
  const [profileImgFile, setProfileImgFile] = useState(""); // 사용자의 기본 프로필 설정
  const [account, setAccount] = useState({
    nickname: "HyunJu",
    pageName: "songo427",
    colorIndex: "#F02C7E",
    link1: "",
    link2: "",
    link3: "",
  });

  const { nickname, pageName, colorIndex, link1, link2, link3 } = account;

  const handleOnChangeInput = (e) => {
    const { id, value } = e.target;

    setAccount({
      ...account,
      [id]: value,
    });
  };

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
          id="nickname"
          type="text"
          value={nickname}
          handleOnChangeValue={handleOnChangeInput}
        />
      </S.InputWrapper>
      <BasicTitle text="Social Link" />
      <S.InputWrapper>
        <BasicInput
          id="link1"
          type="text"
          value={link1}
          handleOnChangeValue={handleOnChangeInput}
        />
        <BasicInput
          id="link2"
          type="text"
          value={link2}
          handleOnChangeValue={handleOnChangeInput}
        />
        <BasicInput
          id="link3"
          type="text"
          value={link3}
          handleOnChangeValue={handleOnChangeInput}
        />
      </S.InputWrapper>
      <BasicTitle text="Page Name" />
      <S.InputWrapper>
        <BasicInput
          type="text"
          value={pageName}
          handleOnChangeValue={handleOnChangeInput}
        />
      </S.InputWrapper>
      <BasicTitle text="Theme Color" />
      <S.ColorPalette>
        {colorSet &&
          colorSet.length > 0 &&
          colorSet.map((color, index) => (
            <S.Color
              id={`color${index}`}
              type="radio"
              name="color"
              key={color}
              value={color}
              defaultChecked={color === colorIndex}
              onChange={handleOnChangeInput}
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
