import styled from "styled-components";
import BackgroundImg from "../../assets/img/intro/bg-intro.jpg";
import { FiArrowRight } from "@react-icons/all-files/fi/FiArrowRight.js";

export const Container = styled.div`
  display: flex;
  width: 100%;
  height: 100vh;
  flex-direction: column;
  overflow: hidden;
  background-color: #f7f7f7;
  @media (max-width: 798px) {
    padding: 1.25rem 1.25rem 0rem 1.25rem;
  }
  @media (min-width: 799px) and (max-width: 1280px) {
    padding: 4.25rem 1.25rem 0rem 1.25rem;
  }
`;

export const DonJoTitle = styled.h1`
  font-family: "RedHatDisplayBold";
  font-size: 12.5vw;
  line-height: 14.375rem;
  text-align: center;
  /* padding: 4.5rem 2.5rem 0rem 2.5rem; */
  padding-top: 4.5vh;
  @media (min-width: 799px) and (max-width: 1280px) {
    font-size: 11.8vw;
    line-height: 3.625rem;
    padding-top: 2vh;
  }
  @media (max-width: 798px) {
    font-size: 11.5vw;
    line-height: 3.625rem;
    padding-top: 2vh;
  }
`;

export const CurrentEthInfoWrapper = styled.div`
  display: flex;
  width: 200vw;
  height: 6.5625rem;
  background-color: transparent;
  margin: 0 2.5rem;
  /* @media (max-width: 768px) {
    height: 4rem;
  } */
`;

export const CurrentEthInfoItem = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  margin: 2rem 0.25rem 2.25rem 0.25rem;
  background-color: transparent;
  @media (max-width: 768px) {
    margin: 1rem 0.25rem 1.25rem 0.25rem;
  }
  @media (min-width: 799px) and (max-width: 1280px) {
    margin: 2rem 0.25rem 1.25rem 0.25rem;
  }
`;

export const StandardDate = styled.label`
  font-family: "RedHatDisplayRegular";
  font-size: 2.25rem;
  line-height: 3rem;
  color: black;
  @media (max-width: 768px) {
    font-size: 1rem;
    line-height: 1.3125rem;
    padding: 0rem;
  }
`;

export const Indicator = styled.hr`
  width: 3.75rem;
  height: 0.125rem;
  background-color: var(--color-text);
  margin: 0 0.75rem;
  border: none;
  @media (max-width: 768px) {
    margin: 0 0.75rem;
    width: 2.25rem;
  }
`;

export const EthValue = styled.label`
  font-family: "RedHatDisplayMedium";
  font-size: 2.25rem;
  line-height: 3rem;
  color: black;
  @media (max-width: 768px) {
    font-size: 1rem;
    line-height: 1.3125rem;
    padding: 0rem;
  }
`;

export const Background = styled.div`
  position: relative;
  width: calc(100% - 5rem);
  min-height: 37.5rem;
  height: 100%;
  margin: 0 2.5rem;
  background-image: url(${BackgroundImg});
  background-position: center center;
  background-repeat: no-repeat;
  background-size: cover;
  border-radius: 1.25rem;
  @media (max-width: 768px) {
    width: 100%;
    margin: 0rem;
    min-height: 35rem;
  }
`;

export const BackgroundBlur = styled.div`
  width: 100%;
  height: 100%;
  min-height: 37.5rem;
  background: rgba(221, 221, 221, 0.2);
  backdrop-filter: blur(0.3125rem);
  border-radius: 1.25rem;
  padding: 0 2.5rem;
  @media (max-width: 768px) {
    width: 100%;
  }
`;

export const InputWrapper = styled.div`
  position: absolute;
  display: flex;
  top: 50%;
  left: 50%;
  width: 100%;
  max-width: 60rem;
  height: 5rem;
  transform: translate(-50%, -50%);
  align-items: center;
  background-color: white;
  border-radius: 3.125rem;
  @media (max-width: 768px) {
    max-width: 90%;
    height: 2.5rem;
  }
`;

export const InputLabel = styled.label`
  width: 11.6875rem;
  font-family: "RobotoBold";
  font-size: 2.5rem;
  line-height: 2.9375rem;
  margin-left: 2.5rem;
  @media (max-width: 768px) {
    width: auto;
    font-size: 1rem;
    line-height: 1.3125rem;
    margin-left: 1rem;
  }
`;

export const Input = styled.input`
  width: 65%;
  outline: none;
  border: none;
  font-family: "RobotoRegular";
  font-size: 2rem;
  line-height: 2.9375rem;
  @media (max-width: 768px) {
    width: auto;
    font-size: 1rem;
    line-height: 1.3125rem;
  }
`;

export const FiArrowRightIcon = styled(FiArrowRight)`
  position: absolute;
  right: 1.5625rem;
  font-size: 3.75rem;
  @media (max-width: 768px) {
    font-size: 24px;
    right: 1rem;
  }
`;
