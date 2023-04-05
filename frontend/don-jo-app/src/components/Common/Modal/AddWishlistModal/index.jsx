import * as S from "./style";
import React, { useState, useEffect } from "react";
import { FiUpload } from "@react-icons/all-files/fi/FiUpload";
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
import DashboardLoading from "../../../DashBoard/DashboardLoading";
import sendToastMessage from "../../../../utils/sendToastMessage";

/**
 * 아이템 추가/수정 모달
 * @param {function} handleSetShowModal - Modal을 닫는 함수
 * @param {boolean} callOldData - 위시리스트를 수정할 때 사용. 기존 데이터를 불러올지..
 * @param {number} wishlistUid - 요청을 받아올 wishList 번호
 * @returns
 */

const IMAGE_TYPE = "img/item";
const S3URL = "https://don-jo.s3.ap-northeast-2.amazonaws.com/";
const AddWishlistModal = ({
  handleSetShowModal,
  callOldData,
  wishlistUid,
  handleSetLoading,
}) => {
  const [isLoading, setLoading] = useState(false);
  const [itemImageFile, setItemImageFile] = useState({
    previewImgUrl: "",
    file: {},
  });

  const [itemInfo, setItemInfo] = useState({
    title: "",
    collectedAmount: null,
    targetAmount: 0,
    description: "",
    message: "",
  });

  const { title, collectedAmount, targetAmount, description, message } =
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
    if (!checkItemValidation({ name: title, price: targetAmount })) return;

    let cond;

    if (itemImageFile.previewImgUrl === "") {
      alert("Please upload an image file.");
      return;
    }

    if (callOldData && itemInfo.imgPath === itemImageFile.previewImgUrl) {
      cond = {
        description: itemInfo.description,
        imgPath: itemInfo.imgPath.substr(47),
        message: itemInfo.message,
        targetAmount: parseFloat(itemInfo.targetAmount),
        title: itemInfo.title,
        id: wishlistUid,
      };
    } else {
      let imagePath = await handleUploadFile(itemImageFile.file, IMAGE_TYPE);
      console.log("imgPath Type: ", typeof imgPath);
      cond = {
        description: itemInfo.description,
        imgPath: imagePath,
        message: itemInfo.message,
        targetAmount: parseFloat(itemInfo.targetAmount),
        title: itemInfo.title,
      };
    }

    setLoading(true);

    // API 호출
    if (callOldData) {
      try {
        const { status } = await wishlistAPI.updateWishlistItem(cond);
        if (status === 200) {
          handleSetShowModal();
          sendToastMessage("✨ Updated successfully.");
        }
      } catch (error) {
        sendToastMessage("Save failed: Contact your administrator.", "error");
      }
    } else {
      document.body.style.overflow = "auto";
      if (handleSetLoading) handleSetLoading(true);
      try {
        const { status } = await wishlistAPI.registerWishlistItem(cond);
        if (status === 200) {
          handleSetShowModal();
          sendToastMessage("✨ Updated successfully.");
        }
      } catch (error) {
        sendToastMessage("Save failed: Contact your administrator.", "error");
      } finally {
        setLoading(false);
      }
    }
  };

  const handleGetAccoutInfo = async () => {
    try {
      const { data } = await wishlistAPI.getWishlistItemDetail(wishlistUid);
      setItemInfo({
        ...data,
        imgPath: `${S3URL}${data.imgPath}`,
      });

      setItemImageFile((prev) => ({
        ...prev,
        previewImgUrl: `${S3URL}${data.imgPath}`,
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

  return isLoading ? (
    <DashboardLoading />
  ) : (
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
              id="targetAmount"
              type="text"
              value={targetAmount}
              placeholder="1000.000"
              onChange={handleOnChangeInput}
            />
            <S.UnitWrap>MATIC</S.UnitWrap>
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
            value={description}
          ></BasicTextarea>
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
            value={message}
          ></BasicTextarea>
        </S.ContentWrap>

        <S.BasicButtonWrap>
          <S.BasicButtonContainer>
            <BasicButton
              text={callOldData ? "Update" : "Create"}
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
