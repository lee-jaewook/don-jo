import styled, { keyframes } from "styled-components";

const slideText = keyframes`
  from { transform: translateX(0); }
  to { transform: translateX(-50%); }
`;

export const CurrentSupportList = styled.div`
  position: relative;
  width: 100%;
  font-size: 2.25rem;
  max-width: 100%;
  height: auto;
  padding: 1.5rem 0 3rem 0;
  overflow-x: hidden;
  overflow-y: hidden;
  background-color: transparent;

  @media (hover: hover) and (min-width: 2000px) {
    .content {
      -webkit-transform: translateY(calc(100% - 8rem));
      transform: translateY(calc(100% - 8rem));
    }
  }
`;

export const Track = styled.div`
  position: absolute;
  white-space: nowrap;
  will-change: transform;
  animation: ${slideText} 20s linear infinite;
  background-color: transparent;

  .content {
    display: flex;
  }
`;

export const SupportItem = styled.div`
  margin: 0 12px;
`;

export const DateTime = styled.label`
  font-family: "RedHatDisplayRegular";
  font-size: 2.25rem;
  line-height: 3rem;
  @media (max-width: 769px) {
    font-size: 1rem;
  }
`;

export const SupportType = styled.label`
  font-family: "RedHatDisplayRegular";
  font-size: 2.25rem;
  line-height: 3rem;
  @media (max-width: 769px) {
    font-size: 1rem;
  }
`;

export const Price = styled.label`
  font-family: "RedHatDisplayMedium";
  font-size: 2.25rem;
  line-height: 3rem;
  @media (max-width: 769px) {
    font-size: 1rem;
  }
`;

export const Unit = styled.span`
  font-family: "RedHatDisplayRegular";
`;

export const Separator = styled.span`
  display: inline-block;
  width: 3.75rem;
  height: 0.125rem;
  background-color: #222222;
  margin: auto 0.75rem;
  @media (max-width: 769px) {
    width: 2rem;
    height: 0.0938rem;
  }
`;
