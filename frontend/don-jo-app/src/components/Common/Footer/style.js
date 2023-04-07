import styled from "styled-components";

export const FooterWrapper = styled.footer`
  width: 100%;
  min-height: 20rem;
  background-color: black;
  display: flex;
  text-align: center;
  justify-content: center;
  color: white;
  /* line-height: 10rem; */

  @media screen and (max-width: 80rem) {
    padding: 0 1.25rem;
  }
`;

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 80rem;
`;

export const LineAbove = styled.div`
  display: flex;
  width: 100%;
`;

export const PartWrapper = styled.div`
  display: flex;
  flex-direction: column;
  margin: 0 auto;
  align-items: flex-start;
`;

export const ServiceTitle = styled.label`
  font-family: "RobotoBold";
  font-size: 30px;
  margin-bottom: 18px;
`;

export const ServiceDescription = styled.label`
  max-width: 22.5rem;
  text-align: start;
  line-height: 1.25rem;
`;

export const Part = styled.label`
  font-family: "RobotoMedium";
  font-size: 1.25rem;
  display: flex;
  margin-bottom: 20px;
`;

export const PersonWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
`;

export const Person = styled.label`
  margin: 12px 0;
`;

export const Link = styled.a`
  color: white;
  text-decoration: underline;
  cursor: pointer;

  &:hover {
    color: var(--color-text-third);
  }
`;

export const Line = styled.div`
  width: 90%;
  height: 0.0625rem;
  background-color: var(--color-text-secondary);
  margin: 0.9375rem 0;
`;

export const LineUnder = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const Logo = styled.img`
  width: 1.5625rem;
  height: 1.5625rem;
  margin-left: 0.625rem;
`;
