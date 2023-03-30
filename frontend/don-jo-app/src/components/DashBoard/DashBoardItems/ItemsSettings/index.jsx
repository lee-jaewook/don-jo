import React, { useState, useEffect } from "react";
import * as S from "./style";
import { useDispatch, useSelector } from "react-redux";
import BasicTitle from "../../../Common/BasicTitle";
import { FiPlus } from "@react-icons/all-files/fi/FiPlus.js";
import ListItem from "./ListItem";
import ShowMoreButton from "../../../Common/ShowMoreButton";
import ItemDetailModal from "../../../Common/Modal/ItemDetailModal";
import AddItemModal from "../../../Common/Modal/AddItemModal";
import { itemApi } from "../../../../api/items";
import { setCurrentItem } from "../../../../stores/items";

const PAGE_SIZE = 6;
const ItemsSettings = () => {
  const dispatch = useDispatch();
  const memberAddress = useSelector((state) => state.member.walletAddress);
  const [isAddItemModalOpen, setIsAddItemModalOpen] = useState(false);
  const [isShowItemModal, setShowItemModal] = useState(false);
  const [uid, setUid] = useState(0);
  const [pageNum, setPageNum] = useState(0);
  const [result, setResult] = useState([]);
  const [hasMore, setIsEnd] = useState(false);
  const [isClickedEdit, setClickedEdit] = useState(false);

  const handleGetMyItemList = async () => {
    const {
      data: { itemList, hasMore },
    } = await itemApi.getItemList(memberAddress, pageNum, PAGE_SIZE);
    setPageNum((prev) => prev + 1);
    setResult((prev) => [...prev, ...(itemList || [])]);
    setIsEnd(hasMore);
  };

  const handleAddItemModalOpen = () => {
    setClickedEdit(false);
    setIsAddItemModalOpen((prev) => !prev);
  };

  const handleShowItemDetailModal = () => {
    setShowItemModal(true);
  };

  useEffect(() => {
    handleGetMyItemList();
    const addButton = document.getElementById("add-button");

    if (!addButton) return;

    addButton.addEventListener("click", () => {
      setIsAddItemModalOpen((prev) => !prev);
    });
  }, []);

  useEffect(() => {
    if (!isClickedEdit) {
      dispatch(setCurrentItem({}));
    }
  }, [isClickedEdit]);

  return (
    <S.SettingWrapper>
      <S.AddButton id="add-button">
        <S.AddIcon>
          <FiPlus size="32px" color="white" />
        </S.AddIcon>
      </S.AddButton>
      <BasicTitle text="Items List" />
      {result && result.length > 0 ? (
        result.map((item, index) => (
          <ListItem
            key={index + item.id}
            uid={item.id}
            setUid={setUid}
            imgPath={item.imgPath}
            supportCount={item.salesCount}
            title={item.title}
            price={item.price}
            totalAmount={item.salesAmount.toString()}
            handleShowItemDetailModal={handleShowItemDetailModal}
          />
        ))
      ) : (
        <S.Message>There are no items registered.</S.Message>
      )}
      {hasMore && (
        <ShowMoreButton handleOnClickButton={handleShowItemDetailModal} />
      )}

      {isShowItemModal && (
        <ItemDetailModal
          uid={uid}
          idDashboard={true}
          handleSetShowModal={setShowItemModal}
          handleOnClickButton={() => {
            setClickedEdit(true);
            setIsAddItemModalOpen(true);
          }}
        />
      )}

      {isAddItemModalOpen && (
        <AddItemModal
          isModify={isClickedEdit}
          handleSetShowModal={handleAddItemModalOpen}
          whichApiChoose={true}
        />
      )}
    </S.SettingWrapper>
  );
};

export default ItemsSettings;
