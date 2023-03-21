import React, { useState } from "react";
import BasicTitle from "../../../Common/BasicTitle";
import * as S from "./style";
import { FiPlus } from "react-icons/fi";
import ListItem from "./ListItem";
import { itemList } from "../../../../data/dashboard";
import ShowMoreButton from "../../../Common/ShowMoreButton";
import ItemDetailModal from "../../../Common/Modal/ItemDetailModal";
const ItemsSettings = () => {
  const [isShowItemModal, setShowItemModal] = useState(false);

  const handleGetMyItemList = () => {
    console.log("handleGetMyItemList");
  };

  const handleShowItemDetailModal = () => {
    console.log(" 클릭");
    setShowItemModal(true);
  };

  return (
    <S.SettingWrapper>
      <S.AddButton>
        <S.AddIcon>
          <FiPlus size="32px" color="white" />
        </S.AddIcon>
      </S.AddButton>
      <BasicTitle text="Items List" />
      <div>
        {itemList && itemList.length > 0 ? (
          itemList.map((item, index) => (
            <ListItem
              key={index + item.uid}
              uid={item.uid}
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
      </div>
      {itemList.length > 4 && (
        <ShowMoreButton handleOnClickButton={handleGetMyItemList} />
      )}

      {isShowItemModal && (
        <ItemDetailModal
          handleSetShowModal={setShowItemModal}
          idDashboard={true}
          handleOnClickButton={() => console.log("edit item")}
        />
      )}
    </S.SettingWrapper>
  );
};

export default ItemsSettings;
