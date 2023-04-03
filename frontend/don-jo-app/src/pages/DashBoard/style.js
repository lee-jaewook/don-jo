import styled from "styled-components";

export const Container = styled.div`
  width: 100%;
  height: 100%;
  background-color: var(--color-background-secondary);
  padding: 3.75rem 0;
  @media (max-width: 1280px) {
    padding-top: 0.5rem;
    background-color: var(--color-modal);
  }
`;

export const DashboardWrapper = styled.div`
  display: flex;
  /* justify-content: flex-end; */
  max-width: 80rem;
  background-color: white;
  border-radius: 1.25rem;
  margin: 0 auto;

  @media (max-width: 1280px) {
    background-color: transparent;
    justify-content: center;
  }
`;

export const HamburgerMenu = styled.button`
  position: fixed;
  bottom: 2.5rem;
  right: 1.25rem;
  width: 50px;
  height: 50px;
  border-radius: 50%;
  background-color: var(--color-primary);
  filter: drop-shadow(1px 1px 4px rgba(0, 0, 0, 0.25));
  * {
    margin: 0;
    padding: 0;
  }

  #nav-icon3 {
    width: 25px;
    height: 18px;
    position: relative;
    -webkit-transform: rotate(0deg);
    -moz-transform: rotate(0deg);
    -o-transform: rotate(0deg);
    transform: rotate(0deg);
    -webkit-transition: 0.5s ease-in-out;
    -moz-transition: 0.5s ease-in-out;
    -o-transition: 0.5s ease-in-out;
    transition: 0.5s ease-in-out;
    cursor: pointer;
  }

  #nav-icon3 span {
    display: block;
    position: absolute;
    height: 3px;
    width: 100%;
    background: white;
    border-radius: 9px;
    opacity: 1;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    -webkit-transform: rotate(0deg);
    -moz-transform: rotate(0deg);
    -o-transform: rotate(0deg);
    transform: rotate(0deg);
    -webkit-transition: 0.25s ease-in-out;
    -moz-transition: 0.25s ease-in-out;
    -o-transition: 0.25s ease-in-out;
    transition: 0.25s ease-in-out;
  }

  #nav-icon3 span:nth-child(1) {
    top: 0px;
  }

  #nav-icon3 span:nth-child(2),
  #nav-icon3 span:nth-child(3) {
    top: 8px;
    /* top: 18px; */
  }

  #nav-icon3 span:nth-child(4) {
    top: 1rem;
  }

  #nav-icon3.open span:nth-child(1) {
    top: 18px;
    width: 0%;
    left: 50%;
  }

  #nav-icon3.open span:nth-child(2) {
    -webkit-transform: rotate(45deg);
    -moz-transform: rotate(45deg);
    -o-transform: rotate(45deg);
    transform: rotate(45deg);
  }

  #nav-icon3.open span:nth-child(3) {
    -webkit-transform: rotate(-45deg);
    -moz-transform: rotate(-45deg);
    -o-transform: rotate(-45deg);
    transform: rotate(-45deg);
  }

  #nav-icon3.open span:nth-child(4) {
    top: 18px;
    width: 0%;
    left: 50%;
  }
`;

export const MenuWrapper = styled.div`
  position: fixed;
  top: 0rem;
  left: 0rem;
  width: 100%;
  height: 100%;
  z-index: 100;
`;

export const MenuBarBackground = styled.div`
  position: relative;
  width: 100%;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.5);
`;
