import * as S from "./style";
import PropTypes from "prop-types";
import React, { useState } from "react";
import { FiUpload } from "@react-icons/all-files/fi/FiUpload";
import BasicTitle from "../Common/BasicTitle";
import BasicInput from "../Common/BasicInput";
import BasicButton from "../Common/BasicButton";
import FullScreenModal from "../Common/Modal/FullScreenModal";
import { fileSizeValidator } from "../../utils/validation/validator";

/**
 * 회원가입 1단계 - 프로필 등록, nickName, pageName 설정
 * @param {function} isModelOpen
 * @param {function} handleContinueButtonClick
 * @param {function} setUserInfo
 * @param {object} userInfo
 *
 * 프로필 등록: image 데이터로 제한, 사이즈 제한
 * nickname : 한글, 영어, 숫자, 일부 특수문자 지원
 * pageName : API 요청을 보내서 중복검사 및 한글, 영어, 숫자, 일부 특수문자 지원
 */

export const SignUp = ({
  isModelOpen,
  handleContinueButtonClick,
  userInfo,
  setUserInfo,
  profileImgPath,
  setProfileImgPath,
}) => {
  const { nickName, pageName } = userInfo;

  const handleInputChange = (e) => {
    const { id, value } = e.target;
    setUserInfo({
      ...userInfo,
      [id]: value,
    });
  };

  const handleFileChange = async (e) => {
    const { files } = e.target;
    console.log("files: ", files);
    if (e.target.value === "") {
      setProfileImgPath({ previewImgUrl: "", file: {} });
      return;
    }

    if (!fileSizeValidator(files[0])) {
      setProfileImgPath({ previewImgUrl: "", file: {} });
      return;
    }

    const reader = new FileReader();
    reader.readAsDataURL(files[0]);
    reader.onloadend = () => {
      setProfileImgPath({ previewImgUrl: reader.result, file: files[0] });
    };
  };

  return (
    <FullScreenModal handleSetShowModal={isModelOpen}>
      <S.ContentWrap>
        <BasicTitle text="Profile Photo" />
        <S.UserProfileImg
          url={
            profileImgPath.previewImgUrl !== null
              ? profileImgPath.previewImgUrl
              : ""
          }
        >
          <S.EditIconWrapper>
            <label htmlFor="featured-image">
              <FiUpload className="edit-icon" size="20px" color="white" />
            </label>
            <S.UploadButton
              id="featured-image"
              type="file"
              accept="image/*"
              onChange={handleFileChange}
              defaultValue=""
              placeholder="select"
            />
          </S.EditIconWrapper>
        </S.UserProfileImg>
      </S.ContentWrap>

      <S.ContentWrap>
        <S.RequiredInputWrapper>
          <BasicTitle text="Nickname" />
          <S.RequiredIcon>*</S.RequiredIcon>
        </S.RequiredInputWrapper>
        <BasicInput
          id="nickName"
          type="text"
          value={nickName}
          handleOnChangeValue={handleInputChange}
          placeholder="Nickname"
          required
        />
      </S.ContentWrap>

      <S.ContentWrap>
        <S.RequiredInputWrapper>
          <BasicTitle text="pageName" />
          <S.RequiredIcon>*</S.RequiredIcon>
        </S.RequiredInputWrapper>
        <BasicInput
          id="pageName"
          type="text"
          value={pageName}
          handleOnChangeValue={handleInputChange}
          placeholder="PageName"
          required
        />
      </S.ContentWrap>

      <BasicButton
        text="Continue"
        color="var(--color-primary)"
        handleOnClickButton={handleContinueButtonClick}
      />
    </FullScreenModal>
  );
};

export default SignUp;

SignUp.propTypes = {
  isModelOpen: PropTypes.func.isRequired,
};
