import styled from "styled-components";

export const Container = styled.div`
  width: 100%;
  @media (min-width: 53.75rem) {
    width: 53.75rem;
  }
`;

export const ContentWrap = styled.div`
  width: 100%;
  padding-bottom: 3rem;
`;

export const BasicInputWrap = styled.div`
  width: 15rem;
`;

export const BasicInput = styled.input`
  width: 15rem;
  height: 2.75rem;
  padding-right: 0.75rem;
  border: none;
  border-radius: 0.5rem;
  background-color: white;
  margin-bottom: 0.75rem;
  border: 0.0625rem solid transparent;
  text-align: right;
  &:hover {
    border-color: var(--color-primary);
  }
`;

export const SeparationContainer = styled.div`
  width: 100%;
  max-width: ${(props) => `${props.width}rem`};
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

export const UnitWrap = styled.div`
  width: 2rem;
  margin-bottom: 0.75rem;
  padding-left: 0.5rem;
  font-size: 0.875rem;
  line-height: 1rem;
`;

export const ImageSizeInfo = styled.div`
  padding-bottom: 1.5rem;
  font-family: "Roboto";
  font-style: normal;
  font-weight: 400;
  font-size: 0.875remx;
  line-height: 1.25rem;
  color: #222222;
`;

export const FileUpload = styled.input`
  width: 15rem;
  height: 2.75rem;
  padding: 0.875rem 0 0.875rem 0.75rem;
  border-radius: 0.5rem;
  background-color: white;
  font-family: "Roboto";
  font-style: normal;
  font-weight: 400;
  font-size: 1rem;
  line-height: 19px;
  color: var(--color-primary);

  &::file-selector-button {
    display: none;
  }

  &::placeholder {
    content: "select a file";
  }
`;

export const ButtonWrap = styled.div`
  display: flex;
  width: 5rem;
  height: 2.5rem;
`;

export const FileUploadButton = styled.label`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 2.5rem;
  font-size: 1rem;
  font-weight: 500;
  line-height: 1.188rem;
  border-radius: 1.5rem;
  font-family: "RobotoMedium";
  color: var(--color-primary);
  border: 0.125rem solid var(--color-primary);
  background-color: white;

  &:hover {
    border: transparent;
    color: white;
    background-color: var(--color-primary);
  }

  ${(props) =>
    props.disabled &&
    `
    opacity: 0.5;
    cursor: not-allowed;
    pointer-events: none;
  `}
`;

export const BasicButtonWrap = styled.div`
  display: flex;
  width: 100%;
  align-items: center;
  justify-content: center;
`;

export const BasicButtonContainer = styled.div`
  width: 17.5rem;
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

export const EditIconWrapper = styled.div`
  display: flex;
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

export const ItemProfileImg = styled.div`
  position: relative;
  width: 17.875rem;
  height: 11.25rem;
  border-radius: 0.5rem;
  border: 0.125rem dashed #d2d2d2;
  background-color: #f7f7f7;
  background-image: ${(props) => `url(${props.url})` || ""};
  background-position: center center;
  background-repeat: no-repeat;
  background-size: cover;

  &:hover {
    background-color: white;
  }
`;

export const AddButton = styled.button`
  width: 17.875rem;
  height: 11.25rem;
  border: 0.125rem dashed #d2d2d2;
  border-radius: 0.5rem;

  &:hover {
    background-color: white;
  }
`;

export const AddIcon = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 2.5rem;
  height: 2.5rem;
  border-radius: 50%;
  background-color: var(--color-text);
  margin: 0 auto;
`;

export const UploadButton = styled.input`
  position: absolute;
  width: 0;
  height: 0;
  padding: 0;
  overflow: hidden;
  border: 0;
`;

export const DeleteButton = styled.button`
  margin-left: 32px;
`;
