import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import * as S from "./style";
import { menus } from "../../../data/dashboard";
import { Desktop } from "../../../components/Common/Template";
import { useDispatch, useSelector } from "react-redux";
import { FiLogOut } from "@react-icons/all-files/fi/FiLogOut.js";
import { memberApi } from "../../../api/member";
import { setLogOut } from "../../../stores/member";
import Logo from "../../../assets/img/common/default-profile.svg";
import sendToastMessage from "../../../utils/sendToastMessage";

const S3URL = "https://don-jo.s3.ap-northeast-2.amazonaws.com/";

const NavBar = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const userName = useSelector((state) => state.member.nickName);
  const profileImgPath = useSelector((state) => state.member.profileImagePath);

  const handleOnClickLogout = async () => {
    try {
      const { status } = await memberApi.logout();
      if (status === 200) {
        dispatch(setLogOut());
        navigate("/");
        sendToastMessage("✨ logout");
      }
    } catch (error) {
      console.log("[Dashboard] handleOnClickLogout()... ", error);
    }
  };

  return (
    <S.NavBar>
      <Desktop>
        <S.UserWrapper>
          <S.User>
            <S.UserImg
              alt="user-profile-img"
              src={profileImgPath !== "" ? `${S3URL}${profileImgPath}` : Logo}
            />
            <S.UseName>{userName}</S.UseName>
          </S.User>
          <FiLogOut
            onClick={handleOnClickLogout}
            size="22px"
            color="var(--color-text-secondary)"
            style={{ cursor: "pointer" }}
          />
        </S.UserWrapper>
      </Desktop>
      <S.MenuWrapper>
        <Desktop>
          <S.Line />
        </Desktop>
        {menus &&
          menus.length > 0 &&
          menus.map((item, index) => (
            <S.MenuItem
              key={item.name + index}
              current={`/dashboard${item.path}` === location.pathname ? 1 : 0}
            >
              <S.MenuLabel
                current={`/dashboard${item.path}` === location.pathname ? 1 : 0}
                to={`/dashboard${item.path}`}
              >
                <S.MenuIcon aria-label="dashboard-icon" role="img">
                  {item.icon}
                </S.MenuIcon>
                {item.name}
              </S.MenuLabel>
            </S.MenuItem>
          ))}
      </S.MenuWrapper>
    </S.NavBar>
  );
};

export default React.memo(NavBar);
