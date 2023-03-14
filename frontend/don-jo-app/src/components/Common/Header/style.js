import styled from "styled-components";
import LogoImg from "../../../assets/img/common/logo.png";

export const HeaderContainer = styled.div`
  width: 100%;
  height: 4rem;
  background-color: var(--color-background);
  display: flex;
  align-items: center;
  justify-content: center;
  box-sizing: border-box;
`;

export const Header = styled.div`
  display: flex;
  align-items: center;
  width: 80rem;
`;

export const Logo = styled.div`
  width: 2.5rem;
  height: 2.5rem;
  background-size: cover;
  background-image: url(${LogoImg});
`;

export const GuideSelect = styled.div`
  margin-left: auto;
`;

export const ProfileImgContainer = styled.div`
  margin-left: 1.5rem;
`;
