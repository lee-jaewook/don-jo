import styled from "styled-components";

export const ContentWrapper = styled.div`
  position: relative;
  width: calc(100vw - 5.5rem);
  max-width: 33.0625rem;
  display: flex;
  flex-direction: column;
`;

export const ContentImg = styled.img`
  width: 100%;
  max-height: 22.5rem;
  border-radius: 1.25rem;
  margin-bottom: 2rem;
  object-fit: contain;
`;

export const Title = styled.h1`
  font-size: 1rem;
  line-height: 1.1875rem;
  margin-bottom: 2rem;
`;

export const Description = styled.p`
  font-size: 1rem;
  line-height: 1.5rem;
  color: var(--color-text-secondary);
  margin-bottom: 32px;
`;

export const Price = styled.label`
  font-family: "RobotoBold";
  font-size: 1.125rem;
  line-height: 1.3125rem;
`;

export const Eth = styled.span`
  font-family: "RobotoRegular";
  font-size: 0.75rem;
  line-height: 0.875rem;
  color: var(--color-text-third);
`;

export const ButtonWrapper = styled.div`
  width: 100%;
  max-width: 17.5rem;
  margin: 2.5rem auto 0rem auto;
`;

export const DeleteButton = styled.button`
  position: absolute;
  bottom: 0rem;
  left: 0rem;
  color: var(--color-text-secondary);
  @media (max-width: 768px) {
    bottom: -1.5rem;
    left: 50%;
    transform: translateX(-50%);
  }
`;

export const DownloadLink = styled.a`
  display: none;
`;
