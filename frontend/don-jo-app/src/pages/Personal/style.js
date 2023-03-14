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
  border: 1px solid blue;
  width: 100%;
  max-width: 80rem;
  position: absolute;
`;

export const ProfileImgContainer = styled.div`
  border: 1px solid green;
  width: 100%;
  margin-bottom: 2.5rem;
`;

export const ProfileImg = styled.div`
  border: 1px solid purple;
  width: 11.25rem;
  height: 11.25rem;
  border-radius: 100%;
  background-size: cover;
  background-position: center;
  background-image: url(${(props) => props.src});
  filter: drop-shadow(0px 0.625rem 0.625rem rgba(0, 0, 0, 0.05));
  margin-left: 4rem;
`;

export const Contents = styled.div`
  border: 1px solid green;
  width: 100%;
  height: 500px;
`;
