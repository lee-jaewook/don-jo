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
    if (isToggleStatus) {
      document.body.style.overflow = "unset";
    } else {
      document.body.style.overflow = "hidden";
    }
  };

  useEffect(() => {
    if (isToggleStatus) setToggleClassName(false);
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
