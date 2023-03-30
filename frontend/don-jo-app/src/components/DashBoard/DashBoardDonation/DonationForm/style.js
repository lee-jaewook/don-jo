import styled from "styled-components";

export const FormWrapper = styled.div`
  width: 100%;
  background-color: var(--color-modal);
  border-radius: 1.25rem;
  padding: 2rem 1.5rem;
  margin-bottom: 2.5rem;
  @media (max-width: 768px) {
    padding: 2rem 1.25rem;
  }
`;

export const FormDescription = styled.p`
  width: 100%;
  font-size: 0.875;
  line-height: 1rem;
  margin: 0.75rem 0rem 1.5rem 0rem;
`;

export const EmojiSettingWrapper = styled.div`
  position: relative;
  display: flex;
  width: 100%;
  max-width: 18rem;
  margin-bottom: 3.75rem;
`;

export const EmojiButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: space-around;
  width: 7.5rem;
  height: 2.75rem;
  font-size: 1.5rem;
  line-height: 1.75rem;
  border: none;
  background-color: white;
  border-radius: 0.5rem;
  margin-right: 0.75rem;
`;

export const EmojiPickerModal = styled.div`
  position: absolute !important;
  top: 3rem;
  left: 0rem;
  z-index: 10;
`;

export const RadioGroup = styled.div`
  display: flex;
  width: 100%;
  max-width: 16.75rem;
  justify-content: space-between;
  margin-bottom: 3.75rem;
`;

export const RadioWrapper = styled.div`
  position: relative;
  max-width: 2.75rem;
  background-color: transparent;
`;

export const RadioLabel = styled.label`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  font-size: 0.875rem;
  line-height: 1rem;
  cursor: pointer;
`;

export const RadioButton = styled.input`
  appearance: none;
  width: 2.75rem;
  height: 2.75rem;
  border-radius: 50%;
  background-color: white;
  border: 0.0625rem solid var(--color-primary);
  margin: 0;
  cursor: pointer;

  &:checked {
    background-color: var(--color-primary);
  }

  &:checked + ${RadioLabel} {
    color: white !important;
  }
`;

export const ButtonWrapper = styled.div`
  max-width: 17.5rem;
  margin: 3.75rem auto 1.875rem auto;
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
