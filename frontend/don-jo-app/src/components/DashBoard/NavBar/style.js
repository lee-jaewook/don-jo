import { Link } from "react-router-dom";
import styled from "styled-components";

export const NavBar = styled.div`
  display: flex;
  flex-direction: column;
  width: 380px;
  height: 100%;
  background-color: transparent;
`;

export const UserWrapper = styled.div`
  display: flex;
  width: 100%;
  align-items: center;
  margin: 36px 0;
  background-color: transparent;
`;

export const Line = styled.hr`
  width: 100%;
  border: 1px solid var(--color-background-secondary);
`;

export const UserImg = styled.img`
  width: 80px;
  height: 80px;
  border-radius: 50%;
  border: 1px solid #f1f1f1;
  box-shadow: 0px 10px 15px 1px rgba(0, 0, 0, 0.05);
  margin-left: 40px;
  margin-right: 12px;
  background-color: #f1f1f1;
`;

export const UseName = styled.h2`
  font-family: "RobotoMedium";
  font-size: 18px;
  line-height: 21px;
`;

export const MenuWrapper = styled.ul`
  max-width: 280px;
  list-style: none;
  margin-top: 40px;
  margin-left: 40px;
`;
export const MenuItem = styled.li`
  width: 100%;
  height: 52px;
  display: block;
  background-color: ${(props) => (props.current ? "black" : "transparent")};
  border-radius: 30px;
  line-height: 52px;
`;

export const MenuLabel = styled(Link)`
  margin-left: 24px;
  line-height: 19px;
  color: ${(props) => (props.current ? "white" : "var(--color-text)")};
`;

export const MenuIcon = styled.span`
  margin-right: 12px;
`;
