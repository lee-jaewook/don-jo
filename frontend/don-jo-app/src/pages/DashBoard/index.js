import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { Desktop, Mobile } from "../../components/Common/Template";
import DashBoardContent from "../../components/DashBoard/DashBoardContent";
import NavBar from "../../components/DashBoard/NavBar";
import * as S from "./style";
const DashBoard = () => {
  const location = useLocation();
  const [isToggleStatus, setToggleClassName] = useState(false);

  const handleOnClickButton = () => {
    setToggleClassName((prev) => !prev);
    document.body.style.overflow = isToggleStatus ? "unset" : "hidden";
  };

  // 메뉴바 상태에 따른 처리
  useEffect(() => {
    if (!isToggleStatus) return;

    setToggleClassName(false);
    window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
    document.body.style.overflow = "unset";
  }, [location.pathname]);

  return (
    <S.Container>
      <S.DashboardWrapper>
        <Desktop>
          <NavBar />
        </Desktop>
        {isToggleStatus && (
          <S.MenuWrapper>
            <S.MenuBarBackground onClick={handleOnClickButton} />
            <NavBar />
          </S.MenuWrapper>
        )}

        <Mobile>
          <S.HamburgerMenu onClick={handleOnClickButton}>
            <div id="nav-icon3" className={isToggleStatus ? "open" : ""}>
              <span></span>
              <span></span>
              <span></span>
              <span></span>
            </div>
          </S.HamburgerMenu>
        </Mobile>
        <DashBoardContent />
      </S.DashboardWrapper>
    </S.Container>
  );
};

export default DashBoard;
