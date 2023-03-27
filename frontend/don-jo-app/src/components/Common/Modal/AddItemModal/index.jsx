import * as S from "./style";
import React, { useState, useEffect } from "react";
import { FiUpload } from "react-icons/fi";
import PropTypes from "prop-types";
import FullScreenModal from "../FullScreenModal";
import BasicTitle from "../../BasicTitle";
import BasicInput from "../../BasicInput";
import BasicTextarea from "../../BasicTextarea";
import BasicButton from "../../BasicButton";
import { itemApi } from "../../../../api/items";
import { wishlistAPI } from "../../../../api/wishlist";
import { fileApi } from "../../../../api/file";

/**
 * 아이템 추가/수정 모달
 * @param {function} handleSetShowModal - Modal을 닫는 함수
 * @param {function} transactionFunc - Create 시에 블록체인에 보낼 요청
 * @param {string} imageTitle - 아이템 추가 모달: "Featured Image", 위시리스트 추가 모달: "Image"
 * @returns
 */

const ITEM_TYPE = "item";
const IMAGE_TYPE = "img/item";

const AddItemModal = ({ handleSetShowModal, whichApiChoose, imageTitle }) => {
  // 아이템 프로필 설정
  const [itemFile, setItemNamFile] = useState({
    previewImgUrl: "",
    file: {},
  });
  const [itemImageFile, setItemImageFile] = useState({
    previewImgUrl: "",
    file: {},
  });

  // 아이템 정보 저장 및 비구조분해 할당으로 가져옴
  const [itemInfo, setItemInfo] = useState({
    itemName: "",
    itemPrice: "",
    itemDescription: "",
    itemMessage: "",
  });
  const { itemName, itemPrice, itemDescription, itemMessage } = itemInfo;

  const handleOnChangeInput = (e) => {
    const { id, value } = e.target;
    setItemInfo({
      ...itemInfo,
      [id]: value,
    });
  };

  const handleFileChange = (e) => {
    if (e.target.value === "") return;
    const {
      target: { id, files },
    } = e;

    const reader = new FileReader();
    reader.readAsDataURL(files[0]);
    reader.onloadend = () => {
      if (id === "featured-image") {
        setItemImageFile({ previewImgUrl: reader.result, file: files[0] });
      } else if (id === "file-upload") {
        setItemNamFile({ previewImgUrl: reader.result, file: files[0] });
      }
    };
  };

  // 파일 업로드를 위한 API 호출
  const handleUploadFile = async (file, type) => {
    const formData = new FormData();
    formData.append("multipartFile", file);

    try {
      const { data } = await fileApi.uploadFile(formData, type);
      return data;
    } catch (error) {
      console.log("error: ", error);
    }
  };

  const registerItem = async () => {
    let imgPath = await handleUploadFile(itemImageFile.file, IMAGE_TYPE);
    let filePath = await handleUploadFile(itemFile.file, ITEM_TYPE);

    const cond = {
      description: itemDescription,
      message: itemMessage,
      price: parseFloat(itemPrice),
      title: itemName,
      imgPath: imgPath,
      filePath: filePath,
    };

    if (whichApiChoose) {
      itemApi
        .registerItem(cond)
        .then(() => {
          alert("아이템 등록 성공!");
        })
        .catch((error) => {
          alert("아이템 등록 실패!");
        });
    } else {
      wishlistAPI
        .registerWishlistItem(cond)
        .then(() => {
          alert("위시리스트 등록 성공!");
        })
        .catch((error) => {
          alert("위시리스트 등록 실패!");
        });
    }
    setTimeout(handleSetShowModal, 2000);
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
          <S.ItemProfileImg
            url={
              itemImageFile.previewImgUrl !== null
                ? itemImageFile.previewImgUrl
                : ""
            }
          >
            <S.EditIconWrapper>
              <label htmlFor="featured-image">
                <FiUpload className="edit-icon" size="20px" color="white" />
              </label>
              <S.UploadButton
                id="featured-image"
                type="file"
                accept="image/*"
                onChange={handleFileChange}
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
              handleOnClickButton={registerItem}
            />
          </S.BasicButtonContainer>
        </S.BasicButtonWrap>
      </S.Container>
    </FullScreenModal>
  );
};

export default AddItemModal;

AddItemModal.propTypes = {
  handleSetShowModal: PropTypes.func.isRequired,
  // transactionFunc: PropTypes.,
  imageTitle: PropTypes.string,
};

AddItemModal.defaultProps = {
  imageTitle: "Image",
};
