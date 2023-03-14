import React from "react";
import { useLocation } from "react-router-dom";
import * as S from "./style";
import { menus } from "../../../data/dashboard";
import TestUserImg from "../../../assets/img/common/logo.png";

const NavBar = () => {
  const location = useLocation();

  return (
    <S.NavBar>
      <S.UserWrapper>
        <S.UserImg alt="user-profile-img" src={TestUserImg} />
        <S.UseName>Robert Downey Jr.</S.UseName>
      </S.UserWrapper>
      <S.Line />
      <S.MenuWrapper>
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
