import { Link } from "react-router-dom";
import styled from "styled-components";

export const NavBar = styled.div`
  position: sticky;
  display: flex;
  top: 0rem;
  width: 17.5rem;
  height: 100%;
  flex-direction: column;
  background-color: transparent;
  margin-left: 2.5rem;
  margin-right: 3.75rem;
  @media (max-width: 1280px) {
    position: absolute;
    top: unset;
    bottom: 7rem;
    right: 1.25rem;
    width: 12.75rem;
    height: 21.125rem;
    border-radius: 1.25rem;
    background-color: white;
    z-index: 100;
    overflow: hidden;
    padding-left: 0px;
    align-items: center;
    margin: 0;
  }
`;

export const UserWrapper = styled.div`
  display: flex;
  width: 100%;
  align-items: center;
  margin-top: 2.5rem;
  background-color: transparent;
  justify-content: space-around;
`;

export const User = styled.div`
  display: flex;
  align-items: center;
  margin-right: 4px;
`;

export const Line = styled.hr`
  width: 100%;
  border: 0.063rem solid var(--color-background-secondary);
  margin-bottom: 2.5rem;
`;

export const UserImg = styled.img`
  width: 5rem;
  height: 5rem;
  border-radius: 50%;
  background-color: white;
  border: 0.063rem solid #f1f1f1;
  box-shadow: 0rem 0.625rem 0.938rem 0.063rem rgba(0, 0, 0, 0.05);
  margin-right: 0.75rem;
  background-color: #f1f1f1;
  background-repeat: no-repeat;
  background-size: contain;
`;

export const UseName = styled.h2`
  font-family: "RobotoMedium";
  font-size: 1.125rem;
  line-height: 1.313rem;
`;

export const MenuWrapper = styled.ul`
  max-width: 17.5rem;
  list-style: none;
  margin-top: 1.875rem;
  background-color: white;
  margin-bottom: 2.25rem;
  @media (max-width: 1280px) {
    width: 11.25rem;
    margin: 0.75rem;
  }
`;
export const MenuItem = styled.li`
  width: 100%;
  height: 3.25rem;
  display: block;
  background-color: ${(props) =>
    props.current ? "var(--color-primary)" : "transparent"};
  border-radius: 1.875rem;
  line-height: 3.25rem;
`;

export const MenuLabel = styled(Link)`
  padding: 1rem;
  margin-left: 1.5rem;
  line-height: 1.188rem;
  color: ${(props) => (props.current ? "white" : "var(--color-text)")};
  background-color: transparent;
  @media (max-width: 1280px) {
    margin: 0rem;
  }
`;

export const MenuIcon = styled.span`
  margin-right: 0.75rem;
`;

export const LogoutButton = styled.button`
  width: 100%;
  height: 3.25rem;
  background-color: transparent;
  font-size: 1rem;
  margin-top: 32px;
  font-family: "RobotoMedium";
`;
