import React, { useRef, useState } from "react";
import * as S from "./style";
import { FiEdit } from "react-icons/fi";
import BasicButton from "../../Common/BasicButton";
import BasicInput from "../../Common/BasicInput";
import BasicTitle from "../../Common/BasicTitle";
import { colorSet } from "../../../data/dashboard";
import { fileApi } from "../../../api/file";

const DashBoardAccount = () => {
  const PROFILE_TYPE = "img/profile";
  const BACKGROUND_TYPE = "img/background";

  // 업로드 파일 미리보기
  const backgroundImgRef = useRef();
  const profileRef = useRef();

  const [backgroundImgFile, setBackgroundImgFile] = useState({
    previewImgUrl: "",
    file: {},
  }); // 사용자의 기본 배경 설정
  const [profileImgFile, setProfileImgFile] = useState({
    previewImgUrl: "",
    file: {},
  }); // 사용자의 기본 프로필 설정
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

  // 이미지 미리보기를 위한 함수
  const handleMakePreviewImg = (e) => {
    const {
      target: { id, files },
    } = e;

    const reader = new FileReader();
    reader.readAsDataURL(files[0]);
    reader.onloadend = () => {
      if (id === "bg-file") {
        setBackgroundImgFile({ previewImgUrl: reader.result, file: files[0] });
        return;
      } else if (id === "profile-file") {
        setProfileImgFile({ previewImgUrl: reader.result, file: files[0] });
        return;
      }
    };
  };

  const handleSaveAccount = async () => {
    // 프로필 이미지 업로드
    const profileImgPath = await handleUploadFile(
      profileImgFile.file,
      PROFILE_TYPE
    );
    // 배경 이미지 업로드
    const backgroundImgPath = await handleUploadFile(
      backgroundImgFile.file,
      BACKGROUND_TYPE
    );

    const myAccount = {
      ...account,
      profileImgPath,
      backgroundImgPath,
    };
    // account 객체에 모든 내용이 있는지 확인하고 수정 API 호출
    console.log("[API 호출 시점] account : ", myAccount);
  };

  const handleUploadFile = async (file, type) => {
    const formData = new FormData();
    formData.append("multipartFile", file);

    try {
      const { data } = await fileApi.uploadFile(formData, type);
      return data;
    } catch (error) {
      console.log("error: ", error);
    }
  };

  return (
    <S.AccountWrapper>
      <BasicTitle text="Background Photo" />
      <S.BackgroundImg url={backgroundImgFile.previewImgUrl || ""}>
        <S.EditIconWrapper>
          <label htmlFor="bg-file">
            <FiEdit className="edit-icon" size="24px" color="white" />
          </label>
          <S.UploadButton
            ref={backgroundImgRef}
            id="bg-file"
            type="file"
            accept="image/*"
            onChange={handleMakePreviewImg}
          />
        </S.EditIconWrapper>
      </S.BackgroundImg>
      <BasicTitle text="Profile Photo" />
      <S.UserProfileImg url={profileImgFile.previewImgUrl || ""}>
        <S.EditIconWrapper>
          <label htmlFor="profile-file">
            <FiEdit className="edit-icon" size="24px" color="white" />
          </label>
          <S.UploadButton
            ref={profileRef}
            id="profile-file"
            type="file"
            accept="image/*"
            onChange={handleMakePreviewImg}
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
