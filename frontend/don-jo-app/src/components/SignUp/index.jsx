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

  const [userInfo, setUserInfo] = useState({
    nickName: "",
    pageName: "",
    password: "",
  });

  const { nickName, pageName, password } = userInfo;

  const [profileImgPath, setProfileImgPath] = useState({
    previewImgUrl: "",
    file: {},
  });

  // validation check
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

  const handleInputChange = (e) => {
    const { id, value } = e.target;
    setUserInfo({
      ...userInfo,
      [id]: value,
    });
  };

  const handleFileChange = (e) => {
    if (e.target.value === "") return;
    const files = e.target.files;

    const reader = new FileReader();
    reader.onloadend = () => {
      setProfileImgPath({ previewImgUrl: reader.result, file: files[0] });
    };
  };

  const handleSubmit = () => {
    // 페이지 네임 중복 검사 후
    // const signUpMemberCond = {
    //   address: memberAddress,
    //   nickname: nickName,
    //   pageName: pageName,
    //   password: password,
    //   profileImgPath: profileImgPath,
    // };
    // memberApi
    //   .signUp(signUpMemberCond)
    //   .then((res) => {
    //     console.log("회원가입 성공: ", res);
    //     localStorage.setItem("accesstoken", res.headers.accesstoken);
    //     sessionStorage.setItem("refreshtoken", res.headers.refreshtoken);
    //   })
    //   .catch((error) => {
    //     console.log("회원가입 실패");
    //   });
    isModelOpen();
  };

  return (
    <FullScreenModal handleSetShowModal={isModelOpen}>
      {/* <S.ItemProfileImg>
        <S.EditIconWrapper></S.EditIconWrapper>
      </S.ItemProfileImg> */}
      <BasicInput
        id="nickName"
        type="text"
        value={nickName}
        handleOnChangeValue={handleInputChange}
        placeholder="Nickname"
      />
      <BasicInput
        id="password"
        type="password"
        value={password}
        handleOnChangeValue={handleInputChange}
        placeholder="Password"
      />
      <BasicInput
        id="pageName"
        type="text"
        value={pageName}
        handleOnChangeValue={handleInputChange}
        placeholder="PageName"
      />

      <BasicButton
        text="Submit"
        color="var(--color-primary)"
        // isDisabled={isDisabled}
        handleOnClickButton={handleSubmit}
      />
    </FullScreenModal>
  );
};

export default SignUp;

SignUp.propTypes = {
  isModelOpen: PropTypes.func.isRequired,
};
