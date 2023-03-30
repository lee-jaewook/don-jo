import * as S from "./style";
import ProfileImg from "../ProfileImg";
import { Link, useLocation } from "react-router-dom";
import homeIcon from "../../../assets/img/common/home.png";
import { useEffect, useState } from "react";
import { logIn } from "../../../utils/logIn";
import { useDispatch, useSelector } from "react-redux";
import SignUp from "../../SignUp";
import LogoImg from "../../../assets/img/common/app-logo.svg";
import { FiExternalLink } from "react-icons/fi";
import PasswordSetModal from "../Modal/PasswordSetModal";

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
  const [isShowPasswordSetModal, setIsShowPasswordSetModal] = useState(false);
  const [userInfo, setUserInfo] = useState({
    nickName: "",
    pageName: "",
  });
  const [password, setPassword] = useState("");

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
    setIsShowSignUpModal((prev) => !prev);
  };

  const SubmitLogIn = () => {
    logIn({ dispatch, handleModalOpen: handleSignUpModalOpen });
  };

  const doSignUp = () => {
    //회원가입하는 함수
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
            <S.Startbtn onClick={SubmitLogIn}>Start</S.Startbtn>
          )}
        </S.ProfileImgContainer>
      </S.Header>
      {/* 임시로 FullScreen 모달 띄우기 -> 로그인 모달로 바뀔 예정 */}
      {isShowSignUpModal && (
        <SignUp
          isModelOpen={setIsShowSignUpModal}
          userInfo={userInfo}
          setUserInfo={setUserInfo}
        />
      )}
      {isShowPasswordSetModal && (
        <PasswordSetModal
          handleSetShowModal={setIsShowPasswordSetModal}
          setPassword={setPassword}
          doSignUp={doSignUp}
        />
      )}
    </S.HeaderContainer>
  );
};

export default Header;
