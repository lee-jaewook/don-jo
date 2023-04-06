import * as S from "./style";
import ProfileImg from "../ProfileImg";
import { Link, useLocation } from "react-router-dom";
import homeIcon from "../../../assets/img/common/home.png";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import LogoImg from "../../../assets/img/common/app-logo.svg";
import { FiExternalLink } from "@react-icons/all-files/fi/FiExternalLink";
import WalletConnectLogin from "../WalletConnectLogin";

const Header = () => {
  const pageName = useSelector((state) => state.member.pageName);
  const profileImagePath = useSelector(
    (state) => state.member.profileImagePath
  );

  const isLogin = useSelector((state) => state.member.isLogIn);
  const location = useLocation();
  const [profileImgSrc, setProfileImgSrc] = useState("");
  const [profileLinkTo, setProfileLinkTo] = useState("");
  const [isLocalSrc, setIsLocalSrc] = useState(false);
  const [isIntroPage, setIsIntroPage] = useState(false);

  useEffect(() => {
    setProfileImgSrc(profileImagePath);
  }, [profileImagePath]);

  useEffect(() => {
    if (location.pathname === "/") setIsIntroPage(true);
    else setIsIntroPage(false);

    if (location.pathname.includes("/dashboard/")) {
      setProfileImgSrc(homeIcon);
      setIsLocalSrc(true);
      setProfileLinkTo(`/${pageName}`);
    } else {
      setProfileImgSrc(profileImagePath);
      setIsLocalSrc(false);
      setProfileLinkTo("/dashboard/home");
    }
  }, [location.pathname, pageName]);

  return (
    <S.HeaderContainer isIntroPage={isIntroPage}>
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
              <WalletConnectLogin />
            </div>
          )}
        </S.ProfileImgContainer>
      </S.Header>
    </S.HeaderContainer>
  );
};

export default Header;
