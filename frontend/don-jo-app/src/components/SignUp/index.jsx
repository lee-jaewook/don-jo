import * as S from "./style";
import PropTypes from "prop-types";
import React, { useState } from "react";
import { FiUpload } from "@react-icons/all-files/fi/FiUpload";
import { useSelector } from "react-redux";
import { memberApi } from "../../api/member";
import BasicTitle from "../Common/BasicTitle";
import BasicInput from "../Common/BasicInput";
import BasicButton from "../Common/BasicButton";
import FullScreenModal from "../Common/Modal/FullScreenModal";

export const SignUp = ({ isModelOpen }) => {
  const memberAddress = useSelector((state) => state.web3.walletAddress);
  const [checkPageNameValidation, setCheckPageNameValidation] = useState(false);

  const [userInfo, setUserInfo] = useState({
    nickName: "",
    pageName: "",
  });

  const { nickName, pageName } = userInfo;

  const [profileImgPath, setProfileImgPath] = useState({
    previewImgUrl: "",
    file: {},
  });

  // validation check
  const [isDisabled, setIsDisabled] = useState(true);

  // useEffect(() => {
  //   if (
  //     nickName.trim() !== "" &&
  //     pageName.trim() !== ""
  //   ) {
  //     setIsDisabled(false);
  //   } else {
  //     setIsDisabled(true);
  //   }
  // }, [nickName, pageName]);

  const handleInputChange = (e) => {
    const { id, value } = e.target;
    setUserInfo({
      ...userInfo,
      [id]: value,
    });
    if (id === "pageName" && checkPageNameValidation) {
      setCheckPageNameValidation(false);
    }
  };

  const handleFileChange = (e) => {
    if (e.target.value === "") return;
    const files = e.target.files;
    const reader = new FileReader();
    reader.readAsDataURL(files[0]);
    reader.onloadend = () => {
      setProfileImgPath({ previewImgUrl: reader.result, file: files[0] });
    };
  };

  const handlePageNameValidation = () => {
    memberApi
      .checkPageName()
      .then((res) => {
        console.log("res: ", res);
        setCheckPageNameValidation(true);
      })
      .catch((error) => console.log("error: ", error));
  };

  // const handleContinueButtonClick = () => {
  //   if()
  // }

  // const handleUploadFile = async(file, type);

  const handleSubmit = async () => {
    const signUpMemberCond = {
      address: memberAddress,
      nickname: nickName,
      pageName: pageName,
      password: "1234",
      profileImgPath: "",
    };

    console.log("signUpMemberCond: ", signUpMemberCond);
    memberApi
      .signUp(signUpMemberCond)
      .then((res) => {
        console.log("회원가입 성공: ", res);
        localStorage.setItem("accesstoken", res.headers.accesstoken);
        sessionStorage.setItem("refreshtoken", res.headers.refreshtoken);
      })
      .catch((error) => {
        console.log("회원가입 실패");
      });
    isModelOpen();
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
        handleOnClickButton={handleSubmit}
      />
    </FullScreenModal>
  );
};

export default SignUp;

SignUp.propTypes = {
  isModelOpen: PropTypes.func.isRequired,
};
