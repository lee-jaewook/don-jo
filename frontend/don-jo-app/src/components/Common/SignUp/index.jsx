import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { memberApi } from "../../../api/member";
import { metamaskLogIn } from "../../../utils/metamaskLogIn";
import { fileApi } from "../../../api/file";
import { checkSignUpValidation } from "../../../utils/validation/checkSignUpValidation";
import PasswordSetModal from "../Modal/PasswordSetModal";
import SignUpModal from "./SignUpModal";
import { useEffect } from "react";

const SignUp = ({ isShowSignUp, setIsShowSignUp }) => {
  const dispatch = useDispatch();
  const IMAGE_TYPE = "img/item";

  const address = useSelector((state) => state.member.walletAddress);
  const [isShowSignUpModal, setIsShowSignUpModal] = useState(isShowSignUp);
  const [isShowPasswordSetModal, setIsShowPasswordSetModal] = useState(false);

  useEffect(() => {
    console.log("현재 회원가입하려는 사람의 지갑 주소: ", address);
  }, [address]);

  const [userInfo, setUserInfo] = useState({
    nickName: "",
    pageName: "",
    password: "",
  });
  const [profileImgPath, setProfileImgPath] = useState({
    previewImgUrl: "",
    file: {},
  });

  /**
   * isModalOpen - Signup 모달 함수
   * 설명:
   * SignUp 모달에서 닫기 버튼 클릭 시
   * state 초기화 및 모달 닫기 함수 실행
   */
  const isModalOpen = () => {
    setUserInfo({
      nickName: "",
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
    if (!checkSignUpValidation(userInfo.nickName, userInfo.pageName)) return;
    await memberApi
      .checkPageName(userInfo.pageName)
      .then(() => {
        setIsShowSignUpModal(false);
        setIsShowPasswordSetModal(true);
      })
      .catch(({ response: { status } }) => {
        if (status === 409) {
          // sendToastMessage("🚫 Please enter a message");
          alert("중복된 닉네임입니다.");
        }
      });
  };

  const doSignUp = async (inputPassword) => {
    let signUpMemberCond = {
      ...userInfo,
      nickname: userInfo.nickName,
      address: address,
      password: inputPassword,
      profileImgPath: "",
    };
    // 아이템 이미지 업로드 확인
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
    console.log("signUpMemberCond: ", signUpMemberCond);
    //회원가입하는 함수
    memberApi
      .signUp(signUpMemberCond)
      .then((res) => {
        metamaskLogIn({ dispatch, handleModalOpen: isModalOpen });
      })
      .catch((error) => {
        console.log("회원가입 실패");
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
      console.log("error: ", error);
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
