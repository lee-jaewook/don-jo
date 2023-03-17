import { Link } from "react-router-dom";
import styled from "styled-components";

export const NavBar = styled.div`
  position: sticky;
  top: 0rem;
  display: flex;
  flex-direction: column;
  width: 23.75rem;
  height: 100%;
  background-color: transparent;
`;

export const UserWrapper = styled.div`
  display: flex;
  width: 100%;
  align-items: center;
  margin-top: 2.5rem;
  background-color: transparent;
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
  background-color: #ddd;
  border: 0.063rem solid #f1f1f1;
  box-shadow: 0rem 0.625rem 0.938rem 0.063rem rgba(0, 0, 0, 0.05);
  margin-left: 2.5rem;
  margin-right: 0.75rem;
  background-color: #f1f1f1;
`;

export const UseName = styled.h2`
  font-family: "RobotoMedium";
  font-size: 1.125rem;
  line-height: 1.313rem;
`;

export const MenuWrapper = styled.ul`
  max-width: 17.5rem;
  list-style: none;
  margin-top: 2.25rem;
  margin-left: 2.5rem;
`;
export const MenuItem = styled.li`
  width: 100%;
  height: 3.25rem;
  display: block;
  background-color: ${(props) => (props.current ? "black" : "transparent")};
  border-radius: 1.875rem;
  line-height: 3.25rem;
`;

export const MenuLabel = styled(Link)`
  padding: 1rem;
  margin-left: 1.5rem;
  line-height: 1.188rem;
  color: ${(props) => (props.current ? "white" : "var(--color-text)")};
  background-color: transparent;
`;

export const MenuIcon = styled.span`
  margin-right: 0.75rem;
`;
