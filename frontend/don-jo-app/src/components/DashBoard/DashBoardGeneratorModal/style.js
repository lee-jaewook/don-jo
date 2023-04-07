import styled from "styled-components";

export const PreViewWrap = styled.div`
  position: relative;
  display: flex;
  width: 100%;
  min-height: 12.5rem;
  margin-bottom: 2rem;
  background-color: #333333;
  border-radius: 1.25rem;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

export const ContentWrap = styled.div`
  width: 100%;
  margin-bottom: 2rem;
`;

export const PreView = styled.a`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 0.75rem 1.5rem;
  display: flex;
  width: 13.5625rem;
  height: 3rem;
  background-color: ${(props) => props.color || "#F02C7E"};
  border-radius: 1.5rem;
  text-decoration: none;
  justify-content: center;
  align-items: center;
`;

export const GridBox = styled.div`
  display: grid;
  grid-template-columns: 1fr 2fr;
  grid-gap: 0.75rem;
  height: 2.75rem;
`;

export const ColorPalette = styled.div`
  display: flex;
  width: 18.75rem;
  height: 2.75rem;
  justify-content: space-between;
  align-items: center;
`;

export const Color = styled.input`
  appearance: none;
  width: 2.5rem;
  height: 2.5rem;
  border-radius: 50%;
  background-color: ${(props) => props.value || "#d9d9d9"};
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 1.4rem;
  &:checked {
    ::after {
      content: "✔";
      color: white;
    }
  }
`;

export const EmojiSettingWrapper = styled.div`
  position: relative;
  width: 100%;
`;

export const EmojiButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: space-around;
  width: 100%;
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

export const ButtonWrap = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 2.75rem;
  margin-top: 0.5rem;
`;

export const ButtonContent = styled.div`
  width: 100%;
  height: 100%;
  max-width: 17.5rem;
`;

export const EmojiLabel = styled.label`
  font-size: 1.5rem;
  margin-right: 0.125rem;
`;

export const ButtonLabel = styled.label`
  font-family: ${(props) => props.font || "RobotoMedium"};
  font-size: 16px;
  line-height: 19px;
  text-align: center;
  color: white;
`;

export const CopyButton = styled.button`
  display: flex;
  width: 100%;
  font-weight: 500;
  color: var(--color-text-third);
  align-items: center;
  justify-content: center;
  margin-bottom: 1rem;
  cursor: pointer;

  &:hover {
    color: white;
  }
  label {
    margin-left: 0.5rem;
  }
`;

export const CodeBox = styled.textarea`
  font-family: "RobotoRegular";
  width: calc(100% - 2.5rem);
  margin: 1.25rem;
  border-radius: 1.25rem;
  color: white;
  font-size: 0.875rem;
  line-height: 1.125rem;
  background-color: #333333;
  padding: 1rem;
  border: none;
  overflow: auto;
  /* resize: none; */
`;
