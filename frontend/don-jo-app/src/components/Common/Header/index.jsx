import * as S from "./style";
import ProfileImg from "../ProfileImg";
import SelectBox from "./SelectBox";
import { Link, useLocation } from "react-router-dom";
import homeIcon from "../../../assets/img/common/home.png";
import { useEffect, useState } from "react";
import FullScreenModal from "../Modal/FullScreenModal";
import { logIn } from "../../../utils/logIn";
import { useDispatch, useSelector } from "react-redux";
import SignUp from "../../SignUp";
import LogoImg from "../../../assets/img/common/app-logo.svg";

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

  return (
    <S.HeaderContainer>
      <S.Header>
        <Link to="/">
          <S.Logo src={LogoImg} />
        </Link>
        <S.GuideSelect>
          <SelectBox />
        </S.GuideSelect>
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
      {isShowSignUpModal && <SignUp isModelOpen={setIsShowSignUpModal} />}
    </S.HeaderContainer>
  );
};

export default Header;
