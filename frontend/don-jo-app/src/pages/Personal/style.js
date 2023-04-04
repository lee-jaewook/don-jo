import styled from "styled-components";
import defaultProfile from "../../assets/img/common/default-profile.svg";

const S3URL = "https://don-jo.s3.ap-northeast-2.amazonaws.com/";

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  position: relative;
  margin-bottom: 9.375rem;
  overflow-x: hidden;
  min-height: calc(var(--vh, 1vh) * 100 - 23.375rem);
`;

export const BackgroundImg = styled.div`
  width: 100vw;
  height: 15rem;
  background-size: cover;
  background-position: center;
  position: relative;
  background-color: ${(props) =>
    props.src === null ? "var(--color-primary)" : "transparent"};
  background-image: ${(props) =>
    props.src !== null ? `url(${S3URL + props.src})` : "none"};
`;

export const BackgroundImgEdit = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  background-color: var(--color-primary);
  background-color: rgba(0, 0, 0, 0.4);
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const EditIcon = styled.div`
  width: 3.75rem;
  height: 3.75rem;
  border-radius: 100%;
  background-color: var(--color-primary);
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
`;

export const FileInput = styled.input`
  display: none;
`;

export const ProfileImgContainer = styled.div`
  width: 100%;
  margin-bottom: 2.5rem;
  margin-top: 10rem;
  width: 100%;
  max-width: 80rem;
  position: absolute;
`;

export const ProfileImg = styled.div`
  width: 11.25rem;
  height: 11.25rem;
  border-radius: 100%;
  background-color: var(--color-background);
  background-size: cover;
  background-position: center;
  background-image: ${(props) =>
    props.src === "" ? `url(${defaultProfile})` : `url(${S3URL + props.src})`};
  box-shadow: 0px 0.625rem 0.625rem rgba(0, 0, 0, 0.05);
  position: relative;
  margin-left: 4rem;

  @media screen and (max-width: 80rem) {
    margin: 0 auto;
  }
`;

export const ProfileImgEdit = styled.div`
  position: absolute;
  width: 11.25rem;
  height: 11.25rem;
  border-radius: 100%;
  background-color: var(--color-primary);
  background-color: rgba(0, 0, 0, 0.4);
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const ContentsContainer = styled.div`
  width: 100%;
  max-width: 80rem;
  display: flex;
  margin-top: 140px;

  @media screen and (max-width: 80rem) {
    flex-direction: column;
    padding: 0 1.25rem;
  }
`;

export const UserInfo = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  max-width: 300px;
  margin-right: 2rem;

  @media screen and (max-width: 80rem) {
    max-width: unset;
    margin-right: unset;
  }
`;

export const Nickname = styled.div`
  font-family: RobotoBold;
  font-size: 1.875rem;
  line-height: 2.1875rem;
  margin-bottom: 0.75rem;
  color: var(--color-primary);
`;

export const SupporterContainer = styled.div`
  font-size: 1rem;
  display: flex;
  align-items: center;
  line-height: 1.5rem;
  margin-bottom: 1.5rem;
`;

export const NumSupporter = styled.div`
  font-family: RobotoMedium;
  margin-right: 0.25rem;
`;

export const IntroductionContainer = styled.div`
  width: 100%;
  padding: 1rem 0 1rem 1rem;
  border: 1px solid var(--color-text-secondary);
  border-radius: 1.25rem;
  display: ${(props) => (props.isShow ? "block" : "none")};
`;

export const IntroductionEdit = styled.div`
  display: flex;
  justify-content: flex-end;
  width: 100%;
  padding: 0 1rem 0 0;
  margin-bottom: 1rem;
`;

export const Introduction = styled.div`
  overflow-y: auto;
  max-height: 37.125rem;
  padding-right: 0.625rem;
`;
