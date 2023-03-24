import * as S from "./style";
import React, { useRef, useState } from "react";
import { FiUpload } from "react-icons/fi";

import FullScreenModal from "../FullScreenModal";
import BasicTitle from "../../BasicTitle";
import BasicInput from "../../BasicInput";
import BasicTextarea from "../../BasicTextarea";
import BasicButton from "../../BasicButton";

/**
 * 아이템 추가/수정 모달
 * @param {function} handleSetShowModal - Modal을 닫는 함수
 * @param {function} transactionFunc - Create 시에 블록체인에 보낼 요청
 * @param {string} imageTitle - 아이템 추가 모달: "Featured Image"
 *                            - 위시리스트 추가 모달: "Image"
 * @returns
 */

const AddItemModal = ({
  handleSetShowModal,
  transactionFunc,
  imageTitle = "Image",
}) => {
  // 업로드 파일 미리보기
  const profileRef = useRef();
  const backgroundImgRef = useRef();
  const [itemName, setItemName] = useState("");
  const [itemPrice, setItemPrice] = useState("");
  const [itemFeaturedImage, setItemFeaturedImage] = useState(null);
  const [itemFile, setItemNamFile] = useState(null);
  const [itemDescription, setItemDescription] = useState("");
  const [itemMessage, setItemMessage] = useState("");

  const handleItemNameChange = (e) => {
    setItemName(e.target.value);
  };

  const handleItemPriceChange = (e) => {
    setItemPrice(e.target.value);
  };

  const handleItemDescriptionChange = (e) => {
    setItemDescription(e.target.value);
  };

  const handleItemMessageChange = (e) => {
    setItemMessage(e.target.value);
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();

    reader.onload = () => {
      setItemNamFile(reader.result);
    };

    reader.readAsDataURL(file);
  };

  const handleFileUpload = () => {
    const input = window.document.getElementById("fileUpload");
    input.click();
  };

  const handleSubmit = () => {
    handleSetShowModal();
  };

  return (
    <FullScreenModal handleSetShowModal={handleSetShowModal}>
      <S.Container>
        <S.ContentWrap>
          <S.RequiredInputWrapper>
            <BasicTitle text="Name" />
            <S.RequiredIcon>*</S.RequiredIcon>
          </S.RequiredInputWrapper>
          <S.BasicInputWrap>
            <BasicInput
              type="text"
              value={itemName}
              placeholder="Items Title"
              handleOnChangeValue={handleItemNameChange}
            />
          </S.BasicInputWrap>
        </S.ContentWrap>

        <S.ContentWrap>
          <S.RequiredInputWrapper>
            <BasicTitle text="Price" />
            <S.RequiredIcon>*</S.RequiredIcon>
          </S.RequiredInputWrapper>
          <S.SeparationContainer width="16.75">
            <S.BasicInput
              type="text"
              value={itemPrice}
              placeholder="1000.000"
              onChange={handleItemPriceChange}
            />
            <S.UnitWrap>eth</S.UnitWrap>
          </S.SeparationContainer>
        </S.ContentWrap>

        <S.ContentWrap>
          <S.RequiredInputWrapper>
            <BasicTitle text={imageTitle} />
            <S.RequiredIcon>*</S.RequiredIcon>
          </S.RequiredInputWrapper>
          <S.ImageSizeInfo>
            We recommend an image at least 460px wide and 200px tall.
          </S.ImageSizeInfo>
          <S.AddButton>
            <S.AddIcon>
              <FiUpload size="20px" color="white" />
            </S.AddIcon>
          </S.AddButton>
        </S.ContentWrap>

        <S.ContentWrap>
          <S.RequiredInputWrapper>
            <BasicTitle text="File Upload" />
            <S.RequiredIcon>*</S.RequiredIcon>
          </S.RequiredInputWrapper>
          <S.SeparationContainer width="20.75">
            <S.FileUpload
              id="fileUpload"
              type="file"
              onChange={handleFileChange}
            />
            <S.ButtonWrap>
              <S.FileUploadButton
                color="var(--color-primary)"
                onClick={handleFileUpload}
              >
                Open
              </S.FileUploadButton>
            </S.ButtonWrap>
          </S.SeparationContainer>
        </S.ContentWrap>

        <S.ContentWrap>
          <BasicTitle text="Description" />
          <BasicTextarea
            handleOnChangeValue={handleItemDescriptionChange}
            placeholder="Description what you are selling."
          />
        </S.ContentWrap>

        <S.ContentWrap>
          <S.RequiredInputWrapper>
            <BasicTitle text="Confirmation Message" />
            <S.RequiredIcon>*</S.RequiredIcon>
          </S.RequiredInputWrapper>
          <BasicTextarea
            handleOnChangeValue={handleItemMessageChange}
            placeholder="Thank you for supporting my wishlist!"
          />
        </S.ContentWrap>

        <S.BasicButtonWrap>
          <S.BasicButtonContainer>
            <BasicButton
              text="Create"
              color="black"
              handleOnClickButton={handleSubmit}
            />
          </S.BasicButtonContainer>
        </S.BasicButtonWrap>
      </S.Container>
    </FullScreenModal>
  );
};

export default AddItemModal;
