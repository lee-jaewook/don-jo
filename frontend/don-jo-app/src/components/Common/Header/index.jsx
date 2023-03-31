import * as S from "./style";
import ProfileImg from "../ProfileImg";
import { Link, useLocation } from "react-router-dom";
import homeIcon from "../../../assets/img/common/home.png";
import { useEffect, useState } from "react";
import { logIn } from "../../../utils/logIn";
import { useDispatch, useSelector } from "react-redux";
import SignUp from "../../SignUp";
import LogoImg from "../../../assets/img/common/app-logo.svg";
import { FiExternalLink } from "@react-icons/all-files/fi/FiExternalLink";
import PasswordSetModal from "../Modal/PasswordSetModal";
import { checkSignUpValidation } from "../../../utils/validation/checkSignUpValidation";
import { memberApi } from "../../../api/member";
import SelectBox from "./SelectBox";

const Header = () => {
  const dispatch = useDispatch();
  const pageName = useSelector((state) => state.member.pageName);
  const profileImagePath = useSelector(
    (state) => state.member.profileImagePath
  );

  const isLogin = useSelector((state) => state.member.isLogIn);

  const location = useLocation();
  const [profileImgSrc, setProfileImgSrc] = useState("");
  const [profileLinkTo, setProfileLinkTo] = useState("");
  const [isShowSignUpModal, setIsShowSignUpModal] = useState(false);
  const [isLocalSrc, setIsLocalSrc] = useState(false);
  const [isShowStartDropDown, setIsShowStartDropDown] = useState(false);
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
  };

  /**
   * handleLogInClick - LogIn 함수
   * 설명:
   * Start 버튼 클릭에 대한 이벤트 함수.
   * 회원일 경우, 로그인 처리
   * 비회원일 경우, 회원가입 모달 띄우기
   */
  const handleLogInClick = () => {
    logIn({
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
  const handleContinueButtonClick = () => {
    if (!checkSignUpValidation(userInfo.nickName, userInfo.pageName)) return;
    setIsShowSignUpModal(false);
    setIsShowPasswordSetModal(true);
  };

  /**
   * doSignUp - 회원가입 함수
   * 설명:
   *
   */

  const doSignUp = () => {
    const signUpMemberCond = {};
    //회원가입하는 함수
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
            <SelectBox
              metamaskLogin={handleLogInClick}
              walletConnectLogin={() => {
                console.log("여기 함수에 월렛커넥트 로그인 처리 함수 넣기");
              }}
            >
              Start
            </SelectBox>
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
          // doSignUp={doSignUp}
        />
      )}
    </S.HeaderContainer>
  );
};

export default Header;
