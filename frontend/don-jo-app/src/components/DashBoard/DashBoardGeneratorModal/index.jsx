import React, { useCallback, useRef, useState } from "react";
import * as S from "./style";
import PropTypes from "prop-types";
import BasicButton from "../../Common/BasicButton";
import BasicInput from "../../Common/BasicInput";
import BasicModal from "../../Common/Modal/BasicModal";
import BasicTitle from "../../Common/BasicTitle";
import CustomSelect from "../DashBoardCustomSelect";
import EmojiPicker from "emoji-picker-react";
import { FiChevronDown } from "react-icons/fi";
import { useInput } from "../../../hooks/useInput";
import { generatorColorSet } from "../../../data/dashboard";
import { toPng, toJpeg, toBlob, toPixelData, toSvg } from "html-to-image";
import { fileApi } from "../../../api/file";

/**
 * 플러그인 생성기 컴포넌트
 * @param {Object} props - 컴포넌트에 전달되는 props
 * @param {boolean} props.isSearchDefault - searchValue에 Default 값 적용 여부
 * @param {function} props.isModalOpen - Modal을 닫을 때 호출될 콜백 함수
 * @param {boolean} props.isItemsRequired - searchItems 컴포넌트는 필수 여부
 * @returns {JSX.Element} - 렌더링 결과
 */

const DashBoardGeneratorModal = ({
  isSearchDefault,
  isModalOpen,
  isItemsRequired = true,
}) => {
  const ref = useRef(null);
  const [title, setTitle] = useState("My Button Name");
  const [colorIndex, setColorIndex] = useState("#F02C7E"); // 사용자의 현재 테마 색상 설정
  const [selectedEmoji, setSelectedEmoji] = useState("💕"); // user별 default emoji 설정
  const [emojiName, onChangeEmojiName] = useInput("Heart"); // user별 default emoji 이름 설정

  const [isShowEmojiPicker, setShowEmojiPicker] = useState(false);
  const handleSetShowEmojiPicker = () => setShowEmojiPicker((prev) => !prev);

  const handleOnClickEmoji = (item) => {
    console.log(item);
    setSelectedEmoji(item.emoji);
    onChangeEmojiName(item.names[0]);
    setShowEmojiPicker(false);
  };

  const handleTitleChange = (e) => {
    setTitle(e.target.value);
  };

  function blobToFormData(blob) {
    const formData = new FormData();
    formData.append("multipartFile", blob);
    return formData;
  }

  const handleUploadFile = async (formData, type) => {
    try {
      const { data } = await fileApi.uploadFile(formData, type);
      console.log("data???", data);
      return data;
    } catch (error) {
      console.log("error: ", error);
    }
  };

  const handleGeneratePlugIn = useCallback(() => {
    if (ref.current === null) {
      return;
    }

    handleGeneratorCode();

    toBlob(ref.current).then(function (blob) {
      handleUploadFile(blob);
      const formData = blobToFormData(blob);

      for (let [key, value] of formData.entries()) {
        console.log(key, value);
      }

      handleUploadFile(formData, "img/profile");
    });

    toPng(ref.current)
      .then((dataUrl) => {
        const link = document.createElement("a");
        link.download = `${title}-button.png`;
        link.href = dataUrl;

        console.log("dataURL,", dataUrl);
        console.log("dataURL,", dataUrl);
        handleUploadFile(dataUrl);

        link.click();
      })
      .catch((err) => {
        console.log(err);
      });
  }, [ref]);

  const handleGeneratorCode = () => {
    const code = `<a href="user-link" style="background-color: ${colorIndex}; width: 200px; height: 48px;">
              <label>${selectedEmoji}</label>
              <label>${title}</label>
            </a>`;

    console.log("code:", code);
  };

  return (
    <div>
      <BasicModal width={26.25} handleSetShowModal={isModalOpen}>
        <S.PreViewWrap>
          <S.PreView
            id="don-jo-link"
            color={colorIndex}
            ref={ref}
            href="user-link"
          >
            <S.EmojiLabel>{selectedEmoji}</S.EmojiLabel>
            <S.ButtonLabel>{title}</S.ButtonLabel>
          </S.PreView>
        </S.PreViewWrap>

        <S.ContentWrap>
          <BasicTitle text="Text" />
          <S.EmojiSettingWrapper>
            <S.GridBox>
              <S.EmojiButton onClick={handleSetShowEmojiPicker}>
                {selectedEmoji}
                <FiChevronDown size="16px" />
              </S.EmojiButton>
              <BasicInput
                type="text"
                value={title}
                handleOnChangeValue={handleTitleChange}
              />
            </S.GridBox>
            {isShowEmojiPicker && (
              <S.EmojiPickerModal>
                <EmojiPicker onEmojiClick={handleOnClickEmoji} />
              </S.EmojiPickerModal>
            )}
          </S.EmojiSettingWrapper>
        </S.ContentWrap>

        <S.ContentWrap>
          <BasicTitle text="Color" />
          <S.ColorPalette>
            {generatorColorSet &&
              generatorColorSet.length > 0 &&
              generatorColorSet.map((color, index) => (
                <S.Color
                  type="radio"
                  name="color"
                  key={color}
                  value={color}
                  defaultChecked={color === colorIndex}
                  onChange={(e) => setColorIndex(e.target.value)}
                />
              ))}
          </S.ColorPalette>
        </S.ContentWrap>

        <S.ContentWrap>
          <BasicTitle text="Font" />
          <CustomSelect isBefore={true} />
        </S.ContentWrap>

        <S.ContentWrap>
          {isItemsRequired && (
            <>
              <BasicTitle text="Search Items" />
              <CustomSelect isBefore={false} />
            </>
          )}
        </S.ContentWrap>

        <S.ButtonWrap>
          <S.ButtonContent>
            <BasicButton
              text="Generate"
              handleOnClickButton={handleGeneratePlugIn}
              isBackground={true}
              isDisabled={false}
              color="var(--color-primary)"
            />
          </S.ButtonContent>
        </S.ButtonWrap>
      </BasicModal>
    </div>
  );
};

export default DashBoardGeneratorModal;

DashBoardGeneratorModal.propTypes = {
  isSearchDefault: PropTypes.bool,
  isModalOpen: PropTypes.func.isRequired,
  isItemsRequired: PropTypes.bool,
};
