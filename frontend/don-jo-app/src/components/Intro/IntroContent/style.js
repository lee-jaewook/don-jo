import styled from "styled-components";
export const Content = styled.div`
  display: flex;
  width: 100%;
  max-width: 80rem;
  margin-bottom: 64px;
  align-items: center;
  flex-direction: column;
  @media (max-width: 769px) {
    margin-bottom: 0px;
  }
`;

export const ContentTitle = styled.h1`
  font-family: "RobotoBold";
  font-size: 2.5rem;
  line-height: 1.5rem;
  margin-top: 5.875rem;
  margin-bottom: 2rem;
  @media (max-width: 769px) {
    font-size: 1.25rem;
  }
`;

export const ContentDescription = styled.div`
  font-family: "RobotoRegular";
  font-size: 1.5rem;
  text-align: center;
  line-height: 2rem;
  @media (max-width: 769px) {
    font-size: 0.875rem;
    height: 100%;
    white-space: normal;
    line-height: 1.5rem;
  }
`;

export const ContentWrapper = styled.div`
  display: flex;
  width: 100%;
  background-color: transparent;
  margin-top: 2rem;
  border-radius: 1.25rem;
  justify-content: center;
  margin-top: 64px;
`;
