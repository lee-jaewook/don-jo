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
  position: relative;
`;

export const BackgroundImgEdit = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  background-color: black;
  background-color: rgba(0, 0, 0, 0.4);
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const EditIcon = styled.div`
  width: 3.75rem;
  height: 3.75rem;
  border-radius: 100%;
  background-color: black;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
`;

export const Wrapper = styled.div`
  margin-top: 10rem;
  width: 100%;
  max-width: 80rem;
  position: absolute;
  /* background-color: blue; */
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
  position: relative;
`;

export const ProfileImgEdit = styled.div`
  position: absolute;
  width: 11.25rem;
  height: 11.25rem;
  border-radius: 100%;
  background-color: black;
  background-color: rgba(0, 0, 0, 0.4);
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const ContentsContainer = styled.div`
  width: 100%;
  display: flex;
`;

export const UserInfo = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;

  //임시 영역 세팅
  width: 300px;
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

export const IntroductionContainer = styled.div`
  width: 100%;
  padding: 1rem 0 1rem 1rem;
  border: 1px solid var(--color-text-secondary);
  border-radius: 1.25rem;

  /* 임시 설정 */
  line-height: 2rem;
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
`;

export const Contents = styled.div`
  border: 1px solid red;
  width: 900px;
  margin-left: auto;
`;
