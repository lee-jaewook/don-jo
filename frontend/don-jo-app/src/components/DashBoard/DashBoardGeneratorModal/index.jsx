import React, { useEffect, useRef, useState } from "react";
import * as S from "./style";
import BasicButton from "../../Common/BasicButton";
import BasicInput from "../../Common/BasicInput";
import BasicModal from "../../Common/Modal/BasicModal";
import BasicTitle from "../../Common/BasicTitle";
import CustomSelect from "../DashBoardCustomSelect";
import EmojiPicker from "emoji-picker-react";
import { FiCopy } from "@react-icons/all-files/fi/FiCopy.js";
import { FiChevronDown } from "@react-icons/all-files/fi/FiChevronDown.js";
import { colorSet, fontDataSet } from "../../../data/dashboard";
import { toPng, toBlob } from "html-to-image";
import { fileApi } from "../../../api/file";
import { useSelector } from "react-redux";
import { itemApi } from "../../../api/items";
import { useMediaQuery } from "react-responsive";

const S3URL = "https://don-jo.s3.ap-northeast-2.amazonaws.com/";

const DashBoardGeneratorModal = ({
  setShowPlugInModal,
  isItemsRequired = true,
}) => {
  const ref = useRef(null);
  const codeRef = useRef(null);
  const isMobile = useMediaQuery({ maxWidth: 768 });
  const pageName = useSelector((state) => state.member.pageName);
  const memberAddress = useSelector((state) => state.member.walletAddress);
  const [itemList, setItemList] = useState([]);
  const [fontStyle, setFontStyle] = useState("Noto Sans KR");
  const [themeColor, setThemeColor] = useState(0);
  const [isShowEmojiPicker, setShowEmojiPicker] = useState(false);
  const [isClickedGenerateButton, setClickedGenerateButton] = useState(false);
  const [generatorValue, setGeneratorValue] = useState({
    emoji: "🍪",
    buttonName: "My Button",
  });
  const [code, setCode] = useState("");
  const [searchItem, setSearchItem] = useState({
    id: -1,
    title: "No Item",
  });
  const { emoji, buttonName } = generatorValue;

  const handleOnChangeValue = (e) => {
    const { id, value } = e.target;
    setGeneratorValue({ ...generatorValue, [id]: value });
  };

  const handleOnChangeFontStyle = (e) => {
    const { innerText } = e.target;
    setFontStyle(innerText);
  };

  const handleOnChangeItemId = (e) => {
    const { id, innerText } = e.target;
    setSearchItem({ id: id, title: innerText });
  };

  const handleOnClickEmoji = (item) => {
    setGeneratorValue({ ...generatorValue, emoji: item.emoji });
    setShowEmojiPicker(false);
  };

  const blobToFormData = (blob) => {
    const formData = new FormData();
    formData.append("multipartFile", blob);
    return formData;
  };

  const handleUploadFile = async (formData, type) => {
    try {
      const { data } = await fileApi.uploadFile(formData, type);

      let code;
      if (isItemsRequired && searchItem.id !== -1) {
        code = `<a href="https://j8a209.p.ssafy.io/${pageName}/items/${searchItem.id}" target="_blank"><img src="${S3URL}${data}" alt="dong-jo" /></a>`;
      } else {
        code = `<a href="https://j8a209.p.ssafy.io/${pageName}" target="_blank"><img src="${S3URL}${data}" alt="dong-jo" /></a>`;
      }
      setCode(code);
      handleDownloadButtonImg();
    } catch (error) {
      console.log("[Dashboard] handleUploadFile()... ", error);
    }
  };

  const handleGeneratePlugIn = () => {
    if (ref.current === null) {
      return;
    }

    toBlob(ref.current).then(function (blob) {
      const formData = blobToFormData(blob);
      handleUploadFile(formData, "img/plugin");
    });
  };

  const handleDownloadButtonImg = () => {
    setClickedGenerateButton(true);

    toPng(ref.current)
      .then((dataUrl) => {
        const link = document.createElement("a");
        link.download = `${buttonName}-button.png`;
        link.href = dataUrl;
        link.click();
      })
      .catch((error) => {
        console.log("[Dashboard] handleDownloadButtonImg()... ", error);
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

  // 나의 아이템 목록 가져오기
  const handleGetMyItems = async () => {
    try {
      const { data } = await itemApi.getAllItems(memberAddress);
      setItemList(data);

      if (data.length > 0) {
        setSearchItem(data[0]);
      }
    } catch (error) {
      console.log("[Dashboard] handleGetMyItems()...", error);
    }
  };

  useEffect(() => {
    handleGetMyItems();
  }, []);

  useEffect(() => {
    if (codeRef.current === null) return;
    handleOnChangeTextareaHeight();
  }, [code]);

  return (
    <BasicModal
      width={isMobile ? 1 : 26.25}
      handleSetShowModal={setShowPlugInModal}
    >
      <S.PreViewWrap>
        {!isClickedGenerateButton ? (
          <S.PreView id="don-jo-link" color={themeColor} ref={ref} href="#">
            <S.EmojiLabel>{emoji}</S.EmojiLabel>
            <S.ButtonLabel font={fontStyle}>{buttonName}</S.ButtonLabel>
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
            <S.EmojiButton onClick={() => setShowEmojiPicker(true)}>
              {emoji}
              <FiChevronDown size="16px" />
            </S.EmojiButton>
            <BasicInput
              id="buttonName"
              type="text"
              value={buttonName}
              handleOnChangeValue={handleOnChangeValue}
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
          {colorSet &&
            colorSet.length > 0 &&
            colorSet.map((color, index) => (
              <S.Color
                type="radio"
                name="color"
                key={color}
                value={color}
                defaultChecked={index === themeColor}
                onChange={(e) => setThemeColor(e.target.value)}
              />
            ))}
        </S.ColorPalette>
      </S.ContentWrap>

      <S.ContentWrap>
        <BasicTitle text="Font" />
        <CustomSelect
          id="fontStyle"
          isBefore={true}
          data={fontDataSet}
          selectValue={fontStyle}
          handleOptionChange={handleOnChangeFontStyle}
        />
      </S.ContentWrap>

      <S.ContentWrap>
        {isItemsRequired && (
          <>
            <BasicTitle text="Search Items" />
            <CustomSelect
              id="selectedItem"
              isBefore={false}
              data={itemList}
              selectValue={searchItem.title || ""}
              handleOptionChange={handleOnChangeItemId}
            />
          </>
        )}
      </S.ContentWrap>

      <S.ButtonWrap>
        <S.ButtonContent>
          <BasicButton
            text={isClickedGenerateButton ? "Reset" : "Generate"}
            handleOnClickButton={
              isClickedGenerateButton
                ? () => setClickedGenerateButton(false)
                : handleGeneratePlugIn
            }
            isBackground={true}
            isDisabled={false}
            color="var(--color-primary)"
          />
        </S.ButtonContent>
      </S.ButtonWrap>
    </BasicModal>
  );
};

export default DashBoardGeneratorModal;
