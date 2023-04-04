import React, { useEffect, useRef, useState } from "react";
import * as S from "./style";
import { FiEdit } from "@react-icons/all-files/fi/FiEdit.js";
import BasicButton from "../../Common/BasicButton";
import BasicInput from "../../Common/BasicInput";
import BasicTitle from "../../Common/BasicTitle";
import { colorSet } from "../../../data/dashboard";
import { fileApi } from "../../../api/file";
import { memberApi } from "../../../api/member";
import { useDispatch, useSelector } from "react-redux";
import { setMemberAccount } from "../../../stores/member";
import sendToastMessage from "../../../utils/sendToastMessage";

const PROFILE_TYPE = "img/profile";
const BACKGROUND_TYPE = "img/background";
const S3URL = "https://don-jo.s3.ap-northeast-2.amazonaws.com/";

const DashBoardAccount = () => {
  const dispatch = useDispatch();
  const userPageName = useSelector((state) => state.member.pageName);

  // 업로드 파일 미리보기
  const backgroundImgRef = useRef();
  const profileRef = useRef();

  // 사용자의 기본 배경 설정
  const [backgroundImgFile, setBackgroundImgFile] = useState({
    previewImgUrl: "",
    file: {},
  });

  // 사용자의 기본 프로필 설정
  const [profileImgFile, setProfileImgFile] = useState({
    previewImgUrl: "",
    file: {},
  });

  // 계정 정보 저장 및 비구조분해 할당으로 가져옴
  const [message, setMessage] = useState("");
  const [account, setAccount] = useState({});
  const [social, setSocial] = useState({});
  const { nickname, pageName, themeColor, profileImgPath, backgroundImgPath } =
    account;

  // 입력 변경 처리
  const handleOnChangeInput = (e) => {
    const { id, value } = e.target;

    if (id.includes("link")) {
      setSocial({ ...social, [id]: value });
      return;
    }

    setAccount({
      ...account,
      [id]: value,
    });
  };

  // 라디오 버튼 값 변경 처리
  const handleOnChangeRadioButton = (e) => {
    const { value } = e.target;

    setAccount({
      ...account,
      themeColor: Number(value),
    });
  };

  // 이미지 미리보기를 위한 함수
  const handleMakePreviewImg = (e) => {
    const {
      target: { id, files },
    } = e;

    if (files.length <= 0) {
      return;
    }

    const reader = new FileReader();
    reader.readAsDataURL(files[0]);
    reader.onloadend = () => {
      if (id === "bg-file") {
        setBackgroundImgFile({ previewImgUrl: reader.result, file: files[0] });
        setAccount({ ...account, backgroundImgPath: null });
        return;
      } else if (id === "profile-file") {
        setProfileImgFile({ previewImgUrl: reader.result, file: files[0] });
        setAccount({ ...account, profileImgPath: null });
        return;
      }
    };
  };

  const handleMakeSocialList = () => {
    const dataMap = [];

    for (let i = 1; i <= 3; i++) {
      dataMap.push(social[`link${i}`]);
    }
    return dataMap;
  };

  const handleSaveAccount = async () => {
    // 필수 입력 확인
    if (!nickname || !pageName) {
      alert("필수값 확인 안내");
      return;
    }

    // 페이지 이름 중복 여부 확인
    if (!handleCheckPageName()) {
      alert("Duplicate page name.");
      return;
    }

    let socialList = handleMakeSocialList();

    let myAccount = {
      ...account,
      socialList: socialList,
    };

    // 프로필 이미지 업로드
    if (
      account.profileImgPath === null &&
      profileImgFile.previewImgUrl !== ""
    ) {
      let profileImgPath = await handleUploadFile(
        profileImgFile.file,
        PROFILE_TYPE
      );
      myAccount = { ...myAccount, profileImgPath };
    }

    // 배경 이미지 업로드
    if (
      account.backgroundImgPath === null &&
      backgroundImgFile.previewImgUrl !== ""
    ) {
      let backgroundImgPath = await handleUploadFile(
        backgroundImgFile.file,
        BACKGROUND_TYPE
      );
      myAccount = { ...myAccount, backgroundImgPath };
    }

    try {
      const { status } = await memberApi.updateUserInfo(myAccount);
      if (status === 200) {
        sendToastMessage("✨ Saved successfully.");
        dispatch(
          setMemberAccount({
            pageName: myAccount.pageName,
            nickName: myAccount.nickname,
            themeColor: themeColor,
            profileImagePath: myAccount.profileImgPath,
          })
        );
      }
    } catch (error) {
      console.log("error: ", error);
    }
  };

  // 파일 업로드를 위한 API 호출
  const handleUploadFile = async (file, type) => {
    const formData = new FormData();
    formData.append("multipartFile", file);
    console.log("file: ", file);

    try {
      const { data } = await fileApi.uploadFile(formData, type);
      return data;
    } catch (error) {
      console.log("error: ", error);
    }
  };

  // 기본 정보 조회 API 연결
  const handleGetAccountInfo = async () => {
    try {
      const { data } = await memberApi.getUserInfo();
      setAccount({
        ...data,
      });

      let socialData = {};
      for (let i = 1; i <= 3; i++) {
        socialData[`link${i}`] = data.socialList[i - 1];
      }
      setSocial(socialData);
    } catch (error) {
      console.log("error: ", error);
    }
  };

  // 페이지 이름 중복 검사 API 연결
  const handleCheckPageName = async () => {
    if (userPageName !== pageName) {
      try {
        await memberApi.checkPageName(pageName);
        return true;
      } catch (error) {
        if (error.response.status === 409) {
          setMessage("This page name is already taken.");
          return false;
        }
      }
    }
    return true;
  };

  useEffect(() => {
    handleGetAccountInfo();
  }, []);

  return (
    <S.AccountWrapper>
      <BasicTitle text="Background Photo" />
      <S.BackgroundImg
        url={
          backgroundImgPath
            ? `${S3URL}${backgroundImgPath}`
            : backgroundImgFile.previewImgUrl || ""
        }
      >
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
            defaultValue=""
          />
        </S.EditIconWrapper>
      </S.BackgroundImg>
      <BasicTitle text="Profile Photo" />
      <S.UserProfileImg
        url={
          profileImgPath
            ? `${S3URL}${profileImgPath}`
            : profileImgFile.previewImgUrl || ""
        }
      >
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
            defaultValue=""
          />
        </S.EditIconWrapper>
      </S.UserProfileImg>

      <S.RequiredInputWrapper>
        <BasicTitle text="Nickname" />
        <S.RequiredIcon>*</S.RequiredIcon>
      </S.RequiredInputWrapper>
      <S.InputWrapper size="15rem">
        <BasicInput
          id="nickname"
          type="text"
          value={nickname || ""}
          handleOnChangeValue={handleOnChangeInput}
        />
      </S.InputWrapper>
      <BasicTitle text="Social Link" />
      <S.InputWrapper>
        <BasicInput
          id="link1"
          type="text"
          value={social["link1"] || ""}
          handleOnChangeValue={handleOnChangeInput}
        />
        <BasicInput
          id="link2"
          type="text"
          value={social["link2"] || ""}
          handleOnChangeValue={handleOnChangeInput}
        />

        <BasicInput
          id="link3"
          type="text"
          value={social["link3"] || ""}
          handleOnChangeValue={handleOnChangeInput}
        />
      </S.InputWrapper>
      <S.RequiredInputWrapper>
        <BasicTitle text="Page Name" />
        <S.RequiredIcon>*</S.RequiredIcon>
      </S.RequiredInputWrapper>

      <S.InputWrapper>
        <BasicInput
          id="pageName"
          type="text"
          value={pageName || ""}
          handleOnChangeValue={handleOnChangeInput}
        />

        {message.length > 0 && <label>{message}</label>}
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
              value={index}
              color={color}
              checked={index === themeColor}
              onChange={handleOnChangeRadioButton}
            />
          ))}
      </S.ColorPalette>
      <S.ButtonWrapper>
        <BasicButton
          text="Save"
          color="var(--color-primary)"
          handleOnClickButton={handleSaveAccount}
        />
      </S.ButtonWrapper>
    </S.AccountWrapper>
  );
};

export default React.memo(DashBoardAccount);
