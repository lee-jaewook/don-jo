import styled from "styled-components";
import BackgroundImg from "../../assets/img/intro/bg-intro.jpg";

export const Container = styled.div`
  display: flex;
  width: 100%;
  height: 100%;
  flex-direction: column;
  overflow: hidden;
  background-color: #f7f7f7;
`;

export const DonJoTitle = styled.h1`
  font-family: "RedHatDisplayBold";
  font-size: 15rem;
  line-height: 14.375rem;
  text-align: center;
  padding: 4.5rem 2.5rem 0rem 2.5rem;
`;

export const CurrentEthInfoWrapper = styled.div`
  display: flex;
  width: 200vw;
  height: 6.5625rem;
  background-color: transparent;
  margin: 0 2.5rem;
`;

export const CurrentEthInfoItem = styled.div`
  display: flex;
  align-items: center;
  margin: 2rem 0.25rem 2.25rem 0.25rem;
`;

export const StandardDate = styled.label`
  font-family: "RedHatDisplayRegular";
  font-size: 2.25rem;
  line-height: 3rem;
  color: black;
`;

export const Indicator = styled.hr`
  width: 3.75rem;
  height: 0.125rem;
  background-color: var(--color-text);
  margin: 0 0.75rem;
  border: none;
`;

export const EthValue = styled.label`
  font-family: "RedHatDisplayMedium";
  font-size: 2.25rem;
  line-height: 3rem;
  color: black;
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
`;

export const BackgroundBlur = styled.div`
  width: 100%;
  height: 100%;
  min-height: 37.5rem;
  background: rgba(221, 221, 221, 0.2);
  backdrop-filter: blur(0.3125rem);
  border-radius: 1.25rem;
  padding: 0 2.5rem;
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
`;

export const InputLabel = styled.label`
  width: 11.6875rem;
  font-family: "RobotoBold";
  font-size: 2.5rem;
  line-height: 2.9375rem;
  margin-left: 2.5rem;
`;

export const Input = styled.input`
  width: 65%;
  outline: none;
  border: none;
  font-family: "RobotoRegular";
  font-size: 2rem;
  line-height: 2.9375rem;
`;

export const ArrowIconWrapper = styled.div`
  position: absolute;
  right: 1.5625rem;
`;
