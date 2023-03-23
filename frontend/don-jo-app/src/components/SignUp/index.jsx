import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import PropTypes from "prop-types";
import BasicInput from "../Common/BasicInput";
import BasicButton from "../Common/BasicButton";
import FullScreenModal from "../Common/Modal/FullScreenModal";

export const SignUp = ({ isModelOpen }) => {
  const memberAddress = useSelector((state) => state.web3.walletAddress);
  const [nickName, setNickName] = useState("");
  const [pageName, setPageName] = useState("");
  const [password, setPassword] = useState("");
  const [profileImgPath, setProfileImgPath] = useState(null);
  const [isDisabled, setIsDisabled] = useState(true);
  useEffect(() => {
    if (
      nickName.trim() !== "" &&
      pageName.trim() !== "" &&
      password.trim() &&
      profileImgPath !== null
    ) {
      setIsDisabled(false);
    } else {
      setIsDisabled(true);
    }
  }, [nickName, pageName, password, profileImgPath]);

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
    // 회원가입 요청...
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
        placeholder="비밀번호를 입력해주세요."
      />
      <BasicButton
        text="Submit"
        color="black"
        isDisabled={isDisabled}
        handleOnClickButton={handleSubmit}
      />
    </FullScreenModal>
  );
};

export default SignUp;

SignUp.propTypes = {};
