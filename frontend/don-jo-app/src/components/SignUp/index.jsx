import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import PropTypes from "prop-types";
import BasicInput from "../Common/BasicInput";
import BasicButton from "../Common/BasicButton";
import FullScreenModal from "../Common/Modal/FullScreenModal";
import ProfileImg from "../Common/ProfileImg";

import { memberApi } from "../../api/member";

export const SignUp = ({ isModelOpen }) => {
  const memberAddress = useSelector((state) => state.web3.walletAddress);
  const [nickName, setNickName] = useState("");
  const [pageName, setPageName] = useState("");
  const [password, setPassword] = useState("");
  const [profileImgPath, setProfileImgPath] = useState(
    "https://img.insight.co.kr/static/2023/01/06/700/img_20230106141320_ai905341.webp"
  );
  // const [isDisabled, setIsDisabled] = useState(true);

  // useEffect(() => {
  //   if (
  //     nickName.trim() !== "" &&
  //     pageName.trim() !== "" &&
  //     password.trim() !== "" &&
  //     profileImgPath !== null
  //   ) {
  //     setIsDisabled(false);
  //   } else {
  //     setIsDisabled(true);
  //   }
  // }, [nickName, pageName, password, profileImgPath]);

  const handleNicknameChange = (e) => {
    setNickName(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handlePageNameChange = (e) => {
    setPageName(e.target.value);
  };

  const handleSubmit = () => {
    // 페이지 네임 중복 검사 후
    const signUpMemberCond = {
      address: memberAddress,
      nickname: nickName,
      pageName: pageName,
      password: password,
      profileImgPath: profileImgPath,
    };
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
  };

  return (
    <FullScreenModal handleSetShowModal={isModelOpen}>
      <BasicInput
        type="text"
        value={nickName}
        handleOnChangeValue={handleNicknameChange}
        placeholder="아이디를 입력해주세요."
      />
      <BasicInput
        type="password"
        value={password}
        handleOnChangeValue={handlePasswordChange}
        placeholder="비밀번호를 입력해주세요."
      />
      <BasicInput
        type="text"
        value={pageName}
        handleOnChangeValue={handlePageNameChange}
        placeholder="페이지 이름을 설정해주세요."
      />

      <BasicButton
        text="Submit"
        color="black"
        // isDisabled={isDisabled}
        handleOnClickButton={handleSubmit}
      />
    </FullScreenModal>
  );
};

export default SignUp;

SignUp.propTypes = {};
