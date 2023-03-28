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
const Header = () => {
  const dispatch = useDispatch();
  //로그인 유저 더미데이터
  const loginUser = {
    profileImgPath: "",
    memberAddress: "taehyun",
  };

  const isLogin = useSelector((state) => state.member.isLogIn);

  const location = useLocation();
  const [profileImgSrc, setProfileImgSrc] = useState("");
  const [profileLinkTo, setProfileLinkTo] = useState("");
  const [isShowSignUpModal, setIsShowSignUpModal] = useState(false);
  const [isLocalSrc, setIsLocalSrc] = useState(false);

  useEffect(() => {
    if (location.pathname.includes("/dashboard/")) {
      setProfileImgSrc(homeIcon);
      setIsLocalSrc(true);
      setProfileLinkTo(`/${loginUser.memberAddress}`);
    } else {
      setProfileImgSrc(loginUser.profileImgPath);
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
          <S.Logo />
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
