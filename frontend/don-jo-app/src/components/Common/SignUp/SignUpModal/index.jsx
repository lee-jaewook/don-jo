import * as S from "./style";
import PropTypes from "prop-types";
import React from "react";
import { FiUpload } from "@react-icons/all-files/fi/FiUpload";
import BasicTitle from "../../BasicTitle";
import BasicInput from "../../BasicInput";
import BasicModal from "../../Modal/BasicModal";
import { fileSizeValidator } from "../../../../utils/validation/validator";
import BasicButton from "../../BasicButton";

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

export const SignUpModal = ({
  isModelOpen,
  handleContinueButtonClick,
  userInfo,
  setUserInfo,
  profileImgPath,
  setProfileImgPath,
}) => {
  const { nickname, pageName } = userInfo;

  const handleCancleButtonClick = (e) => {
    document.body.style.overflow = "auto";
    isModelOpen(false);
  };

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
    <BasicModal handleSetShowModal={isModelOpen}>
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
          <BasicTitle text="NickName" />
          <S.RequiredIcon>*</S.RequiredIcon>
        </S.RequiredInputWrapper>
        <BasicInput
          id="nickname"
          type="text"
          value={nickname}
          handleOnChangeValue={handleInputChange}
          placeholder="NickName"
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
    </BasicModal>
  );
};

export default SignUpModal;

SignUpModal.propTypes = {
  isModelOpen: PropTypes.func.isRequired,
};
