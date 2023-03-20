import React from "react";
import BasicTitle from "../../../Common/BasicTitle";
import * as S from "./style";
import { FiPlus } from "react-icons/fi";
import ListItem from "./ListItem";
import { itemList } from "../../../../data/dashboard";
import ShowMoreButton from "../../../Common/ShowMoreButton";
const ItemsSettings = () => {
  const handleGetMyItemList = () => {
    console.log("handleGetMyItemList");
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
            />
          ))
        ) : (
          <label>There are no items registered.</label>
        )}
      </div>
      {itemList.length > 4 && (
        <ShowMoreButton handleOnClickButton={handleGetMyItemList} />
      )}
    </S.SettingWrapper>
  );
};

export default ItemsSettings;
