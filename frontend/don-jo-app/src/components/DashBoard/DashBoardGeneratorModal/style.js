import styled from "styled-components";

export const PreViewWrap = styled.div`
  width: 100%;
  margin-bottom: 2rem;
  height: 7.5rem;
  background-color: black;
  border-radius: 1.25rem;
  position: relative;
`;

export const ContentWrap = styled.div`
  width: 100%;
  margin-bottom: 2rem;
`;

export const PreView = styled.div`
  position: absolute;
  left: 5rem;
  top: 2.25rem;
  background-color: white;
  border-radius: 1.5rem;
  height: 3rem;
  width: calc(100% - 156px);
`;

export const GridBox = styled.div`
  display: grid;
  grid-template-columns: 1fr 2fr;
  grid-gap: 0.75rem;
  height: 2.75rem;
`;

export const ColorPalette = styled.div`
  display: flex;
  width: 16.75rem;
  height: 2.75rem;
  justify-content: space-between;
  align-items: center;
`;

export const Color = styled.input`
  appearance: none;
  width: 2.75rem;
  height: 2.75rem;
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
