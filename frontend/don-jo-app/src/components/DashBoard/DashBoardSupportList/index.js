import React from "react";
import BasicTitle from "../../Common/BasicTitle";
import ShowMoreButton from "../../Common/ShowMoreButton";
import DashBoardListItem from "../DashBoardListItem";
import * as S from "./style";
const DashBoardSupportList = () => {
  const handleGetSupportList = () => {
    console.log("handleGetSupportList()...");
  };

  return (
    <S.SupportListWrapper>
      <S.SupportListHeader>
        <BasicTitle text="Recent Support" />
        <S.EmojiList>
          <S.EmojiItem>🙏 Wishlist</S.EmojiItem>
          <S.EmojiItem>💰 Donation</S.EmojiItem>
          <S.EmojiItem>📁 items</S.EmojiItem>
        </S.EmojiList>
      </S.SupportListHeader>
      <S.SupportList>
        <DashBoardListItem />
        <DashBoardListItem />
        <DashBoardListItem />
        <DashBoardListItem />
        <DashBoardListItem />
        <DashBoardListItem />
        <DashBoardListItem />
        <DashBoardListItem />
        <DashBoardListItem />
        <DashBoardListItem />
        <ShowMoreButton handleOnClickButton={handleGetSupportList} />
      </S.SupportList>
    </S.SupportListWrapper>
  );
};

export default DashBoardSupportList;
