import React, { useState, useEffect } from "react";
import BasicTitle from "../../../Common/BasicTitle";
import * as S from "./style";
import { FiPlus } from "react-icons/fi";
import ListItem from "./ListItem";
import { itemList } from "../../../../data/dashboard";
import ShowMoreButton from "../../../Common/ShowMoreButton";
import ItemDetailModal from "../../../Common/Modal/ItemDetailModal";
import AddItemModal from "../../../Common/Modal/AddItemModal";

const ItemsSettings = () => {
  const [isAddItemModalOpen, setIsAddItemModalOpen] = useState(false);
  const [isShowItemModal, setShowItemModal] = useState(false);
  const [uid, setUid] = useState(0);

  const handleGetMyItemList = () => {
    console.log("handleGetMyItemList");
  };

  const handleAddItemModalOpen = () => {
    setIsAddItemModalOpen((prev) => !prev);
  };

  const handleShowItemDetailModal = () => {
    setShowItemModal(true);
  };

  return (
    <S.SettingWrapper>
      <S.AddButton onClick={handleAddItemModalOpen}>
        <S.AddIcon>
          <FiPlus size="32px" color="white" />
        </S.AddIcon>
      </S.AddButton>
      <BasicTitle text="Items List" />
      {itemList && itemList.length > 0 ? (
        itemList.map((item, index) => (
          <ListItem
            key={index + item.uid}
            uid={item.uid}
            setUid={setUid}
            imgPath={item.imgPath}
            supportCount={item.supportCount}
            title={item.title}
            collectedAmount={item.collectedAmount}
            totalAmount={item.totalAmount}
            handleShowItemDetailModal={handleShowItemDetailModal}
          />
        ))
      ) : (
        <label>There are no items registered.</label>
      )}
      {itemList.length > 4 && (
        <ShowMoreButton handleOnClickButton={handleShowItemDetailModal} />
      )}

      {isShowItemModal && (
        <ItemDetailModal
          uid={uid}
          idDashboard={true}
          handleSetShowModal={setShowItemModal}
          handleOnClickButton={() => console.log("show Edit Modal", uid)}
        />
      )}

      {isAddItemModalOpen && (
        <AddItemModal handleSetShowModal={handleAddItemModalOpen} />
      )}
    </S.SettingWrapper>
  );
};

export default ItemsSettings;
