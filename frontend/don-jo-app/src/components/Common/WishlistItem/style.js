import styled from "styled-components";
import { FiEdit } from "@react-icons/all-files/fi/FiEdit.js";
export const ItemWrapper = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  width: 100%;
  max-width: 27.5rem;
  padding: 1.25rem;
  background-color: ${(props) =>
    !props.isDashboard
      ? "var(--color-modal)"
      : props.isClosed
      ? "rgba(0,0,0,0.1)"
      : "white"};
  border-radius: 1.25rem;
  cursor: default;
`;

export const ItemContent = styled.div`
  position: relative;
  display: flex;
`;

export const ItemImg = styled.img`
  width: 6.25rem;
  height: 6.25rem;
  background-color: white;
  border-radius: 0.5rem;
`;

export const ItemInformation = styled.div`
  display: flex;
  flex-direction: column;
  width: calc(100% - 8rem);
  margin-left: 0.75rem;
  margin-top: 0.5rem;
`;

export const EditButton = styled(FiEdit)`
  position: absolute;
  width: 1.25rem;
  height: 1.25rem;
  top: 0.875rem;
  right: 0.875rem;
  color: var(--color-text-secondary);
  cursor: pointer;
`;

export const Title = styled.h1`
  font-size: 1rem;
  line-height: 1.188rem;
  margin-bottom: 0.25rem;
  @media (max-width: 300px) {
    font-size: 0.875rem;
  }
`;

export const Description = styled.p`
  max-width: 18rem;
  font-size: 0.875rem;
  line-height: 1.125rem;
  color: var(--color-text-secondary);
  @media (max-width: 300px) {
    font-size: 0.7rem;
    overflow: hidden;
    text-overflow: ellipsis;
    overflow: hidden;
    vertical-align: top;
    text-overflow: ellipsis;
    word-break: break-all;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 1;
  }
`;

export const SupportButton = styled.button`
  position: absolute;
  bottom: 0rem;
  right: 0rem;
  width: 5rem;
  height: 2.5rem;
  font-family: "RobotoMedium";
  line-height: 1.172rem;
  color: white;
  border-radius: 1.25rem;
  margin-top: 0.625rem;
  background-color: var(--color-primary);
  align-self: flex-end;
`;

export const ProgressBarWrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 2.5rem;
  margin-top: 1.5rem;
  background-color: transparent;
`;

export const ProgressBar = styled.div`
  width: 100%;
  height: 0.5rem;
  border-radius: 0.25rem;
  background-color: ${(props) =>
    props.isDashboard ? "var(--color-modal)" : "white"};
`;

export const ProgressState = styled.div`
  width: ${(props) => `${props.currentState}%` || "0%"};
  height: 0.5rem;
  border-radius: 0.25rem;
  background-color: var(--color-primary);
`;

export const AmountWrapper = styled.div`
  width: 100%;
  display: flex;
  margin-top: 0.5rem;
  justify-content: space-between;
`;
export const ProgressAmount = styled.label`
  font-family: ${(props) =>
    props.isAllAmount ? "RobotoRegular" : "RobotoMedium"};
  font-size: 0.875rem;
  line-height: 1rem;
`;

export const Eth = styled.label`
  font-family: "RobotoRegular";
  font-size: 0.75rem;
  line-height: 0.875rem;
  color: #999999;
`;
