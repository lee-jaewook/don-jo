import styled from "styled-components";
import { Button } from "../../BasicButton/style";

export const ContentWrap = styled.div`
  width: 100%;
  min-width: 17.5rem;
  padding-bottom: 1rem;
`;

export const EditIconWrapper = styled.div`
  display: none;
  position: absolute;
  width: 2.5rem;
  height: 2.5rem;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: var(--color-primary);
  border-radius: 50%;
  justify-content: center;
  align-items: center;
  cursor: pointer;

  .edit-icon {
    cursor: pointer;
  }
`;

export const UserProfileImg = styled.div`
  position: relative;
  display: flex;
  width: 6.25rem;
  height: 6.25rem;
  border-radius: 50%;
  background-color: #d9d9d9;
  background-image: ${(props) => `url(${props.url})` || ""};
  background-position: center center;
  background-repeat: no-repeat;
  background-size: cover;

  &:hover > ${EditIconWrapper} {
    display: flex;
  }
`;

export const UploadButton = styled.input`
  position: absolute;
  width: 0;
  height: 0;
  padding: 0;
  overflow: hidden;
  border: 0;
`;

export const FormWrap = styled.form`
  width: 100%;
`;

export const PageNameWrap = styled.div`
  display: grid;
  width: 100%;
  grid-template-columns: 5fr 1fr;
  grid-gap: 0.5rem;
`;

export const RequiredInputWrapper = styled.div`
  display: flex;
  align-items: center;
  background-color: transparent;
`;

export const RequiredIcon = styled.span`
  color: red;
  font-family: "RobotoBold";
  font-size: 1.25rem;
  line-height: 1.465rem;
  padding-bottom: 0.75rem;
  margin-left: 0.25rem;
`;
