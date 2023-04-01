import * as S from "./style";
import ProfileImg from "../ProfileImg";
import { Link, useLocation } from "react-router-dom";
import homeIcon from "../../../assets/img/common/home.png";
import { useEffect, useState } from "react";
import { metamaskLogIn } from "../../../utils/metamaskLogIn";
import { walletConnectLogIn } from "../../../utils/walletConnectLogIn";
import { useDispatch, useSelector } from "react-redux";
import SignUp from "../../SignUp";
import LogoImg from "../../../assets/img/common/app-logo.svg";
import { FiExternalLink } from "@react-icons/all-files/fi/FiExternalLink";
import PasswordSetModal from "../Modal/PasswordSetModal";
import { checkSignUpValidation } from "../../../utils/validation/checkSignUpValidation";
import { memberApi } from "../../../api/member";
import SelectBox from "./SelectBox";
import { fileApi } from "../../../api/file";
import sendToastMessage from "../../../utils/sendToastMessage";
import WalletConnectLogin from "../WalletConnectLogin";

const IMAGE_TYPE = "img/item";

const Header = () => {
  const dispatch = useDispatch();
  const pageName = useSelector((state) => state.member.pageName);
  const profileImagePath = useSelector(
    (state) => state.member.profileImagePath
  );

  const isLogin = useSelector((state) => state.member.isLogIn);
  const address = useSelector((state) => state.member.walletAddress);
  const location = useLocation();
  const [profileImgSrc, setProfileImgSrc] = useState("");
  const [profileLinkTo, setProfileLinkTo] = useState("");
  const [isShowSignUpModal, setIsShowSignUpModal] = useState(false);
  const [isLocalSrc, setIsLocalSrc] = useState(false);
  const [isShowPasswordSetModal, setIsShowPasswordSetModal] = useState(false);
  const [userInfo, setUserInfo] = useState({
    nickName: "",
    pageName: "",
    password: "",
  });
  const [profileImgPath, setProfileImgPath] = useState({
    previewImgUrl: "",
    file: {},
  });

  useEffect(() => {
    setProfileImgSrc(profileImagePath);
  }, [profileImagePath]);

  useEffect(() => {
    if (location.pathname.includes("/dashboard/")) {
      setProfileImgSrc(homeIcon);
      setIsLocalSrc(true);
      setProfileLinkTo(`/${pageName}`);
    } else {
      setProfileImgSrc(profileImagePath);
      setIsLocalSrc(false);
      setProfileLinkTo("/dashboard/home");
    }
  }, [location.pathname]);

  const handleSignUpModalOpen = () => {
    setIsShowSignUpModal(false);
  };

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
  };

  /**
   * handleMetamaskLogInClick - 메타마스크 LogIn 함수
   * 설명:
   * Start 버튼 클릭에 대한 이벤트 함수.
   * 회원일 경우, 로그인 처리
   * 비회원일 경우, 회원가입 모달 띄우기
   */
  const handleMetamaskLogInClick = () => {
    metamaskLogIn({
      dispatch,
      handleModalOpen: () => {
        setIsShowSignUpModal(true);
      },
    });
  };

  /**
   * handleContinueButtonClick
   * 설명:
   * SignUp Modal (회원가입 1단계)에서 Continue 버튼 클릭 시 호출
   * nickName, pageName의 Validation을 체크
   * 유효할 경우, SignUp Modal에서 Password Modal로 이동.
   * 유효하지 않을 경우, alert를 띄우고, SignUp Modal 유지.
   */
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

  /**
   * doSignUp - 회원가입 함수
   * 설명:
   *
   */

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

  /**
   * handleWalletConnectLogInClick - 월렛커넥트 LogIn 함수
   * 설명:
   * 회원일 경우, 로그인 처리
   * 비회원일 경우, 회원가입 모달 띄우기
   */
  const handleWalletConnectLogInClick = () => {
    walletConnectLogIn({
      dispatch,
      handleModalOpen: () => {
        setIsShowSignUpModal(true);
      },
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
    <S.HeaderContainer>
      <S.Header>
        <Link to="/">
          <S.Logo src={LogoImg} />
        </Link>
        <S.Guide
          onClick={() => {
            window.open("https://j8a209.p.ssafy.io/guides/");
          }}
        >
          <FiExternalLink size="14" color="var(--color-text)" />
          &nbsp;Guide
        </S.Guide>
        <S.ProfileImgContainer>
          {isLogin ? (
            <ProfileImg
              width={2.5}
              src={profileImgSrc}
              to={profileLinkTo}
              isLocalSrc={isLocalSrc}
            />
          ) : (
            <div style={{ display: "flex" }}>
              <SelectBox
                metamaskLogin={handleMetamaskLogInClick}
                walletConnectLogin={() => {
                  console.log("여기 함수에 월렛커넥트 로그인 처리 함수 넣기");
                }}
              >
                Start
              </SelectBox>
              <WalletConnectLogin />
            </div>
          )}
        </S.ProfileImgContainer>
      </S.Header>
      {/* 임시로 FullScreen 모달 띄우기 -> 로그인 모달로 바뀔 예정 */}
      {isShowSignUpModal && (
        <SignUp
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
    </S.HeaderContainer>
  );
};

export default Header;
