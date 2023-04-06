import styled from "styled-components";

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

export const LogoImg = styled.img`
  width: 4.375rem;
  height: 4.375rem;
  margin-bottom: 0.625rem;
`;

export const Title = styled.label`
  font-family: "RobotoBold";
  font-size: 1.5rem;
  margin-bottom: 2rem;
`;

export const Description = styled.label`
  margin-bottom: 2rem;
`;

export const ButtonContainer = styled.div`
  display: flex;
  width: 100%;
  justify-content: center;
`;

export const ButtonWrapper = styled.div`
  margin: 0 5px;
  min-width: 6.75rem;
  width: 50%;
  max-width: 11.3125rem;
`;
