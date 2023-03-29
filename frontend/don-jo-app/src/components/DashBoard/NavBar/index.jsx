import React, { useEffect } from "react";
import { useLocation } from "react-router-dom";
import * as S from "./style";
import { menus } from "../../../data/dashboard";
import { Desktop } from "../../../components/Common/Template";
import { useSelector } from "react-redux";

const NavBar = () => {
  const S3URL = "https://don-jo.s3.ap-northeast-2.amazonaws.com/";
  const location = useLocation();
  const userName = useSelector((state) => state.member.nickName);
  const profileImgPath = useSelector((state) => state.member.profileImgPath);

  useEffect(() => {
    console.log("userName:", userName);
  }, [userName]);

  return (
    <S.NavBar>
      <Desktop>
        <S.UserWrapper>
          <S.UserImg
            alt="user-profile-img"
            src={!profileImgPath ? "" : `${S3URL}/${profileImgPath}`}
          />
          <S.UseName>{userName === undefined ? "songo427" : ""}</S.UseName>
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

export default NavBar;
