import React, { useCallback, useEffect, useRef, useState } from "react";
import * as S from "./style";
import PropTypes from "prop-types";
import BasicButton from "../../Common/BasicButton";
import BasicInput from "../../Common/BasicInput";
import BasicModal from "../../Common/Modal/BasicModal";
import BasicTitle from "../../Common/BasicTitle";
import CustomSelect from "../DashBoardCustomSelect";
import EmojiPicker from "emoji-picker-react";
import { FiCopy } from "@react-icons/all-files/fi/FiCopy.js";
import { FiChevronDown } from "@react-icons/all-files/fi/FiChevronDown.js";
import { generatorColorSet } from "../../../data/dashboard";
import { toPng, toBlob } from "html-to-image";
import { fileApi } from "../../../api/file";
import { useSelector } from "react-redux";
import { useMediaQuery } from "react-responsive";

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
  const S3URL = "https://don-jo.s3.ap-northeast-2.amazonaws.com/";
  const ref = useRef(null);
  const codeRef = useRef(null);
  const [title, setTitle] = useState("My Button Name");
  const [colorIndex, setColorIndex] = useState("#F02C7E"); // 사용자의 현재 테마 색상 설정
  const [selectedEmoji, setSelectedEmoji] = useState("💕"); // user별 default emoji 설정
  const [isClickedGenerateButton, setClickedGenerateButton] = useState(false);
  const [code, setCode] = useState("");
  const pageName = useSelector((state) => state.member.pageName);
  const [isShowEmojiPicker, setShowEmojiPicker] = useState(false);
  const isMobile = useMediaQuery({ maxWidth: 768 });
  const [fontStyle, setFontStyle] = useState("Noto Sans Korean");
  const [searchItem, setSearchItem] = useState("");

  const handleSetShowEmojiPicker = () => setShowEmojiPicker((prev) => !prev);

  const handleFontChange = (e) => {
    setFontStyle(e.target.innerText);
  };

  const handleSearchItemChange = (e) => {
    setSearchItem(e.target.innerText);
  };

  const handleOnClickEmoji = (item) => {
    setSelectedEmoji(item.emoji);
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
      setCode(
        `<a href="https://j8a209.p.ssafy.io/${pageName}" target="_blank"><img src="${S3URL}${data}" alt="dong-jo" /></a>`
      );
      handleDownloadButtonImg();
    } catch (error) {
      console.log("error: ", error);
    }
  };

  const handleGeneratePlugIn = useCallback(() => {
    if (ref.current === null) {
      return;
    }

    toBlob(ref.current).then(function (blob) {
      const formData = blobToFormData(blob);
      handleUploadFile(formData, "img/profile");
    });
  }, [ref]);

  const handleDownloadButtonImg = () => {
    setClickedGenerateButton(true);

    toPng(ref.current)
      .then((dataUrl) => {
        const link = document.createElement("a");
        link.download = `${title}-button.png`;
        link.href = dataUrl;
        link.click();
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleCopyCode = () => {
    let copyText = document.getElementById("code-field");
    copyText.select();
    copyText.setSelectionRange(0, 99999);
    navigator.clipboard.writeText(copyText.value);
  };

  // 내용에 따른 높이 조절 감지
  const handleOnChangeTextareaHeight = () => {
    codeRef.current.style.height = "auto";
    codeRef.current.style.height = codeRef.current.scrollHeight + "px";
  };

  useEffect(() => {
    if (codeRef.current === null) return;
    handleOnChangeTextareaHeight();
  }, [code]);

  return (
    <div>
      <BasicModal width={isMobile ? 1 : 26.25} handleSetShowModal={isModalOpen}>
        <S.PreViewWrap>
          {!isClickedGenerateButton ? (
            <S.PreView id="don-jo-link" color={colorIndex} ref={ref} href="#">
              <S.EmojiLabel>{selectedEmoji}</S.EmojiLabel>
              <S.ButtonLabel font={fontStyle}>{title}</S.ButtonLabel>
            </S.PreView>
          ) : (
            <>
              <S.CodeBox
                ref={codeRef}
                id="code-field"
                value={code}
                readOnly
                rows={1}
              />
              <S.CopyButton onClick={handleCopyCode}>
                <FiCopy />
                <label>copy code</label>
              </S.CopyButton>
            </>
          )}
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
          <CustomSelect
            isBefore={true}
            selectValue={fontStyle}
            handleOptionChange={handleFontChange}
          />
        </S.ContentWrap>

        <S.ContentWrap>
          {isItemsRequired && (
            <>
              <BasicTitle text="Search Items" />
              <CustomSelect
                isBefore={false}
                selectValue={searchItem}
                handleOptionChange={handleSearchItemChange}
              />
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
