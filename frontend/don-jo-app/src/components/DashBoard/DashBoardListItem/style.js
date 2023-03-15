import styled from "styled-components";

export const ItemWrapper = styled.div`
  position: relative;
  display: flex;
  width: 100%;
  height: 6.25rem;
  background-color: white;
  align-items: center;
  margin-bottom: 0.75rem;
  border-radius: 0.5rem;
  padding: 0px 1.25rem;
`;

export const UserImg = styled.div`
  width: 3.75rem;
  height: 3.75rem;
  background-color: #ddd;
  border-radius: 50%;
`;

export const UserInfo = styled.div`
  display: flex;
  flex-direction: column;
  margin-left: 0.75rem;
`;

export const Icon = styled.span`
  margin-right: 1.5rem;
`;

export const Supporter = styled.label`
  font-size: 0.875rem;
  line-height: 1rem;
`;
export const SponsorshipAmount = styled.label`
  font-family: "RobotoMedium";
  line-height: 1.188rem;
`;

export const DateWrapper = styled.div`
  position: absolute;
  right: 1.25rem;
  display: flex;
  align-items: center;
`;

export const Date = styled.label`
  font-size: 0.875rem;
  line-height: 1rem;
  color: var(--color-text-secondary);
  margin-right: 1.5rem;
`;

export const Eth = styled.span`
  font-family: "RobotoRegular";
  font-size: 0.875rem;
  line-height: 1rem;
  color: var(--color-text-third);
`;
