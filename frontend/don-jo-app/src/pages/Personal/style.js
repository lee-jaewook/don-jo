import styled from "styled-components";

export const Container = styled.div`
  width: 100vw;
  display: flex;
  flex-direction: column;
  align-items: center;
  position: relative;
`;

export const BackgroundImg = styled.div`
  width: 100vw;
  height: 15rem;
  background-size: cover;
  background-position: center;
  background-image: url(${(props) => props.src});
`;

export const Wrapper = styled.div`
  margin-top: 10rem;
  width: 100%;
  max-width: 80rem;
  position: absolute;
`;

export const ProfileImgContainer = styled.div`
  width: 100%;
  margin-bottom: 2.5rem;
`;

export const ProfileImg = styled.div`
  width: 11.25rem;
  height: 11.25rem;
  border-radius: 100%;
  background-size: cover;
  background-position: center;
  background-image: url(${(props) => props.src});
  filter: drop-shadow(0px 0.625rem 0.625rem rgba(0, 0, 0, 0.05));
  margin-left: 4rem;
`;

export const ContentsContainer = styled.div`
  border: 1px solid green;
  width: 100%;
  display: flex;
`;

export const UserInfo = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;

  //임시 영역 세팅
  width: 300px;
  border: 1px solid pink;
`;

export const Nickname = styled.div`
  font-family: RobotoBold;
  font-size: 1.875rem;
  line-height: 2.1875rem;
  margin-bottom: 0.75rem;
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

export const ExternalLinkContainer = styled.div`
  border: 1px solid black;
  display: flex;
  margin-bottom: 2.5rem;

  /* 임시 영역 설정 */
  height: 2.5rem;
  width: 9rem;
`;

export const IntroductionContainer = styled.div`
  width: 100%;
  padding: 1rem;
  max-height: 37.125rem;
  border-radius: 1.25rem;
  overflow-y: auto;

  /* 임시 설정 */
  background-color: #d9d9d9;
  line-height: 2rem;
`;

export const Contents = styled.div``;
