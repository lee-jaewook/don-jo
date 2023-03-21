import * as S from "./style";
import ProfileImg from "../ProfileImg";
import SelectBox from "./SelectBox";
import { Link, useLocation } from "react-router-dom";
import homeIcon from "../../../assets/img/common/home.png";
import { useEffect, useState } from "react";

const Header = () => {
  //로그인 유저 더미데이터
  const loginUser = {
    profileImgPath:
      "https://img.insight.co.kr/static/2023/01/06/700/img_20230106141320_ai905341.webp",
    memberAddress: "taehyun",
  };

  const location = useLocation();
  const [profileImgSrc, setProfileImgSrc] = useState("");
  const [profileLinkTo, setProfileLinkTo] = useState("");

  useEffect(() => {
    if (location.pathname.includes("/dashboard/")) {
      setProfileImgSrc(homeIcon);
      setProfileLinkTo(`/${loginUser.memberAddress}`);
    } else {
      setProfileImgSrc(loginUser.profileImgPath);
      setProfileLinkTo("/dashboard/home");
    }
  }, [location.pathname]);

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
          <ProfileImg width={2.5} src={profileImgSrc} to={profileLinkTo} />
        </S.ProfileImgContainer>
      </S.Header>
    </S.HeaderContainer>
  );
};

export default Header;
