import styled from "styled-components";

export const FormWrapper = styled.div`
  width: 100%;
  max-width: 860px;
  background-color: var(--color-modal);
  border-radius: 20px;
  padding: 32px 24px;
  margin-bottom: 40px;
`;

export const FormDescription = styled.p`
  width: 100%;
  font-size: 14px;
  line-height: 16px;
  margin: 12px 0px 24px 0px;
`;

export const EmojiSettingWrapper = styled.div`
  position: relative;
  display: flex;
  width: 100%;
  max-width: 288px;
  margin-bottom: 60px;
`;

export const EmojiButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: space-around;
  width: 120px;
  height: 44px;
  font-size: 24px;
  line-height: 28px;
  border: none;
  background-color: white;
  border-radius: 8px;
  margin-right: 12px;
`;

export const EmojiPickerModal = styled.div`
  position: absolute !important;
  top: 48px;
  left: 0px;
`;

export const RadioGroup = styled.div`
  display: flex;
  width: 100%;
  max-width: 268px;
  justify-content: space-between;
  margin-bottom: 60px;
`;

export const RadioWrapper = styled.div`
  position: relative;
  max-width: 44px;
  background-color: transparent;
`;

export const RadioLabel = styled.label`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  font-size: 14px;
  line-height: 16px;
  cursor: pointer;
`;

export const RadioButton = styled.input`
  appearance: none;
  width: 44px;
  height: 44px;
  border-radius: 50%;
  background-color: white;
  border: 1px solid black;
  margin: 0;
  cursor: pointer;

  &:checked {
    background-color: black;
  }

  &:checked + ${RadioLabel} {
    color: white !important;
  }
`;

export const ButtonWrapper = styled.div`
  max-width: 280px;
  margin: 60px auto 30px auto;
`;
