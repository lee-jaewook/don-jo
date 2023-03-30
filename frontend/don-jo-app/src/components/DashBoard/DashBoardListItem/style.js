import styled from "styled-components";
import { FiMoreHorizontal } from "@react-icons/all-files/fi/FiMoreHorizontal.js";

export const ItemWrapper = styled.div`
  display: flex;
  width: 100%;
  height: 6.25rem;
  background-color: white;
  align-items: center;
  margin-bottom: 0.75rem;
  border-radius: 0.5rem;
  padding: 0px 1.25rem;
  justify-content: space-between;
`;

export const UserImg = styled.img`
  width: 60px;
  height: 3.75rem;
  background-color: #ddd;
  border-radius: 50%;
`;

export const ContentWrapper = styled.div`
  display: flex;
  width: ${(props) =>
    props.pathname === "/dashboard/home"
      ? "calc(100% - 8.6331rem)"
      : "calc(100% - 7rem)"};
  justify-content: space-between;
  background-color: transparent;
  margin-left: 0.75rem;
  @media (max-width: 768px) {
    align-items: flex-start;
    flex-direction: column;
  }
`;

export const UserInfo = styled.div`
  display: flex;
  max-width: 35.375rem;
  flex-direction: column;
`;

export const Icon = styled.span`
  margin-right: 1.5rem;
  @media (max-width: 768px) {
    margin-right: 0.75rem;
  }
`;

export const Supporter = styled.label`
  font-size: 0.875rem;
  line-height: 1rem;
  margin-bottom: 0.25rem;
`;
export const SponsorshipAmount = styled.label`
  font-family: "RobotoMedium";
  line-height: 1.188rem;
`;

export const DateWrapper = styled.div`
  position: relative;
  display: flex;
  align-items: center;
`;

export const Date = styled.label`
  font-size: 0.875rem;
  line-height: 1rem;
  color: var(--color-text-secondary);
  margin-right: 1.5rem;
  @media (max-width: 768px) {
    margin-top: 0.5rem;
  }
`;

export const SFiMoreHorizontal = styled(FiMoreHorizontal)``;

export const Eth = styled.span`
  font-family: "RobotoRegular";
  font-size: 0.875rem;
  line-height: 1rem;
  color: var(--color-text-third);
`;
