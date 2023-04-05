import { useState } from "react";
import { memberApi } from "../../../api/member";
import { fileApi } from "../../../api/file";
import { checkSignUpValidation } from "../../../utils/validation/checkSignUpValidation";
import PasswordSetModal from "../Modal/PasswordSetModal";
import SignUpModal from "./SignUpModal";
import { useAccount } from "wagmi";
import PropTypes from "prop-types";
import sendToastMessage from "../../../utils/sendToastMessage";

const SignUp = ({ isShowSignUp, setIsShowSignUp, pageName }) => {
  const IMAGE_TYPE = "img/item";

  const address = useAccount()[0];
  const [isShowSignUpModal, setIsShowSignUpModal] = useState(isShowSignUp);
  const [isShowPasswordSetModal, setIsShowPasswordSetModal] = useState(false);

  const [userInfo, setUserInfo] = useState({
    nickname: "",
    pageName: pageName,
    password: "",
  });
  const [profileImgPath, setProfileImgPath] = useState({
    previewImgUrl: "",
    file: {},
  });

  const isModalOpen = () => {
    setUserInfo({
      nickname: "",
      pageName: "",
      password: "",
    });
    setProfileImgPath({
      previewImgUrl: "",
      file: {},
    });
    setIsShowSignUpModal(false);
    setIsShowPasswordSetModal(false);
    setIsShowSignUp(false);
  };

  const handleContinueButtonClick = async () => {
    if (!checkSignUpValidation(userInfo.nickname, userInfo.pageName)) return;
    const page = userInfo.pageName.toLowerCase();
    if (page === "dashboard" || page === "guide") {
      sendToastMessage("🚫 This page name is not available");
      return;
    }
    await memberApi
      .checkPageName(userInfo.pageName)
      .then(() => {
        setIsShowSignUpModal(false);
        setIsShowPasswordSetModal(true);
      })
      .catch(({ response: { status } }) => {
        if (status === 409) {
          sendToastMessage("🚫 The nickname is already taken.");
        }
      });
  };

  const doSignUp = async (inputPassword) => {
    let signUpMemberCond = {
      ...userInfo,
      address: address,
      password: inputPassword,
      profileImgPath: "",
    };

    if (profileImgPath.previewImgUrl !== "") {
      let createdItemPath = await handleUploadFile(
        profileImgPath.file,
        IMAGE_TYPE
      );
      signUpMemberCond = {
        ...signUpMemberCond,
        profileImgPath: createdItemPath,
      };
    }

    memberApi
      .signUp(signUpMemberCond)
      .then((res) => {})
      .catch((error) => {
        console.log("🚫 Failed to sign up.");
      });
  };

  const handleSetPassword = (inputPassword) => {
    setUserInfo((prev) => ({
      ...prev,
      password: inputPassword,
    }));
  };

  const handleUploadFile = async (file, type) => {
    const formData = new FormData();
    formData.append("multipartFile", file);

    try {
      const { data } = await fileApi.uploadFile(formData, type);
      return data;
    } catch (error) {
      console.log(
        "An error occurred in SignUp. the function name is 'handleUploadFile'.",
        error
      );
    }
  };

  return (
    <>
      {isShowSignUpModal && (
        <SignUpModal
          isModelOpen={isModalOpen}
          userInfo={userInfo}
          setUserInfo={setUserInfo}
          handleContinueButtonClick={handleContinueButtonClick}
          profileImgPath={profileImgPath}
          setProfileImgPath={setProfileImgPath}
        />
      )}
      {isShowPasswordSetModal && (
        <PasswordSetModal
          handleSetShowModal={isModalOpen}
          setPassword={handleSetPassword}
          doSignUp={doSignUp}
        />
      )}
    </>
  );
};

export default SignUp;

SignUp.propTypes = {
  isShowSignUp: PropTypes.bool.isRequired,
  setIsShowSignUp: PropTypes.func.isRequired,
  pageName: PropTypes.string,
};

SignUp.defaultProps = {
  pageName: "",
};
