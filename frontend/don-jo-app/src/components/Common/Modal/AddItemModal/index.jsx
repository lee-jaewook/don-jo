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
 * @param {string} imageTitle - 아이템 추가 모달: "Featured Image", 위시리스트 추가 모달: "Image"
 * @returns
 */

const AddItemModal = ({
  handleSetShowModal,
  transactionFunc,
  imageTitle = "Image",
}) => {
  // 아이템 프로필 설정
  const [itemFile, setItemNamFile] = useState(null);
  const [itemImage, setItemImage] = useState(null);
  // 아이템 정보 저장 및 비구조분해 할당으로 가져옴
  const [itemInfo, setItemInfo] = useState({});

  const { itemName, itemPrice, itemDescription, itemMessage } = itemInfo;

  const handleOnChangeInput = (e) => {
    const { id, value } = e.target;
    setItemInfo({
      ...itemInfo,
      [id]: value,
    });
  };

  const handleImageChange = (e) => {
    console.log(e.target.files);
    console.log(e.target.id);
    const file = e.target.files[0];
    const reader = new FileReader();

    reader.onload = () => {
      setItemImage(reader.result);
    };
    reader.readAsDataURL(file);
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
              id="itemName"
              type="text"
              value={itemName}
              placeholder="Items Title"
              handleOnChangeValue={handleOnChangeInput}
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
              id="itemPrice"
              type="text"
              value={itemPrice}
              placeholder="1000.000"
              onChange={handleOnChangeInput}
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
          <S.ItemProfileImg url={itemImage !== null ? itemImage : ""}>
            <S.EditIconWrapper>
              <label htmlFor="featured-image">
                <FiUpload className="edit-icon" size="20px" color="white" />
              </label>
              <S.UploadButton
                id="featured-image"
                type="file"
                accept="image/*"
                onChange={handleImageChange}
                defaultValue=""
                placeholder="select"
              />
            </S.EditIconWrapper>
          </S.ItemProfileImg>
        </S.ContentWrap>

        <S.ContentWrap>
          <S.RequiredInputWrapper>
            <BasicTitle text="File Upload" />
            <S.RequiredIcon>*</S.RequiredIcon>
          </S.RequiredInputWrapper>
          <S.SeparationContainer width="20.75">
            <S.FileUpload
              id="file-upload"
              type="file"
              onChange={handleFileChange}
              placeholder="select a file"
            />
            <S.ButtonWrap>
              <S.FileUploadButton
                htmlFor="file-upload"
                color="var(--color-primary)"
                // onClick={handleFileUpload}
              >
                Open
              </S.FileUploadButton>
            </S.ButtonWrap>
          </S.SeparationContainer>
        </S.ContentWrap>

        <S.ContentWrap>
          <BasicTitle text="Description" />
          <BasicTextarea
            id="itemDescription"
            handleOnChangeValue={handleOnChangeInput}
            placeholder="Description what you are selling."
          />
        </S.ContentWrap>

        <S.ContentWrap>
          <S.RequiredInputWrapper>
            <BasicTitle text="Confirmation Message" />
            <S.RequiredIcon>*</S.RequiredIcon>
          </S.RequiredInputWrapper>
          <BasicTextarea
            id="itemMessage"
            handleOnChangeValue={handleOnChangeInput}
            placeholder="Thank you for supporting my wishlist!"
          />
        </S.ContentWrap>

        <S.BasicButtonWrap>
          <S.BasicButtonContainer>
            <BasicButton
              text="Create"
              color="var(--color-primary)"
              handleOnClickButton={handleSubmit}
            />
          </S.BasicButtonContainer>
        </S.BasicButtonWrap>
      </S.Container>
    </FullScreenModal>
  );
};

export default AddItemModal;
