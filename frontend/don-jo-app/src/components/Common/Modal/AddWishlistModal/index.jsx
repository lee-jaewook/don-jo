import * as S from "./style";
import React, { useState, useEffect } from "react";
import { FiUpload } from "react-icons/fi";
import PropTypes from "prop-types";
import FullScreenModal from "../FullScreenModal";
import BasicTitle from "../../BasicTitle";
import BasicInput from "../../BasicInput";
import BasicTextarea from "../../BasicTextarea";
import BasicButton from "../../BasicButton";
import { wishlistAPI } from "../../../../api/wishlist";
import { fileApi } from "../../../../api/file";
import { fileSizeValidator } from "../../../../utils/validation/validator";
import { checkItemValidation } from "../../../../utils/validation/checkItemValidation";

/**
 * 아이템 추가/수정 모달
 * @param {function} handleSetShowModal - Modal을 닫는 함수
 * @param {boolean} callOldData - 위시리스트를 수정할 때 사용. 기존 데이터를 불러올지..
 * @param {number} wishlistUid - 요청을 받아올 wishList 번호
 * @returns
 */

const IMAGE_TYPE = "img/item";

const AddWishlistModal = ({ handleSetShowModal, callOldData, wishlistUid }) => {
  const [itemImageFile, setItemImageFile] = useState({
    previewImgUrl: "",
    file: {},
  });

  const [itemInfo, setItemInfo] = useState({
    title: "",
    collectedAmount: null,
    totalAmount: null,
    description: "",
    message: "",
  });

  const { title, collectedAmount, totalAmount, description, message } =
    itemInfo;

  const handleOnChangeInput = (e) => {
    const { id, value } = e.target;
    setItemInfo({
      ...itemInfo,
      [id]: value,
    });
  };

  const handleFileChange = async (e) => {
    const { files } = e.target;
    console.log("files: ", files);
    if (e.target.value === "") {
      setItemImageFile({ previewImgUrl: "", file: {} });
      return;
    }

    if (!fileSizeValidator(files[0])) {
      setItemImageFile({ previewImgUrl: "", file: {} });
      return;
    }
    console.log("여기까지 오나요?");
    const reader = new FileReader();
    reader.readAsDataURL(files[0]);
    reader.onloadend = () => {
      setItemImageFile({ previewImgUrl: reader.result, file: files[0] });
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

  /**
   * 위시리스트 등록/수정
   * 이름과 가격 정보를 확인
   * 이미지 url을 확인
   * 이미지 url이 기존의 url과 같으면 이미즈를 S3에 업로드하지 않고 등록
   * @returns
   */
  const registerItem = async () => {
    if (!checkItemValidation({ name: title, price: totalAmount })) return;

    let cond;

    if (itemImageFile.previewImgUrl === "") {
      alert("Please upload an image file.");
      return;
    }

    if (callOldData && itemInfo.imagPath === itemImageFile.previewImgUrl) {
      cond = {
        description: itemInfo.description,
        imgPath: itemInfo.imagPath,
        message: itemInfo.message,
        targetAmount: parseFloat(itemInfo.totalAmount),
        title: itemInfo.title,
      };
    } else {
      console.log("이거인데?");
      let imagePath = await handleUploadFile(itemImageFile.file, IMAGE_TYPE);
      cond = {
        description: itemInfo.description,
        imgPath: imagePath,
        message: itemInfo.message,
        targetAmount: parseFloat(itemInfo.totalAmount),
        title: itemInfo.title,
      };
    }
    console.log("cond: ", cond);

    wishlistAPI
      .registerWishlistItem(cond)
      .then(() => {
        alert("위시리스트 등록 성공!");
      })
      .catch((error) => {
        alert("위시리스트 등록 실패!");
      });

    setTimeout(handleSetShowModal, 2000);
  };

  const handleGetAccoutInfo = async () => {
    try {
      const { data } = await wishlistAPI.getWishlistItemDetail(wishlistUid);
      setItemInfo({
        ...data,
      });

      setItemImageFile((prev) => ({
        ...prev,
        previewImgUrl: data.imagPath,
      }));
    } catch (error) {
      console.log("error: ", error);
    }
  };

  useEffect(() => {
    if (callOldData) {
      handleGetAccoutInfo();
    }
  }, []);

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
              id="title"
              type="text"
              value={title}
              placeholder="Item Title"
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
              id="totalAmount"
              type="text"
              value={totalAmount || ""}
              placeholder="1000.000"
              onChange={handleOnChangeInput}
            />
            <S.UnitWrap>eth</S.UnitWrap>
          </S.SeparationContainer>
        </S.ContentWrap>

        <S.ContentWrap>
          <S.RequiredInputWrapper>
            <BasicTitle text="Image" />
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
          <BasicTitle text="Description" />
          <BasicTextarea
            id="description"
            handleOnChangeValue={handleOnChangeInput}
            placeholder="Description what you are selling."
          >
            {description}
          </BasicTextarea>
        </S.ContentWrap>

        <S.ContentWrap>
          <S.RequiredInputWrapper>
            <BasicTitle text="Confirmation Message" />
            <S.RequiredIcon>*</S.RequiredIcon>
          </S.RequiredInputWrapper>
          <BasicTextarea
            id="message"
            handleOnChangeValue={handleOnChangeInput}
            placeholder="Thank you for supporting my wishlist!"
          >
            {message}
          </BasicTextarea>
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

export default AddWishlistModal;

AddWishlistModal.propTypes = {
  handleSetShowModal: PropTypes.func.isRequired,
  callOldData: PropTypes.bool,
  wishlistUid: PropTypes.number,
};

AddWishlistModal.defaultProps = {
  callOldData: false,
  wishlistUid: 0,
};
