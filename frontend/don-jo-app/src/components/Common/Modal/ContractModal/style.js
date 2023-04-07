import styled from "styled-components";

export const Container = styled.div``;

export const Title = styled.h1`
  font-family: "RobotoBold";
  font-size: 1.75rem;
  margin-bottom: 0.75rem;
`;

export const ProgressContainer = styled.div`
  border-radius: 0.75rem;
  background-color: var(--color-background);
  width: 100%;
  height: 10.4375rem;
  margin-bottom: 2rem;
  padding: 0.75rem;
`;

export const TransactionHash = styled.a`
  text-decoration: underline;
  line-height: 1.25rem;
`;

export const RefreshContainer = styled.div`
  display: flex;
  justify-content: flex-end;
  align-items: center;
  margin-bottom: 0.875rem;
  color: var(--color-text-secondary);
`;

export const Label = styled.label`
  width: max-content;
  max-width: 300px;
  word-break: break-all;
`;

export const RefreshIconWrapper = styled.button`
  margin-left: 0.5rem;
`;

export const ProgressWrapper = styled.div`
  position: relative;
  display: flex;
`;

export const Bar = styled.div`
  width: 48%;
  height: 0.5rem;
  background-color: ${(props) =>
    props.isEnable ? "var(--color-primary)" : "#DDDDDD"};
  position: absolute;
  top: 50%;
  transform: translate(${(props) => (props.isFirst ? "5%" : "105%")}, -14px);
`;

export const ProfileContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: ${(props) => (props.isMiddle ? "0 auto" : "0")};
`;

export const ProfileWrapper = styled.div`
  width: 3.75rem;
  height: 3.75rem;
  background-color: ${(props) =>
    props.isEnable ? "var(--color-primary)" : "#DDDDDD"};
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1;
`;

export const Tag = styled.label`
  font-family: "RobotoMedium";
  margin-top: 0.5rem;
`;

export const InfoContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 2rem;
`;

export const Wrapper = styled.div`
  display: flex;
  width: 100%;

  @media screen and (max-width: 48rem) {
    flex-direction: column;
    gap: 12px;
  }
`;

export const Type = styled.label`
  font-family: "RobotoMedium";
  font-size: 1.25rem;
  color: var(--color-text-secondary);
  min-width: 8.75rem;
`;

export const TextContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;

export const Amount = styled.label`
  font-family: "RobotoBold";
`;

export const Unit = styled.label`
  margin-left: 2px;
`;

export const TimeContainer = styled.div`
  display: flex;
`;

export const TimeText = styled.label`
  margin-left: 0.3125rem;
  color: var(--color-text-secondary);
`;
